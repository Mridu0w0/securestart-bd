export const metadata = { title: "Privacy | SecureStart BD" };

export default function Privacy() {
  return (
    <article className="flex max-w-[680px] flex-col gap-4">
      <h1 className="heading-3">Privacy</h1>
      <p className="body-3 text-neutral-600">
        SecureStart BD has no accounts. Links you paste into the link checker
        are analysed on the server and are not saved by the app. Checklist
        answers stay in your browser until you press save. A saved report stores
        the items you ticked, your score and when it was created, and anyone
        with the report link can open it.
      </p>
      <p className="body-3 text-neutral-600">
        Our hosting provider may keep standard server logs. Contact:{" "}
        {"{{contact email}}"}
      </p>
    </article>
  );
}
