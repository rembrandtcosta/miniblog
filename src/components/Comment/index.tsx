'use client';

import IComment from "@/models/comment";
import { useState } from "react";
import NewComment from "../NewComment/index";
import Replies from "../Replies";
import { searchLike, giveLike, undoLike } from "./actions";

export default function Comment(props: IComment) {
  const [likes, setLikes] = useState(props.likes);
  const [activeReply, setActiveReply] = useState(false);

  const { postId, replies } = props;
  const commentId = props.id;
  const gaveLike = searchLike(commentId);

  async function handleLike() {
    if (commentId === undefined) 
      return;
    await giveLike(commentId, postId);
    setLikes(likes + 1);
  }

  async function handleUndo() {
    if (commentId === undefined)
      return;
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
