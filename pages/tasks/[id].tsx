import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";

import Head from "../../components/Head";
import Header from "../../components/Header";

import { Task } from "../../types/Task";

type Props = {
  id: string;
}
interface IQuery extends ParsedUrlQuery {
  id: string;
}

const Task = () => {

  const [task, setTask] = useState<Task>({
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query as IQuery;

  useEffect(() => {
    if (id !== undefined) {
      loadTaks({ id });
    }
  }, [id])

  const loadTaks = async ({ id }: Props) => {
    setLoading(true);
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const task = await res.json();

    setTimeout(() => {
      setTask(task);
      setLoading(false);
    }, 500);
  }

  return (
    (loading)
      ? (
        <div>
          <Head title="Loading" />

          <Header />

          <main>
            <h1>Loading</h1>
          </main>
        </div>
      ) : (
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
      )
  );
}

export default Task;