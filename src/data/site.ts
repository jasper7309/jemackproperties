// PLACEHOLDER: replace every value below with real company details.
export const site = {
  name: "Jemack Properties",
  parent: "Jemack Facilities & Engineering Services Ltd",
  tagline: "Secure land and homes, built on engineering excellence.",
  phone: "+234 800 000 0000", // PLACEHOLDER
  whatsapp: "2348000000000", // PLACEHOLDER: international format, digits only
  email: "info@jemackproperties.com", // PLACEHOLDER
  offices: [
    { city: "Lagos", address: "PLACEHOLDER address, Lagos" },
    { city: "Asaba", address: "PLACEHOLDER address, Asaba, Delta State" },
    { city: "Umuahia", address: "PLACEHOLDER address, Umuahia, Abia State" },
    { city: "Port Harcourt", address: "PLACEHOLDER address, Port Harcourt, Rivers State" },
  ],
  socials: {
    facebook: "https://facebook.com/", // PLACEHOLDER
    instagram: "https://instagram.com/", // PLACEHOLDER
    linkedin: "https://linkedin.com/", // PLACEHOLDER
    x: "https://x.com/", // PLACEHOLDER
  },
};

export const whatsappLink = (msg = "Hello Jemack Properties, I'd like to book an inspection.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
