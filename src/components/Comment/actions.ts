'use client';

import IComment from "@/models/comment";

export function searchLike(commentId?: string): boolean {
  if (commentId === undefined)
    return false;
  const id = window.localStorage.getItem(commentId);
  if (id === null) {
    return false;
  } 
  return true;
}

async function fetchComment(commentId: string) {
  const res = await fetch(`/api/comment/${commentId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();

  return data.data;
}

async function updateComment(comment: IComment, postId: string) {
  await fetch(`/api/comment/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'json/application',
    },
    body: JSON.stringify(
      comment    
    ),
    cache: 'no-store',
  });
}

export async function giveLike(commentId: string, postId: string) {
  localStorage.setItem(commentId, "true");

  const comment: IComment = await fetchComment(commentId);

  comment.likes = comment.likes + 1;
  await updateComment(comment, postId);
}

// duplicate code. will fix if have time
export async function undoLike(commentId: string, postId: string) {
  localStorage.removeItem(commentId);

  const comment: IComment = await fetchComment(commentId);

  comment.likes = comment.likes - 1;
  await updateComment(comment, postId);
}

