'use client';

import Image from "next/image";
import { LoadingProvider, useLoading } from "@/contexts/LoadingContext";
import LoadingAnimation from "@/components/LoadingAnimation";
import Header from "@/components/Header";
import ExactHero from "@/components/ExactHero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

function HomeContent() {
  const { isLoading, completeLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <LoadingAnimation onComplete={completeLoading} />
      )}
      
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Header />
        <section id="home">
          <ExactHero />
        </section>
        <section id="services">
          <HowItWorks />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <ContactForm />
        </section>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}
