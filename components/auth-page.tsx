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
    <div className="goatAuthPage">
      <article className="auth-modal auth-modal--page">
        <Link className="modal-close" href="/" aria-label="Close login">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </Link>

        <div className="auth-logo">GOAT<span>.</span></div>
        <h2 className="auth-h2">
          {user ? `Welcome back, ${user.name.split(" ")[0]}` : mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="auth-sub">
          {mode === "login"
            ? "Sign in to your account to continue shopping"
            : "Create an account to save your bag and checkout faster"}
        </p>

        {!isReady ? <div className="feedback feedback--warning">Loading account state...</div> : null}
        {feedback ? (
          <div className={`feedback ${feedback.type === "success" ? "feedback--success" : "feedback--error"}`}>
            {feedback.text}
          </div>
        ) : null}

        {user ? (
          <div className="goatAuthSignedIn">
            <p>You are signed in as {user.email}.</p>
            <Link href="/account" className="form-submit goatAuthLinkButton">
              Open Account
            </Link>
            <button className="goatAuthSecondary" type="button" onClick={logout}>
              Sign out
            </button>
          </div>
        ) : mode === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email address</label>
              <input className="form-input" id="login-email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label form-label--split" htmlFor="login-password">
                Password
                <Link href="/contact">Forgot password?</Link>
              </label>
              <input className="form-input" id="login-password" name="password" type="password" required placeholder="Enter your password" />
            </div>
            <button className="form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label" htmlFor="register-name">Full name</label>
              <input className="form-input" id="register-name" name="name" required placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-email">Email address</label>
              <input className="form-input" id="register-email" name="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-password">Password</label>
              <input className="form-input" id="register-password" name="password" type="password" required placeholder="At least 6 characters" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="register-confirm-password">Confirm password</label>
              <input className="form-input" id="register-confirm-password" name="confirmPassword" type="password" required placeholder="Repeat your password" />
            </div>
            <button className="form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {!user ? (
          <>
            <div className="auth-divider">or continue with</div>
            <div className="goatSocialRow">
              <button type="button" className="goatSocialButton">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button type="button" className="goatSocialButton">Phone OTP</button>
            </div>
            <div className="auth-switch">
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Create one free" : "Sign in"}
              </button>
            </div>
          </>
        ) : null}
      </article>
    </div>
  );
}
