import { getAllReviews } from "@/lib/reviews";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewsPage() {
  const reviews = getAllReviews();

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-10 font-display text-4xl text-brown">All Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-foreground/50 text-center py-12">
          No reviews yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
