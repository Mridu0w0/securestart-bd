"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "@phosphor-icons/react";

const links = [
  ["/", "Home"],
  ["/templates", "Templates"],
  ["/checklist", "Checklist"],
  ["/link-checker", "Link checker"],
];

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isCurrent = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="fixed left-1/2 top-4 z-50 w-max max-w-[calc(100%-2rem)] -translate-x-1/2">
        <nav
          aria-label="Main"
          className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-2 backdrop-blur-md"
        >
          <Link
            href="/"
            className={`title-4 flex items-center gap-2 rounded-lg px-3 py-2 text-emerald-800 ${focus}`}
          >
            <ShieldCheck size={20} weight="bold" aria-hidden="true" />
            SecureStart BD
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isCurrent(href) ? "page" : undefined}
                  className={`title-4 block rounded-lg px-3 py-2 text-neutral-600 transition-[background-color,color,transform] duration-300 ease-base hover:bg-neutral-100 active:scale-[0.98] aria-[current=page]:bg-neutral-100 aria-[current=page]:text-emerald-800 ${focus}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`rounded-lg p-3 transition-[background-color,transform] duration-300 ease-base hover:bg-neutral-100 active:scale-[0.98] md:hidden ${focus}`}
          >
            <span className="relative block h-4 w-4">
              <span
                className={`absolute left-0 top-1 h-0.5 w-4 bg-neutral-900 transition-transform duration-500 ease-base ${
                  open ? "translate-y-1 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 bg-neutral-900 transition-transform duration-500 ease-base ${
                  open ? "-translate-y-1 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-white/90 px-6 pt-24 backdrop-blur-xl transition-opacity duration-500 ease-base md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {links.map(([href, label], i) => (
            <li
              key={href}
              style={{
                transitionDelay: open ? `${Math.min(i * 60, 400)}ms` : "0ms",
              }}
              className={`transition-[opacity,transform] duration-500 ease-base motion-reduce:translate-y-0 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href={href}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(href) ? "page" : undefined}
                className={`title-1 block rounded-lg px-3 py-3 text-neutral-700 aria-[current=page]:bg-neutral-100 aria-[current=page]:text-emerald-800 ${focus}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
