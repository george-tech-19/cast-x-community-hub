import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";
import productHoodie from "@/assets/product-hoodie.jpg";
import productTshirt from "@/assets/product-tshirt.jpg";
import productTshirt2 from "@/assets/product-tshirt2.jpg";
import productAccessories from "@/assets/product-accessories.jpg";
import communityBg from "@/assets/community-bg.jpg";

const WHATSAPP_LINK = "https://wa.me/YOUR_NUMBER_OR_CHANNEL_LINK";

const featuredProducts = [
  { image: productHoodie, name: "Shadow Hoodie", price: "$89", category: "Hoodies" },
  { image: productTshirt, name: "Essential Tee", price: "$45", category: "T-Shirts" },
  { image: productTshirt2, name: "Graphic Tee", price: "$55", category: "T-Shirts" },
  { image: productAccessories, name: "Street Cap & Chain", price: "$35", category: "Accessories" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img src={heroBg} alt="CAST X Hero" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        <div className="relative z-10 section-padding pb-16 md:pb-24 w-full">
          <h1 className="hero-heading text-foreground animate-fade-in">
            Build.<br />Create.<br />Connect.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            More than a brand. A movement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-muted-foreground transition-colors"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-foreground text-foreground text-sm font-semibold uppercase tracking-wide hover:bg-foreground hover:text-primary-foreground transition-colors"
            >
              Join Community
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="max-w-3xl">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Who We Are</p>
          <h2 className="section-heading text-foreground">
            CAST X is where street culture meets digital innovation
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            We're building a community of creators, entrepreneurs, and innovators who believe in the power of
            collaboration. Our clothing is just the beginning — it's the uniform of a movement.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-foreground font-semibold text-sm uppercase tracking-wide hover:gap-4 transition-all">
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding border-t border-border">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Collection</p>
            <h2 className="section-heading text-foreground">Featured</h2>
          </div>
          <Link to="/products" className="hidden sm:inline-flex items-center gap-2 text-foreground font-semibold text-sm uppercase tracking-wide hover:gap-4 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </section>

      {/* Community Highlight */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img src={communityBg} alt="CAST X Community" loading="lazy" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 section-padding w-full max-w-3xl">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Community</p>
          <h2 className="section-heading text-foreground">
            Join a movement of creators shaping the future
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Network, learn, collaborate, and grow with like-minded individuals.
            The CAST X community is where opportunities are born.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-foreground text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-muted-foreground transition-colors"
          >
            Join on WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding border-t border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Words</p>
        <h2 className="section-heading text-foreground mb-16">From the community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { quote: "CAST X isn't just clothing — it's an identity. Being part of this community changed my perspective on what's possible.", author: "Marcus T." },
            { quote: "The network I've built through CAST X has opened doors I never knew existed. This is more than a brand.", author: "Amina K." },
            { quote: "From the quality of the pieces to the energy of the community, everything about CAST X is intentional and powerful.", author: "David L." },
          ].map((t) => (
            <div key={t.author} className="border border-border p-8 hover-lift">
              <p className="text-foreground text-lg leading-relaxed mb-6">"{t.quote}"</p>
              <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest">— {t.author}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
