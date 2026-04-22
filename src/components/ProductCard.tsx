import { ShoppingBag, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ProductCardProps {
  images: string[];
  name: string;
  price: string;
  category: string;
  detailsUrl: string;
  onAddToCart?: () => void;
}

const ProductCard = ({
  images,
  name,
  price,
  category,
  detailsUrl,
  onAddToCart,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(detailsUrl);
  };

  return (
    <div className="group cursor-pointer w-full" onClick={handleCardClick}>
      {/* IMAGE / CAROUSEL */}
      <div className="relative overflow-hidden bg-card aspect-[3/4] w-full rounded-2xl md:rounded-3xl">
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full h-full"
        >
          <CarouselContent className="h-max">
            {images.map((image, index) => (
              <CarouselItem key={index} className="basis-full h-full">
                <img
                  src={image}
                  alt={`${name} - Image ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-fill object-center transition-transform duration-700 md:group-hover:scale-105"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* NAV BUTTONS */}
          <CarouselPrevious className="left-2 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
          <CarouselNext className="right-2 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity" />
        </Carousel>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-background/20 md:bg-background/0 md:group-hover:bg-background/30 transition-colors duration-300" />

        {/* ACTION BUTTONS */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 space-y-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-2 backdrop-blur-md bg-background/60 rounded-xl p-2">
            <Button
              className="flex-1 bg-foreground text-primary-foreground hover:bg-accent hover:text-accent-foreground text-xs font-semibold uppercase tracking-wider"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.();
              }}
            >
              <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              className="flex-1 border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground text-xs font-semibold uppercase tracking-wider"
              onClick={(e) => {
                e.stopPropagation();
                navigate(detailsUrl);
              }}
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              View Details
            </Button>
          </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="mt-3 md:mt-4 space-y-1 px-1">
        <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
          {category}
        </p>

        <h3 className="text-foreground font-semibold text-sm md:text-base line-clamp-2">
          {name}
        </h3>

        <p className="text-foreground font-bold text-base md:text-lg">
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;