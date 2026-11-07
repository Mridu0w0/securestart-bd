import { z } from "zod";
import { db } from "@/lib/firebaseAdmin";
import { items, calculateScore } from "@/lib/checklist";

const ids = items.map((i) => i.id);
const Schema = z.object({ checked: z.array(z.enum(ids)).max(ids.length) });

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid checklist data." }, { status: 400 });
  }

  try {
    const checked = [...new Set(parsed.data.checked)];
    const score = calculateScore(checked);
    const doc = await db
      .collection("reports")
      .add({ checked, score, createdAt: new Date() });
    return Response.json({ id: doc.id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return Response.json(
      { error: "Could not save report right now." },
      { status: 500 },
    );
  }
}
