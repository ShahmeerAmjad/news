import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import KunjwalSection from "@/components/KunjwalSection";
import DeveloperSection from "@/components/DeveloperSection";
import LocationSection from "@/components/LocationSection";
import MasterPlanSection from "@/components/MasterPlanSection";
import PlansSection from "@/components/PlansSection";
import CinematicBand from "@/components/CinematicBand";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import VideoSection from "@/components/VideoSection";
import RegistrationForm from "@/components/RegistrationForm";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";
import StickyCTA from "@/components/StickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-navy-950">
      <a href="#register" className="skip-link">
        Skip to booking form
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <TrustBar />
        <KunjwalSection />
        <DeveloperSection />
        <LocationSection />
        <MasterPlanSection />
        <PlansSection />
        <CinematicBand />
        <AmenitiesSection />
        <GallerySection />
        <VideoSection />
        {/* TestimonialsSection hidden until real client testimonials are supplied */}
        <RegistrationForm source="home" />
        <FaqSection />
      </main>
      <Footer />
      <WhatsAppChatButton />
      <StickyCTA />
    </div>
  );
};

export default Index;
