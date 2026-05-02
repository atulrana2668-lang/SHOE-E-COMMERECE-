"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { formatPrice } from "@/lib/store-data";
import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/kids", label: "Kids" },
  { href: "/contact", label: "Contact" }
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { isOpen, items, itemCount, subtotal, toggleCart, closeCart, updateQuantity, removeItem } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [saleBannerVisible, setSaleBannerVisible] = useState(true);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const accountLabel = user ? user.name.split(" ")[0] : "Login";
  const accountHref = user ? "/account" : "/login";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/men?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <div className="siteFrame">
      {saleBannerVisible && (
        <div className="saleBanner">
          <div className="saleBanner__inner">
            <span className="saleBanner__fire">🔥</span>
            <span className="saleBanner__text">
              <strong>MEGA SALE — Up to 50% OFF</strong>
              <span className="saleBanner__divider">|</span>
              Unbeatable prices on 100+ styles this season!
            </span>
            <Link href="/men" className="saleBanner__cta">Shop Sale →</Link>
          </div>
          <button
            className="saleBanner__close"
            onClick={() => setSaleBannerVisible(false)}
            aria-label="Close sale banner"
          >
            ✕
          </button>
        </div>
      )}

      <header className={`siteHeader siteHeader--v2 ${scrolled ? "siteHeader--scrolled" : ""}`}>
        <Link href="/" className="brand brand--premium" aria-label="GOAT home">
          <span className="brand__mark brand__mark--logo">
            <Image src="/logo.png" alt="GOAT Logo" width={40} height={40} style={{ objectFit: "contain", borderRadius: "50%" }} priority />
          </span>
          <span className="brand__copy">
            <p>Premium shoe commerce</p>
            <h1>GOAT</h1>
          </span>
        </Link>

        <nav className={`siteNav siteNav--v2 ${menuOpen ? "is-open" : ""}`}>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`siteNav__link ${pathname === link.href ? "is-active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="headerActions headerActions--v2">
          <button className="headerIcon" onClick={() => setSearchOpen(true)} aria-label="Search" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <Link href="/account" className="headerIcon" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>

          <Link href={accountHref} className="headerAction headerAction--v2" aria-label={accountLabel}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span>{accountLabel}</span>
          </Link>

          <button className="cartTrigger cartTrigger--v2" type="button" onClick={toggleCart} aria-label="Open bag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Bag</span>
            {itemCount > 0 && <strong className="cartTrigger__badge">{itemCount}</strong>}
          </button>

          <button className="menuButton mobileOnly" type="button" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {searchOpen && (
        <div className="searchOverlay" onClick={() => setSearchOpen(false)}>
          <div className="searchOverlay__box" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSearch} className="searchOverlay__form">
              <input
                autoFocus
                className="searchOverlay__input"
                placeholder="Search sneakers, formals, sandals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="searchOverlay__btn">Search →</button>
              <button type="button" className="searchOverlay__close" onClick={() => setSearchOpen(false)}>✕</button>
            </form>
          </div>
        </div>
      )}

      {(menuOpen || searchOpen) && (
        <button className="screenBackdrop" type="button" aria-label="Close" onClick={() => { setMenuOpen(false); setSearchOpen(false); }} />
      )}

      <main className="pageShell">{children}</main>

      <section className="customerReviews" aria-labelledby="customer-reviews-title">
        <div className="customerReviews__header">
          <p className="eyebrow">Customer reviews</p>
          <h2 id="customer-reviews-title">Trusted by shoppers across India</h2>
        </div>
        <div className="customerReviews__grid">
          <article className="customerReviewCard">
            <div className="customerReviewCard__stars">★★★★★</div>
            <p>The Air Jordan pair arrived in perfect condition. Premium packaging, fast delivery, and the sizing was spot on.</p>
            <div>
              <strong>Arjun Kumar</strong>
              <span>Mumbai, India</span>
            </div>
          </article>
          <article className="customerReviewCard">
            <div className="customerReviewCard__stars">★★★★★</div>
            <p>GOAT made checkout easy and the return support was genuinely helpful when I needed a size exchange.</p>
            <div>
              <strong>Priya Rao</strong>
              <span>Bengaluru, India</span>
            </div>
          </article>
          <article className="customerReviewCard">
            <div className="customerReviewCard__stars">★★★★★</div>
            <p>The catalog feels curated, not crowded. I found running shoes and office pairs in one smooth visit.</p>
            <div>
              <strong>Vikram Singh</strong>
              <span>Delhi, India</span>
            </div>
          </article>
        </div>
      </section>

      <footer className="goatFooter">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="nav-logo" href="/" aria-label="GOAT home">GOAT<span>.</span></Link>
            <p className="footer-desc">India&apos;s most curated premium footwear destination. Every pair, a story.</p>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <div className="footer-links">
              <Link href="/men">New Arrivals</Link>
              <Link href="/men">Running</Link>
              <Link href="/women">Casual</Link>
              <Link href="/women">Luxury</Link>
              <Link href="/kids">Sale</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <div className="footer-links">
              <Link href="/contact">Size Guide</Link>
              <Link href="/contact">Track Order</Link>
              <Link href="/contact">Returns</Link>
              <Link href="/contact">FAQ</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-links">
              <Link href="/">About GOAT</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Press</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} GOAT Footwear Pvt Ltd. All rights reserved.</span>
          <div className="footer-legal">
            <Link href="/contact">Privacy</Link>
            <Link href="/contact">Terms</Link>
            <Link href="/contact">Cookies</Link>
          </div>
        </div>
      </footer>

      {isOpen && (
        <button className="screenBackdrop" type="button" aria-label="Close bag" onClick={closeCart} />
      )}

      <aside className={`cartPanel ${isOpen ? "is-open" : ""}`}>
        <div className="cartPanel__header">
          <div>
            <p className="eyebrow">Your Bag</p>
            <h3>{itemCount} {itemCount === 1 ? "item" : "items"}</h3>
          </div>
          <button className="buttonGhost" type="button" onClick={closeCart}>Close ✕</button>
        </div>

        <div className="cartPanel__items">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.lineId} className="cartLine">
                <Image className="cartLine__image" src={item.image} alt={item.name} width={76} height={76} />
                <div className="cartLine__copy">
                  <strong className="cartLine__title">{item.name}</strong>
                  <span className="cartLine__meta">{item.category} · Size {item.selectedSize}</span>
                  <span className="cartLine__meta">{formatPrice(item.discountPrice ?? item.price)}</span>
                  <div className="cartQuantity">
                    <button type="button" aria-label={`Decrease quantity for ${item.name}`} onClick={() => updateQuantity(item.lineId, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Increase quantity for ${item.name}`} onClick={() => updateQuantity(item.lineId, item.quantity + 1)}>+</button>
                    <button type="button" aria-label={`Remove ${item.name} from bag`} onClick={() => removeItem(item.lineId)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="emptyCard">
              <h3>Your bag is empty</h3>
              <p>Browse a category and add a pair.</p>
            </div>
          )}
        </div>

        <div className="cartPanel__footer">
          <div className="cartPanel__summary">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <Link href="/checkout" className="button" style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center" }} onClick={closeCart}>
            Proceed to Checkout →
          </Link>
          <p className="muted" style={{ fontSize: "0.8rem", marginTop: 8 }}>
            Free delivery on orders above ₹999 · 30-day easy returns
          </p>
        </div>
      </aside>
    </div>
  );
}
