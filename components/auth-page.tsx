"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";

export function AuthPage() {
  const { isReady, user, login, register, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const router = useRouter();

  // Auto-redirect already logged-in users to their account homepage
  useEffect(() => {
    if (isReady && user) {
      router.replace("/account");
    }
  }, [isReady, user, router]);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await login(email, password);
      setFeedback({ type: "success", text: "Signed in successfully." });
      router.push("/account");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in.";
      setFeedback({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (password.length < 6) {
      setFeedback({ type: "error", text: "Password should be at least 6 characters long." });
      return;
    }

    if (password !== confirmPassword) {
      setFeedback({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await register(name, email, password);
      setFeedback({ type: "success", text: "Account created successfully." });
      router.push("/account");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create account.";
      setFeedback({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="authLayout">
      <article className="authCard spaced">
        <div>
          <p className="eyebrow">My account</p>
          <h2>Sign in to save your bag and move faster at checkout.</h2>
        </div>
        <p className="authLead">
          Access saved details, keep your bag across visits, and return to shopping
          with less friction on every device.
        </p>

        {user ? (
          <div className="feedback feedback--success">
            You are signed in as {user.email}. You can open your account page or sign out here.
          </div>
        ) : null}

        {!isReady ? (
          <div className="feedback feedback--warning">Loading account state...</div>
        ) : null}

        {feedback ? (
          <div
            className={`feedback ${
              feedback.type === "success" ? "feedback--success" : "feedback--error"
            }`}
          >
            {feedback.text}
          </div>
        ) : null}

        {user ? (
          <div className="inlineActions">
            <Link href="/account" className="button">
              Open account
            </Link>
            <button className="buttonGhost" onClick={logout}>
              Sign out
            </button>
          </div>
        ) : (
          <>
            <div className="authCard__tabs">
              <button
                className={mode === "login" ? "is-active" : ""}
                onClick={() => setMode("login")}
                type="button"
              >
                Sign in
              </button>
              <button
                className={mode === "register" ? "is-active" : ""}
                onClick={() => setMode("register")}
                type="button"
              >
                Create account
              </button>
            </div>

            {mode === "login" ? (
              <form className="formGrid" onSubmit={handleLogin}>
                <div className="formField">
                  <label htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <div className="formField">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                  />
                </div>
                <button className="button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </form>
            ) : (
              <form className="formGrid" onSubmit={handleRegister}>
                <div className="formField">
                  <label htmlFor="register-name">Full name</label>
                  <input
                    id="register-name"
                    name="name"
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="formField">
                  <label htmlFor="register-email">Email</label>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <div className="formRow">
                  <div className="formField">
                    <label htmlFor="register-password">Password</label>
                    <input
                      id="register-password"
                      name="password"
                      type="password"
                      required
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div className="formField">
                    <label htmlFor="register-confirm-password">Confirm password</label>
                    <input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="Repeat your password"
                    />
                  </div>
                </div>
                <button className="button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </form>
            )}
          </>
        )}
      </article>

      <article className="authCard editorialCard--dark spaced">
        <div>
          <p className="eyebrow">Member benefits</p>
          <h2>A calmer checkout starts with a remembered shopper.</h2>
        </div>
        <p className="authLead">
          Signing in gives the storefront continuity: saved bag state, quicker account
          access, and a smoother support experience when questions come up.
        </p>
        <div className="authPerks">
          <div>
            <strong>Saved bag</strong>
            <span>Come back later and keep moving from where you left off.</span>
          </div>
          <div>
            <strong>Faster account access</strong>
            <span>Open account details and support paths without starting over.</span>
          </div>
          <div>
            <strong>Order-ready flow</strong>
            <span>The UI is shaped so order history and addresses can slot in naturally next.</span>
          </div>
        </div>
      </article>
    </div>
  );
}
