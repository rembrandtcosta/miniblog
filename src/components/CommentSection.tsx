import IComment from "@/models/comment";
import Comment from "./Comment";
import NewComment from "./NewComment";

async function getComments(id: string) {
  const res = await fetch(`${process.env.BASE_FETCH_URL}/api/comments/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });
  const data = await res.json();
  console.log(data);
  return data as IComment[];
}

function getReplies(comments: IComment[], target: IComment): IComment[] {
  const ret = comments.filter((comment) => {
    return comment.isReply && target.replies?.includes(comment.id);
  })
  return ret;
}

export default async function CommentSection(props: { postId: string }) {
  const { postId } = props;
  const comments = await getComments(postId);

  return (
    <div>
      {comments?.filter((comment) => !comment.isReply).map((comment: IComment) => {
        return (
          <Comment
            key={comment.id}
            id={comment.id}
            user={comment.user}
            content={comment.content}
            postId={postId}   
            likes={comment.likes}
            isReply={comment.isReply}
            replies={getReplies(comments, comment)}
          />
        );
      })}
      <NewComment postId={postId} />
    </div>
  );
}
