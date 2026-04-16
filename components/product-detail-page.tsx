"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice, products as allProducts, type Product } from "@/lib/store-data";

const WISHLIST_KEY = "goat.wishlist";

function StarRating({ value }: { value: number }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      {"*****"}
      <span className="rating__fill" style={{ width: `${(value / 5) * 100}%` }}>{"*****"}</span>
    </span>
  );
}

export function ProductDetailPage({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(String(product.sizes[0]));
  const [justAdded, setJustAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  // Related products: same audience, excluding this product
  const related = allProducts.filter((p) => p.audience === product.audience && p.id !== product.id).slice(0, 4);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]") as string[];
      setLiked(saved.includes(product.id));
    } catch { /* ignore */ }
  }, [product.id]);

  function toggleWishlist() {
    try {
      const saved = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]") as string[];
      const next = liked ? saved.filter((id) => id !== product.id) : [...saved, product.id];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setLiked(!liked);
    } catch { /* ignore */ }
  }

  function handleAddToBag() {
    addItem(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  const discount = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="pageStack">
      {/* Breadcrumb */}
      <nav className="spaced" aria-label="Breadcrumb">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${product.audience}`} style={{ textTransform: "capitalize" }}>{product.audience}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </nav>

      <section className="productDetailLayout">
        {/* Left: Product Media */}
        <div className="productDetail__media" style={{ background: product.accent }}>
          <span className="productCard__badge" style={{ top: "24px", left: "24px" }}>{product.badge}</span>
          {discount > 0 && (
            <span className="productCard__discount" style={{ top: "24px", right: "24px", left: "auto" }}>
              -{discount}%
            </span>
          )}
          <div className="productDetail__imageWrap">
            <Image src={product.image} alt={product.name} fill className="productDetail__image" sizes="(max-width: 860px) 100vw, 55vw" priority />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="productDetail__info">
          <div className="productDetail__meta">
            <span className="productDetail__category">{product.category}</span>
            <div className="productDetail__reviews">
              <StarRating value={product.rating} />
              <span>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div className="productDetail__titleRow">
            <h1 className="productDetail__title">{product.name}</h1>
            {/* Wishlist heart */}
            <button
              type="button"
              className={`wishlistBtn wishlistBtn--pdp ${liked ? "wishlistBtn--liked" : ""}`}
              onClick={toggleWishlist}
              aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <p className="productDetail__price">
            <strong>{formatPrice(product.discountPrice ?? product.price)}</strong>
            {product.discountPrice && (
              <>
                <span className="productDetail__priceOld">{formatPrice(product.price)}</span>
                <span className="productDetail__discountBadge">Save {discount}%</span>
              </>
            )}
          </p>
          <p className="productDetail__story">{product.story}</p>

          {/* Size selector */}
          <div className="productDetail__sizeSelector">
            <div className="productDetail__sizeLabel">
              Select size: <strong>{selectedSize}</strong>
            </div>
            <div className="productSizes">
              {product.sizes.map((size) => {
                const s = String(size);
                return (
                  <button
                    key={s}
                    type="button"
                    className={`sizeBtn${selectedSize === s ? " sizeBtn--active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                    aria-label={`Select size ${s}`}
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="productDetail__actions">
            <button
              onClick={handleAddToBag}
              className={`button button--large${justAdded ? " button--added" : ""}`}
              style={{ flex: 1, padding: "18px 24px" }}
              aria-label={`Add ${product.name} to bag`}
              type="button"
            >
              {justAdded ? "✓ Added to bag!" : "Add to Bag"}
            </button>
            <button
              onClick={toggleWishlist}
              className={`buttonGhost wishlistBtn--action ${liked ? "wishlistBtn--liked" : ""}`}
              type="button"
              style={{ padding: "18px 20px" }}
              aria-label={liked ? "Remove from wishlist" : "Save to wishlist"}
            >
              {liked ? "♥ Saved" : "♡ Save"}
            </button>
          </div>

          {/* Highlights */}
          <div className="productDetail__highlights">
            <div className="highlightItem">
              <div className="highlightIcon">🚚</div>
              <div>
                <strong>Free Delivery & Returns</strong>
                <p>On all orders above ₹999. Try them on at home.</p>
              </div>
            </div>
            <div className="highlightItem">
              <div className="highlightIcon">🛡️</div>
              <div>
                <strong>100% Quality Guarantee</strong>
                <p>Premium materials and expert craftsmanship guaranteed.</p>
              </div>
            </div>
            <div className="highlightItem">
              <div className="highlightIcon">👟</div>
              <div>
                <strong>{product.collection} Collection</strong>
                <p>Specially curated for the {product.audience} audience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="infoGrid" style={{ padding: "20px" }}>
        <article className="infoCard">
          <strong>Premium Quality</strong>
          <p>Hand-crafted with the finest materials for unmatched durability and performance.</p>
        </article>
        <article className="infoCard">
          <strong>Sizing Help</strong>
          <p>Fits true to size. If between sizes, we recommend ordering half a size up.</p>
        </article>
        <article className="infoCard">
          <strong>Care Guide</strong>
          <p>Wipe clean with a damp cloth. Avoid harsh chemicals or machine washing.</p>
        </article>
      </section>

      {/* ── Related / Recommended Products ──────────────────── */}
      {related.length > 0 && (
        <section className="pageStack recommendedSection">
          <div className="panelHeader">
            <div>
              <p className="eyebrow">More from {product.audience}</p>
              <h2 className="sectionTitle">You May Also Like</h2>
            </div>
          </div>
          <div className="productGrid productGrid--4col">
            {related.map((rel) => {
              const relDiscount = rel.discountPrice
                ? Math.round(((rel.price - rel.discountPrice) / rel.price) * 100)
                : 0;
              return (
                <article key={rel.id} className="productCard productCard--v2">
                  <div className="productCard__image" style={{ background: rel.accent }}>
                    <Link href={`/product/${rel.id}`} className="productCard__imageLink">
                      <Image className="productCard__media" src={rel.image} alt={rel.name} fill sizes="(max-width: 640px) 100vw, 25vw" />
                    </Link>
                    <div className="productCard__badges">
                      <span className="productCard__badge">{rel.badge}</span>
                      {rel.isNew && <span className="productCard__newBadge">NEW</span>}
                    </div>
                    {relDiscount > 0 && <span className="productCard__discount">-{relDiscount}%</span>}
                    <WishlistBtn productId={rel.id} />
                  </div>
                  <div className="productCard__body">
                    <div className="productMeta">
                      <span>{rel.category}</span>
                      <StarRating value={rel.rating} />
                    </div>
                    <Link href={`/product/${rel.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h4>{rel.name}</h4>
                    </Link>
                    <div className="priceBlock" style={{ marginTop: 10 }}>
                      <strong>{formatPrice(rel.discountPrice ?? rel.price)}</strong>
                      {rel.discountPrice && <span>{formatPrice(rel.price)}</span>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// WishlistBtn reused on related cards
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
      const next = liked ? saved.filter((id) => id !== productId) : [...saved, productId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setLiked(!liked);
    } catch { /* ignore */ }
  }

  return (
    <button type="button" className={`wishlistBtn ${liked ? "wishlistBtn--liked" : ""}`} onClick={toggle} aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}>
      <svg viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
