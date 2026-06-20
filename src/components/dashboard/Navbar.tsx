import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import {
  Bell,
  Search,
} from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Search */}

      <div className="relative w-full max-w-md">
        <Search
          className="absolute left-4 top-3 text-gray-500"
          size={18}
        />

        <input
          placeholder="Search analyses..."
          className="
          w-full
          rounded-xl
          bg-[#111118]
          border
          border-white/10
          py-3
          pl-11
          pr-4
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-violet-500
          "
        />
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">
        <button
          className="
          w-12
          h-12
          rounded-xl
          bg-[#111118]
          border
          border-white/10
          flex
          items-center
          justify-center
          "
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <img
            src={
              session?.user?.image ||
              "https://ui-avatars.com/api/?name=User"
            }
            alt="avatar"
            className="
            w-12
            h-12
            rounded-full
            border
            border-violet-500
            "
          />

          <div>
            <p className="font-medium">
              {session?.user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {session?.user?.email}
            </p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}