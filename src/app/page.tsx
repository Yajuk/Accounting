import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-2 gap-4">
        <Link href="/chat" className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Chat</h2>
        </Link>
        <Link href="/transactions" className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Transactions</h2>
        </Link>
      </div>
    </main>
  );
}
