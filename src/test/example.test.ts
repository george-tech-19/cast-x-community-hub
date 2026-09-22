import { describe, it, expect } from "vitest";
import { getDiscountedPrice, getDiscountPercentage } from "@/lib/discounts";
import type { Product } from "@/lib/products";

const warmBeigeProduct: Product = {
  slug: "warm-beige-shirt",
  name: "ONLY GOD SAVES WARM BEIGE TSHIRT",
  price: 26.23,
  priceLabel: "$26.23",
  category: "T-Shirts",
  image: "",
  images: [""],
  description: "Warm beige tee",
  sizes: ["M"],
  colors: [{ name: "Warm Beige", value: "#F5F5F5" }],
  features: ["Feature"],
};

const greyProduct: Product = {
  ...warmBeigeProduct,
  slug: "grey-shirt",
  name: "ONLY GOD SAVES GREY TSHIRT",
  category: "T-Shirts",
  price: 17.49,
  priceLabel: "$17.49",
};

describe("discount behavior", () => {
  it("should apply a warm beige Cameroon discount at 12500 XAF only", () => {
    expect(getDiscountedPrice(warmBeigeProduct, "CM")).toBeCloseTo(12500 / 562.5, 5);
    expect(getDiscountPercentage(warmBeigeProduct, "CM")).toBeGreaterThan(0);
    expect(getDiscountedPrice(greyProduct, "CM")).toBe(greyProduct.price);
    expect(getDiscountPercentage(greyProduct, "CM")).toBe(0);
  });
});
