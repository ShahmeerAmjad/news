import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-16 bg-[#014b76] scroll-mt-24">
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
        
        {/* Content - Centered, Full Width */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-[#b38c2e] to-[#e4c152] bg-clip-text text-transparent">
            AYS Developers (Pvt.) Ltd
          </h2>
          
          <h3 className="text-2xl lg:text-3xl font-semibold mb-8 text-[#e4c152]">
            Building Trust, Creating Value
          </h3>

          <div className="text-white text-lg leading-relaxed space-y-6 text-left">
            <p>
              Kunjwal City, Gujrat is proudly developed by{" "}
              <span className="text-[#e4c152] font-semibold">
                AYS Developers (Pvt.) Ltd.
              </span>{" "}
              — a trusted name in the Pakistani real estate sector. With an
              unwavering commitment to quality, integrity, and long-term value,
              AYS Developers continue to set new standards in residential and
              commercial development.
            </p>
            
            <p>
              Backed by visionary leadership and a forward-looking approach to
              urban planning, the company focuses on customer satisfaction, modern
              infrastructure, and community-driven development. Every project by
              AYS Developers (Pvt.) Ltd. reflects excellence, transparency, and
              reliability.
            </p>
            
            <p>
              With a proven track record of delivering sustainable and well-planned
              communities, AYS Developers position Kunjwal City Gujrat not just as
              a place to live, but a place to thrive.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;