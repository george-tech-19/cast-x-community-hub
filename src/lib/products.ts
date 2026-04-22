import productHoodie from "@/assets/product-hoodie.jpg";
import productHoodie1 from "@/assets/product-hoodie1.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productTshirt11 from "@/assets/grey3.jpeg";
import productTshirt12 from "@/assets/product-tshirt12.jpg";
import productTshirt13 from "@/assets/productTshirt13.jpeg";
import productTshirt14 from "@/assets/productTshirt14.jpeg";
import productTshirt2 from "@/assets/product-tshirt2.jpg";
import productTshirt21 from "@/assets/grey1.jpeg";
import productTshirt17 from "@/assets/warm1.jpeg";
import productTshirt18 from "@/assets/warm2.jpeg";
import productTshirt19 from "@/assets/warm3.jpeg";
import productAccessories from "@/assets/grey2.jpeg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  category: string;
  image: string;
  images: string[];
  description: string;
  sizes: readonly string[];
  colors: Array<{ name: string; value: string }>;
  features: readonly string[];
};

const rawProducts = [
  {
    slug: "ONLY GOD SAVES GREY TSHIRT",
    name: "ONLY GOD SAVES GREY TSHIRT",
    price: 22,
    priceLabel: "$22",
    category: "T-Shirts",
    image: productHoodie,
    images: [productHoodie, productTshirt11, productTshirt21, productAccessories],
    description: "A minimal essential tee cut for modern streetwear, made from pure organic cotton with a clean finish. Eco friendly/sustainable.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Grey", value: "#808080" },
    ],
    features: [
      "ORGANIC COTTON",
      "BOXY FIT",
      "280 GSM",
      "SCREEN PRINT",
    ],
  },
  {
    slug: "ONLY GOD SAVES DEEP NAVY TSHIRT",
    name: "ONLY GOD SAVES DEEP NAVY TSHIRT",
    price: 32,
    priceLabel: "$32",
    category: "T-Shirts",
    image: productTshirt,
    images: [productTshirt, productTshirt13, productTshirt12, productTshirt14],
    description: "A minimal essential tee cut for modern streetwear, made from pure organic cotton with a clean finish. Eco friendly/sustainable.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Navy", value: "#1F2A44" },
    ],
    features: [
      "COMBED ORGANIC COTTON",
      "BOXY FIT",
      "DOUBLE STITCHED",
      "HEAVY 320 GSM",
      "3D EMBROIDERED PRINT",
    ],
  },
  {
    slug: "ONLY GOD SAVES WARM BEIGE TSHIRT",
    name: "ONLY GOD SAVES WARM BEIGE TSHIRT",
    price: 32,
    priceLabel: "$32",
    category: "T-Shirts",
    image: productTshirt2,
    images: [productTshirt2, productTshirt17, productTshirt18, productTshirt19],
    description: "A minimal essential tee cut for modern streetwear, made from pure organic cotton with a clean finish. Eco friendly/sustainable.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Warm Beige", value: "#F5F5F5" },
    ],
    features: [
      "COMBED ORGANIC COTTON","BOXY FIT",
      "DOUBLE STITCHED",
      "HEAVY 320 GSM",
      "3D EMBROIDERED PRINT",
    ],
  },
] as const;

type RawProduct = typeof rawProducts[number];

const processImage = (img: unknown): string => {
  if (typeof img === "string") return img;
  if (typeof img === "object" && img !== null) {
    if ("default" in img) return (img as { default: string }).default;
    if ("src" in img) return (img as { src: string }).src;
  }
  return String(img);
};

const processProduct = (p: RawProduct): Product => ({
  ...p,
  image: processImage(p.image),
  images: p.images.map(processImage),
});

export const products: Product[] = rawProducts.map(processProduct);

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const getFeaturedProducts = () => products.slice(0, 3);

export const getProductUrl = (product: Product) => `/product/${product.slug}`;

export const normalizeImage = (img: unknown): string => {
  if (typeof img === "string") return img;
  if (typeof img === "object" && img !== null && "default" in img) {
    return (img as { default: string }).default;
  }
  if (typeof img === "object" && img !== null && "src" in img) {
    return (img as { src: string }).src;
  }
  return String(img);
};
