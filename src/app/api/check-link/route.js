import { z } from "zod";
import { checkLink } from "@/lib/linkCheck";

const Schema = z.object({ url: z.string().trim().min(1).max(2048) });

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "A 'url' string (max 2048 characters) is required." },
      { status: 400 },
    );
  }

  const result = checkLink(parsed.data.url);
  if (!result.valid)
    return Response.json({ error: result.error }, { status: 422 });
  return Response.json(result);
}
