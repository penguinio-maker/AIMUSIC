type StatCardProps = {
  label: string;
  value: string;
  detail: string;
};

export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <article className="glass rounded-[26px] p-5">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-white/40">{label}</p>
      <strong className="mt-4 block text-3xl font-black text-white">{value}</strong>
      <p className="mt-2 text-sm text-white/50">{detail}</p>
    </article>
  );
}
