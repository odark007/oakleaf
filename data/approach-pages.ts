export type ApproachBlock = {
  title: string;
  body: string;
};

export type ApproachPage = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  blocks: ApproachBlock[];
};

export const approachPages: ApproachPage[] = [
  {
    slug: "why-choose-oakleaf",
    title: "Why Choose Oakleaf",
    tagline: "We don't just deliver training. We develop capability.",
    intro:
      "Organizations work with Oakleaf because our solutions are built around their context, not a fixed curriculum.",
    blocks: [
      {
        title: "Customized Solutions",
        body: "We do not believe in one-size-fits-all training. Our solutions are tailored to your organization's context and objectives.",
      },
      {
        title: "Practical Learning",
        body: "Participants are encouraged to apply concepts through case studies, simulations, discussions, exercises, reflection, and workplace application.",
      },
      {
        title: "Experienced Facilitators",
        body: "Our facilitators combine professional knowledge with practical experience to create meaningful learning experiences.",
      },
      {
        title: "Results Focused",
        body: "We connect learning and consulting interventions to organizational priorities and measurable outcomes.",
      },
      {
        title: "Partnership Approach",
        body: "We work alongside clients rather than simply delivering a service and walking away.",
      },
      {
        title: "Sustainable Development",
        body: "Our goal is to create capabilities that remain within the organization long after our engagement ends.",
      },
    ],
  },
  {
    slug: "who-we-serve",
    title: "Who We Serve",
    tagline: "A diverse range of organizations, one practical approach.",
    intro:
      "We work with organizations of different sizes, sectors, and missions across Ghana and beyond.",
    blocks: [
      {
        title: "Businesses",
        body: "Small businesses, growing enterprises, established companies, and corporate organizations.",
      },
      {
        title: "Non-Profit Organizations",
        body: "NGOs, charities, foundations, community-based organizations, and development organizations.",
      },
      {
        title: "Public and Government Institutions",
        body: "Institutions seeking to strengthen employee capability, leadership, service delivery, and organizational effectiveness.",
      },
      {
        title: "Educational Institutions",
        body: "Schools, training institutions, and educational organizations seeking leadership and capacity development.",
      },
      {
        title: "Faith-Based Organizations",
        body: "Churches and faith-based organizations seeking stronger leadership, governance, people management, and organizational systems.",
      },
      {
        title: "Entrepreneurs and Professionals",
        body: "Individuals seeking to improve their leadership, business, career, and professional capabilities.",
      },
    ],
  },
  {
    slug: "training-philosophy",
    title: "Our Training Philosophy",
    tagline: "Learning should change something.",
    intro:
      "We believe effective learning should result in more than participants receiving certificates. It should change how people think, behave, communicate, lead, solve problems, and perform.",
    blocks: [
      {
        title: "Engagement",
        body: "We create learning environments where participants can ask questions and experiment with new ideas from the outset.",
      },
      {
        title: "Understanding",
        body: "Concepts are grounded in real workplace situations so participants see how the ideas apply to them.",
      },
      {
        title: "Practice",
        body: "Participants rehearse new skills through exercises, case studies, and simulations rather than passive listening.",
      },
      {
        title: "Feedback",
        body: "We build in structured opportunities for participants to receive feedback and reflect on their experiences.",
      },
      {
        title: "Application & Results",
        body: "Learning is translated into practical action plans, so it carries into the workplace and produces measurable results.",
      },
    ],
  },
  {
    slug: "our-impact",
    title: "Our Impact",
    tagline: "Developing people. Strengthening organizations. Transforming communities.",
    intro:
      "When organizations invest in people, the benefits extend beyond individual employees.",
    blocks: [
      {
        title: "Stronger leaders build stronger teams",
        body: "Leadership development compounds — capable leaders multiply capability across the people they lead.",
      },
      {
        title: "Stronger teams build stronger organizations",
        body: "Team effectiveness translates directly into organizational performance and resilience.",
      },
      {
        title: "Stronger organizations create broader impact",
        body: "Better products, services, opportunities, workplaces, and communities follow from organizational strength.",
      },
    ],
  },
  {
    slug: "client-experience",
    title: "Client Experience",
    tagline: "What you can expect from us.",
    intro:
      "Our relationship with clients does not have to end when the workshop ends.",
    blocks: [
      {
        title: "Before the Engagement",
        body: "We listen, assess your needs, clarify objectives, and agree on the desired outcomes.",
      },
      {
        title: "During the Engagement",
        body: "We create an engaging, respectful, practical, and participatory experience.",
      },
      {
        title: "After the Engagement",
        body: "We support application, reflection, follow-up, and measurement where appropriate.",
      },
    ],
  },
  {
    slug: "our-process",
    title: "Our Process",
    tagline: "Simple. Collaborative. Results-focused.",
    intro:
      "Every engagement follows a clear, five-stage path from first conversation to evaluated outcomes.",
    blocks: [
      {
        title: "01 — Connect",
        body: "Tell us about your organization and the challenge you want to address.",
      },
      {
        title: "02 — Understand",
        body: "We conduct discussions, assessments, or diagnostics to understand your needs.",
      },
      {
        title: "03 — Propose",
        body: "We develop a solution, approach, timeline, and investment based on your requirements.",
      },
      {
        title: "04 — Implement",
        body: "We deliver the agreed training, consulting, coaching, or organizational development intervention.",
      },
      {
        title: "05 — Evaluate",
        body: "We review outcomes, gather feedback, and identify opportunities for continued improvement.",
      },
    ],
  },
];

export function getApproachPageBySlug(slug: string) {
  return approachPages.find((p) => p.slug === slug);
}
