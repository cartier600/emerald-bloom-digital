import { createFileRoute } from "@tanstack/react-router";
import { AgeGate } from "@/components/AgeGate";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Strains } from "@/components/Strains";
import { FeaturedMenu } from "@/components/FeaturedMenu";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MUNCHIES NY — The Rockaways' First Legal Cannabis Dispensary" },
      {
        name: "description",
        content:
          "Premium cannabis, local vibes. Serving the Rockaways with top-shelf flower, concentrates, and edibles. 21+ only.",
      },
      { property: "og:title", content: "MUNCHIES NY" },
      { property: "og:description", content: "The Rockaways' first legal cannabis dispensary. Premium flower, concentrates, and edibles." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-cream">
      <AgeGate />
      <Nav />
      <Hero />
      <Strains />
      <FeaturedMenu />
      <Footer />
    </main>
  );
}
