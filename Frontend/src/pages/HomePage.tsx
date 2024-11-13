import Header from "../components/Header";
import Hero from "../components/HomePage/Hero";
import Features from "../components/HomePage/Features";
import CTA from "../components/HomePage/CTA";
import FAQ from "../components/HomePage/FAQ"

function HomePage() {
  return (
    <>
      <div className="bg-indigo-50">
        <Header />
        <Hero />
      </div>
      <Features />
      <CTA />
      <FAQ />
    </>
  );
}

export default HomePage;
