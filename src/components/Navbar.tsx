import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-white text-2xl font-semibold">Home</Link>
      </div>
    </nav>
  );
}
