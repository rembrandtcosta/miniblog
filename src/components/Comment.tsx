'use client';

import IComment from "@/models/comment";
import Replies from "./Replies";
import { useState } from "react";
import NewComment from "./NewComment";

function tryLike(commentId: string): boolean {
  const id = window.localStorage.getItem(commentId);
  if (id === null) {
    return false;
  } 
  return true;
}

async function giveLike(commentId: string, postId: string) {
  localStorage.setItem(commentId, "true");
  const res = await fetch(`/api/comment/${commentId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();
  
  const comment: IComment = data.data;

  comment.likes = comment.likes + 1;
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

// duplicate code, will fix if have time
async function undoLike(commentId: string, postId: string) {
  localStorage.removeItem(commentId);
  const res = await fetch(`/api/comment/${commentId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();
  
  const comment: IComment = data.data;

  comment.likes = comment.likes - 1;
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

export default function Comment(props: IComment) {
  const [likes, setLikes] = useState(props.likes);
  const [activeReply, setActiveReply] = useState(false);

  const { postId, replies } = props;
  const commentId = props.id;
  const gaveLike = tryLike(commentId);

  async function handleLike() {
    await giveLike(commentId, postId);
    setLikes(likes + 1);
  }

  async function handleUndo() {
    await undoLike(commentId, postId);
    setLikes(likes - 1);
  }

  function handleReply() {
    setActiveReply(!activeReply);
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="flex">
          <div className="h-8 w-8 rounded-full bg-gray-400"></div>
          <div className="ml-2">
            <p className="text-gray-800 font-semibold">{props.user}</p>
          </div>
          </div>
        <div className="flex flex-col">
          <div>
            { gaveLike ?
              <button 
                type="submit" 
                className="w-14 bg-gray-400 text-white px-2 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleUndo} 
              > 
                Undo
              </button> :
              <button 
                type="submit" 
                className="w-14 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleLike} 
              >
                Like
              </button>
            }
          </div>
          <div className="w-16">
            <p className="text-gray-800 font-semibold">
              {likes} like(s)
            </p>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{props.content}</p>
      <div>
        {props?.isReply ? <></> :
          <button 
            type="submit" 
            className="w-14 px-2 py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleReply} 
          > 
            Reply 
          </button> 
        }
      </div>
      { activeReply ? <NewComment postId={postId} reply replyId={commentId}/> : <></> }
      <Replies 
        comments={replies}
        postId={postId} 
      />
    </div>
  );
}
