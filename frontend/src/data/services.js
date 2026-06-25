import {
  Target, Megaphone, Share2, Users, Palette, BarChart3, Code2, Building2,
  Compass, Type, MessageSquare, Volume2, BookOpen, PenTool, Newspaper, Mic,
  TrendingUp, Award, ShieldCheck, CalendarClock, Sparkles, Video, Users2,
  Camera, Handshake, FileText, LineChart, Search, Repeat, MousePointerClick,
  Layout, Gauge, Smartphone, ShoppingCart, Boxes, Box, Home, KeyRound, Cuboid,
  Globe, Film, Workflow, Headset,
} from "lucide-react";

export const services = [
  {
    slug: "brand-strategy",
    name: "Brand Strategy",
    icon: Target,
    category: "Brand Strategy",
    headline: "Brands that mean something.",
    subhead: "Positioning, identity, and messaging that make you unforgettable.",
    intro:
      "Great brands aren't decorated — they're decided. We dig past the logo to define what you stand for, who you're for, and why it matters. The result is a brand system so sharp and so clear that every touchpoint compounds into recognition, trust, and demand.",
    images: {
      hero: "https://images.unsplash.com/photo-1763705857736-2b4f16a33758?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.pexels.com/photos/7598019/pexels-photo-7598019.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.pexels.com/photos/7598017/pexels-photo-7598017.jpeg?auto=compress&cs=tinysrgb&w=900",
      ],
      captions: ["Identity systems", "Packaging & mockups", "Brand guidelines"],
    },
    whatWeDo: [
      { icon: Compass, title: "Brand Positioning", desc: "Own a space no competitor can claim." },
      { icon: Palette, title: "Visual Identity", desc: "Logo, color, and design systems that stick." },
      { icon: MessageSquare, title: "Messaging Framework", desc: "The words that sell, on repeat." },
      { icon: Volume2, title: "Tone of Voice", desc: "A voice instantly recognizable as you." },
      { icon: Type, title: "Naming", desc: "Names that are bold, ownable, and lasting." },
      { icon: BookOpen, title: "Brand Guidelines", desc: "One source of truth for every team." },
    ],
    process: [
      { title: "Audit", desc: "We map your market, audience, and competitive whitespace." },
      { title: "Define", desc: "We lock positioning, narrative, and personality." },
      { title: "Design", desc: "We craft the identity and messaging system." },
      { title: "Activate", desc: "We roll it out with guidelines built to scale." },
    ],
    stats: [
      { to: 250, suffix: "+", label: "Identities built" },
      { to: 4.8, decimals: 1, suffix: "/5", label: "Client rating" },
      { to: 3, suffix: "x", label: "Avg brand recall lift" },
    ],
    related: ["public-relations", "content-creative", "website-development"],
    seo: {
      title: "Brand Strategy Agency — Positioning & Identity | Vibify",
      description: "Positioning, identity, and messaging that make brands unforgettable. Vibify builds brand systems that compound into demand.",
    },
  },
  {
    slug: "public-relations",
    name: "Public Relations",
    icon: Megaphone,
    category: "Public Relations",
    headline: "Be the story everyone's talking about.",
    subhead: "Earned media, press, and reputation that put you in the spotlight.",
    intro:
      "Attention is currency, and earned media is the highest-trust way to earn it. We craft the narratives, build the relationships, and land the placements that turn your brand into the name on everyone's lips — for all the right reasons.",
    images: {
      hero: "https://images.unsplash.com/photo-1485814837398-ed2048f57499?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.unsplash.com/photo-1581548708095-7158f2e63857?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "https://images.unsplash.com/photo-1620201330098-28c9679957eb?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.unsplash.com/photo-1745848413041-3eeb106db501?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      ],
      captions: ["Press & media", "Newsroom relations", "Thought leadership"],
    },
    whatWeDo: [
      { icon: Newspaper, title: "Media Relations", desc: "Relationships with the outlets that matter." },
      { icon: FileText, title: "Press Releases", desc: "News angles editors actually want to run." },
      { icon: Mic, title: "Thought Leadership", desc: "Position your execs as the voices to quote." },
      { icon: ShieldCheck, title: "Crisis Comms", desc: "Calm, controlled response when it counts." },
      { icon: CalendarClock, title: "Event PR", desc: "Launches and moments built for coverage." },
      { icon: Award, title: "Executive Profiling", desc: "Turn leaders into industry icons." },
    ],
    process: [
      { title: "Discover", desc: "We find the story angles hiding in your brand." },
      { title: "Pitch", desc: "We craft and place pitches with the right journalists." },
      { title: "Amplify", desc: "We maximize reach across earned and owned channels." },
      { title: "Protect", desc: "We safeguard and grow your reputation over time." },
    ],
    stats: [
      { to: 1.2, decimals: 1, suffix: "B+", label: "Impressions" },
      { to: 500, suffix: "+", label: "Placements" },
      { to: 40, suffix: "+", label: "Top-tier outlets" },
    ],
    related: ["brand-strategy", "social-media-marketing", "content-creative"],
    seo: {
      title: "Public Relations Agency — Earned Media & Press | Vibify",
      description: "Earned media, press, and reputation management that put your brand in the spotlight. PR that makes you the story.",
    },
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    icon: Share2,
    category: "Social Media",
    headline: "Scroll-stopping. Every single time.",
    subhead: "Content and community growth across every platform.",
    intro:
      "Feeds move fast — your brand has to move faster. We build always-on content engines and communities that don't just gather followers, they grow fans. Strategy, creative, and engagement working as one to keep you impossible to scroll past.",
    images: {
      hero: "https://images.unsplash.com/photo-1612130536441-95ece5dcbb86?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.unsplash.com/photo-1630797160668-2164d9518103?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      ],
      captions: ["Short-form video", "Content creation", "Community growth"],
    },
    whatWeDo: [
      { icon: Compass, title: "Content Strategy", desc: "A plan tuned to each platform's algorithm." },
      { icon: Video, title: "Short-form Video", desc: "Reels, Shorts, and TikToks built to spread." },
      { icon: Users2, title: "Community Management", desc: "Real conversations that build loyalty." },
      { icon: CalendarClock, title: "Calendar Planning", desc: "Consistent posting without the chaos." },
      { icon: TrendingUp, title: "Platform Growth", desc: "Audience gains that actually convert." },
      { icon: Search, title: "Social Listening", desc: "Insights from what your audience is saying." },
    ],
    process: [
      { title: "Plan", desc: "We define pillars, platforms, and a content calendar." },
      { title: "Create", desc: "We produce scroll-stopping content at volume." },
      { title: "Engage", desc: "We grow and nurture the community daily." },
      { title: "Optimize", desc: "We double down on what the data rewards." },
    ],
    stats: [
      { to: 18, suffix: "M+", label: "Followers grown" },
      { to: 320, suffix: "%", label: "Avg engagement lift" },
      { to: 7, suffix: "", label: "Platforms" },
    ],
    related: ["influencer-campaigns", "content-creative", "performance-ads"],
    seo: {
      title: "Social Media Marketing — Vibify",
      description: "Scroll-stopping content and community growth across every platform. Social strategy, video, and engagement that convert.",
    },
  },
  {
    slug: "influencer-campaigns",
    name: "Influencer Campaigns",
    icon: Users,
    category: "Influencer Marketing",
    headline: "Reach that actually converts.",
    subhead: "Creator partnerships that turn reach into real results.",
    intro:
      "The right creator says more in 30 seconds than an ad ever could. We match your brand with creators your audience already trusts, then run the campaigns end-to-end — from sourcing to contracts to the performance data that proves it worked.",
    images: {
      hero: "https://images.unsplash.com/photo-1760604359299-e4273ee2015a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.pexels.com/photos/4793171/pexels-photo-4793171.jpeg?auto=compress&cs=tinysrgb&w=1400",
        "https://images.unsplash.com/photo-1601561956009-2537dfe81266?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.unsplash.com/photo-1780413747834-fdc0f2e4ef93?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      ],
      captions: ["Creator partnerships", "UGC at scale", "Campaign management"],
    },
    whatWeDo: [
      { icon: Search, title: "Creator Sourcing", desc: "Vetted creators matched to your audience." },
      { icon: Handshake, title: "Campaign Management", desc: "We run it end-to-end so you don't have to." },
      { icon: Camera, title: "UGC", desc: "Authentic content you can use everywhere." },
      { icon: Repeat, title: "Affiliate Programs", desc: "Pay-for-performance that scales itself." },
      { icon: LineChart, title: "Performance Tracking", desc: "Every post tied to real outcomes." },
      { icon: FileText, title: "Contracts", desc: "Clear, protected partnerships, handled." },
    ],
    process: [
      { title: "Match", desc: "We identify creators with the right audience and fit." },
      { title: "Brief", desc: "We align on message, deliverables, and rights." },
      { title: "Launch", desc: "We manage production and go-live across creators." },
      { title: "Measure", desc: "We report ROAS and scale the top performers." },
    ],
    stats: [
      { to: 2000, suffix: "+", label: "Creators" },
      { to: 5, suffix: "x", label: "Avg ROAS" },
      { to: 90, suffix: "M+", label: "Campaign reach" },
    ],
    related: ["social-media-marketing", "content-creative", "performance-ads"],
    seo: {
      title: "Influencer Marketing Campaigns That Convert | Vibify",
      description: "Creator partnerships that turn reach into real results. Sourcing, UGC, affiliates, and performance tracking handled end-to-end.",
    },
  },
  {
    slug: "content-creative",
    name: "Content & Creative",
    icon: Palette,
    category: "Content & Creative",
    headline: "Ideas worth remembering.",
    subhead: "Bold visuals, video, and copy that define your voice.",
    intro:
      "Creative is the multiplier on everything you spend. Our in-house studio turns strategy into work people stop, feel, and share — from scroll-native video to campaign concepts that earn their own headlines. Beautiful, on-brand, and built to perform.",
    images: {
      hero: "https://images.pexels.com/photos/16175209/pexels-photo-16175209.jpeg?auto=compress&cs=tinysrgb&w=1400",
      showcase: [
        "https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "https://images.unsplash.com/photo-1632187981988-40f3cbaeef5e?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      ],
      captions: ["Video production", "On-set creative", "Campaign concepts"],
    },
    whatWeDo: [
      { icon: Video, title: "Video Production", desc: "From concept to final cut, in-house." },
      { icon: Camera, title: "Photography", desc: "Striking imagery that defines your look." },
      { icon: PenTool, title: "Copywriting", desc: "Words that move people to act." },
      { icon: Sparkles, title: "Motion Graphics", desc: "Animation that makes ideas pop." },
      { icon: Palette, title: "Art Direction", desc: "A cohesive, unmistakable visual world." },
      { icon: Compass, title: "Campaign Concepts", desc: "Big ideas built to travel." },
    ],
    process: [
      { title: "Concept", desc: "We develop the big idea and creative territory." },
      { title: "Pre-pro", desc: "We storyboard, cast, and plan the shoot." },
      { title: "Produce", desc: "We shoot, design, and craft the assets." },
      { title: "Deliver", desc: "We edit and package for every channel." },
    ],
    stats: [
      { to: 1500, suffix: "+", label: "Assets per year" },
      { to: 12, suffix: "", label: "In-house creatives" },
      { to: 4, suffix: "", label: "Industry awards" },
    ],
    related: ["brand-strategy", "social-media-marketing", "performance-ads"],
    seo: {
      title: "Content & Creative Studio — Video, Copy & Design | Vibify",
      description: "Bold visuals, video, and copy that define your voice. An in-house creative studio building work that performs.",
    },
  },
  {
    slug: "performance-ads",
    name: "Performance Ads",
    icon: BarChart3,
    category: "Performance Marketing",
    headline: "Growth you can measure.",
    subhead: "Data-driven paid campaigns engineered for ROI.",
    intro:
      "Every dollar should pull its weight. We architect paid campaigns across search and social, test relentlessly, and optimize toward the metrics that matter — lower costs, higher conversions, and a return on ad spend you can take to the board.",
    images: {
      hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      ],
      captions: ["Analytics dashboards", "Performance data", "Conversion tracking"],
    },
    whatWeDo: [
      { icon: Share2, title: "Paid Social", desc: "Meta, TikTok & more, engineered to scale." },
      { icon: Search, title: "Google / PPC", desc: "Capture demand at the moment of intent." },
      { icon: ShoppingCart, title: "Media Buying", desc: "Smart budget allocation across channels." },
      { icon: Repeat, title: "A/B Testing", desc: "Constant experiments, compounding wins." },
      { icon: MousePointerClick, title: "Retargeting", desc: "Bring back the buyers who almost did." },
      { icon: LineChart, title: "Analytics Dashboards", desc: "Live visibility into every dollar." },
    ],
    process: [
      { title: "Audit", desc: "We analyze accounts, funnels, and benchmarks." },
      { title: "Build", desc: "We structure campaigns, creative, and tracking." },
      { title: "Test", desc: "We run rapid experiments across audiences." },
      { title: "Scale", desc: "We pour budget into the winning combinations." },
    ],
    stats: [
      { to: 50, prefix: "$", suffix: "M+", label: "Ad spend managed" },
      { to: 6.2, decimals: 1, suffix: "x", label: "Avg ROAS" },
      { to: 35, suffix: "%", label: "Lower CPA" },
    ],
    related: ["social-media-marketing", "website-development", "influencer-campaigns"],
    seo: {
      title: "Performance Ads Agency — Paid Social & PPC ROI | Vibify",
      description: "Data-driven paid campaigns engineered for measurable ROI. Paid social, PPC, media buying, and conversion optimization.",
    },
  },
  {
    slug: "website-development",
    name: "Website Development",
    icon: Code2,
    category: "Web Development",
    headline: "Websites that work as hard as you do.",
    subhead: "Fast, beautiful, conversion-focused sites built to impress and perform.",
    intro:
      "Your website is your hardest-working salesperson. We design and build fast, gorgeous, conversion-obsessed sites — engineered for speed, search, and scale — so first impressions turn into customers and your brand looks as good as it sells.",
    images: {
      hero: "https://images.unsplash.com/photo-1602576666092-bf6447a729fc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "https://images.unsplash.com/photo-1520583457224-aee11bad5112?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.unsplash.com/photo-1680016661694-1cd3faf31c3a?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
      ],
      captions: ["Responsive build", "Clean codebase", "UI/UX design"],
    },
    whatWeDo: [
      { icon: Layout, title: "Web Design", desc: "Interfaces that feel premium and on-brand." },
      { icon: Smartphone, title: "Responsive Development", desc: "Flawless on every screen size." },
      { icon: ShoppingCart, title: "E-commerce", desc: "Storefronts engineered to sell." },
      { icon: Boxes, title: "CMS", desc: "Easy-to-edit content, no dev required." },
      { icon: Gauge, title: "Performance Optimization", desc: "Blazing speed and 95+ Lighthouse." },
      { icon: Search, title: "SEO Foundations", desc: "Built to be found from day one." },
    ],
    process: [
      { title: "Discover", desc: "We map goals, users, and conversion paths." },
      { title: "Design", desc: "We prototype and refine the experience." },
      { title: "Build", desc: "We develop fast, clean, scalable code." },
      { title: "Launch", desc: "We ship, optimize, and maintain." },
    ],
    stats: [
      { to: 300, suffix: "+", label: "Sites shipped" },
      { to: 95, suffix: "+", label: "Avg Lighthouse score" },
      { to: 2.5, decimals: 1, suffix: "x", label: "Avg conversion lift" },
    ],
    related: ["performance-ads", "brand-strategy", "proptech"],
    seo: {
      title: "Website Development — Fast, Converting Websites | Vibify",
      description: "Fast, beautiful, conversion-focused websites built to impress and perform. Web design, development, e-commerce, and SEO.",
    },
  },
  {
    slug: "proptech",
    name: "PropTech",
    icon: Building2,
    category: "PropTech",
    headline: "The future of property, marketed brilliantly.",
    subhead: "Marketing and digital products purpose-built for real estate and property brands.",
    intro:
      "Property moves on perception and speed. We blend marketing muscle with purpose-built digital products — listing platforms, virtual tours, and lead funnels — to help real estate brands sell faster, look sharper, and capture more qualified buyers.",
    images: {
      hero: "https://images.unsplash.com/photo-1758565811176-ccd94357a844?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
      showcase: [
        "https://images.unsplash.com/photo-1766603636700-e9d80473f40f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
        "https://images.unsplash.com/photo-1696861080288-0cc2f1cd48d5?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
        "https://images.pexels.com/photos/8134818/pexels-photo-8134818.jpeg?auto=compress&cs=tinysrgb&w=900",
      ],
      captions: ["Modern architecture", "Smart interiors", "Property showcases"],
    },
    whatWeDo: [
      { icon: Globe, title: "Web Walkthroughs", desc: "Interactive online tours buyers explore from anywhere." },
      { icon: Cuboid, title: "Digital Twins", desc: "Precise 3D replicas of every property and space." },
      { icon: Film, title: "Cinematic Walkthroughs", desc: "Filmic property videos that sell the lifestyle." },
      { icon: Boxes, title: "CRM Integrations", desc: "Connected pipelines so no lead slips through." },
      { icon: Workflow, title: "Lead Automation", desc: "Capture, qualify, and nurture buyers on autopilot." },
      { icon: Box, title: "Immersive Rooms", desc: "Configurable spaces buyers can personalize live." },
      { icon: Headset, title: "AR / VR Experiences", desc: "Step inside properties in full augmented and virtual reality." },
    ],
    process: [
      { title: "Strategize", desc: "We map the buyer journey for your properties." },
      { title: "Build", desc: "We create the platforms, tours, and funnels." },
      { title: "Promote", desc: "We drive qualified traffic to every listing." },
      { title: "Convert", desc: "We optimize toward faster, higher-value sales." },
    ],
    stats: [
      { to: 120, suffix: "+", label: "Property brands" },
      { to: 40, suffix: "%", label: "Faster sell-through" },
      { to: 3, suffix: "x", label: "Qualified leads" },
    ],
    related: ["website-development", "performance-ads", "content-creative"],
    seo: {
      title: "PropTech Marketing for Real Estate Brands | Vibify",
      description: "Marketing and digital products purpose-built for real estate and property brands. Listing platforms, virtual tours, and lead-gen.",
    },
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
