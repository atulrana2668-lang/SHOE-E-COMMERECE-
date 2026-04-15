"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  badge: string;
  rating: number;
  reviewCount: number;
  image: string;
  accent: string;
  sizes: string[];
};

type CartItem = Product & { quantity: number; size: string };

const categories = [
  { name: "All", slug: "all", count: "128 styles" },
  { name: "Running", slug: "running", count: "44 styles" },
  { name: "Lifestyle", slug: "lifestyle", count: "31 styles" },
  { name: "Basketball", slug: "basketball", count: "22 styles" },
  { name: "Training", slug: "training", count: "31 styles" }
];

const products: Product[] = [
  {
    id: "aero-runner",
    name: "Aero Runner Pro",
    category: "running",
    price: 12999,
    discountPrice: 9999,
    badge: "Bestseller",
    rating: 4.9,
    reviewCount: 284,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #fb923c 0%, #fdba74 45%, #fef3c7 100%)",
    sizes: ["6", "7", "8", "9", "10", "11"]
  },
  {
    id: "urban-cloud",
    name: "Urban Cloud 2.0",
    category: "lifestyle",
    price: 8999,
    discountPrice: 7499,
    badge: "New",
    rating: 4.8,
    reviewCount: 172,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #334155 0%, #64748b 50%, #e2e8f0 100%)",
    sizes: ["5", "6", "7", "8", "9", "10"]
  },
  {
    id: "court-force",
    name: "Court Force Elite",
    category: "basketball",
    price: 14999,
    discountPrice: 11999,
    badge: "Limited",
    rating: 4.9,
    reviewCount: 96,
    image:
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #4f46e5 0%, #22d3ee 50%, #e0f2fe 100%)",
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: "flex-trainer",
    name: "Flex Trainer Max",
    category: "training",
    price: 10999,
    discountPrice: 8999,
    badge: "Popular",
    rating: 4.7,
    reviewCount: 211,
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #059669 0%, #2dd4bf 50%, #ecfccb 100%)",
    sizes: ["6", "7", "8", "9", "10", "11"]
  },
  {
    id: "metro-low",
    name: "Metro Low Canvas",
    category: "lifestyle",
    price: 6999,
    discountPrice: 5299,
    badge: "Editor's Pick",
    rating: 4.8,
    reviewCount: 129,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #f472b6 0%, #fecdd3 48%, #ffedd5 100%)",
    sizes: ["5", "6", "7", "8", "9", "10"]
  },
  {
    id: "storm-x",
    name: "Storm X Trail",
    category: "running",
    price: 13999,
    discountPrice: 11499,
    badge: "Trail",
    rating: 4.8,
    reviewCount: 88,
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    accent: "linear-gradient(135deg, #18181b 0%, #52525b 48%, #e7e5e4 100%)",
    sizes: ["6", "7", "8", "9", "10", "11"]
  }
];

const serviceCards = [
  {
    title: "Fast delivery",
    body: "2-day metro shipping with real-time order tracking."
  },
  {
    title: "Easy exchanges",
    body: "Size swaps and hassle-free returns inside 7 days."
  },
  {
    title: "Secure checkout",
    body: "Encrypted payment flow with trusted gateway support."
  }
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      {"*****"}
      <span className="rating__fill" style={{ width: `${(value / 5) * 100}%` }}>
        {"*****"}
      </span>
    </span>
  );
}

export function Storefront() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    { ...products[0], quantity: 1, size: "9" },
    { ...products[2], quantity: 1, size: "10" }
  ]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  );

  function addToCart(product: Product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart((current) =>
        current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((current) => [
        ...current,
        { ...product, quantity: 1, size: product.sizes[2] }
      ]);
    }
    setCartOpen(true);
  }

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark">SS</span>
          <div>
            <p className="eyebrow">Premium footwear commerce</p>
            <h1>Stride Studio</h1>
          </div>
        </div>

        <nav className="nav">
          <a href="#collection">Collection</a>
          <a href="#story">Story</a>
          <a href="#benefits">Benefits</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="cartButton" onClick={() => setCartOpen((v) => !v)}>
          <span>Bag</span>
          <strong>{cartCount}</strong>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero__copy">
            <p className="eyebrow">New season drop</p>
            <h2>
              Shoes that move
              <span>with your city, your runs, and your weekends.</span>
            </h2>
            <p className="hero__text">
              Discover premium sneakers with clean silhouettes, responsive
              cushioning, fast checkout, and a shopping experience built to
              convert.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#collection">
                Shop collection
              </a>
              <a className="button button--ghost" href="#benefits">
                Explore benefits
              </a>
            </div>

            <div className="hero__stats">
              <div>
                <strong>128+</strong>
                <span>Styles curated</span>
              </div>
              <div>
                <strong>4.8/5</strong>
                <span>Customer rating</span>
              </div>
              <div>
                <strong>2-day</strong>
                <span>Metro delivery</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="heroCard heroCard--main">
              <div className="heroCard__badge">Best seller</div>
              <div className="heroCard__imageWrap">
                <div className="heroCard__glow" />
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  className="heroCard__image"
                  fill
                  sizes="(max-width: 780px) 100vw, 45vw"
                />
              </div>
              <div className="heroCard__footer">
                <div>
                  <p>{products[0].name}</p>
                  <strong>{formatPrice(products[0].discountPrice ?? products[0].price)}</strong>
                </div>
                <button onClick={() => addToCart(products[0])}>Add</button>
              </div>
            </div>

            <div className="heroCard heroCard--side">
              <p>Today&apos;s drop</p>
              <strong>Ultra-light mesh upper</strong>
              <span>Breathable comfort, no break-in time.</span>
            </div>
          </div>
        </section>

        <section className="categoryStrip">
          {categories.map((category) => (
            <button
              key={category.slug}
              className={`categoryChip ${
                activeCategory === category.slug ? "is-active" : ""
              }`}
              onClick={() => setActiveCategory(category.slug)}
            >
              <span>{category.name}</span>
              <small>{category.count}</small>
            </button>
          ))}
        </section>

        <section className="toolbar" id="collection">
          <div>
            <p className="eyebrow">Shop by style</p>
            <h3>Featured collection</h3>
          </div>
          <label className="search">
            <span>Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Try 'runner' or 'canvas'"
              aria-label="Search products"
            />
          </label>
        </section>

        <section className="productGrid" aria-label="Featured products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article key={product.id} className="productCard">
                <div
                  className="productCard__image"
                  style={{ background: product.accent }}
                >
                  <span className="productCard__badge">{product.badge}</span>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 780px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  />
                </div>

                <div className="productCard__body">
                  <div className="productCard__meta">
                    <p>{product.category}</p>
                    <StarRating value={product.rating} />
                  </div>

                  <h4>{product.name}</h4>
                  <p className="productCard__sub">
                    {product.reviewCount} verified reviews and all-day comfort.
                  </p>

                  <div className="sizeRow" aria-label="Available sizes">
                    {product.sizes.slice(0, 5).map((size) => (
                      <span key={size}>{size}</span>
                    ))}
                  </div>

                  <div className="productCard__footer">
                    <div>
                      <strong>{formatPrice(product.discountPrice ?? product.price)}</strong>
                      {product.discountPrice ? (
                        <span>{formatPrice(product.price)}</span>
                      ) : null}
                    </div>
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="emptyState">
              <h4>No shoes match your filters</h4>
              <p>Try a broader category or clear your search to keep browsing.</p>
              <button
                className="button button--ghost"
                onClick={() => {
                  setActiveCategory("all");
                  setSearch("");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <section className="story" id="story">
          <div className="story__panel story__panel--dark">
            <p className="eyebrow">Built for momentum</p>
            <h3>Conversion-focused shopping experience</h3>
            <p>
              Every surface is designed to reduce friction: clear navigation,
              persuasive product storytelling, clean pricing, and a cart that
              stays within reach.
            </p>
          </div>

          <div className="story__panel">
            <p className="eyebrow">Craft & comfort</p>
            <ul className="benefitList">
              <li>Responsive cushioning for long wear</li>
              <li>Premium materials with breathable uppers</li>
              <li>Minimal visual language, maximum focus on the product</li>
            </ul>
          </div>
        </section>

        <section className="benefits" id="benefits">
          {serviceCards.map((card) => (
            <article key={card.title} className="benefitCard">
              <h4>{card.title}</h4>
              <p>{card.body}</p>
            </article>
          ))}
        </section>
      </main>

      {cartOpen ? (
        <button
          className="cartBackdrop"
          aria-label="Close cart"
          onClick={() => setCartOpen(false)}
        />
      ) : null}

      <aside className={`cartDrawer ${cartOpen ? "is-open" : ""}`}>
        <div className="cartDrawer__header">
          <div>
            <p className="eyebrow">Cart</p>
            <h3>{cartCount} items</h3>
          </div>
          <button onClick={() => setCartOpen(false)}>Close</button>
        </div>

        <div className="cartDrawer__items">
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="cartItem">
              <Image
                className="cartItem__image"
                src={item.image}
                alt={item.name}
                width={72}
                height={72}
              />
              <div>
                <strong>{item.name}</strong>
                <p>
                  Size {item.size} | Qty {item.quantity}
                </p>
                <span>{formatPrice(item.discountPrice ?? item.price)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="cartDrawer__summary">
          <div>
            <span>Subtotal</span>
            <strong>{formatPrice(cartSubtotal)}</strong>
          </div>
          <button className="button button--primary">Checkout</button>
          <p>Secure checkout, GST-ready invoicing, and easy order tracking.</p>
        </div>
      </aside>

      <footer className="footer" id="contact">
        <div>
          <p className="eyebrow">Stride Studio</p>
          <h3>Premium sneaker commerce, ready to launch.</h3>
        </div>
        <a className="button button--ghost" href="mailto:hello@stridestudio.example">
          hello@stridestudio.example
        </a>
      </footer>
    </div>
  );
}
