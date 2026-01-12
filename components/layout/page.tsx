import Link from "next/link"
import Image from "next/image"
import ButtonOut from "../buttonOut/page";

interface UserHeaderProps {
  userName: string | undefined | null,
  userImage: string | null
}

export function UserHeader({ userName, userImage }: UserHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="font-bold text-lg text-slate-900">
            App
          </Link>

          {/* User Info and Logout */}
          <div className="flex items-center gap-4">
            {/* User Profile Section */}
            <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
              {/* User Image */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100">
                <Image src={userImage || "/placeholder.svg"} alt="" fill className="object-cover" priority />
              </div>
              {/* User Name */}
              <span className="text-sm font-medium text-slate-900 hidden sm:inline">{userName}</span>
            </div>

            {/* Logout Button */}
            <ButtonOut/>
           
          </div>
        </div>
      </div>
    </header>
  )
}
