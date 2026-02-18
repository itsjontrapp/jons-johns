interface RatingBadgeProps {
  score: number;
  size?: "sm" | "lg";
}

export default function RatingBadge({ score, size = "sm" }: RatingBadgeProps) {
  const bgColor =
    score >= 8 ? "bg-teal text-cream" :
    score >= 5 ? "bg-gold text-cream" :
    "bg-brown text-cream";

  const dimensions = size === "lg" ? "h-20 w-20 text-3xl" : "h-10 w-10 text-base";

  return (
    <div className={`${bgColor} ${dimensions} flex items-center justify-center rounded-full font-display font-bold shadow-md`}>
      {score}
    </div>
  );
}
