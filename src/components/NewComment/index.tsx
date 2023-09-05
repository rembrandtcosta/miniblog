'use client';

import { useState } from "react";
import { postComment } from "./actions";
import Comment from "@/models/comment";
import { useRouter } from "next/navigation";

export default function NewComment(props: { postId: string, reply?: boolean, replyId?: string }) {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const { postId, reply, replyId } = props;

  const handlePostComment = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    const post: Comment = {
      'content': comment,
      'email': email,
      'user': user,
      'likes': 0,
      'replies': [],
      'isReply': reply ? true : false,
      'postId': postId,
    }
    await postComment(postId, post, replyId);
    setComment('');

    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leave a {reply ? "Reply" : "Comment"}</h2>
      <form action="#" method="post" onSubmit={handlePostComment}>
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
