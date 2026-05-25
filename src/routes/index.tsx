import { createFileRoute } from "@tanstack/react-router";
import { AgeGate } from "@/components/AgeGate";
import { Nav } from "@/components/Nav";
import { IntroPreloader } from "@/components/IntroPreloader";
import { Hero } from "@/components/Hero";
import { BestSellers } from "@/components/BestSellers";
import { StaffPicks } from "@/components/StaffPicks";
import { Strains } from "@/components/Strains";
import { FeaturedMenu } from "@/components/FeaturedMenu";
import { Footer } from "@/components/Footer";
import { ScrollBanner } from "@/components/ScrollBanner";

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
      <IntroPreloader />
      <AgeGate />
      <Nav />
      <Hero />
      <ScrollBanner />
      <BestSellers />
      <ScrollBanner />
      <StaffPicks />
      <ScrollBanner />
      <FeaturedMenu />
      <ScrollBanner />
      <Strains />
      <Footer />
    </main>
  );
}
