import ArticleCard from '@/components/ArticleCard';
import Pagination from '@/components/Pagination';
import Post from '@/models/post';

export const dynamicParams = true;

async function getPosts(id: string) {
  const res = await fetch(
    `https://news-api.lublot.dev/api/posts?_page=${id}&_limit=12`,
    { next: { revalidate: 120 } }
  );
  const data = await res.json();
  return data as Post[];
}

export async function generateStaticParams() {
  return [{id: '1'}, {id: '2'}, {id: '3'}]; //start with some pages
}

export default async function Home({ params }: { params: { id: string } }) {
  const posts = await getPosts(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto"> 
        <div className="grid grid-cols-1 xl:grid-cols-4 sm:grid-cols-3 gap-2">
          {posts.length === 0 ? 
            (<p> Oops! Looks like you&apos;ve seen it all. </p>)
          : (<></>)} 
          {posts.map((post, _ ) => (
            <ArticleCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              published={post.published}
              coverImage={post.coverImage}
              tags={post.tags}
            />
          ))}
        </div>
        <Pagination currentPage={parseInt(params.id)} />
      </div>
    </main>
  );
}
