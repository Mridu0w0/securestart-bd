"use client";
import { useState } from "react";

const samples = [
  "https://www.bkash.com",
  "http://bkash-verify-account.xyz/login?otp=1",
];
const styles = {
  low: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-red-100 text-red-800",
};

export default function LinkChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function check(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/check-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold">Fake Link Checker</h1>
      <p className="text-slate-600">
        Paste a link you received by SMS, email or social media.
      </p>

      <form onSubmit={check} className="flex flex-col gap-2 sm:flex-row">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="flex-1 rounded-lg border bg-white px-3 py-2"
          aria-label="URL to check"
        />
        <button
          disabled={loading || !url.trim()}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check link"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 text-xs">
        {samples.map((s) => (
          <button
            key={s}
            onClick={() => setUrl(s)}
            className="rounded-full border bg-white px-3 py-1 hover:bg-slate-100"
          >
            Try: {s}
          </button>
        ))}
      </div>

      {error && <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>}

      {result && (
        <div className="space-y-3 card p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm">{result.host}</span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${styles[result.level]}`}
            >
              {result.level.toUpperCase()} RISK ({result.score}/100)
            </span>
          </div>
          {result.reasons.length ? (
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {result.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm">No red flags found by our checks.</p>
          )}
          <p className="text-xs text-slate-500">
            This is a heuristic check, not a guarantee. When in doubt,
            don&apos;t enter OTPs or passwords.
          </p>
        </div>
      )}
    </div>
  );
}
