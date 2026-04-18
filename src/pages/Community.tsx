import Layout from "@/components/Layout";
import { ArrowRight, Users, Lightbulb, BookOpen, Handshake } from "lucide-react";
import communityBg from "@/assets/community-bg.jpg";

const WHATSAPP_LINK = "https://whatsapp.com/channel/0029VbBrQbo17En1SxcWC80f";

const benefits = [
  { icon: Users, title: "Networking", desc: "Connect with creators, entrepreneurs, and innovators from around the world." },
  { icon: Lightbulb, title: "Opportunities", desc: "Get access to exclusive projects, collaborations, and brand partnerships." },
  { icon: BookOpen, title: "Learning", desc: "Grow through shared knowledge, workshops, and mentorship programs." },
  { icon: Handshake, title: "Collaboration", desc: "Build together. From ideas to execution, we create as a community." },
];

const Community = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end">
        <div className="absolute inset-0">
          <img src={communityBg} alt="CAST X Community" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 section-padding w-full">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Community</p>
          <h1 className="hero-heading text-foreground max-w-4xl">
            Join the<br />CAST-X<br />Movement
          </h1>
          <p className="mt-6 text-muted-foreground text-xl max-w-lg leading-relaxed">
            A space for creators, entrepreneurs, and innovators to connect, grow, and build the future together.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-10 py-5 bg-foreground text-primary-foreground text-sm font-bold uppercase tracking-wide hover:bg-muted-foreground transition-colors"
          >
            Join Our Community on WhatsApp <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding border-t border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Why Join</p>
        <h2 className="section-heading text-foreground mb-16">What you get</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="border border-border p-8 hover-lift group">
              <b.icon size={32} className="text-foreground mb-6 group-hover:text-accent transition-colors" />
              <h3 className="text-foreground font-bold text-lg mb-3">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "500+", label: "Members" },
            { number: "10+", label: "Countries" },
            { number: "50+", label: "Collaborations" },
            { number: "∞", label: "Possibilities" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">{s.number}</p>
              <p className="text-muted-foreground text-sm uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding border-t border-border text-center">
        <h2 className="section-heading text-foreground mb-6 max-w-3xl mx-auto">
          Ready to be part of something bigger?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
          The CAST X community is growing every day. Don't miss your chance to connect with the future.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-12 py-5 bg-foreground text-primary-foreground text-base font-bold uppercase tracking-wide hover:bg-muted-foreground transition-colors"
        >
          Join on WhatsApp <ArrowRight size={16} />
        </a>
      </section>
    </Layout>
  );
};

export default Community;
