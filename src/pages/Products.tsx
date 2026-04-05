import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import productHoodie from "@/assets/product-hoodie.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productTshirt2 from "@/assets/product-tshirt2.jpg";
import productAccessories from "@/assets/product-accessories.jpg";

const allProducts = [
  { image: productHoodie, name: "Shadow Hoodie", price: "$89", category: "Hoodies", sizes: ["S", "M", "L", "XL"] },
  { image: productTshirt, name: "Essential Tee – Black", price: "$45", category: "T-Shirts", sizes: ["S", "M", "L"] },
  { image: productTshirt2, name: "Graphic Tee – White", price: "$55", category: "T-Shirts", sizes: ["M", "L", "XL"] },
  { image: productAccessories, name: "Street Cap & Chain", price: "$35", category: "Accessories", sizes: ["One Size"] },
  { image: productHoodie, name: "Midnight Hoodie", price: "$95", category: "Hoodies", sizes: ["S", "M", "L", "XL"] },
  { image: productTshirt, name: "Core Tee – Black", price: "$40", category: "T-Shirts", sizes: ["S", "M", "L"] },
  { image: productTshirt2, name: "Art Tee – White", price: "$50", category: "T-Shirts", sizes: ["M", "L", "XL"] },
  { image: productAccessories, name: "Gold Chain Set", price: "$65", category: "Accessories", sizes: ["One Size"] },
];

const categories = ["All", "Hoodies", "T-Shirts", "Accessories"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Popular"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy]);

  const filtered = activeCategory === "All"
    ? allProducts
    : allProducts.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
    if (sortBy === "Price: High to Low") return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
    return 0;
  });

  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart`, {
      description: "Order via WhatsApp to complete purchase",
      action: {
        label: "Order Now",
        onClick: () => window.open("https://wa.me/YOUR_NUMBER_OR_CHANNEL_LINK", "_blank"),
      },
    });
  };

  const handleQuickView = (name: string) => {
    toast.info(`Quick view: ${name}`, { description: "Full product details coming soon!" });
  };

  const SidebarFilters = ({ className = "" }: { className?: string }) => (
    <div className={className}>
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">Category</h3>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setMobileFilterOpen(false); }}
              className={`text-left px-3 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {cat}
              <span className="ml-auto float-right text-xs opacity-60">
                {cat === "All" ? allProducts.length : allProducts.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Sort */}
      <div className="mb-8">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">Sort By</h3>
        <div className="flex flex-col gap-1">
          {sortOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => { setSortBy(opt); setMobileFilterOpen(false); }}
              className={`text-left px-3 py-2.5 text-sm font-medium transition-colors ${
                sortBy === opt
                  ? "bg-foreground text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Payment info */}
      <div className="border border-border p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Payment</p>
        <p className="text-foreground font-semibold text-sm">Orange Money & MTN MoMo</p>
        <p className="text-muted-foreground text-xs mt-1">Contact us on WhatsApp to order</p>
        <Button
          className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 text-xs font-semibold uppercase tracking-wider"
          onClick={() => window.open("https://wa.me/YOUR_NUMBER_OR_CHANNEL_LINK", "_blank")}
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
          Order via WhatsApp
        </Button>
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="section-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Collection</p>
            <h1 className="hero-heading text-foreground">Shop</h1>
          </div>
          <p className="text-sm text-muted-foreground">{sorted.length} products</p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <SidebarFilters />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
              {/* Mobile filter toggle */}
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden gap-2 text-xs uppercase tracking-wider">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-background">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SidebarFilters />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Active filter pills - desktop */}
              <div className="hidden lg:flex items-center gap-2">
                {activeCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-foreground text-xs font-medium">
                    {activeCategory}
                    <button onClick={() => setActiveCategory("All")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {sortBy !== "Newest" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-foreground text-xs font-medium">
                    {sortBy}
                    <button onClick={() => setSortBy("Newest")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>

              {/* Grid toggles */}
              <div className="hidden md:flex items-center gap-1 ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${gridCols === 3 ? "text-foreground" : "text-muted-foreground"}`}
                  onClick={() => setGridCols(3)}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 ${gridCols === 4 ? "text-foreground" : "text-muted-foreground"}`}
                  onClick={() => setGridCols(4)}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`grid grid-cols-2 ${gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-4 md:gap-6`}>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
                : sorted.map((product, i) => (
                    <ProductCard
                      key={`${product.name}-${i}`}
                      {...product}
                      onAddToCart={() => handleAddToCart(product.name)}
                      onQuickView={() => handleQuickView(product.name)}
                    />
                  ))}
            </div>

            {/* Empty state */}
            {!loading && sorted.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setActiveCategory("All")}
                >
                  View all products
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
