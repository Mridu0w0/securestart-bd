import Link from "next/link";

const links = [
  ["/templates", "Templates"],
  ["/checklist", "Checklist"],
  ["/link-checker", "Link checker"],
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <p className="caption-2 text-neutral-600">
          SecureStart BD, a demo security starter kit.
        </p>
        <ul className="flex flex-wrap gap-6">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="caption-2 text-neutral-600 transition-colors duration-300 ease-base hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
