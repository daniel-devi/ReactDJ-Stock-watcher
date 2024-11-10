import Header from "../components/Homepage/Header";
import Hero from "../components/Homepage/Hero";
import Features from "../components/Homepage/Features";
import CTA from "../components/Homepage/CTA";
import FAQ from "../components/Homepage/FAQ";

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
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
