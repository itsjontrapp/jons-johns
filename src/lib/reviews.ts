import fs from "fs";
import path from "path";
import matter from "gray-matter";

const reviewsDirectory = path.join(process.cwd(), "content/reviews");

export interface ReviewRatings {
  vibe: number;
  ambiance: number;
  music: number;
  cleanliness: number;
  scent: number;
  soapAndAmenities: number;
  dryingSituation: number;
  designAndLayout: number;
  stockedAndSupplied: number;
}

export interface SpotlightRating {
  label: string;
  score: number;
  description: string;
}

export interface ReviewMeta {
  slug: string;
  title: string;
  date: string;
  address: string;
  thumbnail: string;
  excerpt: string;
  overall: number;
  ratings: ReviewRatings;
  spotlight?: SpotlightRating;
  tags: string[];
  website?: string;
  logo?: string;
}

export interface Review extends ReviewMeta {
  content: string;
}

export function getAllReviewSlugs(): string[] {
  if (!fs.existsSync(reviewsDirectory)) return [];
  return fs
    .readdirSync(reviewsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getReviewBySlug(slug: string): Review {
  const fullPath = path.join(reviewsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    address: data.address,
    thumbnail: data.thumbnail || "",
    excerpt: data.excerpt,
    overall: data.overall,
    ratings: data.ratings,
    spotlight: data.spotlight || undefined,
    tags: data.tags || [],
    website: data.website || undefined,
    logo: data.logo || undefined,
    content,
  };
}

export function getAllReviews(): ReviewMeta[] {
  const slugs = getAllReviewSlugs();
  const reviews = slugs
    .map((slug) => {
      const review = getReviewBySlug(slug);
      const { content, ...meta } = review;
      return meta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return reviews;
}

export const RATING_LABELS: Record<keyof ReviewRatings, string> = {
  vibe: "Vibe",
  ambiance: "Ambiance & Lighting",
  music: "Music",
  cleanliness: "Cleanliness",
  scent: "Scent",
  soapAndAmenities: "Soap & Amenities",
  dryingSituation: "Drying Situation",
  designAndLayout: "Design & Layout",
  stockedAndSupplied: "Stocked & Supplied",
};
