interface RatingBarProps {
  label: string;
  score: number;
}

export default function RatingBar({ label, score }: RatingBarProps) {
  const percentage = (score / 10) * 100;

  const barColor =
    score >= 8 ? "bg-teal" :
    score >= 5 ? "bg-gold" :
    "bg-brown";

  return (
    <div className="flex items-center gap-3">
      <span className="w-40 shrink-0 text-sm font-medium text-foreground/80">{label}</span>
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-brown/15">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right text-sm font-display text-foreground/70">{score}</span>
    </div>
  );
}
