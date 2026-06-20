import Link from "next/link";
async function getHistory() {
  const res = await fetch("http://localhost:3000/api/history", {
    cache: "no-store",
  });

  return res.json();
}

export default async function HistoryPage() {
  const data = await getHistory();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Analysis History</h1>

      {data.map((item: any) => (
        <div key={item._id} className="border rounded-xl p-4 mb-4">
          <h2 className="text-xl font-bold">ATS Score: {item.atsScore}</h2>

          <p className="text-gray-400">
            {new Date(item.createdAt).toLocaleString()}
          </p>

          <Link
            href={`/analysis/${item._id}`}
            className="text-blue-500 mt-2 inline-block"
          >
            View Full Report →
          </Link>
        </div>
      ))}
    </div>
  );
}
