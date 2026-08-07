import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <Link
        href="/sign-in"
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Sign In
      </Link>

      <Link
        href="/sign-up"
        className="rounded-lg border px-5 py-3"
      >
        Sign Up
      </Link>
    </div>
  );
}