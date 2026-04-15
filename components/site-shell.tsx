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

const footerLinks = {
  Shop: [
    { href: "/men", label: "Men's Collection" },
    { href: "/women", label: "Women's Collection" },
    { href: "/kids", label: "Kids' Collection" },
  ],
  Help: [
    { href: "/contact", label: "Customer Support" },
    { href: "/contact", label: "Size Guide" },
    { href: "/contact", label: "Returns & Exchanges" },
    { href: "/contact", label: "Track Order" },
  ],
  Company: [
    { href: "/", label: "About Stride Studio" },
    { href: "/", label: "Careers" },
    { href: "/", label: "Press" },
  ],
};

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isOpen, items, itemCount, subtotal, toggleCart, closeCart, updateQuantity, removeItem } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [saleBannerVisible, setSaleBannerVisible] = useState(true);
  const [newsletter, setNewsletter] = useState("");

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
      {/* ── Sale Banner ──────────────────────────────────────── */}
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

      {/* ── Header ───────────────────────────────────────────── */}
      <header className={`siteHeader siteHeader--v2 ${scrolled ? "siteHeader--scrolled" : ""}`}>
        {/* Logo */}
        <Link href="/" className="brand brand--premium" aria-label="Stride Studio home">
          <span className="brand__mark brand__mark--logo">
            <Image src="/logo.png" alt="Stride Studio Logo" width={40} height={40} style={{ objectFit: "contain", borderRadius: "50%" }} priority />
          </span>
          <span className="brand__copy">
            <p>Premium shoe commerce</p>
            <h1>Stride Studio</h1>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={`siteNav siteNav--v2 ${menuOpen ? "is-open" : ""}`}>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`siteNav__link ${pathname === link.href ? "is-active" : ""}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="headerActions headerActions--v2">
          {/* Search */}
          <button className="headerIcon" onClick={() => setSearchOpen(true)} aria-label="Search" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Wishlist */}
          <Link href="/account" className="headerIcon" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>

          {/* Account */}
          <Link href={accountHref} className="headerAction headerAction--v2" aria-label={accountLabel}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span>{accountLabel}</span>
          </Link>

          {/* Cart */}
          <button className="cartTrigger cartTrigger--v2" type="button" onClick={toggleCart} aria-label="Open bag">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>Bag</span>
            {itemCount > 0 && <strong className="cartTrigger__badge">{itemCount}</strong>}
          </button>

          {/* Mobile menu toggle */}
          <button className="menuButton mobileOnly" type="button" onClick={() => setMenuOpen((o) => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* ── Search Overlay ───────────────────────────────────── */}
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

      {/* ── Mobile backdrop ──────────────────────────────────── */}
      {(menuOpen || searchOpen) && (
        <button className="screenBackdrop" type="button" aria-label="Close" onClick={() => { setMenuOpen(false); setSearchOpen(false); }} />
      )}

      {/* ── Page content ─────────────────────────────────────── */}
      <main className="pageShell">{children}</main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="siteFooter siteFooter--v2">
        {/* Top strip */}
        <div className="footerTop">
          <div className="footerTop__trust">
            <div className="footerTrust">
              <span className="footerTrust__icon">🚚</span>
              <div>
                <strong>Free Delivery</strong>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="footerTrust">
              <span className="footerTrust__icon">🔄</span>
              <div>
                <strong>Easy Returns</strong>
                <p>30-day hassle-free</p>
              </div>
            </div>
            <div className="footerTrust">
              <span className="footerTrust__icon">🔒</span>
              <div>
                <strong>Secure Checkout</strong>
                <p>100% safe payments</p>
              </div>
            </div>
            <div className="footerTrust">
              <span className="footerTrust__icon">🏆</span>
              <div>
                <strong>Premium Quality</strong>
                <p>Guaranteed craftsmanship</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="footerMain">
          {/* Brand column */}
          <div className="footerBrand">
            <div className="footerBrand__logo">
              <Image src="/logo.png" alt="Stride Studio" width={44} height={44} style={{ objectFit: "contain", borderRadius: "50%" }} />
              <div>
                <strong>Stride Studio</strong>
                <p>Premium footwear</p>
              </div>
            </div>
            <p className="footerBrand__desc">
              Hand-curated collections for men, women, and kids. Premium leather, performance runners, and everyday comfort — all in one storefront.
            </p>
            <div className="footerSocials">
              <a href="#" aria-label="Instagram" className="footerSocial">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="footerSocial">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="footerSocial">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="footerSocial">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="footerCol">
              <h4 className="footerCol__heading">{heading}</h4>
              <ul className="footerCol__list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="footerNewsletter">
            <h4 className="footerCol__heading">Stay in the Loop</h4>
            <p>Get exclusive drops, early sale access, and style guides delivered to your inbox.</p>
            <form className="footerNewsletter__form" onSubmit={(e) => { e.preventDefault(); setNewsletter(""); }}>
              <input
                type="email"
                placeholder="Your email address"
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.value)}
                required
                className="footerNewsletter__input"
              />
              <button type="submit" className="button footerNewsletter__btn">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footerBottom">
          <p>© {new Date().getFullYear()} Stride Studio. All rights reserved. Crafted with care for premium shoppers.</p>
          <div className="footerBottom__links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </footer>

      {/* ── Cart panel overlay ──────────────────────────────── */}
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
          <Link href="/checkout" className="button" style={{ width: "100%", textAlign: "center", display: "block" }} onClick={closeCart}>
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
