import Head from "../Head";

import Header from "../Header";

type Props = {
  title: string;
}

const About = ({ title }: Props) => {
  return (
    <div>
      <Head title={title} />

      <Header />

      <main>
        <h1>{title}</h1>
      </main>
    </div>
  );
}

export default About;