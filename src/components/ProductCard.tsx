import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
  detailsUrl: string;
  onAddToCart?: () => void;
}

const ProductCard = ({ image, name, price, category, detailsUrl, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(detailsUrl);
  };

  return (
    <div className={`group cursor-pointer`} onClick={handleCardClick}>
      <div className="relative overflow-hidden bg-card aspect-[3/4] rounded-3xl">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />

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
