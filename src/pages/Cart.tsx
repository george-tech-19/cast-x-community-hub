import { Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useLocalization } from "@/context/LocalizationContext";
import { getDiscountedPrice } from "@/lib/discounts";

const sendCartToWhatsApp = (items: any[], subtotal: number, formatPrice: (price: number) => string, countryCode: string) => {
  // Replace with your actual WhatsApp number (e.g., +1234567890)
  const phoneNumber = "237670922586"; // Update this!

  let message = "Hello! I'd like to finalize my purchase:\n\n";

  items.forEach((item) => {
    const discountedPrice = getDiscountedPrice(item.product, countryCode);
    const itemTotal = discountedPrice * item.quantity;
    message += `• ${item.product.name}\n`;
    message += `  - Color/Variant: ${item.color}\n`;
    message += `  - Size: ${item.size}\n`;
    message += `  - Quantity: ${item.quantity}\n`;
    message += `  - Price: ${formatPrice(itemTotal)}\n\n`;
  });

  message += `Subtotal: ${formatPrice(subtotal)}\n\n`;
  message += "Please confirm shipping cost, payment details, and next steps.";

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
};

const sendCartViaEmail = (items: any[], subtotal: number, formatPrice: (price: number) => string, countryCode: string, customerEmail: string = "") => {
  const email = "Castxbrothers@gmail.com";
  let subject = "Purchase Finalization Request";
  
  let body = "Hello! I'd like to finalize my purchase:\n\n";

  items.forEach((item) => {
    const discountedPrice = getDiscountedPrice(item.product, countryCode);
    const itemTotal = discountedPrice * item.quantity;
    body += `• ${item.product.name}\n`;
    body += `  - Color/Variant: ${item.color}\n`;
    body += `  - Size: ${item.size}\n`;
    body += `  - Quantity: ${item.quantity}\n`;
    body += `  - Price: ${formatPrice(itemTotal)}\n\n`;
  });

  body += `Subtotal: ${formatPrice(subtotal)}\n\n`;
  body += "Please confirm shipping cost, payment details, and next steps.";

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
};

const Cart = () => {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const { formatPrice, countryCode } = useLocalization();

  // Calculate subtotal with discounts
  const calculateTotalWithDiscounts = () => {
    return items.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(item.product, countryCode);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const totalWithDiscounts = calculateTotalWithDiscounts();

  const handleFinalizePurchase = () => {
    const toastId = toast.custom(
      (t) => (
        <div className="flex flex-col gap-3 bg-card border border-border p-4 rounded-lg">
          <p className="font-semibold">How would you like to finalize your purchase?</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                sendCartToWhatsApp(items, totalWithDiscounts, formatPrice, countryCode);
                toast.dismiss(t);
              }}
              className="flex-1"
            >
              WhatsApp
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                sendCartViaEmail(items, totalWithDiscounts, formatPrice, countryCode);
                toast.dismiss(t);
              }}
              className="flex-1"
            >
              Email
            </Button>
          </div>
        </div>
      )
    );
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/products"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-12">
            <ShoppingCart className="w-8 h-8 text-foreground" />
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Your Cart
            </h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Add some products to get started!</p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-foreground text-primary-foreground font-semibold uppercase tracking-wide hover:bg-muted-foreground transition-colors duration-200"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => {
                  const discountedPrice = getDiscountedPrice(item.product, countryCode);
                  const itemTotal = discountedPrice * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 p-6 bg-card rounded-lg border border-border md:flex-row md:items-center"
                    >
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.color} / {item.size}</p>
                        <p className="text-lg font-bold text-foreground">{formatPrice(discountedPrice)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          -
                        </Button>
                        <span className="min-w-[2rem] text-center font-semibold">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          +
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{formatPrice(itemTotal)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 p-6 bg-card rounded-lg border border-border">
                  <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(totalWithDiscounts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>-</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>-</span>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(totalWithDiscounts)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleFinalizePurchase}
                    className="w-full px-6 py-3 bg-foreground text-primary-foreground font-semibold uppercase tracking-wide hover:bg-muted-foreground transition-colors duration-200"
                  >
                    Finalize Purchase
                  </button>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Shipping costs are confirmed based on your location before payment is finalized.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;