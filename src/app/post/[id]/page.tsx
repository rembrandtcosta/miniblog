import Post from "@/models/post";
import CommentSection from "@/components/CommentSection";
import Image from "next/image";

async function getPost(id: string) {
  const res = await fetch(
    `https://news-api.lublot.dev/api/posts/${id}`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data as Post;
}

function parseDate(date: string) {
  return new Date(date).toLocaleString();
}

export default async function Post({ params }: { params: { id: string } }) {
  const post: Post = await getPost(params.id);

  return (
    <div>
      <div className="prose max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
        <div className="inline-flex justify-center">
          <Image className="object-center object-cover" src={post.coverImage} alt={post.title} />
        </div>
        <p className="text-gray-600 mb-4">Published on {parseDate(post.published)}</p>
        <p><i>{post.author}</i></p>

        <div className="prose-lg">
          <p>
            {post.content}
          </p>
        </div>
      </div>
      <CommentSection postId={params.id} />
    </div>
  )
}
