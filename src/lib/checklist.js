export const items = [
  {
    id: "hash",
    label: "Passwords are hashed (bcrypt/argon2)",
    weight: 15,
    tip: "Use the Safe Password Handling template.",
  },
  {
    id: "https",
    label: "HTTPS is enforced everywhere",
    weight: 10,
    tip: "Redirect all HTTP traffic to HTTPS.",
  },
  {
    id: "validate",
    label: "All API inputs are validated on the server",
    weight: 15,
    tip: "Use a schema library like Zod.",
  },
  {
    id: "secrets",
    label: "Secrets are in environment variables, not code",
    weight: 15,
    tip: "Never commit .env files or API keys.",
  },
  {
    id: "2fa",
    label: "2FA/OTP protects sensitive actions",
    weight: 10,
    tip: "Require a second factor for payments and password changes.",
  },
  {
    id: "rate",
    label: "Login and OTP endpoints are rate limited",
    weight: 10,
    tip: "Block brute-force attempts after a few failures.",
  },
  {
    id: "encrypt",
    label: "Sensitive data is encrypted at rest",
    weight: 15,
    tip: "Use the Encrypted Data Storage template.",
  },
  {
    id: "deps",
    label: "Dependencies are audited regularly",
    weight: 10,
    tip: "Run npm audit and update packages.",
  },
];

export function calculateScore(checkedIds) {
  return items
    .filter((i) => checkedIds.includes(i.id))
    .reduce((sum, i) => sum + i.weight, 0);
}
