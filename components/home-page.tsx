"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import {
  audienceCards,
  formatPrice,
  getHomeFeaturedProducts,
  getNewArrivals,
  homeStoryTiles,
  serviceHighlights
} from "@/lib/store-data";

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

export function HomePage() {
  const featuredProducts = getHomeFeaturedProducts();
  const newArrivals = getNewArrivals().slice(0, 6);
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedToast, setAddedToast] = useState<Record<string, boolean>>({});

  function handleAddToBag(product: typeof featuredProducts[0]) {
    const size = selectedSizes[product.id] ?? String(product.sizes[0]);
    addItem(product, size);
    setAddedToast((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => { setAddedToast((prev) => ({ ...prev, [product.id]: false })); }, 1800);
  }

  return (
    <div className="pageStack">

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="heroHome heroHome--jordan">
        <div className="heroHome__copy">
          <p className="eyebrow eyebrow--gold">New Season · Exclusive Drop</p>
          <h2 className="displayTitle displayTitle--hero">
            Air Jordan — The Icon Reimagined.
          </h2>
          <p className="sectionLead">
            The most legendary silhouette in sneaker history, now available at GOAT.
            Premium leather, iconic colourways, and a legacy that never goes out of style.
          </p>
          <div className="heroHome__actions">
            <Link href="/men" className="button button--gold">Shop Air Jordan</Link>
            <Link href="/women" className="buttonGhost">Explore women</Link>
          </div>
          <div className="statRow">
            <div className="statCard statCard--dark">
              <strong>🔥 Limited Stock</strong>
              <span>Exclusive colourways this season</span>
            </div>
            <div className="statCard statCard--dark">
              <strong>Free delivery</strong>
              <span>On orders above ₹999</span>
            </div>
            <div className="statCard statCard--dark">
              <strong>30 day returns</strong>
              <span>Hassle-free exchanges</span>
            </div>
          </div>
        </div>

        <div className="heroHome__visual heroHome__visual--jordan">
          <div className="heroVisual__main heroVisual__main--jordan">
            <span className="heroVisual__badge heroVisual__badge--gold">🏆 Iconic Collection</span>
            <Image
              className="heroVisual__image"
              src="/air-jordan-hero.png"
              alt="Air Jordan 1 Retro High OG — Premium luxury sneaker"
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              priority
            />
          </div>
          <div className="heroVisual__grid">
            <div className="miniFeature miniFeature--dark">
              <strong>Legacy Design</strong>
              <span>40+ years of iconic sneaker culture distilled into every pair.</span>
            </div>
            <div className="miniFeature miniFeature--dark">
              <strong>Premium Materials</strong>
              <span>Full-grain leather, plush cushioning, and flawless craftsmanship.</span>
            </div>
            <div className="miniFeature miniFeature--dark">
              <strong>Street to Studio</strong>
              <span>From the basketball court to the runway — one shoe rules all.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shop by Audience ──────────────────────────────────────── */}
      <section className="pageStack">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Shop by audience</p>
            <h2 className="sectionTitle">Shop the right collection faster</h2>
          </div>
          <p className="sectionLead">
            Men, women, and kids each get their own cleaner route so the storefront
            feels curated instead of crowded.
          </p>
        </div>

        <div className="audienceGrid">
          {audienceCards.map((card) => (
            <article
              key={card.audience}
              className="audiencePanel"
              style={{ background: card.accent }}
            >
              <span className="audiencePanel__eyebrow">{card.eyebrow}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="audiencePanel__actions">
                <Link href={card.href} className="button">
                  Open {card.eyebrow}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 🆕 New Arrivals Spotlight ─────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="showcaseRail">
          <div className="panelHeader">
            <div>
              <p className="eyebrow eyebrow--gold">🆕 Just Dropped</p>
              <h2 className="sectionTitle">New Arrivals This Season</h2>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/men" className="buttonGhost">New in Men</Link>
              <Link href="/women" className="buttonGhost">New in Women</Link>
              <Link href="/kids" className="buttonGhost">New in Kids</Link>
            </div>
          </div>

          <div className="newArrivalsScroll">
            {newArrivals.map((product) => {
              const discount = product.discountPrice
                ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
                : 0;
              return (
                <article key={product.id} className="newArrivalCard">
                  <Link href={`/product/${product.id}`} className="newArrivalCard__imageWrap" style={{ background: product.accent }}>
                    <Image
                      className="newArrivalCard__image"
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="280px"
                    />
                    <span className="newArrivalCard__newBadge">NEW</span>
                    {discount > 0 && (
                      <span className="newArrivalCard__discount">-{discount}%</span>
                    )}
                  </Link>
                  <div className="newArrivalCard__body">
                    <span className="newArrivalCard__category">{product.category} · {product.audience}</span>
                    <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h4 className="newArrivalCard__name">{product.name}</h4>
                    </Link>
                    <StarRating value={product.rating} />
                    <div className="newArrivalCard__footer">
                      <div className="priceBlock">
                        <strong>{formatPrice(product.discountPrice ?? product.price)}</strong>
                        {product.discountPrice && <span>{formatPrice(product.price)}</span>}
                      </div>
                      <Link href={`/product/${product.id}`} className="button">View</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Promo banner ─────────────────────────────────────────── */}
      <section className="promoBanner">
        <div className="spaced">
          <span className="promoPill">New season edit</span>
          <h3>Every major collection is easy to enter, compare, and add to bag.</h3>
          <p>
            From running shoes and office formals to sandals and school essentials,
            the homepage now behaves like a proper merchandising hub.
          </p>
        </div>
        <div className="promoBanner__badges">
          <span>Office-ready</span>
          <span>Weekend casual</span>
          <span>School essentials</span>
          <span>Fit support</span>
          <span>Easy returns</span>
          <span>Giftable picks</span>
        </div>
      </section>

      {/* ── Editorial tiles ───────────────────────────────────────── */}
      <section className="showcaseRail">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">Photo-led editing</p>
            <h2 className="sectionTitle">A more editorial first impression</h2>
          </div>
          <p className="sectionLead">
            Photography and color now support the product story instead of competing
            with it, which makes the storefront feel more premium at a glance.
          </p>
        </div>

        <div className="lookbookGrid">
          {homeStoryTiles.map((tile) => (
            <article key={tile.title} className="lookbookCard">
              <div className="lookbookCard__media">
                <Image
                  className="lookbookCard__image"
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>
              <div className="lookbookCard__copy">
                <p className="eyebrow">{tile.eyebrow}</p>
                <h3>{tile.title}</h3>
                <p>{tile.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────── */}
      <section className="showcaseRail">
        <div className="panelHeader">
          <div>
            <p className="eyebrow">This week&apos;s picks</p>
            <h2 className="sectionTitle">Featured products — select size and add to bag</h2>
          </div>
          <Link href="/men" className="buttonGhost">View all</Link>
        </div>

        <div className="productGrid">
          {featuredProducts.map((product) => (
            <article key={product.id} className="productCard productCard--v2">
              <Link href={`/product/${product.id}`} className="productCard__imageLink" style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                <span className="sr-only">View {product.name}</span>
              </Link>
              <div className="productCard__image" style={{ background: product.accent }}>
                <Image
                  className="productCard__media"
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <div className="productCard__badges">
                  <span className="productCard__badge">{product.badge}</span>
                  {product.isNew && <span className="productCard__newBadge">NEW</span>}
                </div>
                {product.discountPrice && (
                  <span className="productCard__discount">
                    -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                  </span>
                )}
              </div>
              <div className="productCard__body">
                <div className="productMeta">
                  <span>{product.collection}</span>
                  <StarRating value={product.rating} />
                </div>
                <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3>{product.name}</h3>
                </Link>
                <p>{product.story}</p>
                <div className="productSizes__label">
                  Size: <strong className="productSizes__active">{selectedSizes[product.id] ?? String(product.sizes[0])}</strong>
                </div>
                <div className="productSizes">
                  {product.sizes.map((size) => {
                    const s = String(size);
                    const activeSize = selectedSizes[product.id] ?? String(product.sizes[0]);
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
                    {product.discountPrice ? (
                      <span>{formatPrice(product.price)}</span>
                    ) : null}
                  </div>
                  <button
                    className={`button${addedToast[product.id] ? " button--added" : ""}`}
                    onClick={() => handleAddToBag(product)}
                    type="button"
                  >
                    {addedToast[product.id] ? "✓ Added!" : "Add to bag"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Editorial / Brand story ───────────────────────────────── */}
      <section className="editorialGrid">
        <article className="editorialCard editorialCard--dark">
          <p className="eyebrow">Why it works</p>
          <h3>A storefront should feel curated the moment it opens.</h3>
          <p>
            Sharper hierarchy, warmer color, and more relevant imagery make the
            catalog feel trustworthy and premium before the shopper even clicks.
          </p>
        </article>
        <article className="editorialCard">
          <p className="eyebrow">Service-first</p>
          <h3>Support, account, and bag now feel part of the same experience.</h3>
          <p>
            Shoppers can move from discovery to sign-in to follow-up without the site
            suddenly changing tone or losing continuity.
          </p>
        </article>
      </section>

      {/* ── Service highlights ────────────────────────────────────── */}
      <section className="serviceGrid">
        {serviceHighlights.map((service) => (
          <article key={service.title} className="serviceCard">
            <strong>{service.title}</strong>
            <p>{service.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
