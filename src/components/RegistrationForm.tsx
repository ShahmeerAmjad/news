import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    // Only name and phone are mandatory
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch("https://city-backend-one.vercel.app/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Thank you! We'll contact you soon.");
          setFormData({
            name: "",
            phone: "",
            email: "",
            city: "",
            country: "",
            message: "",
          });
        } else {
          const data = await res.json();
          alert(data.error || "Something went wrong. Please try again.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to connect to server. Please try again.");
      }
    }
  };

  return (
    <section id="register" className="py-20 bg-slate-100 scroll-mt-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#b38c2e] to-[#e4c152] bg-clip-text text-transparent">
          Book Your Plot Today
        </h2>
        
        <p className="text-center text-gray-600 mb-12 text-lg">
          Fill in your details and our team will contact you within 24 hours
        </p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Full Name & Phone (Mandatory) */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-semibold text-[#b38c2e]">
                Full name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="bg-transparent border-[#b38c2e]/30 border-b-2 border-t-0 border-x-0 rounded-none text-black placeholder:text-gray-400"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-lg font-semibold text-[#b38c2e]">
                Phone No. *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+92 300 1234567"
                className="bg-transparent border-[#b38c2e]/30 border-b-2 border-t-0 border-x-0 rounded-none text-black placeholder:text-gray-400"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </div>

          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-medium text-gray-600">
              Email Address <span className="text-sm text-gray-300">(Optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your.email@example.com"
              className="bg-transparent border-[#b38c2e]/30 border-b-2 border-t-0 border-x-0 rounded-none text-black placeholder:text-gray-400"
            />
          </div>

          {/* Country & City (Optional) */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-lg font-medium text-gray-600">
                Country <span className="text-sm text-gray-300">(Optional)</span>
              </Label>
              <Input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Pakistan, UAE, UK, etc."
                className="bg-transparent border-[#b38c2e]/30 border-b-2 border-t-0 border-x-0 rounded-none text-black placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-lg font-medium text-gray-600">
                City <span className="text-sm text-gray-300">(Optional)</span>
              </Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Lahore, Dubai, London, etc."
                className="bg-transparent border-[#b38c2e]/30 border-b-2 border-t-0 border-x-0 rounded-none text-black placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Message (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg font-medium text-gray-600">
              Message <span className="text-sm text-gray-300">(Optional)</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell us about your requirements or any questions you have..."
              className="bg-transparent border-[#b38c2e]/30 border-b-2 border-t-0 border-x-0 rounded-none min-h-[100px] resize-none text-black placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-8 text-center">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-[#b38c2e] to-[#e4c152] hover:from-[#e4c152] hover:to-[#b38c2e] text-white px-12 py-4 text-lg font-medium rounded-xl shadow-[0_0_20px_rgba(227,193,82,0.4)] transition-all duration-300"
            >
              Submit
            </Button>
          </div>

          {/* Privacy Note */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Your information is safe with us. We respect your privacy.
          </p>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;