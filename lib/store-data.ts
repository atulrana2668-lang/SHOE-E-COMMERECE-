export type Audience = "men" | "women" | "kids";

export type Product = {
  id: string;
  name: string;
  audience: Audience;
  category: string;
  collection: string;
  badge: string;
  story: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  accent: string;
  sizes: string[];
};

export type AudienceCard = {
  audience: Audience;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  accent: string;
};

export type ContactChannel = {
  title: string;
  detail: string;
  note: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

type AudiencePageConfig = {
  eyebrow: string;
  title: string;
  lead: string;
  promoTitle: string;
  promoBody: string;
  visualImage: string;
  visualAlt: string;
  filterChips: string[];
  quickLinks: { label: string; note: string; href: string }[];
  stats: { value: string; label: string }[];
};

export type StoryTile = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type ContactSpotlight = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  chips: string[];
};

export const utilityHighlights = [
  "Free home delivery on orders above Rs 999",
  "Easy 30 day returns and size exchanges",
  "Support available daily from 9 AM to 9 PM"
];

export const audienceCards: AudienceCard[] = [
  {
    audience: "men",
    eyebrow: "Men",
    title: "Sharp everyday pairs and sport-led silhouettes",
    description:
      "Shop workwear, weekend sneakers, and performance pairs with a faster path into the right collection.",
    href: "/men",
    accent: "linear-gradient(135deg, #d99262 0%, #f6d7bf 100%)"
  },
  {
    audience: "women",
    eyebrow: "Women",
    title: "Refined office edits, soft neutrals, and weekend color",
    description:
      "Explore comfort-led sneakers, polished heels, and easy flats in a cleaner, more editorial assortment.",
    href: "/women",
    accent: "linear-gradient(135deg, #d97670 0%, #f8d8db 100%)"
  },
  {
    audience: "kids",
    eyebrow: "Kids",
    title: "School-ready, play-ready, and sized by age",
    description:
      "Browse school staples, play pairs, and toddler styles with clearer entry points for parents shopping quickly.",
    href: "/kids",
    accent: "linear-gradient(135deg, #4c9f97 0%, #d9efe8 100%)"
  }
];

export const products: Product[] = [
  {
    id: "men-aero-flex",
    name: "Aero Flex Runner",
    audience: "men",
    category: "Running",
    collection: "Performance",
    badge: "Best Seller",
    story: "Breathable daily runner with a cushioned midsole for long city miles.",
    price: 5999,
    discountPrice: 4599,
    rating: 4.8,
    reviewCount: 218,
    image:
      "https://images.unsplash.com/photo-1538146888063-3ecf5e002d7c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    accent: "linear-gradient(135deg, #f59e64 0%, #f7d8b6 100%)",
    sizes: ["6", "7", "8", "9", "10", "11"]
  },
  {
    id: "men-oxford-form",
    name: "Oxford Form Leather",
    audience: "men",
    category: "Formals",
    collection: "Work Wear",
    badge: "Office Edit",
    story: "Polished derby profile designed for office rotations and occasion wear.",
    price: 6499,
    discountPrice: 5199,
    rating: 4.7,
    reviewCount: 137,
    image:
      "https://images.unsplash.com/photo-1513882891304-216f3fc9a0be?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
    accent: "linear-gradient(135deg, #635447 0%, #dbd0c4 100%)",
    sizes: ["7", "8", "9", "10", "11"]
  },
  {
    id: "men-weekend-low",
    name: "Weekend Low Sneaker",
    audience: "men",
    category: "Sneakers",
    collection: "Lifestyle",
    badge: "New",
    story: "Minimal low-top with soft lining and an easy neutral palette.",
    price: 4299,
    discountPrice: 3499,
    rating: 4.6,
    reviewCount: 184,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #53657d 0%, #dfe6f1 100%)",
    sizes: ["6", "7", "8", "9", "10", "11"]
  },
  {
    id: "men-summer-slide",
    name: "Summer Slide Ease",
    audience: "men",
    category: "Sandals",
    collection: "Holiday",
    badge: "Easy Wear",
    story: "Lightweight slide built for quick errands, travel, and monsoon comfort.",
    price: 1999,
    discountPrice: 1499,
    rating: 4.5,
    reviewCount: 89,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #516f71 0%, #d6e8e6 100%)",
    sizes: ["6", "7", "8", "9", "10"]
  },
  {
    id: "women-cloud-step",
    name: "Cloud Step Knit",
    audience: "women",
    category: "Sneakers",
    collection: "Lifestyle",
    badge: "Trending",
    story: "Soft knit upper and lightweight comfort for all-day movement.",
    price: 4899,
    discountPrice: 3899,
    rating: 4.9,
    reviewCount: 264,
    image:
      "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #f2a1aa 0%, #ffe1e6 100%)",
    sizes: ["4", "5", "6", "7", "8", "9"]
  },
  {
    id: "women-city-ballet",
    name: "City Ballet Flat",
    audience: "women",
    category: "Flats",
    collection: "365 Closet",
    badge: "Daily Favorite",
    story: "Easy slip-on ballet flat with clean shape and flexible comfort.",
    price: 3199,
    discountPrice: 2599,
    rating: 4.7,
    reviewCount: 151,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #d98e87 0%, #f8d6d2 100%)",
    sizes: ["4", "5", "6", "7", "8"]
  },
  {
    id: "women-dune-heel",
    name: "Dune Block Heel",
    audience: "women",
    category: "Heels",
    collection: "Work Wear",
    badge: "Office Chic",
    story: "Balanced block heel that keeps formal outfits sharp but wearable.",
    price: 5499,
    discountPrice: 4299,
    rating: 4.6,
    reviewCount: 98,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #d09e76 0%, #f5dfca 100%)",
    sizes: ["4", "5", "6", "7", "8"]
  },
  {
    id: "women-bloom-sandal",
    name: "Bloom Strap Sandal",
    audience: "women",
    category: "Sandals",
    collection: "Weekend",
    badge: "New Color",
    story: "Open, airy sandal designed for summer plans and lighter outfits.",
    price: 2799,
    discountPrice: 2199,
    rating: 4.5,
    reviewCount: 112,
    image:
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #f3bd8f 0%, #fff0db 100%)",
    sizes: ["4", "5", "6", "7", "8"]
  },
  {
    id: "kids-sprint-school",
    name: "Sprint School Pro",
    audience: "kids",
    category: "School",
    collection: "Back To School",
    badge: "School Ready",
    story: "Durable school pair with easy grip outsole and wipe-clean finish.",
    price: 2699,
    discountPrice: 2199,
    rating: 4.8,
    reviewCount: 203,
    image:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #4d8eaa 0%, #d8edf8 100%)",
    sizes: ["28", "29", "30", "31", "32", "33"]
  },
  {
    id: "kids-play-pop",
    name: "Play Pop Sneaker",
    audience: "kids",
    category: "Sports",
    collection: "Playground",
    badge: "Active Pick",
    story: "Bright runner with easy hook-and-loop closure for quick wear.",
    price: 2399,
    discountPrice: 1899,
    rating: 4.7,
    reviewCount: 144,
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #74b37a 0%, #ddf4de 100%)",
    sizes: ["25", "26", "27", "28", "29", "30"]
  },
  {
    id: "kids-rainy-splash",
    name: "Rainy Splash Sandal",
    audience: "kids",
    category: "Sandals",
    collection: "Holiday",
    badge: "Monsoon Edit",
    story: "Water-friendly sandal built for outdoor play and easy cleanup.",
    price: 1699,
    discountPrice: 1299,
    rating: 4.5,
    reviewCount: 87,
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #4aa5a0 0%, #d3f2ee 100%)",
    sizes: ["24", "25", "26", "27", "28", "29"]
  },
  {
    id: "kids-tiny-steps",
    name: "Tiny Steps Walker",
    audience: "kids",
    category: "Toddler",
    collection: "First Walkers",
    badge: "Toddlers",
    story: "Soft support and secure fit for first steps and everyday movement.",
    price: 1899,
    discountPrice: 1499,
    rating: 4.9,
    reviewCount: 75,
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #f2a56b 0%, #ffe2c9 100%)",
    sizes: ["21", "22", "23", "24", "25"]
  }
];

export const homeStoryTiles: StoryTile[] = [
  {
    eyebrow: "Men commute",
    title: "Run-ready comfort for daily city movement",
    description: "Performance-led photography gives the landing page a stronger first impression and a clearer story.",
    image: "/men-hero.png",
    alt: "Man wearing premium leather shoes walking in a modern city"
  },
  {
    eyebrow: "Women edit",
    title: "Soft everyday styling with lighter sneaker picks",
    description: "The women section now feels more fashion-led without losing everyday comfort and practicality.",
    image: "/women-hero.png",
    alt: "Elegant woman wearing stylish heels in a sunlit city setting"
  },
  {
    eyebrow: "Kids school",
    title: "School-ready pairs parents can find at a glance",
    description: "Age-first shopping feels clearer when the imagery matches the school and everyday-kids story.",
    image: "/kids-hero.png",
    alt: "Colorful kids sneakers perfect for school and play"
  }
];

export const contactSpotlight: ContactSpotlight = {
  eyebrow: "Customer care",
  title: "Fit advice, delivery help, and simple next steps.",
  body:
    "Our friendly support team is here daily from 9 AM to 9 PM to help you with fit, delivery, exchanges, and anything else you need.",
  image: "/customer-care.png",
  alt: "Friendly customer care representative ready to help with your order",
  chips: ["Order updates", "Fit advice", "Exchange help", "Store care"]
};

export const serviceHighlights = [
  {
    title: "Fast delivery cues",
    body: "Important shipping details sit higher in the interface, so trust starts before checkout."
  },
  {
    title: "Easy exchanges",
    body: "Returns and size questions now feel like a supported journey instead of a hidden policy."
  },
  {
    title: "Cleaner discovery",
    body: "The catalog is structured around real shopping intent, which makes browsing feel lighter and faster."
  }
];

export const contactChannels: ContactChannel[] = [
  {
    title: "Call support",
    detail: "+91 72 899 00000",
    note: "Open daily for order help, exchanges, and fit questions."
  },
  {
    title: "Email desk",
    detail: "care@stridestudio.example",
    note: "Best for order updates, store partnerships, and merchandising requests."
  },
  {
    title: "Studio address",
    detail: "MG Road, Bengaluru",
    note: "Head office for customer care and catalog operations."
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "How quickly do you confirm orders?",
    answer:
      "Orders are confirmed instantly on checkout and followed by a shipping update once packed."
  },
  {
    question: "Can guests browse and add items before logging in?",
    answer:
      "Yes. The storefront supports guest browsing and a persistent cart so people can log in later."
  },
  {
    question: "Do I need an account to start shopping?",
    answer:
      "No. You can browse and add pairs to the bag as a guest, then sign in later to continue more easily."
  }
];

export const audiencePageContent: Record<Audience, AudiencePageConfig> = {
  men: {
    eyebrow: "Men",
    title: "Built for commutes, weekends, and sharper office days",
    lead:
      "Move from office-ready leather and easy sneakers to running pairs and sandals without losing the premium, uncluttered feel.",
    promoTitle: "New arrivals and work-ready edits in one pass",
    promoBody:
      "Start with formal and casual anchors, then move into running and weekend collections for faster product discovery.",
    visualImage: "/men-hero.png",
    visualAlt: "Stylish man wearing premium shoes walking in the city",
    filterChips: ["All", "Running", "Formals", "Sneakers", "Sandals"],
    quickLinks: [
      { label: "Work wear", note: "Sharp office pairs", href: "/men" },
      { label: "Weekend", note: "Easy casual rotation", href: "/men" },
      { label: "Need help?", note: "Talk to fit support", href: "/contact" }
    ],
    stats: [
      { value: "42", label: "fresh men styles" },
      { value: "4.8/5", label: "average rating" },
      { value: "2 day", label: "metro shipping" }
    ]
  },
  women: {
    eyebrow: "Women",
    title: "Comfort-first dressing with cleaner styling and smarter edits",
    lead:
      "Browse lifestyle sneakers, flats, heels, and sandals through a softer, more editorial storefront with clearer product focus.",
    promoTitle: "Trending now: office polish meets soft weekend color",
    promoBody:
      "Use the filters to move between daily comfort, office polish, and weekend color without losing the premium mood.",
    visualImage: "/women-hero.png",
    visualAlt: "Elegant woman wearing stylish heels in a premium setting",
    filterChips: ["All", "Sneakers", "Flats", "Heels", "Sandals"],
    quickLinks: [
      { label: "Office edit", note: "Structured and polished", href: "/women" },
      { label: "365 closet", note: "Daily rotation picks", href: "/women" },
      { label: "Contact team", note: "Size and care help", href: "/contact" }
    ],
    stats: [
      { value: "38", label: "fresh women styles" },
      { value: "4.9/5", label: "comfort rating" },
      { value: "7 day", label: "easy exchange window" }
    ]
  },
  kids: {
    eyebrow: "Kids",
    title: "A simpler way to shop by age, play type, and school need",
    lead:
      "Parents can move through school shoes, sports pairs, sandals, and toddler essentials with much clearer, age-first browsing.",
    promoTitle: "School pairs, play pairs, and toddler essentials",
    promoBody:
      "Start with age and activity, then narrow by school, sports, sandals, or first-walker comfort.",
    visualImage: "/kids-hero.png",
    visualAlt: "Colorful kids sneakers for school and play",
    filterChips: ["All", "School", "Sports", "Sandals", "Toddler"],
    quickLinks: [
      { label: "Back to school", note: "Durable daily shoes", href: "/kids" },
      { label: "Toddler zone", note: "Soft step support", href: "/kids" },
      { label: "Need a response?", note: "Message the team", href: "/contact" }
    ],
    stats: [
      { value: "24", label: "kids styles" },
      { value: "4.8/5", label: "parent rating" },
      { value: "Age first", label: "easier browsing" }
    ]
  }
};

export const kidsAgeGroups = [
  {
    title: "Toddlers",
    body: "Soft support and secure closures for early walkers.",
    ages: "1 to 4 years"
  },
  {
    title: "Junior",
    body: "School-ready comfort and quick-on convenience.",
    ages: "5 to 8 years"
  },
  {
    title: "Older kids",
    body: "Sport, school, and casual rotations with stronger grip.",
    ages: "9 years and above"
  }
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getProductsByAudience(audience: Audience) {
  return products.filter((product) => product.audience === audience);
}

export function getHomeFeaturedProducts() {
  return products.slice(0, 6);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
