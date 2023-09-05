import IComment from "@/models/comment";
import Comment from "./Comment/index";

export default function Replies(props: { comments: IComment[], postId: string }) {
  const { comments, postId } = props;

  return (
    <div>
      {comments?.map((comment: IComment) => {
        return (
          <Comment
            key={comment.id}
            id={comment.id}
            email={comment.email}
            user={comment.user}
            content={comment.content}
            postId={postId}   
            likes={comment.likes}
            isReply={comment.isReply}
            replies={[]} // no reply to replies
          />
        );
      })}
    </div>
  );
}
