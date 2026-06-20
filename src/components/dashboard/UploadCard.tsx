export default function UploadCard() {
  return (
    <div className="border rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold">
        Upload Resume
      </h2>

      <p className="text-gray-500 mt-2">
        Upload your resume and get AI ATS analysis.
      </p>

      <input
        type="file"
        className="mt-4"
      />

      <button className="bg-black text-white px-4 py-2 rounded-lg mt-4">
        Analyze Resume
      </button>
    </div>
  );
}