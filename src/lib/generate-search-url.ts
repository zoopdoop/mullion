export type SearchEngine = "google";

const httpRegex = /^https?:\/\//i;
const isDomainish = /[^.]\.[^.]{2,}/;

export const generateSearchUrl = (engine: SearchEngine, query?: string): string => {
  query = (query || "").trim();

  if (httpRegex.test(query)) {
    return query;
  }
  if (isDomainish.test(query)) {
    return `http://${query}`;
  }

  const encodedQuery = encodeURIComponent(query);
  switch (engine) {
    case "google":
    default:
      return `https://www.google.com/search?channel=mullion&q=${encodedQuery}`;
  }
};
