export const templates = [
  {
    id: "auth",
    title: "Safe Password Handling",
    filename: "lib/auth.js",
    attack: "Stolen database leaks that expose plain-text passwords.",
    description:
      "Never store raw passwords. Hash them with bcrypt using a strong cost factor.",
    code: String.raw`import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}`,
  },
  {
    id: "encryption",
    title: "Encrypted Data Storage",
    filename: "lib/crypto.js",
    attack:
      "Attackers reading sensitive data (like NID numbers) straight from the database.",
    description:
      "AES-256-GCM encrypts data and detects tampering. Keep the key in an environment variable.",
    code: String.raw`import crypto from "crypto";

const KEY = Buffer.from(process.env.DATA_KEY, "hex"); // 32 bytes

export function encrypt(text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, enc].map((b) => b.toString("base64")).join(".");
}

export function decrypt(payload) {
  const [iv, tag, enc] = payload.split(".").map((p) => Buffer.from(p, "base64"));
  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}`,
  },
  {
    id: "validation",
    title: "Strict API Validation",
    filename: "app/api/transfer/route.js",
    attack: "Injection attacks and malformed or malicious request data.",
    description:
      "Validate every request body on the server and reject anything unexpected.",
    code: String.raw`import { z } from "zod";

const TransferSchema = z.object({
  to: z.string().regex(/^01[3-9]\d{8}$/),
  amount: z.number().positive().max(50000),
  note: z.string().max(100).optional(),
});

export async function POST(req) {
  const parsed = TransferSchema.safeParse(await req.json());
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  // parsed.data is now safe to use
  return Response.json({ ok: true });
}`,
  },
];
