type Site = {name:string;parent:string;tagline:string;phone:string;phones:string[];whatsapp:string;email:string;emails:string[];offices:{city:string;address?:string}[];socials:{youtube?:string};responseTime?:string};
export const site: Site = {
  name: "Jemack Properties",
  parent: "Jemack Facilities & Engineering Services Ltd",
  tagline: "Secure land and homes, built on engineering excellence.",
  phone: "+234 802 222 4248",
  phones: ["+234 802 222 4248", "+234 803 627 8554", "+234 806 259 1354"],
  whatsapp: "2348022224248",
  email: "services@jemackfacilities.com.ng",
  emails: ["services@jemackfacilities.com.ng", "jemackfacilities@yahoo.com"],
  responseTime: "",
  offices: [
    { city: "Lagos", address: "House 20 Greenlight Estate, Alatushe, Ibeju-Lekki, Lagos, Nigeria" },
    { city: "Asaba", address: "Shop 8 & 9, Osinmili North Ultramodern Shopping Complex, Okpanam, Asaba, Delta State, Nigeria" },
    { city: "Umuahia", address: "No. 85 Cameroon Street, Umuahia, Abia State, Nigeria" },
  ],
  socials: {
    youtube: "https://www.youtube.com/@jemackproperties2",
  },
};

export const whatsappLink = (msg = "Hello Jemack Properties, I'd like to book an inspection.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
export const directionsLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
