import Comment from "@/models/comment";

async function replyComment(commentId: string, replyId: string, postId: string) {
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

export async function postComment(postId: string, comment: Comment, replyId?: string) {
  const res = await fetch(`/api/comment/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'content': comment.content,
      'email': comment.email,
      'user': comment.user,
      'likes': 0,
      'replies': [],
      'isReply': comment.isReply,
      'postId': comment.postId,
    }),
    cache: 'no-store',
  })

  const data = await res.json();

  const commentId = data.data.insertedId;

  if (replyId !== null && replyId !== undefined) {
    replyComment(commentId, replyId, postId);
  }

}


