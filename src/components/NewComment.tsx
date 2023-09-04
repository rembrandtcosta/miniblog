'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewComment(props: { postId: string, reply?: boolean, replyId?: string }) {
  const [email, setEmail] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const { postId, reply, replyId } = props;

  const router = useRouter();

  const replyComment = async(commentId: string) => {
    const res = await fetch(`/api/comment/${replyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store',
    });

    const data = await res.json();

    const replyTo = data.data;

    replyTo.replies.push(commentId)

    await fetch(`/api/comment/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(replyTo),
      cache: 'no-store',
    })
  }

  const postComment = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'content': comment,
        'email': email,
        'user': user,
        'likes': 0,
        'replies': [],
        'isReply': reply ? true : false,
      }),
      cache: 'no-store',
    })

    const data = await res.json();

    const commentId = data.data.insertedId;

    if (reply) {
      replyComment(commentId);
    }

    setComment('');

    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leave a {reply ? "Reply" : "Comment"}</h2>
      <form action="#" method="post" onSubmit={postComment}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Your username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Write your comment here..."
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            required
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
