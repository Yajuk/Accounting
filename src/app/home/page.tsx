const Home = async () => {
  // genrate tiles with links to different pages  using tailwind css and mui
  return (
    <div className="grid grid-cols-2 gap-4">
      <a href="/chat" className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Accounts</h2>
      </a>
      <a href="/transactions" className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold">Transactions</h2>
      </a>
    </div>
  );
  return <div>Home Page </div>;
};

export default Home;
