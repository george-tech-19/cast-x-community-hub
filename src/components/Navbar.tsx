import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VbBrQbo17En1SxcWC80f";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Community", path: "/community" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 md:h-20">
        <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
          CAST-X
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Link
              to="/cart"
              className="inline-flex items-center justify-center w-10 h-10 bg-foreground text-primary-foreground hover:bg-muted-foreground transition-colors duration-200 rounded-full relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground px-[0.25rem]">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="flex flex-col px-6 py-6 gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium uppercase tracking-wide ${
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {/* <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block px-6 py-3 bg-foreground text-primary-foreground text-sm font-semibold uppercase tracking-wide text-center"
            >
              Join Our Community
            </a> */}
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center w-12 h-12 bg-foreground text-primary-foreground hover:bg-muted-foreground transition-colors duration-200 rounded-full mx-auto relative"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground px-[0.25rem]">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
