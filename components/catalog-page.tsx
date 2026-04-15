"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useDeferredValue, useState, useEffect } from "react";
import { useCart } from "@/components/providers/cart-provider";
import {
  audiencePageContent,
  formatPrice,
  getProductsByAudience,
  products as allProducts,
  kidsAgeGroups,
  type Audience
} from "@/lib/store-data";

const WISHLIST_KEY = "stride-studio.wishlist";

const COLOR_OPTIONS = [
  { label: "All Colors", value: "" },
  { label: "Black", value: "#1a1a1a" },
  { label: "White", value: "#f5f5f5" },
  { label: "Brown", value: "#8B5E3C" },
  { label: "Tan", value: "#C68642" },
  { label: "Navy", value: "#1B3A6B" },
  { label: "Grey", value: "#888888" },
  { label: "Red", value: "#C62828" },
  { label: "Pink", value: "#E91E8C" },
  { label: "Green", value: "#2E7D32" },
  { label: "Blue", value: "#1565C0" },
];

type SortKey = "default" | "most_wanted" | "latest" | "price_high" | "price_low";

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

function WishlistBtn({ productId }: { productId: string }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]") as string[];
      setLiked(saved.includes(productId));
    } catch { /* ignore */ }
  }, [productId]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]") as string[];
      const next = liked
        ? saved.filter((id) => id !== productId)
        : [...saved, productId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setLiked(!liked);
    } catch { /* ignore */ }
  }

  return (
    <button
      type="button"
      className={`wishlistBtn ${liked ? "wishlistBtn--liked" : ""}`}
      onClick={toggle}
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      title={liked ? "Remove from wishlist" : "Save to wishlist"}
    >
      <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export function CatalogPage({ audience }: { audience: Audience }) {
  const copy = audiencePageContent[audience];
  const rawProducts = getProductsByAudience(audience);
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [selectedColor, setSelectedColor] = useState("");
  const deferredSearch = useDeferredValue(search);
  const { addItem } = useCart();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedToast, setAddedToast] = useState<Record<string, boolean>>({});

  // Filter
  let visibleProducts = rawProducts.filter((product) => {
    const matchesChip = activeChip === "All" || product.category.toLowerCase() === activeChip.toLowerCase();
    const query = deferredSearch.trim().toLowerCase();
    const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query) || product.collection.toLowerCase().includes(query);
    // Color filter is cosmetic here — in a real app we'd have a colors field
    return matchesChip && matchesSearch;
  });

  // Sort
  if (sortKey === "most_wanted") visibleProducts = [...visibleProducts].sort((a, b) => b.reviewCount - a.reviewCount);
  else if (sortKey === "latest") visibleProducts = [...visibleProducts].sort((a, b) => (b.badge === "New" ? 1 : 0) - (a.badge === "New" ? 1 : 0));
  else if (sortKey === "price_high") visibleProducts = [...visibleProducts].sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
  else if (sortKey === "price_low") visibleProducts = [...visibleProducts].sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));

  // Recommended: other-audience products
  const recommended = allProducts.filter((p) => p.audience !== audience).slice(0, 4);

  function handleAddToBag(product: (typeof rawProducts)[0]) {
    const size = selectedSizes[product.id] ?? String(product.sizes[0]);
    addItem(product, size);
    setAddedToast((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => { setAddedToast((prev) => ({ ...prev, [product.id]: false })); }, 1800);
  }

  return (
    <div className="pageStack">
      <section className="catalogHero">
        <div className="catalogHero__panel spaced">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="catalogHero__title">{copy.title}</h2>
          </div>
          <p className="catalogHero__lead">{copy.lead}</p>
          <div className="catalogHero__actions">
            <Link href="/login" className="button">Login to save picks</Link>
            <Link href="/contact" className="buttonGhost">Ask for help</Link>
          </div>
          <div className="catalogHero__imageWrap">
            <span className="catalogHero__imageBadge">{copy.eyebrow} visual</span>
            <Image className="catalogHero__image" src={copy.visualImage} alt={copy.visualAlt} fill sizes="(max-width: 1100px) 100vw, 46vw" />
          </div>
        </div>

        <div className="catalogHero__panel catalogHero__panel--accent spaced">
          <div>
            <p className="eyebrow">{copy.eyebrow} spotlight</p>
            <h3>{copy.promoTitle}</h3>
          </div>
          <p>{copy.promoBody}</p>
          <div className="catalogHero__spotlightGrid">
            {rawProducts.slice(0, 2).map((product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="catalogHero__spotlightItem">
                <div className="catalogHero__spotlightImageWrap" style={{ background: product.accent }}>
                  <Image src={product.image} alt={product.name} fill sizes="64px" />
                </div>
                <div className="catalogHero__spotlightDetails">
                  <strong>{product.name}</strong>
                  <span>{product.badge}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="catalogHero__stats">
            {copy.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter + Sort bar ─────────────────────────────── */}
      <section className="filterBar filterBar--v2">
        <div className="filterBar__row">
          <div className="chipRow">
            {copy.filterChips.map((chip) => (
              <button key={chip} className={`filterChip ${activeChip === chip ? "is-active" : ""}`} onClick={() => startTransition(() => setActiveChip(chip))} type="button">
                {chip}
              </button>
            ))}
          </div>

          <div className="filterBar__controls">
            <select
              className="sortSelect"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              aria-label="Sort products"
            >
              <option value="default">Sort: Featured</option>
              <option value="most_wanted">Most Wanted</option>
              <option value="latest">Latest Arrivals</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
            </select>

            <input
              className="searchField"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${audience} styles...`}
              aria-label={`Search ${audience} products`}
            />
          </div>
        </div>

        {/* Color filter */}
        <div className="colorFilter">
          <span className="colorFilter__label">Color:</span>
          <div className="colorFilter__swatches">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`colorSwatch ${selectedColor === opt.value ? "is-active" : ""}`}
                onClick={() => setSelectedColor(opt.value === selectedColor ? "" : opt.value)}
                title={opt.label}
                aria-label={opt.label}
              >
                {opt.value ? (
                  <span className="colorSwatch__dot" style={{ background: opt.value }} />
                ) : (
                  <span className="colorSwatch__all">All</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="catalogLayout">
        <aside className="categoryPanel">
          <div className="spaced">
            <p className="eyebrow">Quick paths</p>
            <h3>Start from the right aisle</h3>
            <p>Jump straight into the right cluster and reduce scrolling.</p>
          </div>
          <div className="categoryList">
            {copy.quickLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <strong>{link.label}</strong>
                <span>{link.note}</span>
              </Link>
            ))}
          </div>
          <span className="statusPill">{visibleProducts.length} styles showing</span>
        </aside>

        <div className="pageStack">
          <div className="productGrid">
            {visibleProducts.length > 0 ? (
              visibleProducts.map((product) => {
                const activeSize = selectedSizes[product.id] ?? String(product.sizes[0]);
                const justAdded = addedToast[product.id];
                const discount = product.discountPrice
                  ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                  : 0;

                return (
                  <article key={product.id} className="productCard productCard--v2">
                    {/* Image + actions */}
                    <div className="productCard__image" style={{ background: product.accent }}>
                      <Link href={`/product/${product.id}`} className="productCard__imageLink">
                        <Image
                          className="productCard__media"
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      </Link>
                      <span className="productCard__badge">{product.badge}</span>
                      {discount > 0 && (
                        <span className="productCard__discount">-{discount}%</span>
                      )}
                      {/* Wishlist heart */}
                      <WishlistBtn productId={product.id} />
                    </div>

                    <div className="productCard__body">
                      <div className="productMeta">
                        <span>{product.category}</span>
                        <StarRating value={product.rating} />
                      </div>
                      <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h4>{product.name}</h4>
                      </Link>
                      <p>{product.story}</p>

                      {/* Size picker */}
                      <div className="productSizes__label">
                        Size: <strong className="productSizes__active">{activeSize}</strong>
                      </div>
                      <div className="productSizes">
                        {product.sizes.map((size) => {
                          const s = String(size);
                          return (
                            <button
                              key={s}
                              type="button"
                              className={`sizeBtn${activeSize === s ? " sizeBtn--active" : ""}`}
                              onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: s }))}
                              aria-label={`Select size ${s}`}
                              aria-pressed={activeSize === s}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>

                      <div className="productFooter">
                        <div className="priceBlock">
                          <strong>{formatPrice(product.discountPrice ?? product.price)}</strong>
                          {product.discountPrice && <span>{formatPrice(product.price)}</span>}
                        </div>
                        <button
                          type="button"
                          className={`button${justAdded ? " button--added" : ""}`}
                          onClick={() => handleAddToBag(product)}
                          aria-label={`Add ${product.name} size ${activeSize} to bag`}
                        >
                          {justAdded ? "✓ Added!" : "Add to bag"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="emptyCard">
                <h3>No styles match that filter</h3>
                <p>Try another chip or clear the search to see more options.</p>
                <button type="button" className="buttonGhost" onClick={() => { setSearch(""); setActiveChip("All"); setSortKey("default"); setSelectedColor(""); }}>
                  Reset all filters
                </button>
              </div>
            )}
          </div>

          {audience === "kids" ? (
            <section className="ageGrid">
              {kidsAgeGroups.map((group) => (
                <article key={group.title} className="ageCard">
                  <strong>{group.title}</strong>
                  <p>{group.body}</p>
                  <p className="muted">{group.ages}</p>
                </article>
              ))}
            </section>
          ) : (
            <section className="infoGrid">
              <article className="infoCard">
                <strong>Trending collections</strong>
                <p>Work wear, lifestyle, and seasonal edits are surfaced higher for speed.</p>
              </article>
              <article className="infoCard">
                <strong>Less clutter</strong>
                <p>Spaced to feel easier to scan, compare, and trust on first visit.</p>
              </article>
              <article className="infoCard">
                <strong>Bag feedback</strong>
                <p>Add any item and the shared bag updates instantly from anywhere.</p>
              </article>
            </section>
          )}
        </div>
      </section>

      {/* ── Recommended Products ─────────────────────────────── */}
      <section className="pageStack recommendedSection">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">You Might Also Like</p>
            <h2 className="sectionTitle">Recommended for You</h2>
          </div>
          <p className="sectionLead">Handpicked based on your browsing — explore what's trending across our collections.</p>
        </div>
        <div className="productGrid">
          {recommended.map((product) => {
            const discount = product.discountPrice
              ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
              : 0;
            return (
              <article key={product.id} className="productCard productCard--v2">
                <div className="productCard__image" style={{ background: product.accent }}>
                  <Link href={`/product/${product.id}`} className="productCard__imageLink">
                    <Image className="productCard__media" src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 25vw" />
                  </Link>
                  <span className="productCard__badge">{product.badge}</span>
                  {discount > 0 && <span className="productCard__discount">-{discount}%</span>}
                  <WishlistBtn productId={product.id} />
                </div>
                <div className="productCard__body">
                  <div className="productMeta">
                    <span>{product.category}</span>
                    <StarRating value={product.rating} />
                  </div>
                  <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <h4>{product.name}</h4>
                  </Link>
                  <div className="priceBlock" style={{ marginTop: 10 }}>
                    <strong>{formatPrice(product.discountPrice ?? product.price)}</strong>
                    {product.discountPrice && <span>{formatPrice(product.price)}</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
