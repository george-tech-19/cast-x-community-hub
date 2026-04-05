interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  category: string;
}

const ProductCard = ({ image, name, price, category }: ProductCardProps) => {
  return (
    <div className="group cursor-pointer hover-lift">
      <div className="relative overflow-hidden bg-card aspect-[3/4]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full py-3 bg-foreground text-primary-foreground text-sm font-semibold uppercase tracking-wide">
            View Product
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">{category}</p>
        <h3 className="text-foreground font-semibold text-sm">{name}</h3>
        <p className="text-foreground font-bold">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
