import Link from "next/link";
import RatingBadge from "./RatingBadge";
import { ReviewMeta } from "@/lib/reviews";

interface ReviewCardProps {
  review: ReviewMeta;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group block overflow-hidden rounded-2xl border border-brown/10 bg-cream shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      {review.thumbnail && (
        <div className="aspect-[16/10] overflow-hidden bg-brown/10">
          <img
            src={review.thumbnail}
            alt={review.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      {!review.thumbnail && (
        <div className="flex aspect-[16/10] items-center justify-center bg-brown/10">
          <span className="font-display text-4xl text-brown/30">JJ</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg text-brown group-hover:text-teal transition-colors">
              {review.title}
            </h3>
            <p className="mt-1 text-xs text-foreground/50">{review.address}</p>
          </div>
          <RatingBadge score={review.overall} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/60 line-clamp-2">
          {review.excerpt}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
