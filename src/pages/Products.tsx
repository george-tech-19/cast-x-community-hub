import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, LayoutGrid, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useLocalization } from "@/context/LocalizationContext";
import { products, getProductUrl } from "@/lib/products";
import { getDiscountedPrice, getDiscountPercentage } from "@/lib/discounts";

const categories = ["All", "Hoodies", "T-Shirts", "Accessories"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Popular"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // i18n and localization hooks
  const { t } = useTranslation();
  const { locale, country, countryCode, region, city, currency, formatPrice } = useLocalization();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, sortBy]);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    return 0;
  });

  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart(product, {
      color: product.colors[0]?.name,
      size: product.sizes[0],
    });
    
    // Calculate and format the price (with discount if applicable)
    const discountedPrice = getDiscountedPrice(product, countryCode);
    const formattedPrice = formatPrice(discountedPrice);
    
    toast.success(`${product.name} ${t('add_to_cart')}`, {
      description: `${product.sizes[0]} / ${product.colors[0]?.name} - ${formattedPrice}`,
    });
  };

  const SidebarFilters = ({ className = "" }: { className?: string }) => (
    <div className={className}>
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
          {t('category', 'Category')}
        </h3>
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
                {cat === "All" ? products.length : products.filter(p => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Sort */}
      <div className="mb-8">
        <h3 className="text-xs text-muted-foreground uppercase tracking-widest mb-4 font-semibold">
          {t('sort', 'Sort By')}
        </h3>
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
          className="w-full mt-4 text-accent-foreground hover:bg-accent/90 text-xs font-semibold uppercase tracking-wider"
          onClick={() => window.open("https://whatsapp.com/channel/0029VbBrQbo17En1SxcWC80f", "_blank")}
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
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{t('category', 'Collection')}</p>
            <h1 className="hero-heading text-foreground">{t('products', 'Shop')}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {sorted.length} {sorted.length === 1 ? t('product') : t('products')}
          </p>
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
                    {t('filter', 'Filters')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-background">
                  <SheetHeader>
                    <SheetTitle className="text-foreground">{t('filter', 'Filters')}</SheetTitle>
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
                : sorted.map((product, i) => {
                    const discountPercentage = getDiscountPercentage(product, countryCode);
                    const discountedPrice = getDiscountedPrice(product, countryCode);
                    const formattedPrice = formatPrice(discountedPrice);
                    const formattedOriginalPrice = discountPercentage > 0 ? formatPrice(product.price) : undefined;
                    
                    return (
                      <ProductCard
                        key={`${product.slug}-${i}`}
                        images={product.images}
                        name={product.name}
                        price={formattedPrice}
                        originalPrice={formattedOriginalPrice}
                        discountPercentage={discountPercentage > 0 ? discountPercentage : undefined}
                        category={product.category}
                        detailsUrl={getProductUrl(product)}
                        product={product}
                        onAddToCart={() => handleAddToCart(product)}
                      />
                    );
                  })}
            </div>

            {/* Empty state */}
            {!loading && sorted.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">{t('no_results', 'No products found')}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setActiveCategory("All")}
                >
                  {t('view', 'View')} {t('products', 'all products')}
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
