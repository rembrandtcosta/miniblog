import clientPromise from "../../../../../lib/mongodb";

export async function GET(request: Request, { params }: { params: { postId: string } }) {
  const client = await clientPromise;
  const db = client.db("blog");

  const res = await db
    .collection("comments")
    .find({ postId: params.postId })
    .toArray()
    
  const data = res.map((comment) => {
      return {
        content: comment.content,
        postId: comment.postId,
        isReply: comment.isReply,
        email: comment.email,
        user: comment.user,
        likes: comment.likes,
        id: comment._id,
        replies: comment.replies,
      }
    })

  return Response.json( data );
}

