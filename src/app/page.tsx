"use client";
import { FooterHome } from "@/components/layout/footer-homepage";
import { Hero } from "@/components/layout/hero";
import { NavBar } from "@/components/layout/navbar";

const Home = () => (
  <main className="pt-32 bg-sky-200">
    <NavBar />
    <Hero />
    <FooterHome />
  </main>
);

export default Home;
