"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { formatPrice } from "@/lib/store-data";

type OrderStep = "review" | "details" | "confirm";

export function CheckoutPage() {
  const { items, subtotal, itemCount, removeItem, closeCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<OrderStep>("review");
  const [placed, setPlaced] = useState(false);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payMode: "cod"
  });

  const deliveryFee = subtotal >= 999 ? 0 : 99;
  const total = subtotal + deliveryFee;

  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setStep("confirm");
    setPlaced(true);
  }

  if (itemCount === 0 && !placed) {
    return (
      <div className="pageStack">
        <div className="emptyCard" style={{ textAlign: "center", padding: "60px 28px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🛍️</div>
          <h2>Your bag is empty</h2>
          <p>Add some shoes before heading to checkout.</p>
          <div className="inlineActions" style={{ justifyContent: "center", marginTop: "24px" }}>
            <Link href="/men" className="button">Shop Men</Link>
            <Link href="/women" className="buttonGhost">Shop Women</Link>
          </div>
        </div>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="pageStack">
        <div className="checkoutSuccess">
          <div className="checkoutSuccess__icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you, <strong>{form.name || user?.name || "valued customer"}</strong>!
            Your order of <strong>{itemCount} item(s)</strong> worth{" "}
            <strong>{formatPrice(total)}</strong> has been placed.
          </p>
          <div className="checkoutSuccess__detail">
            <span>📦 Estimated delivery: 2–5 business days</span>
            <span>📧 Confirmation sent to {form.email}</span>
            {form.payMode === "cod" && <span>💵 Pay on delivery</span>}
            {form.payMode === "card" && <span>💳 Paid online</span>}
          </div>
          <div className="inlineActions" style={{ justifyContent: "center", marginTop: "28px" }}>
            <Link href="/" className="button">Continue shopping</Link>
            <Link href="/account" className="buttonGhost">My account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pageStack">
      {/* Progress steps */}
      <div className="checkoutSteps">
        {(["review", "details", "confirm"] as OrderStep[]).map((s, i) => (
          <div
            key={s}
            className={`checkoutStep ${step === s ? "checkoutStep--active" : ""} ${
              (step === "details" && i === 0) || (step === "confirm" && i < 2)
                ? "checkoutStep--done"
                : ""
            }`}
          >
            <span className="checkoutStep__num">{i + 1}</span>
            <span className="checkoutStep__label">
              {s === "review" ? "Review Bag" : s === "details" ? "Delivery" : "Confirm"}
            </span>
          </div>
        ))}
      </div>

      <div className="checkoutLayout">
        {/* Left: Step content */}
        <div className="checkoutMain">
          {step === "review" && (
            <div className="checkoutCard spaced">
              <p className="eyebrow">Step 1 — Review</p>
              <h2>Your bag ({itemCount} items)</h2>
              <div className="checkoutItems">
                {items.map((item) => (
                  <div key={item.lineId} className="checkoutItem">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="checkoutItem__img"
                    />
                    <div className="checkoutItem__info">
                      <strong>{item.name}</strong>
                      <span>{item.category} · Size {item.selectedSize} · Qty {item.quantity}</span>
                      <span className="checkoutItem__price">
                        {formatPrice((item.discountPrice ?? item.price) * item.quantity)}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="checkoutItem__remove"
                      onClick={() => removeItem(item.lineId)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="button"
                style={{ marginTop: "20px", width: "100%" }}
                onClick={() => setStep("details")}
              >
                Continue to delivery →
              </button>
            </div>
          )}

          {step === "details" && (
            <form className="checkoutCard spaced" onSubmit={handlePlaceOrder}>
              <p className="eyebrow">Step 2 — Delivery Details</p>
              <h2>Where should we deliver?</h2>
              <div className="formGrid">
                <div className="formRow">
                  <div className="formField">
                    <label htmlFor="co-name">Full Name</label>
                    <input id="co-name" name="name" required placeholder="Atul Rana" value={form.name} onChange={handleField} />
                  </div>
                  <div className="formField">
                    <label htmlFor="co-phone">Phone</label>
                    <input id="co-phone" name="phone" required type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleField} />
                  </div>
                </div>
                <div className="formField">
                  <label htmlFor="co-email">Email</label>
                  <input id="co-email" name="email" required type="email" placeholder="name@example.com" value={form.email} onChange={handleField} />
                </div>
                <div className="formField">
                  <label htmlFor="co-address">Address</label>
                  <input id="co-address" name="address" required placeholder="House / Street / Area" value={form.address} onChange={handleField} />
                </div>
                <div className="formRow">
                  <div className="formField">
                    <label htmlFor="co-city">City</label>
                    <input id="co-city" name="city" required placeholder="Bengaluru" value={form.city} onChange={handleField} />
                  </div>
                  <div className="formField">
                    <label htmlFor="co-pincode">PIN Code</label>
                    <input id="co-pincode" name="pincode" required placeholder="560001" maxLength={6} value={form.pincode} onChange={handleField} />
                  </div>
                </div>
                <div className="formField">
                  <label htmlFor="co-pay">Payment Method</label>
                  <select id="co-pay" name="payMode" className="searchField" value={form.payMode} onChange={handleField}>
                    <option value="cod">Cash on Delivery</option>
                    <option value="card">Credit / Debit Card (Demo)</option>
                    <option value="upi">UPI (Demo)</option>
                  </select>
                </div>
              </div>
              <div className="inlineActions" style={{ marginTop: "24px" }}>
                <button type="button" className="buttonGhost" onClick={() => setStep("review")}>← Back</button>
                <button type="submit" className="button">Place Order →</button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Order summary */}
        <div className="checkoutSummary">
          <div className="checkoutCard spaced">
            <p className="eyebrow">Order Summary</p>
            <div className="checkoutSummary__lines">
              {items.map((item) => (
                <div key={item.lineId} className="checkoutSummary__line">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatPrice((item.discountPrice ?? item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="checkoutSummary__meta">
              <div>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div>
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
              </div>
              {deliveryFee === 0 && (
                <p className="checkoutSummary__free">🎉 Free delivery applied!</p>
              )}
            </div>
            <div className="checkoutSummary__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
