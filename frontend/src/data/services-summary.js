// Lightweight services summary — only the 8 icons & copy needed by the homepage
// (Navbar dropdown + Services grid). This keeps the heavy services.js data
// (~40 lucide icons + showcase URLs + long copy) OUT of the homepage bundle —
// services.js is only pulled in via the lazy-loaded /services/:slug route.
import { Target, Megaphone, Share2, Users, Palette, BarChart3, Code2, Building2 } from "lucide-react";

export const services = [
  {
    slug: "brand-strategy",
    name: "Brand Strategy",
    icon: Target,
    subhead: "Positioning, identity, and messaging that make you unforgettable.",
  },
  {
    slug: "public-relations",
    name: "Public Relations",
    icon: Megaphone,
    subhead: "Earned media, press, and reputation that put you in the spotlight.",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: Share2,
    subhead: "Content and community growth across every platform.",
  },
  {
    slug: "influencer-campaigns",
    name: "Influencer Campaigns",
    icon: Users,
    subhead: "Creator partnerships that turn reach into real results.",
  },
  {
    slug: "content-creative",
    name: "Content & Creative",
    icon: Palette,
    subhead: "Bold visuals, video, and copy that define your voice.",
  },
  {
    slug: "performance-ads",
    name: "Performance Ads",
    icon: BarChart3,
    subhead: "Data-driven paid campaigns engineered for ROI.",
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: Code2,
    subhead: "Fast, beautiful, conversion-focused sites built to impress and perform.",
  },
  {
    slug: "proptech",
    name: "PropTech",
    icon: Building2,
    subhead: "Marketing and digital products purpose-built for real estate and property brands.",
  },
];

export default services;
