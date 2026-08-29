import React from "react";

type WhatsAppChatButtonProps = {
  phone?: string;
  message?: string;
};

const WhatsAppChatButton: React.FC<WhatsAppChatButtonProps> = ({
  phone = "923111786602",
  message = "Hello! I'm interested in booking a plot at Kunjwal City.",
}) => {
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Kunjwal City on WhatsApp"
      className="animate-float fixed bottom-6 left-6 z-[9999] hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_24px_rgba(37,211,102,0.45)] ring-2 ring-gold-300/60 transition-all duration-300 hover:scale-110 hover:ring-gold-200 md:h-16 md:w-16 lg:flex"
    >
      {/* soft gold glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-gold-300/40 [box-shadow:0_0_22px_4px_rgba(228,193,82,0.35)]"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 24 24"
        className="relative z-10 h-7 w-7 md:h-8 md:w-8"
        aria-hidden="true"
      >
        <path d="M12.004 2c-5.514 0-10 4.486-10 10 0 1.771.469 3.473 1.357 4.978L2 22l5.176-1.328A9.933 9.933 0 0 0 12.004 22c5.514 0 10-4.486 10-10s-4.486-10-10-10zm.003 18c-1.592 0-3.14-.422-4.492-1.219l-.321-.187-3.07.787.82-2.994-.209-.34A7.943 7.943 0 0 1 4.004 12c0-4.411 3.589-8 8.003-8s8.003 3.589 8.003 8-3.589 8-8.003 8zm4.446-5.746c-.242-.121-1.436-.707-1.657-.787-.222-.08-.383-.121-.544.121-.16.242-.625.787-.767.949-.141.162-.283.182-.525.061-.242-.121-1.023-.377-1.949-1.201-.72-.641-1.207-1.433-1.348-1.676-.141-.242-.015-.373.106-.494.11-.11.242-.283.363-.424.121-.141.161-.242.242-.403.081-.162.04-.303-.02-.424-.061-.121-.544-1.312-.746-1.795-.196-.471-.396-.407-.544-.415h-.465c-.162 0-.424.061-.645.303-.222.242-.846.827-.846 2.018 0 1.191.866 2.344.987 2.506.121.162 1.705 2.6 4.134 3.641.578.25 1.029.4 1.38.511.58.185 1.107.159 1.523.096.465-.07 1.436-.586 1.639-1.152.202-.566.202-1.051.141-1.152-.06-.101-.22-.162-.461-.283z" />
      </svg>
    </a>
  );
};

export default WhatsAppChatButton;
