"use client";
import { FooterHome } from "@/components/layout/footer-homepage";
import { Hero } from "@/components/layout/hero";
import { NavBar } from "@/components/layout/navbar";
import { ProductSection } from "@/components/layout/product-section";

const Home = () => (
  <main className="relative pt-36 lg:pt-24">
    <NavBar />
    <Hero />
    <ProductSection />
    <FooterHome />
  </main>
);

export default Home;
