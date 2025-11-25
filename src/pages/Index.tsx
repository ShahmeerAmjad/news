import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import RegistrationForm from "@/components/RegistrationForm";
import VirtualTourSection from "@/components/VirtualTourSection";
import AboutSection from "@/components/AboutSection";
import KunjwalSection from "@/components/KunjwalSection";
import Footer from "@/components/Footer";
import AmenitiesSection from "@/components/AmenitiesSection";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20" >
        <HeroSection />
        <AboutSection />
        <KunjwalSection />
        <VideoSection />
        <AmenitiesSection />
        
        <RegistrationForm />
        {/* <VirtualTourSection /> */}
      </main>
      <Footer />
      <WhatsAppChatButton />
    </div>
  );
};

export default Index;
