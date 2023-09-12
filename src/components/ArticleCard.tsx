import Post from "@/models/post";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard(props: Post) {

  return (
    <div className="block p-4 m-1 max-w-md max-h-sm min-h-sm bg-zinc-50 rounded-lg border border-gray-600 shadow-md">
      <Image width={400} height={200} src={props.coverImage} alt={props.title} /> 
      <h1 className="mb-2 text-xl text-gray-900">
        <Link href={`/article/${props.postId}`}>{props.title}</Link>
      </h1>
      <i><h3>{props.author}</h3></i>
      <p className=" font-normal">{props.content.slice(0, 100)}...</p>
    </div>
  );
}
