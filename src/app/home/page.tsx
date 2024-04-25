import Link from "next/link";
const Home = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link
        href="/chat"
        className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
      >
        <h2 className="text-xl font-semibold">Accounts</h2>
      </Link>
      <Link
        href="/transactions"
        className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
      >
        <h2 className="text-xl font-semibold">Transactions</h2>
      </Link>
    </div>
  );
};

export default Home;
