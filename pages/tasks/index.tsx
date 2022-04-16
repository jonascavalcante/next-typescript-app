import Link from "next/link";

import Head from "../../components/Head";
import Header from "../../components/Header";

import { Task } from "../../types/Task";

type Props = {
  title: string;
  tasks: Task[];
}

const Tasks = ({ title, tasks }: Props) => {
  return (
    <div>
      <Head title={title} />

      <Header />

      <main>
        <h1>{title}</h1>
        <section>
          {tasks?.map(({ id, title, completed }) => (
            <div key={id}>
              <h3>{title}</h3>
              <input type="checkbox" checked={completed} readOnly />
              <Link href={`/tasks/${id}`}>Go to Task</Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {

  let res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const tasks: Task[] = await res.json();

  return {
    props: {
      title: 'Tasks',
      tasks
    },
  }
}

export default Tasks;