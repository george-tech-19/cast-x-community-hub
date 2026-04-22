import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
  color: string;
  size: string;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, options?: { color?: string; size?: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (product: Product, color: string, size: string) => boolean;
  toggleCart: (product: Product, options?: { color?: string; size?: string }) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const localStorageKey = "castx-cart";

const getInitialCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(localStorageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(items));
  }, [items]);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const createCartId = (product: Product, color: string, size: string) =>
    `${product.slug}:${color}:${size}`;

  const isInCart = (product: Product, color: string, size: string) => {
    const id = createCartId(product, color, size);
    return items.some((item) => item.id === id);
  };

  const toggleCart = (product: Product, options: { color?: string; size?: string } = {}) => {
    const color = options.color ?? product.colors[0]?.name ?? "Default";
    const size = options.size ?? product.sizes[0] ?? "One Size";
    const id = createCartId(product, color, size);

    if (isInCart(product, color, size)) {
      removeFromCart(id);
    } else {
      addToCart(product, options);
    }
  };

  const addToCart = (product: Product, options: { color?: string; size?: string } = {}) => {
    const color = options.color ?? product.colors[0]?.name ?? "Default";
    const size = options.size ?? product.sizes[0] ?? "One Size";
    const id = createCartId(product, color, size);

    setItems((previous) => {
      const existing = previous.find((item) => item.id === id);
      if (existing) {
        return previous.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...previous,
        { id, product, quantity: 1, color, size },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((previous) =>
      previous
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart, isInCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
