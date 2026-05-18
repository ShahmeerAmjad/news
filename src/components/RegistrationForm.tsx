import React, { useState, useRef, useEffect } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    country: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.section-reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('revealed'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const res = await fetch("https://city-backend-one.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", city: "", country: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Failed to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    w-full bg-transparent border-0 border-b border-[#b38c2e]/35
    text-[#f5f0e8] placeholder:text-[#f5f0e8]/25
    font-body font-light text-base py-3
    focus:outline-none focus:border-[#e4c152]
    transition-colors duration-300
  `;

  const labelClass = "block font-body text-[10px] font-medium tracking-[0.22em] uppercase text-[#b38c2e] mb-2";

  return (
    <section
      id="register"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#014b76] overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/40 to-transparent" />

      {/* Large decorative background text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-light text-[#e4c152]"
          style={{ fontSize: 'clamp(100px, 18vw, 260px)', opacity: 0.025 }}
        >
          Book
        </span>
      </div>

      <div className="container mx-auto px-6 lg:px-10 max-w-3xl relative z-10">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="section-reveal mb-3">
            <span className="section-label">Get Started</span>
          </div>
          <div className="section-reveal">
            <h2
              className="font-display font-light italic text-[#f5f0e8] leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
            >
              Reserve Your{" "}
              <span className="gold-text">Legacy</span>
            </h2>
          </div>
          <div className="section-reveal flex justify-center mt-5">
            <div className="gold-accent-line" />
          </div>
          <div className="section-reveal mt-4">
            <p className="font-body font-light text-[#f5f0e8]/50 text-sm tracking-[0.08em]">
              Fill in your details and our team will contact you within 24 hours
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div
          className="section-reveal relative"
          style={{
            background: 'rgba(1,45,71,0.7)',
            border: '1px solid rgba(179,140,46,0.18)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.3), 0 0 40px rgba(179,140,46,0.08)',
            padding: 'clamp(32px, 5vw, 56px)',
          }}
        >
          {/* Corner ornaments */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#b38c2e]/50" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#b38c2e]/50" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#b38c2e]/50" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#b38c2e]/50" />

          {submitted ? (
            <div className="text-center py-12">
              <div className="text-[#e4c152] text-4xl mb-4 font-display italic">
                Thank You
              </div>
              <p className="font-body text-[#f5f0e8]/70 tracking-wide">
                Our team will be in touch with you shortly.
              </p>
              <div className="flex justify-center mt-6">
                <div className="gold-accent-line" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name + Phone */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-[#e4c152]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-[#e4c152]/70 text-xs mt-1 font-body">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number <span className="text-[#e4c152]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+92 300 1234567"
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-[#e4c152]/70 text-xs mt-1 font-body">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={`${labelClass} text-[#f5f0e8]/40`}>
                  Email Address{" "}
                  <span className="text-[#f5f0e8]/25 normal-case tracking-normal text-[9px]">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={inputClass}
                />
              </div>

              {/* Country + City */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="country" className={`${labelClass} text-[#f5f0e8]/40`}>
                    Country{" "}
                    <span className="text-[#f5f0e8]/25 normal-case tracking-normal text-[9px]">(optional)</span>
                  </label>
                  <input
                    id="country"
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    placeholder="Pakistan, UAE, UK…"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={`${labelClass} text-[#f5f0e8]/40`}>
                    City{" "}
                    <span className="text-[#f5f0e8]/25 normal-case tracking-normal text-[9px]">(optional)</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder="Lahore, Dubai, London…"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className={`${labelClass} text-[#f5f0e8]/40`}>
                  Message{" "}
                  <span className="text-[#f5f0e8]/25 normal-case tracking-normal text-[9px]">(optional)</span>
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Your requirements or questions…"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="luxury-btn-gold w-full md:w-auto md:min-w-[240px] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ padding: '16px 48px' }}
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting…
                    </span>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </div>

              <p className="text-center text-[9px] text-[#f5f0e8]/30 font-body tracking-widest uppercase">
                Your information is kept strictly confidential
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#b38c2e]/40 to-transparent" />
    </section>
  );
};

export default RegistrationForm;
