import { notFound } from "next/navigation";
import { db } from "@/lib/firebaseAdmin";
import { items } from "@/lib/checklist";

export default async function ReportPage({ params }) {
  const { id } = await params;
  const snap = await db.collection("reports").doc(id).get();
  if (!snap.exists) notFound();
  const { checked, score } = snap.data();

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-2xl font-bold">Security Report</h1>
      <p className="text-4xl font-bold text-emerald-700">{score}/100</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.id} className="flex gap-2 rounded-lg border bg-white p-3">
            <span>{checked.includes(i.id) ? "✅" : "❌"}</span>
            <span>{i.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
