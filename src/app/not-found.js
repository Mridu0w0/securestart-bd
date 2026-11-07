import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start gap-6 px-4 pb-20 pt-24">
      <p className="caption-4 font-mono text-emerald-800">404</p>
      <h1 className="heading-3">This page does not exist</h1>
      <p className="body-3 text-neutral-600">
        The link may be wrong, or the report you opened was never saved. Check
        the address or go back to the start.
      </p>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
    </div>
  );
}
