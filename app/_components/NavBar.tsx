
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";

export default function NavBar() {
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.auth.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Blogs", href: "/" },
    { name: "My Blogs", href: "/my-blogs" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-white">
            B
          </span>
          BlogSpace
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors duration-200
                  after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:bg-blue-900 after:transition-all after:duration-200
                  ${
                    isActive
                      ? "text-blue-950 after:w-full"
                      : "text-slate-500 hover:text-blue-950 after:w-0 hover:after:w-full"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {mounted && (
            <>
              {user ? (
                <Link
                  href="/auth/user-info"
                  className="rounded-lg bg-pink-700 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-pink-500 hover:shadow-md active:scale-95"
                >
                  {user.name}
                </Link>
                
              ) : (
                <Link
                  href="/auth/login"
                  className="rounded-lg border border-blue-950 px-4 py-2 font-semibold text-blue-950 transition hover:bg-blue-950 hover:text-white"
                >
                  Login
                </Link>
              )}

              {user && (
                <Link
                  href="/my-blogs/create"
                  className="rounded-lg bg-blue-950 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-800 hover:shadow-md active:scale-95"
                >
                  + New Post
                </Link>
              )}
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
