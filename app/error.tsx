"use client";
import Link from "next/link";

export default function Error({ message }: { message?: string }) {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Something went wrong</h1>
      <p>{message || "An unexpected error occurred. Please try again later."}</p>
      <Link href="/" passHref>
        <button style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>Go Back Home</button>
      </Link>
    </div>
  );
}
