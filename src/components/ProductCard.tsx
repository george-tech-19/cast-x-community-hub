import { ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
  onQuickView?: () => void;
  onAddToCart?: () => void;
}

const ProductCard = ({ image, name, price, category, onQuickView, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden bg-card aspect-[3/4]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />

        {/* Quick action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 bg-foreground text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={(e) => { e.stopPropagation(); onQuickView?.(); }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 bg-foreground text-primary-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to cart bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            className="w-full bg-foreground text-primary-foreground hover:bg-accent hover:text-accent-foreground text-xs font-semibold uppercase tracking-wider"
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">{category}</p>
        <h3 className="text-foreground font-semibold text-sm">{name}</h3>
        <p className="text-foreground font-bold text-lg">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
