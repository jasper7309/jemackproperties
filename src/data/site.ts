export type Office = { city: string; address: string };

export const site = {
  name: "Jemack Properties",
  parent: "Jemack Facilities & Engineering Services Ltd",
  legalName: "Jemack Facilities and Engineering Services Limited",
  rc: "RC 746583",
  tagline: "Secure land and homes, built on engineering excellence.",
  /** Primary display phone (formatted) */
  phone: "+234 802 222 4248",
  /** All phones: [0] = primary */
  phones: [
    { display: "+234 802 222 4248", tel: "+2348022224248" },
    { display: "+234 803 627 8554", tel: "+2348036278554" },
    { display: "+234 806 259 1354", tel: "+2348062591354" },
  ],
  whatsapp: "2348022224248",
  /** All emails: [0] = primary */
  emails: ["services@jemackfacilities.com.ng", "jemackfacilities@yahoo.com"],
  /** Primary display email */
  email: "services@jemackfacilities.com.ng",
  offices: [
    { city: "Lagos", address: "House 20 Greenlight Estate, Alatushe, Ibeju-Lekki, Lagos, Nigeria" },
    {
      city: "Asaba",
      address:
        "Shop 8 & 9, Osinmili North Ultramodern Shopping Complex, Okpanam, Asaba, Delta State, Nigeria",
    },
    { city: "Umuahia", address: "No. 85 Cameroon Street, Umuahia, Abia State, Nigeria" },
  ] satisfies Office[],
  socials: {
    youtube: "https://www.youtube.com/@jemackproperties2",
    facebook: "https://www.facebook.com/profile.php?id=100063633145599",
    instagram: "https://www.instagram.com/jemackfacilities",
  },
  /** Optional: reply-time promise shown in form footnotes. Leave blank to hide. */
  responseTime: "",
};

export const whatsappLink = (msg = "Hello Jemack Properties, I'd like to book an inspection.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
