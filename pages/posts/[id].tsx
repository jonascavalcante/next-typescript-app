import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import Head from "../../components/Head";
import Header from "../../components/Header";

import { Post } from "../../types/Post";

type Props = {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <div>
      <Head title={post.title} />

      <Header />

      <main>
        <h1>{post.title}</h1>
        <section>
          <p>{post.body}</p>
        </section>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  let res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts: Post[] = await res.json();

  const paths = posts?.map((post) => ({
    params: {
      id: post.id.toString(),
    }
  }));

  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {

  const { id } = context.params as IParams;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post
    },
    revalidate: 60
    //tempo em segundos em que os dados estarão em cache até a proxima requisição
  }
}

export default Post;