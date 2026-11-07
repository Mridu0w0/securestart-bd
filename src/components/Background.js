export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="drift-a absolute -left-24 -top-24 size-96 rounded-full bg-emerald-200/60 blur-3xl" />
      <div className="drift-b absolute -right-24 top-1/4 size-[28rem] rounded-full bg-sky-200/50 blur-3xl" />
      <div className="drift-c absolute -bottom-24 left-1/3 size-96 rounded-full bg-emerald-100/70 blur-3xl" />
    </div>
  );
}
