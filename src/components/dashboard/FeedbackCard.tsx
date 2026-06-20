export default function FeedbackCard() {
  return (
    <div className="border rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold">
        AI Feedback
      </h2>

      <ul className="mt-4 space-y-2">
        <li>✓ Strong MERN stack skills</li>
        <li>✓ Good project experience</li>
        <li>⚠ Add Docker experience</li>
        <li>⚠ Add AWS deployment skills</li>
      </ul>
    </div>
  );
}