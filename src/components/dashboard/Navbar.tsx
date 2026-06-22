import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";
import { Bell, Search } from "lucide-react";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="flex items-center justify-between gap-3 mb-8">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-4 top-3 text-gray-500"
          size={18}
        />

        <input
          placeholder="Search..."
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

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className="
          w-11
          h-11
          rounded-xl
          bg-[#111118]
          border
          border-white/10
          flex
          items-center
          justify-center
          "
        >
          <Bell size={18} />
        </button>

        <img
          src={
            session?.user?.image ||
            "https://ui-avatars.com/api/?name=User"
          }
          alt="avatar"
          className="
          w-10
          h-10
          md:w-12
          md:h-12
          rounded-full
          border
          border-violet-500
          "
        />

        <div className="hidden lg:block">
          <p className="font-medium text-sm">
            {session?.user?.name}
          </p>

          <p className="text-xs text-gray-500">
            {session?.user?.email}
          </p>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}