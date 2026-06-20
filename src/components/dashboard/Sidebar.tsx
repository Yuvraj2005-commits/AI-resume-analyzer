import {
  LayoutDashboard,
  FileText,
  History,
  User,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-5">
      <h1 className="text-2xl font-bold mb-8">
        ResumeAI
      </h1>

      <nav className="space-y-4">
        <div className="flex gap-2">
          <LayoutDashboard size={20} />
          Dashboard
        </div>

        <div className="flex gap-2">
          <FileText size={20} />
          Analyze
        </div>

        <div className="flex gap-2">
          <History size={20} />
          History
        </div>

        <div className="flex gap-2">
          <User size={20} />
          Profile
        </div>
      </nav>
    </div>
  );
}