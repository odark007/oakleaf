export type ApproachStep = {
  number: string;
  title: string;
  description: string;
};

export const approachSteps: ApproachStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We begin by understanding your organization, people, goals, challenges, and context.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "We identify the underlying causes of performance or capability gaps.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We develop a customized solution aligned with your organization's objectives.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "We provide engaging, practical, and participant-centered learning or consulting interventions.",
  },
  {
    number: "05",
    title: "Apply",
    description:
      "We help participants translate knowledge and skills into workplace practice.",
  },
  {
    number: "06",
    title: "Measure",
    description:
      "We assess learning, application, behavioral change, and organizational outcomes.",
  },
  {
    number: "07",
    title: "Improve",
    description:
      "We use feedback and evidence to refine interventions and strengthen long-term impact.",
  },
];
