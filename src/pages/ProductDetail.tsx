import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProductBySlug } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/hooks/useCurrency";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = useMemo(
    () => (slug ? getProductBySlug(slug) : undefined),
    [slug]
  );

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [selectedColor, setSelectedColor] = useState(
    product?.colors[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes[0] || ""
  );

  if (!product) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <p className="text-muted-foreground mb-4">Product not found.</p>
          <Button onClick={() => navigate("/products")}>
            Back to products
          </Button>
        </section>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, {
      color: selectedColor,
      size: selectedSize,
    });

    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize}, Color: ${selectedColor}`,
    });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 2xl:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* IMAGE SECTION */}
            <div className="w-full lg:w-[50%] rounded-2xl md:rounded-3xl overflow-hidden bg-card border border-border">
              <div className="relative w-full h-80 md:h-[5000px] lg:h-[600px]">
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: false,
                    }),
                  ]}
                  className="w-full h-full"
                >
                  <CarouselContent className="h-full">
                    {product.images.map((image, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-full h-full"
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <img
                            src={image}
                            alt={`${product.name} - Image ${index + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="left-3 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                  <CarouselNext className="right-3 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
                </Carousel>
              </div>
            </div>

            {/* DETAILS SECTION */}
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
              
              {/* NAV */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to shop
                </Link>

                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest hover:text-accent"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View cart
                </Link>
              </div>

              {/* TITLE */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground uppercase tracking-widest">
                  {product.category}
                </p>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                  {product.name}
                </h1>

                <p className="text-2xl md:text-3xl font-bold">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* OPTIONS */}
              <div className="grid gap-4 sm:grid-cols-2">
                
                {/* SIZE */}
                <div className="rounded-2xl md:rounded-3xl border p-5">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          selectedSize === size
                            ? "bg-foreground text-primary-foreground"
                            : "hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* COLOR */}
                <div className="rounded-2xl md:rounded-3xl border p-5">
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">
                    Color
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          selectedColor === color.name
                            ? "bg-foreground text-primary-foreground"
                            : "hover:border-foreground"
                        }`}
                      >
                        <span
                          className="h-4 w-4 rounded-full ring-1 ring-border"
                          style={{ backgroundColor: color.value }}
                        />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="rounded-2xl md:rounded-3xl border p-5 space-y-4">
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="border px-3 py-1 rounded-full">
                    Premium streetwear
                  </span>
                  <span className="border px-3 py-1 rounded-full">
                    Fast shipping
                  </span>
                </div>

                <p className="text-sm md:text-base text-muted-foreground">
                  {product.description}
                </p>

                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-accent mt-1" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  className="w-full md:w-auto px-8 py-3 text-sm font-semibold uppercase"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <Link
                  to="/products"
                  className="w-full md:w-auto text-center border px-8 py-3 rounded-full text-sm font-semibold uppercase hover:border-foreground"
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