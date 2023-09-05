import { log } from "console";
import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";

class Comment {
  constructor(public postId: string, public likes: number, public content: string, public email: string, public user: string, public isReply: boolean, public replies: any[], public id?: ObjectId) {}
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();

  const client = await clientPromise
  const db = client.db("blog");

  data.postId = params.id;
  const comment = data as Comment;

  const res = await db 
    .collection("comments")
    .insertOne(comment)

  return Response.json({ status: 200, data: res });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db("blog");

  const res = await db 
    .collection("comments")
    .findOne({ _id: new ObjectId(params.id) })

  if (res !== null)
    res.id = res?._id;

  return Response.json({ status: 200, data: res })
}

export async function PUT(request: Request) {
  const data = await request.json();

  const client = await clientPromise;
  const db = client.db("blog");

  const comment = data as Comment;
  console.log(comment.id);
  const replace = { _id: new ObjectId(comment.id) };

  const res = await db
    .collection("comments")
    .replaceOne(replace, 
      { 
        content: comment.content,
        postId: comment.postId,
        isReply: comment.isReply,
        user: comment.user,
        likes: comment.likes,
        replies: comment.replies,
        email: comment.email,
      });

  return Response.json({ status: 200, data: res });
}
