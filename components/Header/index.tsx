import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/posts">Posts</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}

export default Header;