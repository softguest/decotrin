import { auth, signOut } from "@/auth";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import SignOut from "./SignOut";
import SearchBar from "./SearchBar";

export default async function Navbar() {

  const session = await auth();

  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm px-4 py-3 flex items-center justify-between md:pl-4">
      <div className="flex items-center space-x-2">
        <Link href="/dashboard">
          <h1 className="text-3xl font-semibold">DECO<span className="text-indigo-700">TRIN</span></h1>
        </Link>
        <SearchBar />
      </div>
      <div className="space-x-2 flex items-center">
        {/* Placeholder for user profile, notifications etc. */}
        <span className="text-[12px] md:text-sm text-gray-600 md:ml-16">
          Hi {session?.user?.name}
        </span>
        <div className="flex items-center space-x-2">
          <Link href="/profile">
            <UserCircle size={30} />
          </Link>
          <SignOut />
        </div>
      </div>
    </header>
  )
}
