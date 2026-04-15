"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { formatPrice, utilityHighlights } from "@/lib/store-data";
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
  const { user } = useAuth();
  const { isOpen, items, itemCount, subtotal, toggleCart, closeCart, updateQuantity, removeItem } =
    useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const accountLabel = user ? user.name.split(" ")[0] : "Login";
  const accountHref = user ? "/account" : "/login";

  return (
    <div className="siteFrame">
      <div className="utilityBar">
        <div className="utilityBar__inner">
          {utilityHighlights.map((highlight) => (
            <span key={highlight} className="utilityBadge">
              {highlight}
            </span>
          ))}
        </div>
      </div>

      <header className="siteHeader">
        <Link href="/" className="brand brand--premium" aria-label="Stride Studio home">
          <span className="brand__mark brand__mark--logo">
            <Image
              src="/logo.png"
              alt="Stride Studio Logo"
              width={44}
              height={44}
              style={{ objectFit: 'contain', borderRadius: '50%' }}
              priority
            />
          </span>
          <span className="brand__copy">
            <p>Premium shoe commerce</p>
            <h1>Stride Studio</h1>
          </span>
        </Link>

        <button
          className="menuButton mobileOnly"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          Menu
        </button>

        <nav className={`siteNav ${menuOpen ? "is-open" : ""}`}>
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="headerActions">
          <Link href={accountHref} className="headerAction">
            {accountLabel}
          </Link>
          <button
            className="cartTrigger"
            type="button"
            onClick={toggleCart}
            aria-label="Open bag"
          >
            <span>Bag</span>
            <strong>{itemCount}</strong>
          </button>
        </div>
      </header>

      {menuOpen ? (
        <button
          className="screenBackdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main className="pageShell">{children}</main>

      <footer className="siteFooter siteFooter--rich">
        {/* Brand Story */}
        <div className="siteFooter__card spaced">
          <div className="siteFooter__brand">
            <Image src="/logo.png" alt="Stride Studio" width={48} height={48} style={{ objectFit: 'contain', borderRadius: '50%' }} />
            <div>
              <p className="eyebrow">Stride Studio</p>
              <h3>Premium footwear, clearer discovery.</h3>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 16, lineHeight: 1.75 }}>
            Hand-curated collections for men, women, and kids. Premium leather, performance runners, and everyday comfort — all in one storefront.
          </p>
          <div className="siteFooter__trustRow">
            <span>🚚 Free delivery above ₹999</span>
            <span>🔄 30-day easy returns</span>
            <span>🔒 Secure checkout</span>
          </div>
          <div className="inlineActions" style={{ marginTop: 20 }}>
            <Link href="/men" className="button">Shop now</Link>
            <Link href="/contact" className="buttonGhost">Get help</Link>
          </div>
        </div>

        {/* Navigation + Account */}
        <div className="siteFooter__links">
          <div>
            <p className="eyebrow">Browse</p>
            <h4 style={{ margin: '8px 0 16px', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', fontSize: '1.4rem' }}>Quick links</h4>
          </div>
          <div className="footerLinkGrid">
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span>{link.label}</span>
                <span aria-hidden>→</span>
              </Link>
            ))}
            <Link href={accountHref}>
              <span>{user ? 'My Account' : 'Login'}</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="siteFooter__legal">
            <p>© {new Date().getFullYear()} Stride Studio. All rights reserved.</p>
            <p style={{ marginTop: 4, fontSize: '0.8rem' }}>Crafted with care for premium shoppers.</p>
          </div>
        </div>
      </footer>

      {isOpen ? (
        <button
          className="screenBackdrop"
          type="button"
          aria-label="Close bag"
          onClick={closeCart}
        />
      ) : null}

      <aside className={`cartPanel ${isOpen ? "is-open" : ""}`}>
        <div className="cartPanel__header">
          <div>
            <p className="eyebrow">Bag</p>
            <h3>{itemCount} item(s)</h3>
          </div>
          <button className="buttonGhost" type="button" onClick={closeCart}>
            Close
          </button>
        </div>

        <div className="cartPanel__items">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.lineId} className="cartLine">
                <Image
                  className="cartLine__image"
                  src={item.image}
                  alt={item.name}
                  width={76}
                  height={76}
                />
                <div className="cartLine__copy">
                  <strong className="cartLine__title">{item.name}</strong>
                  <span className="cartLine__meta">
                    {item.category} | Size {item.selectedSize}
                  </span>
                  <span className="cartLine__meta">
                    {formatPrice(item.discountPrice ?? item.price)}
                  </span>
                  <div className="cartQuantity">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.name}`}
                      onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name} from bag`}
                      onClick={() => removeItem(item.lineId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="emptyCard">
              <h3>Your bag is still empty</h3>
              <p>Browse a category page and add a pair to see live cart feedback here.</p>
            </div>
          )}
        </div>

        <div className="cartPanel__footer">
          <div className="cartPanel__summary">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <Link href="/checkout" className="button" onClick={closeCart}>
            Proceed to Checkout →
          </Link>
          <p className="muted">
            Your bag stays available across the storefront so you can keep browsing
            without losing progress.
          </p>
        </div>
      </aside>
    </div>
  );
}
