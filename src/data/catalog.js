import products from './products.json';

export const PRICE_FILTERS = [
  { value: 'all', label: 'All prices' },
  { value: 'under-75', label: 'Under $75' },
  { value: '75-150', label: '$75 to $150' },
  { value: '150-250', label: '$150 to $250' },
  { value: '250-plus', label: '$250 and up' },
];

export const RATING_FILTERS = [
  { value: 'all', label: 'All ratings' },
  { value: '4-up', label: '4.0 and up' },
  { value: '4.5-up', label: '4.5 and up' },
];

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Most popular' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Top rated' },
];

const CATEGORY_META = {
  Cooktops: {
    title: 'Statement cooktops',
    description: 'Heat sources designed to look calm on open counters.',
  },
  Cookware: {
    title: 'Cookware with presence',
    description: 'Everyday pans and pots that reward daily use.',
  },
  Appliances: {
    title: 'Small appliances, refined',
    description: 'Countertop tools built to stay out, not hide away.',
  },
  Storage: {
    title: 'Organized without clutter',
    description: 'Pantry systems with quiet shapes and durable finishes.',
  },
  Tools: {
    title: 'Prep tools worth keeping',
    description: 'Essential tools with tactile materials and balanced form.',
  },
  Dining: {
    title: 'Serve with ease',
    description: 'Hosting pieces that feel polished on any table.',
  },
  Accessories: {
    title: 'Soft goods, sharp finish',
    description: 'Textiles and tabletop details with a calm, premium feel.',
  },
};

const REVIEWERS = [
  {
    name: 'Amelia Parker',
    role: 'Open kitchen owner',
    avatar: 'AP',
    body:
      'The material quality feels intentional and the finish is much calmer in person than most mass-market options.',
  },
  {
    name: 'Jordan Lee',
    role: 'Weekend host',
    avatar: 'JL',
    body:
      'It arrived ready to use, photographs beautifully on the counter, and has held up well through regular use.',
  },
  {
    name: 'Nina Coleman',
    role: 'Daily cook',
    avatar: 'NC',
    body:
      'It solves the job cleanly without adding visual noise, which is exactly what I wanted for this kitchen refresh.',
  },
];

export const catalog = products;
export const featuredProducts = products.filter((product) => product.featured);
export const categories = [...new Set(products.map((product) => product.category))].map(
  (category) => {
    const anchorProduct = products.find((product) => product.category === category);

    return {
      name: category,
      image: anchorProduct?.images[0],
      ...CATEGORY_META[category],
    };
  },
);

function matchesPrice(price, filter) {
  switch (filter) {
    case 'under-75':
      return price < 75;
    case '75-150':
      return price >= 75 && price <= 150;
    case '150-250':
      return price > 150 && price <= 250;
    case '250-plus':
      return price > 250;
    default:
      return true;
  }
}

function matchesRating(rating, filter) {
  switch (filter) {
    case '4-up':
      return rating >= 4;
    case '4.5-up':
      return rating >= 4.5;
    default:
      return true;
  }
}

export function getProductBySlug(slug) {
  return catalog.find((product) => product.slug === slug);
}

export function getDefaultVariantSelection(product) {
  return product.variantGroups.reduce((selection, group) => {
    selection[group.name] = group.options[0];
    return selection;
  }, {});
}

export function filterProducts({
  query = '',
  category = 'all',
  price = 'all',
  rating = 'all',
  sort = 'featured',
}) {
  const normalizedQuery = query.trim().toLowerCase();

  const items = catalog.filter((product) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.highlights.join(' ').toLowerCase().includes(normalizedQuery);
    const matchesCategory = category === 'all' || product.category === category;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesPrice(product.price, price) &&
      matchesRating(product.rating, rating)
    );
  });

  return items.sort((left, right) => {
    switch (sort) {
      case 'popular':
        return right.reviewCount - left.reviewCount;
      case 'price-asc':
        return left.price - right.price;
      case 'price-desc':
        return right.price - left.price;
      case 'rating-desc':
        return right.rating - left.rating;
      default:
        if (left.featured === right.featured) {
          return right.rating - left.rating;
        }

        return Number(right.featured) - Number(left.featured);
    }
  });
}

export function getRelatedProducts(product, limit = 4) {
  const sameCategory = catalog.filter(
    (candidate) => candidate.category === product.category && candidate.slug !== product.slug,
  );
  const fallback = catalog.filter((candidate) => candidate.slug !== product.slug);

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function getProductReviews(product) {
  return REVIEWERS.map((review, index) => ({
    ...review,
    rating: Math.max(4, Math.round(product.rating - (index === 2 ? 0.4 : 0))),
    date: ['March 2026', 'February 2026', 'January 2026'][index],
    body: `${review.body} ${product.name} especially stands out for its ${product.highlights[
      index
    ].toLowerCase()}.`,
  }));
}
