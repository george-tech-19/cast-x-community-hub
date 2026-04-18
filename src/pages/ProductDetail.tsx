import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductBySlug } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => (slug ? getProductBySlug(slug) : undefined), [slug]);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");

  if (!product) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <p className="text-muted-foreground mb-4">Product not found.</p>
          <Button onClick={() => navigate("/products")}>Back to products</Button>
        </section>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, { color: selectedColor, size: selectedSize });
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize}, Color: ${selectedColor}`,
    });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 2xl:px-20">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            <div className="self-start w-full lg:w-[1024px] rounded-2xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-card border border-border">
              <div className="relative w-full h-[1000px]">
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 4000,
                    }),
                  ]}
                  className="absolute inset-0 w-full h-full"
                >
                  <CarouselContent className="h-max">
                    {product.images.map((image, index) => (
                      <CarouselItem key={index} className="basis-full h-full">
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <img 
                            src={image} 
                            alt={`${product.name} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-3 xs:left-4" />
                  <CarouselNext className="right-3 xs:right-4" />
                </Carousel>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6 xs:space-y-6 sm:space-y-7 md:space-y-8">
              <div className="flex flex-col xs:flex-col sm:flex-row items-start sm:items-center justify-between gap-3 xs:gap-3 sm:gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 text-xs xs:text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  Back to shop
                </Link>
                <Link to="/cart" className="inline-flex items-center gap-2 text-xs xs:text-xs sm:text-sm font-semibold uppercase tracking-widest text-foreground hover:text-accent">
                  <ShoppingCart className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4" />
                  View cart
                </Link>
              </div>

              <div className="space-y-2 xs:space-y-2 sm:space-y-3">
                <p className="text-xs xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">{product.category}</p>
                <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black tracking-tight text-foreground">{product.name}</h1>
                <p className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-foreground">{formatPrice(product.price)}</p>
                <div className="grid gap-3 xs:gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="rounded-2xl xs:rounded-2xl sm:rounded-3xl border border-border bg-background p-4 xs:p-5 sm:p-6">
                    <p className="text-xs xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-2 xs:mb-2.5 sm:mb-3">Size</p>
                    <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-full border px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-2 sm:py-2 text-xs xs:text-xs sm:text-sm font-semibold transition ${
                            selectedSize === size
                              ? "border-foreground bg-foreground text-primary-foreground"
                              : "border-border bg-background text-foreground hover:border-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl xs:rounded-2xl sm:rounded-3xl border border-border bg-background p-4 xs:p-5 sm:p-6">
                    <p className="text-xs xs:text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-2 xs:mb-2.5 sm:mb-3">Color</p>
                    <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`flex items-center gap-2 rounded-full border px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-2 sm:py-2 text-xs xs:text-xs sm:text-sm font-semibold transition ${
                            selectedColor === color.name
                              ? "border-foreground bg-foreground text-primary-foreground"
                              : "border-border bg-background text-foreground hover:border-foreground"
                          }`}
                        >
                          <span className="inline-flex h-3 xs:h-3.5 sm:h-4 w-3 xs:w-3.5 sm:w-4 rounded-full ring-1 ring-border" style={{ backgroundColor: color.value }} />
                          {color.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl xs:rounded-2xl sm:rounded-3xl border border-border bg-background p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-2 xs:px-2.5 sm:px-3 py-1">Premium streetwear</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border px-2 xs:px-2.5 sm:px-3 py-1">Fast shipping</span>
                  </div>
                  <p className="text-xs xs:text-sm sm:text-base text-muted-foreground leading-relaxed">{product.description}</p>
                  <ul className="space-y-2 xs:space-y-2.5 sm:space-y-3">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 xs:gap-2.5 sm:gap-3 text-xs xs:text-sm sm:text-base text-foreground">
                        <Check className="mt-0.5 xs:mt-0.5 sm:mt-1 h-3 xs:h-3.5 sm:h-4 w-3 xs:w-3.5 sm:w-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-3 xs:gap-3 sm:gap-4 items-stretch md:flex-row md:items-center">
                <Button className="w-full md:w-auto px-6 xs:px-7 sm:px-8 py-2.5 xs:py-3 sm:py-3 text-xs xs:text-xs sm:text-sm font-semibold uppercase tracking-wide" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Link
                  to="/products"
                  className="inline-flex w-full md:w-auto items-center justify-center rounded-full border border-border px-6 xs:px-7 sm:px-8 py-2.5 xs:py-3 sm:py-3 text-xs xs:text-xs sm:text-sm font-semibold uppercase tracking-wide text-foreground hover:border-foreground transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
