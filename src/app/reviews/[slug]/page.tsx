import { getAllReviewSlugs, getReviewBySlug, RATING_LABELS, type ReviewRatings } from "@/lib/reviews";
import { MDXRemote } from "next-mdx-remote/rsc";
import RatingBar from "@/components/RatingBar";
import RatingBadge from "@/components/RatingBadge";
import Image from "next/image";

export function generateStaticParams() {
  return getAllReviewSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  return {
    title: `${review.title} | Jon's Johns`,
    description: review.excerpt,
  };
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl text-brown">{review.title}</h1>
          <p className="mt-2 text-sm text-foreground/50">{review.address}</p>
          <p className="mt-1 text-sm text-foreground/40">
            Visited {new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          {review.website && (
            <a
              href={review.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-teal hover:underline"
            >
              {review.logo && (
                <Image
                  src={review.logo}
                  alt={`${review.title} logo`}
                  width={20}
                  height={20}
                  className="rounded-sm"
                />
              )}
              Visit {review.title} &rarr;
            </a>
          )}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {review.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <RatingBadge score={review.overall} size="lg" />
      </div>

      {/* Spotlight - unique standout category */}
      {review.spotlight && (
        <div className="mb-10 rounded-2xl border-2 border-gold/30 bg-gold/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">Spotlight</p>
              <p className="mt-1 font-display text-xl text-brown">{review.spotlight.label}</p>
              <p className="mt-1 text-sm text-foreground/60">{review.spotlight.description}</p>
            </div>
            <RatingBadge score={review.spotlight.score} />
          </div>
        </div>
      )}

      {/* Category Ratings */}
      <div className="mb-10 space-y-3 rounded-2xl border border-brown/10 bg-cream p-6">
        <h2 className="mb-4 font-display text-xl text-brown">The Breakdown</h2>
        {(Object.keys(RATING_LABELS) as (keyof ReviewRatings)[]).map((key) => (
          <RatingBar key={key} label={RATING_LABELS[key]} score={review.ratings[key]} />
        ))}
      </div>

      {/* Blog Content */}
      <div className="prose prose-stone max-w-none prose-headings:font-display prose-headings:text-brown prose-a:text-teal">
        <MDXRemote source={review.content} />
      </div>
    </article>
  );
}
