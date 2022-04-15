import { useRouter } from "next/router";

import Home from "../components/Home";
import About from "../components/About";

const Layout = () => {

  const router = useRouter();
  const { slug } = router.query;

  switch (slug) {
    case undefined:
      return <Home title="Home" />

    case 'about':
      return <About title="About" />

    default:
      return <Home title="Default" />
  }
}

export default Layout;