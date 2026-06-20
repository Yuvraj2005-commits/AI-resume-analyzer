export default function ScoreCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="border rounded-xl p-6">
      <h2 className="text-gray-500">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-2">
        {value}
      </h1>
    </div>
  );
}