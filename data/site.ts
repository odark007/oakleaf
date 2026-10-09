export const siteConfig = {
  name: "Oakleaf Training & Consulting",
  shortName: "Oakleaf",
  domain: "https://oakleaftraining.com",
  tagline: "Growing People. Strengthening Organizations. Creating Impact.",
  description:
    "Oakleaf Training & Consulting provides practical training, consulting, strategy, and organizational development solutions that help businesses, non-profits, institutions, and leaders improve performance and achieve sustainable results.",
  location: "Ghana",
  email: "info@oakleafafrica.com",
  phone: "+233 243 521 917",
  whatsapp: "+233243521917",
  linkedin: "#",
  facebook: "#",
};

export const coreValues = [
  {
    title: "Excellence",
    description:
      "We pursue high standards in everything we do and continuously seek better ways to create value for our clients.",
    icon: "Award",
  },
  {
    title: "Integrity",
    description:
      "We operate with honesty, professionalism, accountability, and respect.",
    icon: "ShieldCheck",
  },
  {
    title: "People Development",
    description:
      "We believe that investing in people is one of the most powerful ways to create sustainable organizational growth.",
    icon: "Sprout",
  },
  {
    title: "Practical Impact",
    description:
      "We focus on solutions that can be applied in real-world situations and produce meaningful results.",
    icon: "Target",
  },
  {
    title: "Collaboration",
    description:
      "We work closely with our clients, recognizing that the best solutions are developed through partnership.",
    icon: "Handshake",
  },
  {
    title: "Innovation",
    description:
      "We embrace new ideas, technologies, methodologies, and approaches to solving organizational challenges.",
    icon: "Lightbulb",
  },
];

export const faqs = [
  {
    question: "Do you provide customized training?",
    answer:
      "Yes. Our programs can be customized to reflect your organization's goals, industry, workforce, and specific performance challenges.",
  },
  {
    question: "Can you train our entire organization?",
    answer:
      "Yes. We can design interventions for specific teams, departments, management groups, or the entire organization.",
  },
  {
    question: "Do you provide virtual training?",
    answer:
      "Yes. Depending on the program, we can deliver training through in-person, virtual, or hybrid formats.",
  },
  {
    question: "Do you work with NGOs?",
    answer:
      "Yes. We support NGOs and development organizations with training, organizational development, HR systems, policies, leadership development, and capacity strengthening.",
  },
  {
    question: "Can you develop policies for our organization?",
    answer:
      "Yes. We can develop customized organizational policies, procedures, handbooks, and related systems.",
  },
  {
    question: "Can you conduct a training needs assessment?",
    answer:
      "Yes. We can assess organizational and employee capability gaps and use the findings to develop targeted learning interventions.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply contact us. We will arrange an initial conversation to understand your needs and determine how we can support you.",
  },
];

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/about/team" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All Services", href: "/services" },
      {
        label: "Training & Capacity Development",
        href: "/services/training-capacity-development",
      },
      {
        label: "Leadership Development",
        href: "/services/leadership-development",
      },
      {
        label: "Organizational Development",
        href: "/services/organizational-development",
      },
      {
        label: "Human Resource Consulting",
        href: "/services/human-resource-consulting",
      },
      {
        label: "Performance Management",
        href: "/services/performance-management",
      },
      {
        label: "Consulting & Advisory Services",
        href: "/services/consulting-advisory",
      },
      {
        label: "Team Building & Retreats",
        href: "/services/team-building-retreats",
      },
    ],
  },
  {
    label: "Approach",
    href: "/approach",
    children: [
      { label: "Our Approach", href: "/approach" },
      { label: "Why Choose Oakleaf", href: "/approach/why-choose-oakleaf" },
      { label: "Who We Serve", href: "/approach/who-we-serve" },
      { label: "Training Philosophy", href: "/approach/training-philosophy" },
      { label: "Our Impact", href: "/approach/our-impact" },
      { label: "Client Experience", href: "/approach/client-experience" },
      { label: "Our Process", href: "/approach/our-process" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      { label: "All Programs", href: "/programs" },
      { label: "Become a Certified Trainer", href: "/programs/certified-trainer" },
      { label: "Management & Leadership Development Program", href: "/programs/mldp" },
    ],
  },
  { label: "Digital Transformation", href: "/digital-transformation" },
  { label: "Contact", href: "/contact" },
];
