import Link from "next/link";

import Head from "../../components/Head";
import Header from "../../components/Header";

import { Post } from "../../types/Post";

type Props = {
  title: string;
  posts: Post[];
}

const Posts = ({ title, posts }: Props) => {
  return (
    <div>
      <Head title={title} />

      <Header />

      <main>
        <h1>{title}</h1>
        <section>
          {posts?.map(({ id, title, body }) => (
            <div key={id}>
              <h3>{title}</h3>
              <p>{body}</p>
              <Link href={`/posts/${id}`}>Go to post</Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {

  let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts: Post[] = await res.json();

  return {
    props: {
      title: 'Posts',
      posts
    },
    revalidate: 60
    //tempo em segundos em que os dados estarão em cache até a proxima requisição
  }
}

export default Posts;