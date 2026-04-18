import { Link } from "react-router-dom";
import tiktok from "@/assets/tiktok.webp";
import { MessageCircle, Instagram, Twitter, Facebook, TestTube2Icon } from "lucide-react";

const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VbBrQbo17En1SxcWC80f";
const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter */}
      <div className="section-padding text-center border-b border-border">
        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-3">Newsletter</p>
        <h3 className="section-heading text-foreground mb-4">Be part of something bigger than yourself</h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-8">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:flex-1 px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-foreground transition-colors"
          />
          <button className="w-full sm:w-auto px-6 py-3 bg-foreground text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-muted-foreground transition-colors">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link to="/" className="text-2xl font-black tracking-tighter text-foreground">
              CAST-X
            </Link>
            <p className="text-muted-foreground text-sm mt-2">Survive so you get to live.</p>
          </div>

          <div className="flex flex-wrap gap-6">
            {[
              { label: "Home", path: "/" },
              { label: "About", path: "/about" },
              { label: "Products", path: "/products" },
              { label: "Community", path: "/community" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/share/1C6Yuat47b/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook size={20} />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="https://www.instagram.com/cast_x_official?igsh=MTl1d3hhNWVuMjU4Mg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://x.com/castx3?s=11" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://www.tiktok.com/@castxclothing?_r=1&_t=ZS-95d0AmV8Y9l" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <img src={tiktok} alt="TikTok" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} CAST-X. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
