import { getAllReviews } from "@/lib/reviews";
import ReviewCard from "@/components/ReviewCard";
import Link from "next/link";

export default function Home() {
  const reviews = getAllReviews();
  const latestReview = reviews[0];

  const featuredQuotes = [
    { text: "Wait until you use the fucking handsoap.", source: "Kid Dream", slug: "kid-dream" },
  ];
  const quote = featuredQuotes[0];

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="font-pixel text-2xl text-brown sm:text-4xl">
          Jon&apos;s Johns
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-foreground/60 italic">
          The unofficial guide to the most overlooked rooms.
        </p>
      </section>

      {/* Featured Quote */}
      {quote && (
        <section className="mx-auto max-w-2xl px-6 pb-12">
          <Link href={`/reviews/${quote.slug}`} className="block group">
            <blockquote className="rounded-2xl border border-brown/10 bg-cream p-8 text-center transition-shadow group-hover:shadow-md">
              <p className="font-display text-xl text-brown italic">
                &ldquo;{quote.text}&rdquo;
              </p>
              <cite className="mt-3 block text-sm text-foreground/40 not-italic">
                &mdash; {quote.source}
              </cite>
            </blockquote>
          </Link>
        </section>
      )}

      {/* Recent Reviews */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="mb-8 font-display text-2xl text-brown">Recent Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-foreground/50 text-center py-12">
            No reviews yet. The first flush is coming soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
