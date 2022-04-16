import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import Head from "../../components/Head";
import Header from "../../components/Header";

import { Task } from "../../types/Task";

type Props = {
  task: Task;
}

const Task = ({ task }: Props) => {
  return (
    <div>
      <Head title={task.title} />

      <Header />

      <main>
        <h1>{task.title}</h1>
        <section>
          <input type="checkbox" checked={task.completed} readOnly />
        </section>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  let res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const tasks: Task[] = await res.json();

  const paths = tasks?.map((task) => ({
    params: {
      id: task.id.toString(),
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

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const task = await res.json();

  return {
    props: {
      task
    },
  }
}

export default Task;