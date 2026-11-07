const SUSPICIOUS_TLDS = [
  "xyz",
  "top",
  "click",
  "work",
  "zip",
  "gq",
  "tk",
  "ml",
];
const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "t.co",
  "is.gd",
  "cutt.ly",
  "rb.gy",
];
const BRANDS = {
  bkash: "bkash.com",
  nagad: "nagad.com.bd",
  dutchbangla: "dutchbanglabank.com",
};

export function checkLink(input) {
  let url;
  try {
    url = new URL(input.trim());
  } catch {
    return {
      valid: false,
      error: "Not a valid URL. Include http:// or https://",
    };
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    return { valid: false, error: "Only http and https links can be checked." };
  }

  const host = url.hostname.toLowerCase();
  const reasons = [];
  let score = 0;
  const add = (points, text) => {
    score += points;
    reasons.push(text);
  };

  if (url.protocol === "http:") add(20, "Connection is not encrypted (HTTP).");
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host))
    add(30, "Uses a raw IP address instead of a domain name.");

  const tld = host.split(".").pop();
  if (SUSPICIOUS_TLDS.includes(tld))
    add(15, `Uncommon domain ending ".${tld}" is often used in scams.`);
  if (url.username || url.password)
    add(
      25,
      "Contains login details in the URL, a common trick to hide the real site.",
    );
  if (host.includes("xn--"))
    add(25, "Uses lookalike (punycode) characters in the domain.");
  if (host.split(".").length > 4)
    add(10, "Has an unusually high number of subdomains.");
  if (SHORTENERS.includes(host))
    add(15, "Shortened link hides the real destination.");

  for (const [brand, official] of Object.entries(BRANDS)) {
    if (
      host.includes(brand) &&
      host !== official &&
      !host.endsWith("." + official)
    ) {
      add(
        40,
        `Mentions "${brand}" but is not the official domain (${official}).`,
      );
    }
  }

  if (
    /(login|verify|otp|update|secure|password)/i.test(url.pathname + url.search)
  ) {
    add(10, "Asks for sensitive actions (login, OTP, verify, password).");
  }
  if (input.length > 100) add(5, "Unusually long URL.");

  score = Math.min(score, 100);
  const level = score >= 50 ? "high" : score >= 20 ? "medium" : "low";
  return { valid: true, host, score, level, reasons };
}
