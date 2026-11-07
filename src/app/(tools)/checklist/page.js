"use client";
import { useState } from "react";
import { items, calculateScore } from "@/lib/checklist";

export default function ChecklistPage() {
  const [checked, setChecked] = useState([]);
  const [link, setLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const score = calculateScore(checked);
  const bar =
    score >= 80
      ? "bg-emerald-600"
      : score >= 50
        ? "bg-amber-500"
        : "bg-red-600";
  const missing = items.filter((i) => !checked.includes(i.id));

  const toggle = (id) =>
    setChecked((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id],
    );

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save report.");
      setLink(`${window.location.origin}/report/${data.id}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Security Checklist</h1>

      <div className="space-y-2 card p-5">
        <div className="flex justify-between font-semibold">
          <span>Your security score</span>
          <span>{score}/100</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full transition-all ${bar}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border bg-white p-3 hover:bg-slate-50">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={checked.includes(i.id)}
                onChange={() => toggle(i.id)}
              />
              <span>{i.label}</span>
            </label>
          </li>
        ))}
      </ul>

      {missing.length > 0 && checked.length > 0 && (
        <div className="rounded-xl bg-amber-50 p-4 text-sm">
          <h2 className="mb-2 font-semibold">Fix next</h2>
          <ul className="list-disc space-y-1 pl-5">
            {missing.slice(0, 3).map((i) => (
              <li key={i.id}>{i.tip}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={save}
        disabled={saving || checked.length === 0}
        className="rounded-lg bg-emerald-700 px-4 py-2 text-white disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save & share report"}
      </button>

      {error && <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>}
      {link && (
        <p className="rounded bg-emerald-50 p-3 text-sm">
          Shareable link:{" "}
          <a className="break-all font-mono underline" href={link}>
            {link}
          </a>
        </p>
      )}
    </div>
  );
}
