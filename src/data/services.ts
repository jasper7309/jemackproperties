export type Service = { slug: string; title: string; summary: string; icon: "building" | "road" | "droplets" | "fuel" | "wrench" | "radio" };

export const services: Service[] = [
  { slug: "building-and-construction", title: "Building and Construction", summary: "Residential, commercial and institutional buildings delivered to spec.", icon: "building" },
  { slug: "highways-and-civil-works", title: "Highways and Civil Works", summary: "Roads, bridges, culverts and drainage infrastructure.", icon: "road" },
  { slug: "water-supply-engineering", title: "Water Supply Engineering", summary: "Boreholes, treatment plants and reticulation networks.", icon: "droplets" },
  { slug: "oil-and-gas", title: "Oil and Gas", summary: "Pipeline, fabrication and support services for the energy sector.", icon: "fuel" },
  { slug: "facilities-management", title: "Facilities Management", summary: "Maintenance and operations that keep assets performing.", icon: "wrench" },
  { slug: "telecoms-engineering", title: "Telecoms Engineering", summary: "Tower construction, installation and site maintenance.", icon: "radio" },
];
