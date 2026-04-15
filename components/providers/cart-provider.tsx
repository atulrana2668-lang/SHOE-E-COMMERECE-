"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { Product } from "@/lib/store-data";

type CartLine = Product & {
  lineId: string;
  quantity: number;
  selectedSize: string;
};

type CartContextValue = {
  isOpen: boolean;
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, size?: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  toggleCart: () => void;
  closeCart: () => void;
};

const CART_KEY = "stride-studio.cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartLine[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) {
      return;
    }

    try {
      setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
      0
    );

    return {
      isOpen,
      items,
      itemCount,
      subtotal,
      addItem(product, size) {
        const selectedSize = size ?? product.sizes[0];
        const lineId = `${product.id}-${selectedSize}`;

        setItems((current) => {
          const existing = current.find((item) => item.lineId === lineId);
          if (existing) {
            return current.map((item) =>
              item.lineId === lineId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          return [
            ...current,
            {
              ...product,
              lineId,
              quantity: 1,
              selectedSize
            }
          ];
        });

        setIsOpen(true);
      },
      updateQuantity(lineId, quantity) {
        if (quantity <= 0) {
          setItems((current) => current.filter((item) => item.lineId !== lineId));
          return;
        }

        setItems((current) =>
          current.map((item) =>
            item.lineId === lineId ? { ...item, quantity } : item
          )
        );
      },
      removeItem(lineId) {
        setItems((current) => current.filter((item) => item.lineId !== lineId));
      },
      toggleCart() {
        setIsOpen((open) => !open);
      },
      closeCart() {
        setIsOpen(false);
      }
    };
  }, [isOpen, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
