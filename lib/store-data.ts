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
  color: string;
  isNew?: boolean;
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
    description: "Shop workwear, weekend sneakers, and performance pairs with a faster path into the right collection.",
    href: "/men",
    accent: "linear-gradient(135deg, #d99262 0%, #f6d7bf 100%)"
  },
  {
    audience: "women",
    eyebrow: "Women",
    title: "Refined office edits, soft neutrals, and weekend color",
    description: "Explore comfort-led sneakers, polished heels, and easy flats in a cleaner, more editorial assortment.",
    href: "/women",
    accent: "linear-gradient(135deg, #d97670 0%, #f8d8db 100%)"
  },
  {
    audience: "kids",
    eyebrow: "Kids",
    title: "School-ready, play-ready, and sized by age",
    description: "Browse school staples, play pairs, and toddler styles with clearer entry points for parents shopping quickly.",
    href: "/kids",
    accent: "linear-gradient(135deg, #4c9f97 0%, #d9efe8 100%)"
  }
];

export const products: Product[] = [
  // ─── MEN — 20 products ────────────────────────────────────────────────────
  {
    id: "men-aero-flex",
    name: "Aero Flex Runner",
    audience: "men", category: "Running", collection: "Performance",
    badge: "Best Seller", story: "Breathable daily runner with a cushioned midsole for long city miles.",
    price: 5999, discountPrice: 4599, rating: 4.8, reviewCount: 218,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f59e64 0%,#f7d8b6 100%)",
    sizes: ["6","7","8","9","10","11"], color: "#C68642"
  },
  {
    id: "men-oxford-form",
    name: "Oxford Form Leather",
    audience: "men", category: "Formals", collection: "Work Wear",
    badge: "Office Edit", story: "Polished derby profile designed for office rotations and occasion wear.",
    price: 6499, discountPrice: 5199, rating: 4.7, reviewCount: 137,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#635447 0%,#dbd0c4 100%)",
    sizes: ["7","8","9","10","11"], color: "#8B5E3C"
  },
  {
    id: "men-weekend-low",
    name: "Weekend Low Sneaker",
    audience: "men", category: "Sneakers", collection: "Lifestyle",
    badge: "New", story: "Minimal low-top with soft lining and an easy neutral palette.", isNew: true,
    price: 4299, discountPrice: 3499, rating: 4.6, reviewCount: 184,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#53657d 0%,#dfe6f1 100%)",
    sizes: ["6","7","8","9","10","11"], color: "#f5f5f5"
  },
  {
    id: "men-summer-slide",
    name: "Summer Slide Ease",
    audience: "men", category: "Sandals", collection: "Holiday",
    badge: "Easy Wear", story: "Lightweight slide built for quick errands, travel, and monsoon comfort.",
    price: 1999, discountPrice: 1499, rating: 4.5, reviewCount: 89,
    image: "https://images.unsplash.com/photo-1538146888063-3ecf5e002d7c?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#516f71 0%,#d6e8e6 100%)",
    sizes: ["6","7","8","9","10"], color: "#888888"
  },
  {
    id: "men-prime-loafer",
    name: "Prime Essential Loafer",
    audience: "men", category: "Formals", collection: "Work Wear",
    badge: "Premium Leather", story: "Slip-on comfort paired with sharp boardroom-ready aesthetics. A modern classic.",
    price: 7999, discountPrice: 6299, rating: 4.8, reviewCount: 92,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#1c1c1c 0%,#4f4f4f 100%)",
    sizes: ["7","8","9","10","11"], color: "#1a1a1a", isNew: true
  },
  {
    id: "men-hoops-elite",
    name: "Hoops Elite High",
    audience: "men", category: "Sneakers", collection: "Performance",
    badge: "Courtside", story: "Maximum ankle support built for sudden pivots. Features engineered air pockets.",
    price: 9499, discountPrice: 8499, rating: 4.9, reviewCount: 310,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#a30e15 0%,#e54045 100%)",
    sizes: ["8","9","10","11","12"], color: "#C62828"
  },
  {
    id: "men-stormx-trail",
    name: "Storm X Trail",
    audience: "men", category: "Running", collection: "Outdoors",
    badge: "All-Terrain", story: "Aggressive lugs and waterproof ripstop keep you moving in any condition.",
    price: 8299, discountPrice: 6999, rating: 4.8, reviewCount: 145,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#18181b 0%,#52525b 100%)",
    sizes: ["7","8","9","10","11"], color: "#1a1a1a"
  },
  {
    id: "men-urban-drift",
    name: "Urban Drift Canvas",
    audience: "men", category: "Sneakers", collection: "Lifestyle",
    badge: "Street Style", story: "Washed canvas with a vulcanized sole — the go-to for effortless weekend looks.", isNew: true,
    price: 3799, discountPrice: 2999, rating: 4.5, reviewCount: 206,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#5b6370 0%,#d8dce4 100%)",
    sizes: ["6","7","8","9","10","11"], color: "#888888"
  },
  {
    id: "men-brogue-classic",
    name: "Brogue Classic Wing",
    audience: "men", category: "Formals", collection: "Work Wear",
    badge: "Heritage", story: "Laser-cut broguing and full-grain leather upper for heritage-style dressing.",
    price: 8999, discountPrice: 7499, rating: 4.7, reviewCount: 78,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#7b5e44 0%,#e2cdb9 100%)",
    sizes: ["7","8","9","10","11"], color: "#8B5E3C"
  },
  {
    id: "men-speed-burst",
    name: "Speed Burst Pro",
    audience: "men", category: "Running", collection: "Performance",
    badge: "Race Day", story: "Carbon-fibre plate and racer geometry built for half-marathon personal bests.", isNew: true,
    price: 12999, discountPrice: 10999, rating: 4.9, reviewCount: 189,
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#1e40af 0%,#93c5fd 100%)",
    sizes: ["7","8","9","10","11"], color: "#1565C0"
  },
  {
    id: "men-cargo-slip",
    name: "Cargo Slip-On",
    audience: "men", category: "Sandals", collection: "Holiday",
    badge: "Comfort First", story: "Dual-density EVA footbed in a slip-on silhouette. Beach to block, no laces.",
    price: 2499, discountPrice: 1899, rating: 4.4, reviewCount: 97,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#b45309 0%,#fcd34d 100%)",
    sizes: ["7","8","9","10","11"], color: "#C68642"
  },
  {
    id: "men-air-court",
    name: "Air Court 1985",
    audience: "men", category: "Sneakers", collection: "Retro",
    badge: "Iconic", story: "A faithful retro silhouette with modern cushioning hidden inside. For collectors and commuters alike.",
    price: 11499, discountPrice: 9999, rating: 4.9, reviewCount: 512,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f5f0e8 0%,#e8dcc8 100%)",
    sizes: ["6","7","8","9","10","11","12"], color: "#f5f5f5"
  },
  {
    id: "men-flex-mocassin",
    name: "Flex Moccasin",
    audience: "men", category: "Formals", collection: "Work Wear",
    badge: "Suede", story: "Hand-stitched suede moccasin for the modern professional who prefers subtle luxury.",
    price: 6999, rating: 4.6, reviewCount: 64,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#92400e 0%,#fde68a 100%)",
    sizes: ["7","8","9","10","11"], color: "#8B5E3C", isNew: true
  },
  {
    id: "men-ultra-boost",
    name: "Ultra Boost Mesh",
    audience: "men", category: "Running", collection: "Performance",
    badge: "Energy Return", story: "Adaptive knit upper wraps the foot like a sock while the boost midsole propels each stride.",
    price: 13999, discountPrice: 11999, rating: 4.8, reviewCount: 421,
    image: "https://images.unsplash.com/photo-1513882891304-216f3fc9a0be?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#111827 0%,#6b7280 100%)",
    sizes: ["7","8","9","10","11","12"], color: "#1a1a1a"
  },
  {
    id: "men-monk-strap",
    name: "Monk Strap Double",
    audience: "men", category: "Formals", collection: "Premium",
    badge: "Award Win", story: "Double-buckle monk strap in polished calfskin. Pairs with suits and smart-casuals.",
    price: 10499, discountPrice: 8999, rating: 4.8, reviewCount: 53,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#292524 0%,#78716c 100%)",
    sizes: ["7","8","9","10","11"], color: "#1a1a1a"
  },
  {
    id: "men-flip-coast",
    name: "Coast Flip Thong",
    audience: "men", category: "Sandals", collection: "Holiday",
    badge: "Waterproof", story: "Quick-dry straps and anti-slip grip for pool decks, waterfalls, and everything in between.",
    price: 1499, rating: 4.3, reviewCount: 142,
    image: "https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#0369a1 0%,#bae6fd 100%)",
    sizes: ["7","8","9","10","11"], color: "#1565C0"
  },
  {
    id: "men-chunky-plaza",
    name: "Chunky Plaza Dad",
    audience: "men", category: "Sneakers", collection: "Retro",
    badge: "Trending", story: "Bold proportions and layered midsole inspired by late-90s trail runners. The loud statement piece.", isNew: true,
    price: 7499, discountPrice: 6299, rating: 4.6, reviewCount: 287,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#d97706 0%,#fef3c7 100%)",
    sizes: ["7","8","9","10","11"], color: "#C68642"
  },
  {
    id: "men-carbon-runner",
    name: "Carbon Pace Elite",
    audience: "men", category: "Running", collection: "Performance",
    badge: "New Arrival", story: "Featherlight frame, explosive toe spring. Built for sub-4-minute kilometres.", isNew: true,
    price: 14999, discountPrice: 12999, rating: 4.9, reviewCount: 77,
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#134e4a 0%,#5eead4 100%)",
    sizes: ["7","8","9","10","11"], color: "#2E7D32"
  },
  {
    id: "men-knit-everyday",
    name: "Knit Everyday Lite",
    audience: "men", category: "Sneakers", collection: "Lifestyle",
    badge: "All Day", story: "Recycled knit upper with zero-break-in comfort. Engineered for 12-hour days.",
    price: 5499, discountPrice: 4299, rating: 4.7, reviewCount: 335,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#6366f1 0%,#c7d2fe 100%)",
    sizes: ["7","8","9","10","11"], color: "#1565C0"
  },
  {
    id: "men-desert-boot",
    name: "Desert Suede Boot",
    audience: "men", category: "Formals", collection: "Premium",
    badge: "Winter Edit", story: "Ankle-height suede boot with crepe sole. The off-duty classic reimagined.", isNew: true,
    price: 8499, discountPrice: 7299, rating: 4.7, reviewCount: 101,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#78350f 0%,#fde68a 100%)",
    sizes: ["7","8","9","10","11"], color: "#8B5E3C"
  },

  // ─── WOMEN — 20 products ──────────────────────────────────────────────────
  {
    id: "women-cloud-step",
    name: "Cloud Step Knit",
    audience: "women", category: "Sneakers", collection: "Lifestyle",
    badge: "Trending", story: "Soft knit upper and lightweight comfort for all-day movement.",
    price: 4899, discountPrice: 3899, rating: 4.9, reviewCount: 264,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f2a1aa 0%,#ffe1e6 100%)",
    sizes: ["4","5","6","7","8","9"], color: "#E91E8C"
  },
  {
    id: "women-city-ballet",
    name: "City Ballet Flat",
    audience: "women", category: "Flats", collection: "365 Closet",
    badge: "Daily Favorite", story: "Easy slip-on ballet flat with clean shape and flexible comfort.",
    price: 3199, discountPrice: 2599, rating: 4.7, reviewCount: 151,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#d98e87 0%,#f8d6d2 100%)",
    sizes: ["4","5","6","7","8"], color: "#E91E8C"
  },
  {
    id: "women-dune-heel",
    name: "Dune Block Heel",
    audience: "women", category: "Heels", collection: "Work Wear",
    badge: "Office Chic", story: "Balanced block heel that keeps formal outfits sharp but wearable.",
    price: 5499, discountPrice: 4299, rating: 4.6, reviewCount: 98,
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#d09e76 0%,#f5dfca 100%)",
    sizes: ["4","5","6","7","8"], color: "#C68642"
  },
  {
    id: "women-bloom-sandal",
    name: "Bloom Strap Sandal",
    audience: "women", category: "Sandals", collection: "Weekend",
    badge: "New Color", story: "Open, airy sandal designed for summer plans and lighter outfits.", isNew: true,
    price: 2799, discountPrice: 2199, rating: 4.5, reviewCount: 112,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f3bd8f 0%,#fff0db 100%)",
    sizes: ["4","5","6","7","8"], color: "#C68642"
  },
  {
    id: "women-trail-blaze",
    name: "Trail Blaze Trekker",
    audience: "women", category: "Sneakers", collection: "Outdoors",
    badge: "All-Terrain", story: "Aggressive traction fused with waterproof uppers. Take on the mud in style.",
    price: 6899, discountPrice: 5599, rating: 4.7, reviewCount: 142,
    image: "https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#1b3a6b 0%,#5b8db8 100%)",
    sizes: ["5","6","7","8"], color: "#1565C0"
  },
  {
    id: "women-stella-mule",
    name: "Stella Slip Mule",
    audience: "women", category: "Flats", collection: "365 Closet",
    badge: "Must Have", story: "Effortless sliding mule that dresses up denim and complements flowy silhouettes.",
    price: 3499, discountPrice: 2899, rating: 4.6, reviewCount: 201,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#c7bca1 0%,#f0e6d2 100%)",
    sizes: ["4","5","6","7","8"], color: "#f5f5f5"
  },
  {
    id: "women-run-plush",
    name: "Run Plush 2.0",
    audience: "women", category: "Sneakers", collection: "Performance",
    badge: "Top Rated", story: "React foam midsole and an engineered-mesh upper that moulds to your foot mid-run.", isNew: true,
    price: 7499, discountPrice: 6299, rating: 4.8, reviewCount: 319,
    image: "https://images.unsplash.com/photo-1513882891304-216f3fc9a0be?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#db2777 0%,#fbcfe8 100%)",
    sizes: ["4","5","6","7","8","9"], color: "#E91E8C"
  },
  {
    id: "women-kitten-court",
    name: "Kitten Court Heel",
    audience: "women", category: "Heels", collection: "365 Closet",
    badge: "Office Classic", story: "A 5cm kitten heel that goes effortlessly from morning meeting to evening dinner.",
    price: 4599, discountPrice: 3799, rating: 4.7, reviewCount: 88,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#831843 0%,#fbcfe8 100%)",
    sizes: ["4","5","6","7","8"], color: "#E91E8C"
  },
  {
    id: "women-woven-slip",
    name: "Woven Espadrille",
    audience: "women", category: "Sandals", collection: "Weekend",
    badge: "Summer Pick", story: "Jute-woven sole with a cushioned footbed. Mediterranean style for city dwellers.", isNew: true,
    price: 3299, discountPrice: 2699, rating: 4.6, reviewCount: 175,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#a16207 0%,#fef9c3 100%)",
    sizes: ["4","5","6","7","8"], color: "#C68642"
  },
  {
    id: "women-stiletto-night",
    name: "Night Stiletto Strap",
    audience: "women", category: "Heels", collection: "Premium",
    badge: "Party Edit", story: "Slender stiletto with ankle-wrap strap. Designed to steal the spotlight.",
    price: 7999, discountPrice: 6499, rating: 4.8, reviewCount: 63,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#1c1917 0%,#78716c 100%)",
    sizes: ["4","5","6","7"], color: "#1a1a1a"
  },
  {
    id: "women-air-max-cloud",
    name: "Air Max Cloud Pink",
    audience: "women", category: "Sneakers", collection: "Lifestyle",
    badge: "Viral", story: "Oversized air-window sole meets pastel colorway. Has 50K+ saves on fashion boards.", isNew: true,
    price: 10999, discountPrice: 9499, rating: 4.9, reviewCount: 607,
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f9a8d4 0%,#fdf2f8 100%)",
    sizes: ["4","5","6","7","8","9"], color: "#E91E8C"
  },
  {
    id: "women-loafer-gold",
    name: "Gold Bit Loafer",
    audience: "women", category: "Flats", collection: "Work Wear",
    badge: "Office Luxe", story: "Horsebit-embellished loafer in smooth calfskin. Power dressing, simplified.",
    price: 8499, discountPrice: 7199, rating: 4.7, reviewCount: 134,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#854d0e 0%,#fef08a 100%)",
    sizes: ["4","5","6","7","8"], color: "#C68642"
  },
  {
    id: "women-platform-white",
    name: "Platform Pure White",
    audience: "women", category: "Sneakers", collection: "Lifestyle",
    badge: "Clean Aesthetic", story: "Chunky platform sole in pristine white. The capsule-wardrobe staple.", isNew: true,
    price: 5999, discountPrice: 4999, rating: 4.7, reviewCount: 298,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)",
    sizes: ["4","5","6","7","8"], color: "#f5f5f5"
  },
  {
    id: "women-terracotta-flat",
    name: "Terracotta Slip Flat",
    audience: "women", category: "Flats", collection: "Weekend",
    badge: "Earth Tones", story: "Terracotta leather flat with a stitch detailing border and cushion sock liner.",
    price: 3799, discountPrice: 3199, rating: 4.5, reviewCount: 89,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#c2410c 0%,#fed7aa 100%)",
    sizes: ["4","5","6","7","8"], color: "#C62828"
  },
  {
    id: "women-wedge-rope",
    name: "Rope Wedge Sandal",
    audience: "women", category: "Heels", collection: "Weekend",
    badge: "Resort Style", story: "Natural rope wedge with a secure ankle buckle. From poolside to promenade.", isNew: true,
    price: 4299, discountPrice: 3599, rating: 4.6, reviewCount: 117,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#ca8a04 0%,#fef9c3 100%)",
    sizes: ["4","5","6","7","8"], color: "#C68642"
  },
  {
    id: "women-toe-ring",
    name: "Boho Toe-Ring Flat",
    audience: "women", category: "Sandals", collection: "Weekend",
    badge: "Festival", story: "Strappy with a boho soul. Gold toe-ring hardware meets leather bands.",
    price: 2199, discountPrice: 1799, rating: 4.4, reviewCount: 132,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#92400e 0%,#fde68a 100%)",
    sizes: ["4","5","6","7","8"], color: "#C68642"
  },
  {
    id: "women-night-run",
    name: "Night Run Neon",
    audience: "women", category: "Sneakers", collection: "Performance",
    badge: "Reflective", story: "360° reflective taping and a high-vis pop midsole. Safety never looked this good.",
    price: 7999, discountPrice: 6499, rating: 4.7, reviewCount: 174,
    image: "https://images.unsplash.com/photo-1538146888063-3ecf5e002d7c?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#0f172a 0%,#38bdf8 100%)",
    sizes: ["4","5","6","7","8","9"], color: "#1565C0", isNew: true
  },
  {
    id: "women-chelsea-boot",
    name: "Chelsea Ankle Boot",
    audience: "women", category: "Heels", collection: "Work Wear",
    badge: "Winter Staple", story: "Elastic-gusset chelsea boot with a block heel. The non-slip commuter's best friend.",
    price: 8999, discountPrice: 7499, rating: 4.8, reviewCount: 91,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#292524 0%,#a8a29e 100%)",
    sizes: ["4","5","6","7","8"], color: "#1a1a1a"
  },
  {
    id: "women-satin-mule",
    name: "Satin Evening Mule",
    audience: "women", category: "Heels", collection: "Premium",
    badge: "Festive", story: "Duchess satin upper with a kitten heel. The finishing touch to any formal look.", isNew: true,
    price: 6499, discountPrice: 5199, rating: 4.8, reviewCount: 58,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#4a044e 0%,#f5d0fe 100%)",
    sizes: ["4","5","6","7","8"], color: "#888888"
  },
  {
    id: "women-birken-style",
    name: "Comfort Cork Sandal",
    audience: "women", category: "Sandals", collection: "Lifestyle",
    badge: "Ortho Comfort", story: "Cork footbed moulded to your arch over time. Comfort that wears in, not out.",
    price: 4499, discountPrice: 3699, rating: 4.9, reviewCount: 388,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#a3804c 0%,#f5e6c8 100%)",
    sizes: ["4","5","6","7","8","9"], color: "#888888"
  },

  // ─── KIDS — 20 products ───────────────────────────────────────────────────
  {
    id: "kids-sprint-school",
    name: "Sprint School Pro",
    audience: "kids", category: "School", collection: "Back To School",
    badge: "School Ready", story: "Durable school pair with easy grip outsole and wipe-clean finish.",
    price: 2699, discountPrice: 2199, rating: 4.8, reviewCount: 203,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#4d8eaa 0%,#d8edf8 100%)",
    sizes: ["28","29","30","31","32","33"], color: "#1565C0"
  },
  {
    id: "kids-play-pop",
    name: "Play Pop Sneaker",
    audience: "kids", category: "Sports", collection: "Playground",
    badge: "Active Pick", story: "Bright runner with easy hook-and-loop closure for quick wear.",
    price: 2399, discountPrice: 1899, rating: 4.7, reviewCount: 144,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#74b37a 0%,#ddf4de 100%)",
    sizes: ["25","26","27","28","29","30"], color: "#2E7D32"
  },
  {
    id: "kids-rainy-splash",
    name: "Rainy Splash Sandal",
    audience: "kids", category: "Sandals", collection: "Holiday",
    badge: "Monsoon Edit", story: "Water-friendly sandal built for outdoor play and easy cleanup.",
    price: 1699, discountPrice: 1299, rating: 4.5, reviewCount: 87,
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#4aa5a0 0%,#d3f2ee 100%)",
    sizes: ["24","25","26","27","28","29"], color: "#2E7D32"
  },
  {
    id: "kids-tiny-steps",
    name: "Tiny Steps Walker",
    audience: "kids", category: "Toddler", collection: "First Walkers",
    badge: "Toddlers", story: "Soft support and secure fit for first steps and everyday movement.",
    price: 1899, discountPrice: 1499, rating: 4.9, reviewCount: 75,
    image: "https://images.unsplash.com/photo-1513882891304-216f3fc9a0be?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f2a56b 0%,#ffe2c9 100%)",
    sizes: ["21","22","23","24","25"], color: "#C68642"
  },
  {
    id: "kids-glow-runner",
    name: "Neon Glow Dash",
    audience: "kids", category: "Sports", collection: "Playground",
    badge: "Light-Up", story: "Flashy light-up midsoles that kids love, with the rugged durability parents need.", isNew: true,
    price: 2899, discountPrice: 2299, rating: 4.9, reviewCount: 420,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#ffcc00 0%,#fff080 100%)",
    sizes: ["26","27","28","29","30"], color: "#C68642"
  },
  {
    id: "kids-campus-velcro",
    name: "Campus Easy-Strap",
    audience: "kids", category: "School", collection: "Back To School",
    badge: "Classic Black", story: "The ultimate uniform shoe. Scuff-resistant toe bumper and triple grip strap.",
    price: 2199, rating: 4.5, reviewCount: 168,
    image: "https://images.unsplash.com/photo-1579338908476-3a3a1d71a706?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#2b2b2b 0%,#6e6e6e 100%)",
    sizes: ["28","29","30","31","32"], color: "#1a1a1a"
  },
  {
    id: "kids-dino-sport",
    name: "Dino Sport Jr",
    audience: "kids", category: "Sports", collection: "Playground",
    badge: "Fan Fav", story: "Dino-scale pattern stitched into the tongue. Featherlight EVA base for long play days.", isNew: true,
    price: 2599, discountPrice: 2099, rating: 4.8, reviewCount: 356,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#15803d 0%,#bbf7d0 100%)",
    sizes: ["24","25","26","27","28","29"], color: "#2E7D32"
  },
  {
    id: "kids-bubble-sandal",
    name: "Bubble Velcro Sandal",
    audience: "kids", category: "Sandals", collection: "Summer",
    badge: "Summer Fav", story: "Two-strap velcro sandal with bubble-grip outsole. Perfect for beach and garden.", isNew: true,
    price: 1499, discountPrice: 1199, rating: 4.6, reviewCount: 244,
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#0ea5e9 0%,#bae6fd 100%)",
    sizes: ["22","23","24","25","26"], color: "#1565C0"
  },
  {
    id: "kids-princess-flat",
    name: "Princess Ballet Flat",
    audience: "kids", category: "School", collection: "365 Closet",
    badge: "Girls Fav", story: "Delicate bow detail and cushioned sole. A classic flat that every wardrobe needs.",
    price: 1799, discountPrice: 1399, rating: 4.7, reviewCount: 189,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#db2777 0%,#fbcfe8 100%)",
    sizes: ["24","25","26","27","28","29"], color: "#E91E8C"
  },
  {
    id: "kids-mud-trekker",
    name: "Mud Trekker Boot",
    audience: "kids", category: "Sports", collection: "Outdoors",
    badge: "Waterproof", story: "Waterproof microfibre boot with deep-channel lugs. Puddles don't stand a chance.", isNew: true,
    price: 2999, discountPrice: 2499, rating: 4.8, reviewCount: 136,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#44403c 0%,#d6d3d1 100%)",
    sizes: ["28","29","30","31","32"], color: "#1a1a1a"
  },
  {
    id: "kids-unicorn-glitter",
    name: "Unicorn Glitter Slip",
    audience: "kids", category: "School", collection: "365 Closet",
    badge: "Magical", story: "Holographic glitter upper with a heart-print insole. Children's imagination meets GOAT style.",
    price: 2099, discountPrice: 1699, rating: 4.8, reviewCount: 521,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#7c3aed 0%,#f3e8ff 100%)",
    sizes: ["24","25","26","27","28","29"], color: "#888888", isNew: true
  },
  {
    id: "kids-speedy-track",
    name: "Speedy Track Lace",
    audience: "kids", category: "Sports", collection: "Playground",
    badge: "Sports Day", story: "Sprint-optimised sole with quick-lace system. Win the race and look great doing it.",
    price: 2499, discountPrice: 1999, rating: 4.7, reviewCount: 277,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#dc2626 0%,#fca5a5 100%)",
    sizes: ["26","27","28","29","30","31"], color: "#C62828"
  },
  {
    id: "kids-cotton-espadrille",
    name: "Cotton Espadrille Jr",
    audience: "kids", category: "Sandals", collection: "Summer",
    badge: "Breezy", story: "Canvas espadrille slip-on with braided jute trim. Summer holiday essential.", isNew: true,
    price: 1599, discountPrice: 1299, rating: 4.5, reviewCount: 91,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#a16207 0%,#fef9c3 100%)",
    sizes: ["22","23","24","25","26"], color: "#C68642"
  },
  {
    id: "kids-superstar-mini",
    name: "Superstar Mini",
    audience: "kids", category: "School", collection: "Back To School",
    badge: "Icon Jr", story: "Scaled-down shell-toe silhouette with triple-stripe branding. Mini legend energy.",
    price: 3299, discountPrice: 2799, rating: 4.9, reviewCount: 482,
    image: "https://images.unsplash.com/photo-1538146888063-3ecf5e002d7c?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f8fafc 0%,#e2e8f0 100%)",
    sizes: ["26","27","28","29","30","31"], color: "#f5f5f5", isNew: true
  },
  {
    id: "kids-jungle-velcro",
    name: "Jungle Velcro Explorer",
    audience: "kids", category: "Sandals", collection: "Outdoors",
    badge: "Adventure", story: "Triple-velcro adjustment system with a closed toe for trail safety.",
    price: 1899, discountPrice: 1599, rating: 4.6, reviewCount: 108,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#365314 0%,#d9f99d 100%)",
    sizes: ["24","25","26","27","28","29"], color: "#2E7D32"
  },
  {
    id: "kids-canvas-school",
    name: "Canvas School Lo-Top",
    audience: "kids", category: "School", collection: "Back To School",
    badge: "Everyday", story: "Thick canvas with vulcanised sole and a cushioned terry-cloth lining. Uniform-approved.",
    price: 1999, discountPrice: 1649, rating: 4.5, reviewCount: 223,
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#1e3a5f 0%,#bfdbfe 100%)",
    sizes: ["28","29","30","31","32","33"], color: "#1565C0"
  },
  {
    id: "kids-first-crawler",
    name: "First Steps Crawler",
    audience: "kids", category: "Toddler", collection: "First Walkers",
    badge: "Pre-Walker", story: "Ultra-thin sole keeps ground feel intact while protecting early crawlers.", isNew: true,
    price: 1699, discountPrice: 1399, rating: 4.9, reviewCount: 67,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#fce7f3 0%,#fff1f2 100%)",
    sizes: ["18","19","20","21","22"], color: "#E91E8C"
  },
  {
    id: "kids-croc-clogs",
    name: "Croc Jr Clog",
    audience: "kids", category: "Sandals", collection: "Holiday",
    badge: "Bestseller", story: "Airy ventilation ports and a roomy fit kids love for their afternoon adventures.",
    price: 1299, discountPrice: 999, rating: 4.7, reviewCount: 639,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#f59e0b 0%,#fef3c7 100%)",
    sizes: ["22","23","24","25","26","27"], color: "#C68642"
  },
  {
    id: "kids-toddler-strap",
    name: "Toddler T-Strap",
    audience: "kids", category: "Toddler", collection: "First Walkers",
    badge: "Step Safe", story: "T-strap with heel counter to hold the foot in position as toddlers build confidence.", isNew: true,
    price: 1799, discountPrice: 1499, rating: 4.8, reviewCount: 88,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#0f766e 0%,#99f6e4 100%)",
    sizes: ["20","21","22","23","24"], color: "#2E7D32"
  },
  {
    id: "kids-future-runner",
    name: "Future Jr. Runner",
    audience: "kids", category: "Sports", collection: "Performance",
    badge: "New Arrival", story: "Scaled-from-adult race shoe with cushioned Ortholite insole and pull tabs.", isNew: true,
    price: 3499, discountPrice: 2899, rating: 4.8, reviewCount: 154,
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80",
    accent: "linear-gradient(135deg,#1e40af 0%,#93c5fd 100%)",
    sizes: ["28","29","30","31","32","33"], color: "#1565C0"
  }
];

export const homeStoryTiles: StoryTile[] = [
  {
    eyebrow: "Men commute",
    title: "Run-ready comfort for daily city movement",
    description: "Performance-led photography gives the landing page a stronger first impression and a clearer story.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    alt: "Man wearing premium leather shoes walking in a modern city"
  },
  {
    eyebrow: "Women edit",
    title: "Soft everyday styling with lighter sneaker picks",
    description: "The women section now feels more fashion-led without losing everyday comfort and practicality.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    alt: "Elegant woman wearing stylish heels in a sunlit city setting"
  },
  {
    eyebrow: "Kids school",
    title: "School-ready pairs parents can find at a glance",
    description: "Age-first shopping feels clearer when the imagery matches the school and everyday-kids story.",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    alt: "Colorful kids sneakers perfect for school and play"
  }
];

export const contactSpotlight: ContactSpotlight = {
  eyebrow: "Customer care",
  title: "Fit advice, delivery help, and simple next steps.",
  body: "Our friendly support team is here daily from 9 AM to 9 PM to help you with fit, delivery, exchanges, and anything else you need.",
  image: "https://images.unsplash.com/photo-1538146888063-3ecf5e002d7c?auto=format&fit=crop&w=800&q=80",
  alt: "Friendly customer care representative ready to help with your order",
  chips: ["Order updates", "Fit advice", "Exchange help", "Store care"]
};

export const serviceHighlights = [
  { title: "Fast delivery cues", body: "Important shipping details sit higher in the interface, so trust starts before checkout." },
  { title: "Easy exchanges", body: "Returns and size questions now feel like a supported journey instead of a hidden policy." },
  { title: "Cleaner discovery", body: "The catalog is structured around real shopping intent, which makes browsing feel lighter and faster." }
];

export const contactChannels: ContactChannel[] = [
  { title: "Call support", detail: "+91 72 899 00000", note: "Open daily for order help, exchanges, and fit questions." },
  { title: "Email desk", detail: "care@goat.example", note: "Best for order updates, store partnerships, and merchandising requests." },
  { title: "Studio address", detail: "MG Road, Bengaluru", note: "Head office for customer care and catalog operations." }
];

export const faqItems: FaqItem[] = [
  { question: "How quickly do you confirm orders?", answer: "Orders are confirmed instantly on checkout and followed by a shipping update once packed." },
  { question: "Can guests browse and add items before logging in?", answer: "Yes. The storefront supports guest browsing and a persistent cart so people can log in later." },
  { question: "Do I need an account to start shopping?", answer: "No. You can browse and add pairs to the bag as a guest, then sign in later to continue more easily." }
];

export const audiencePageContent: Record<Audience, AudiencePageConfig> = {
  men: {
    eyebrow: "Men",
    title: "Built for commutes, weekends, and sharper office days",
    lead: "Move from office-ready leather and easy sneakers to running pairs and sandals without losing the premium, uncluttered feel.",
    promoTitle: "New arrivals and work-ready edits in one pass",
    promoBody: "Start with formal and casual anchors, then move into running and weekend collections for faster product discovery.",
    visualImage: "/men-hero.png",
    visualAlt: "Stylish man wearing premium shoes walking in the city",
    filterChips: ["All", "Running", "Formals", "Sneakers", "Sandals"],
    quickLinks: [
      { label: "Work wear", note: "Sharp office pairs", href: "/men" },
      { label: "Weekend", note: "Easy casual rotation", href: "/men" },
      { label: "Need help?", note: "Talk to fit support", href: "/contact" }
    ],
    stats: [
      { value: "20", label: "Men's styles" },
      { value: "4.8/5", label: "average rating" },
      { value: "2 day", label: "metro shipping" }
    ]
  },
  women: {
    eyebrow: "Women",
    title: "Comfort-first dressing with cleaner styling and smarter edits",
    lead: "Browse lifestyle sneakers, flats, heels, and sandals through a softer, more editorial storefront with clearer product focus.",
    promoTitle: "Trending now: office polish meets soft weekend color",
    promoBody: "Use the filters to move between daily comfort, office polish, and weekend color without losing the premium mood.",
    visualImage: "/women-hero.png",
    visualAlt: "Elegant woman wearing stylish heels in a premium setting",
    filterChips: ["All", "Sneakers", "Flats", "Heels", "Sandals"],
    quickLinks: [
      { label: "Office edit", note: "Structured and polished", href: "/women" },
      { label: "365 closet", note: "Daily rotation picks", href: "/women" },
      { label: "Contact team", note: "Size and care help", href: "/contact" }
    ],
    stats: [
      { value: "20", label: "Women's styles" },
      { value: "4.9/5", label: "comfort rating" },
      { value: "7 day", label: "easy exchange window" }
    ]
  },
  kids: {
    eyebrow: "Kids",
    title: "A simpler way to shop by age, play type, and school need",
    lead: "Parents can move through school shoes, sports pairs, sandals, and toddler essentials with much clearer, age-first browsing.",
    promoTitle: "School pairs, play pairs, and toddler essentials",
    promoBody: "Start with age and activity, then narrow by school, sports, sandals, or first-walker comfort.",
    visualImage: "/kids-hero.png",
    visualAlt: "Colorful kids sneakers for school and play",
    filterChips: ["All", "School", "Sports", "Sandals", "Toddler"],
    quickLinks: [
      { label: "Back to school", note: "Durable daily shoes", href: "/kids" },
      { label: "Toddler zone", note: "Soft step support", href: "/kids" },
      { label: "Need a response?", note: "Message the team", href: "/contact" }
    ],
    stats: [
      { value: "20", label: "Kids styles" },
      { value: "4.8/5", label: "parent rating" },
      { value: "Age first", label: "easier browsing" }
    ]
  }
};

export const kidsAgeGroups = [
  { title: "Toddlers", body: "Soft support and secure closures for early walkers.", ages: "1 to 4 years" },
  { title: "Junior", body: "School-ready comfort and quick-on convenience.", ages: "5 to 8 years" },
  { title: "Older kids", body: "Sport, school, and casual rotations with stronger grip.", ages: "9 years and above" }
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function getProductsByAudience(audience: Audience) {
  return products.filter((p) => p.audience === audience);
}

export function getHomeFeaturedProducts() {
  // Return 6 products: mix of new + top-rated
  const newOnes = products.filter((p) => p.isNew).slice(0, 3);
  const topRated = products.filter((p) => !p.isNew && p.rating >= 4.8).slice(0, 3);
  return [...newOnes, ...topRated];
}

export function getNewArrivals() {
  return products.filter((p) => p.isNew);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
