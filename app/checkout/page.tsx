import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout | GOAT",
  description: "Complete your order — review your bag, confirm your size selections, and place your order."
};

export default function Checkout() {
  return <CheckoutPage />;
}
