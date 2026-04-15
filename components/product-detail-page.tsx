"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice, type Product } from "@/lib/store-data";

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

export function ProductDetailPage({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(String(product.sizes[0]));
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToBag() {
    addItem(product, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="pageStack">
      {/* Breadcrumb */}
      <nav className="spaced" aria-label="Breadcrumb">
        <div style={{ padding: "20px 20px 0", fontSize: "0.9rem", display: "flex", gap: "8px", color: "var(--muted)" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${product.audience}`} style={{ textTransform: "capitalize" }}>
            {product.audience}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text)", fontWeight: 600 }}>{product.name}</span>
        </div>
      </nav>

      <section className="productDetailLayout">
        {/* Left: Product Media */}
        <div className="productDetail__media" style={{ background: product.accent }}>
          <span className="productCard__badge" style={{ top: "24px", left: "24px" }}>
            {product.badge}
          </span>
          <div className="productDetail__imageWrap">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="productDetail__image"
              sizes="(max-width: 860px) 100vw, 55vw"
              priority
            />
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="productDetail__info">
          <div className="productDetail__meta">
            <span className="productDetail__category">{product.category}</span>
            <div className="productDetail__reviews">
              <StarRating value={product.rating} />
              <span>({product.reviewCount} reviews)</span>
            </div>
          </div>
          <h1 className="productDetail__title">{product.name}</h1>
          <p className="productDetail__price">
            <strong>{formatPrice(product.discountPrice ?? product.price)}</strong>
            {product.discountPrice && (
              <span className="productDetail__priceOld">{formatPrice(product.price)}</span>
            )}
          </p>
          <p className="productDetail__story">{product.story}</p>

          <div className="productDetail__sizeSelector">
            <div className="productDetail__sizeLabel">
              Select size: <strong>{selectedSize}</strong>
            </div>
            <div className="productSizes">
              {product.sizes.map((size) => {
                const s = String(size);
                const isActive = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    className={`sizeBtn${isActive ? " sizeBtn--active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                    aria-label={`Select size ${s}`}
                    aria-pressed={isActive}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="productDetail__actions">
            <button
              onClick={handleAddToBag}
              className={`button button--large${justAdded ? " button--added" : ""}`}
              style={{ width: "100%", padding: "20px" }}
              aria-label={`Add ${product.name} to bag`}
              type="button"
            >
              {justAdded ? "✓ Added to bag!" : "Add to bag"}
            </button>
          </div>

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

      {/* Product Details Section Additions */}
      <section className="infoGrid" style={{ padding: "20px" }}>
        <article className="infoCard">
          <strong>Premium Quality</strong>
          <p>Hand-crafted with the finest materials to ensure unmatched durability and performance.</p>
        </article>
        <article className="infoCard">
          <strong>Sizing Help</strong>
          <p>Fits true to size. If you are between sizes, we recommend ordering half a size up.</p>
        </article>
        <article className="infoCard">
          <strong>Care Guide</strong>
          <p>Wipe clean with a damp cloth. Avoid harsh chemicals or machine washing.</p>
        </article>
      </section>
    </div>
  );
}
