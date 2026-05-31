export function PriorityBadge({ value }) {
  const styles = {
    Alta: "border-red-200 bg-red-50 text-red-700",
    Media: "border-yellow-200 bg-yellow-50 text-yellow-700",
    Baja: "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[value] || "border-slate-200 bg-slate-50 text-slate-700"
      }`}
    >
      {value}
    </span>
  );
}