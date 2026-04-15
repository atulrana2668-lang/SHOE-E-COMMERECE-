"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import {
  audiencePageContent,
  formatPrice,
  getProductsByAudience,
  kidsAgeGroups,
  type Audience
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

export function CatalogPage({ audience }: { audience: Audience }) {
  const copy = audiencePageContent[audience];
  const products = getProductsByAudience(audience);
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState("All");
  const deferredSearch = useDeferredValue(search);
  const { addItem } = useCart();

  // Track selected size per product (keyed by product.id)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  // Track "Added!" flash per product
  const [addedToast, setAddedToast] = useState<Record<string, boolean>>({});

  const visibleProducts = products.filter((product) => {
    const matchesChip =
      activeChip === "All" || product.category.toLowerCase() === activeChip.toLowerCase();
    const query = deferredSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.collection.toLowerCase().includes(query);

    return matchesChip && matchesSearch;
  });

  function handleAddToBag(product: (typeof products)[0]) {
    const size = selectedSizes[product.id] ?? String(product.sizes[0]);
    addItem(product, size);
    setAddedToast((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToast((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
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
            <Link href="/login" className="button">
              Login to save picks
            </Link>
            <Link href="/contact" className="buttonGhost">
              Ask for help
            </Link>
          </div>
          <div className="catalogHero__imageWrap">
            <span className="catalogHero__imageBadge">{copy.eyebrow} visual</span>
            <Image
              className="catalogHero__image"
              src={copy.visualImage}
              alt={copy.visualAlt}
              fill
              sizes="(max-width: 1100px) 100vw, 46vw"
            />
          </div>
        </div>

        <div className="catalogHero__panel catalogHero__panel--accent spaced">
          <div>
            <p className="eyebrow">{copy.eyebrow} spotlight</p>
            <h3>{copy.promoTitle}</h3>
          </div>
          <p>{copy.promoBody}</p>

          <div className="catalogHero__spotlightGrid">
            {products.slice(0, 2).map((product) => (
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

      <section className="filterBar">
        <div className="chipRow">
          {copy.filterChips.map((chip) => (
            <button
              key={chip}
              className={`filterChip ${activeChip === chip ? "is-active" : ""}`}
              onClick={() => startTransition(() => setActiveChip(chip))}
              type="button"
            >
              {chip}
            </button>
          ))}
        </div>
        <input
          className="searchField"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search ${audience} collection`}
          aria-label={`Search ${audience} products`}
        />
      </section>

      <section className="catalogLayout">
        <aside className="categoryPanel">
          <div className="spaced">
            <p className="eyebrow">Quick paths</p>
            <h3>Start from the right aisle</h3>
            <p>
              Jump straight into the right cluster and reduce the amount of
              scrolling it takes to find the right pair.
            </p>
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
                const activeSize =
                  selectedSizes[product.id] ?? String(product.sizes[0]);
                const justAdded = addedToast[product.id];

                return (
                  <article key={product.id} className="productCard">
                    <Link href={`/product/${product.id}`} className="productCard__linkWrap">
                      <div
                        className="productCard__image"
                        style={{ background: product.accent }}
                      >
                        <span className="productCard__badge">{product.badge}</span>
                        <Image
                          className="productCard__media"
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      </div>
                    </Link>

                    <div className="productCard__body">
                      <div className="productMeta">
                        <span>{product.category}</span>
                        <StarRating value={product.rating} />
                      </div>
                      <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h4>{product.name}</h4>
                      </Link>
                      <p>{product.story}</p>

                      {/* ── Interactive size picker ── */}
                      <div className="productSizes__label">
                        Select size:{" "}
                        <strong className="productSizes__active">{activeSize}</strong>
                      </div>
                      <div className="productSizes">
                        {product.sizes.map((size) => {
                          const s = String(size);
                          const isActive = activeSize === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              className={`sizeBtn${isActive ? " sizeBtn--active" : ""}`}
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [product.id]: s
                                }))
                              }
                              aria-label={`Select size ${s}`}
                              aria-pressed={isActive}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>

                      <div className="productFooter">
                        <div className="priceBlock">
                          <strong>
                            {formatPrice(product.discountPrice ?? product.price)}
                          </strong>
                          {product.discountPrice ? (
                            <span>{formatPrice(product.price)}</span>
                          ) : null}
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
                <button
                  type="button"
                  className="buttonGhost"
                  onClick={() => {
                    setSearch("");
                    setActiveChip("All");
                  }}
                >
                  Reset filters
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
                <p>
                  Work wear, lifestyle, and seasonal edits are surfaced higher for speed.
                </p>
              </article>
              <article className="infoCard">
                <strong>Less clutter</strong>
                <p>
                  The page is spaced to feel easier to scan, compare, and trust on first visit.
                </p>
              </article>
              <article className="infoCard">
                <strong>Bag feedback</strong>
                <p>
                  Add any item and the shared bag updates instantly from anywhere in the storefront.
                </p>
              </article>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
