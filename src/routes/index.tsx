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
      { title: "Hazewood Cannabis Co. — High Vibes Only" },
      {
        name: "description",
        content:
          "Premium small-batch flower, live rosin, and edibles. Sativa, Indica, Hybrid — find your frequency at Hazewood.",
      },
      { property: "og:title", content: "Hazewood Cannabis Co." },
      { property: "og:description", content: "Premium cannabis. Bold flavors. 21+ only." },
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
