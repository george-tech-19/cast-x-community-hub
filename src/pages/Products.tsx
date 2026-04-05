import { useState } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import productHoodie from "@/assets/product-hoodie.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productTshirt2 from "@/assets/product-tshirt2.jpg";
import productAccessories from "@/assets/product-accessories.jpg";

const allProducts = [
  { image: productHoodie, name: "Shadow Hoodie", price: "$89", category: "Hoodies" },
  { image: productTshirt, name: "Essential Tee – Black", price: "$45", category: "T-Shirts" },
  { image: productTshirt2, name: "Graphic Tee – White", price: "$55", category: "T-Shirts" },
  { image: productAccessories, name: "Street Cap & Chain", price: "$35", category: "Accessories" },
  { image: productHoodie, name: "Midnight Hoodie", price: "$95", category: "Hoodies" },
  { image: productTshirt, name: "Core Tee – Black", price: "$40", category: "T-Shirts" },
  { image: productTshirt2, name: "Art Tee – White", price: "$50", category: "T-Shirts" },
  { image: productAccessories, name: "Gold Chain Set", price: "$65", category: "Accessories" },
];

const categories = ["All", "Hoodies", "T-Shirts", "Accessories"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="section-padding">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Collection</p>
        <h1 className="hero-heading text-foreground mb-12">Products</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-border pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={`${product.name}-${i}`} {...product} />
          ))}
        </div>

        {/* Mobile Money note */}
        <div className="mt-16 border border-border p-8 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Payment</p>
          <p className="text-foreground font-semibold text-lg">We accept Orange Money & MTN MoMo</p>
          <p className="text-muted-foreground text-sm mt-2">Contact us on WhatsApp to place your order</p>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
