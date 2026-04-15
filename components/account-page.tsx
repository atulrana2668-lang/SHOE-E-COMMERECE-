"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/store-data";

export function AccountPage() {
  const { isReady, user, logout } = useAuth();
  const { itemCount, subtotal } = useCart();

  if (!isReady) {
    return <div className="feedback feedback--warning">Loading your account...</div>;
  }

  if (!user) {
    return (
      <div className="authCard spaced">
        <div>
          <p className="eyebrow">My account</p>
          <h2>Please sign in to open your account.</h2>
        </div>
        <p className="authLead">
          Sign in to view saved details, bag totals, and the next steps for your shopping journey.
        </p>
        <Link href="/login" className="button">
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="pageStack">
      <section className="accountHero">
        <article className="accountCard spaced">
          <div>
            <p className="eyebrow">My account</p>
            <h2>Welcome back, {user.name.split(" ")[0]}.</h2>
          </div>
          <p className="authLead">
            Your bag, account details, and next shopping actions stay together here
            so returning to the storefront feels seamless.
          </p>
          <div className="inlineActions">
            <Link href="/women" className="button">
              Continue shopping
            </Link>
            <button className="buttonGhost" onClick={logout}>
              Sign out
            </button>
          </div>
        </article>

        <article className="accountCard spaced">
          <div>
            <p className="eyebrow">Session summary</p>
            <h3>{user.email}</h3>
          </div>
          <div className="accountGrid">
            <div className="accountStat">
              <strong>{itemCount}</strong>
              <span>items in bag</span>
            </div>
            <div className="accountStat">
              <strong>{formatPrice(subtotal)}</strong>
              <span>current subtotal</span>
            </div>
            <div className="accountStat">
              <strong>Saved session</strong>
              <span>account remembered on this device</span>
            </div>
          </div>
        </article>
      </section>

      <section className="infoGrid">
        <article className="infoCard">
          <strong>Men</strong>
          <p>Explore office, casual, and running edits from the audience-first catalog.</p>
          <Link href="/men" className="buttonSoft">
            Open men
          </Link>
        </article>
        <article className="infoCard">
          <strong>Women</strong>
          <p>Jump into flats, heels, and everyday comfort collections.</p>
          <Link href="/women" className="buttonSoft">
            Open women
          </Link>
        </article>
        <article className="infoCard">
          <strong>Kids</strong>
          <p>Browse school, toddler, and play-focused styles with age-first cues.</p>
          <Link href="/kids" className="buttonSoft">
            Open kids
          </Link>
        </article>
      </section>
    </div>
  );
}
