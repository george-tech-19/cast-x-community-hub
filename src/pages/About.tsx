import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg1.jpg";
import communityBg from "@/assets/community-bg.jpg";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">About</p>
        <h1 className="hero-heading text-foreground max-w-4xl">
          CAST-X
        </h1>
        <p className="mt-8 text-muted-foreground text-xl max-w-2xl leading-relaxed">
          Stands for the idea that what is overlooked can become powerful — like hidden gems buried in dirt.  We’ve all heard the worst about the streets. the pain, the poverty, the pressure.<br />
          But what is really slept on, is
          The strength, True loyalty, The grind,
          The hidden gems in the dirt.
        </p>
      </section>

      {/* Image */}
      <section className="px-6 md:px-12 lg:px-20">
        <div className="relative aspect-[21/9] overflow-hidden">
          <img src={heroBg} alt="CAST-X Team" loading="lazy" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/30" />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Our Story</p>
            <h2 className="section-heading text-foreground">Started with a vision</h2>
          </div>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>
              CAST-X began with a belief
              that creativity and culture can build something meaningful.
              What started as a small idea is evolving into a brand with direction, shaped by a growing community of creators and thinkers.

            </p>
            <p>
              The ambition was never just to make clothing,
              but to build something with purpose.

              A platform in progress
              focused on connection, collaboration, and long-term impact.

              We’re not there yet.
              But we know where we’re going.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding border-t border-border">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-border p-8 md:p-12 hover-lift">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">OUR MISSION</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">Empower creators</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To create garments that go beyond style
              pieces designed with intention, longevity, and responsibility.<br />

              We focus on: <br />

              Crafting products that carry real meaning and emotional value
              Prioritizing quality and durability over fast consumption
              Making conscious choices in materials and production
              Reducing waste through thoughtful, intentional design.

              Our mission is simple:
              to build clothing that people value, keep, and grow with — not discard.
            </p>
          </div>
          <div className="border border-border p-8 md:p-12 hover-lift">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Our Vision</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">Shape the future</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To grow into a globally recognized clothing brand that is known not just for design,
              but for how it thinks, creates, and impacts the world.

              <br/> We aim to:<br />
              Lead a shift toward sustainable and conscious fashion practices

              Not by following trends
              but by setting a standard for what modern streetwear should become.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-t border-border">
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Values</p>
        <h2 className="section-heading text-foreground mb-16">What drives us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Community", desc: "Everything we build starts with people." },
            { title: "Creativity", desc: "We celebrate bold ideas and original thinking." },
            { title: "Innovation", desc: "We merge street culture with digital tools." },
            { title: "Empowerment", desc: "We give creators the platform to grow." },
          ].map((v) => (
            <div key={v.title} className="border-t border-border pt-6">
              <h3 className="text-foreground font-bold text-lg mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img src={communityBg} alt="Community" loading="lazy" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="relative z-10 section-padding text-center w-full">
          <h2 className="section-heading text-foreground mb-6">Ready to join the movement?</h2>
          <Link
            to="/community"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-primary-foreground text-sm font-semibold uppercase tracking-wide hover:bg-muted-foreground transition-colors"
          >
            Explore Community <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
