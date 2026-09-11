export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  summary: string;
  intro: string;
  areas?: string[];
  delivery?: string[];
  bullets?: string[];
  closing?: string;
};

export const services: Service[] = [
  {
    slug: "training-capacity-development",
    title: "Training & Capacity Development",
    shortTitle: "Training & Capacity",
    icon: "GraduationCap",
    summary:
      "Practical learning experiences that build the competencies individuals and teams need to succeed, customized to your organization.",
    intro:
      "We design and deliver practical learning experiences that help individuals and teams build the competencies required for success. Every program is shaped around your organization's specific context rather than delivered off the shelf.",
    areas: [
      "Leadership and Management",
      "Supervisory Skills",
      "Performance Management",
      "People Management",
      "Team Building and Team Effectiveness",
      "Communication Skills",
      "Emotional Intelligence",
      "Customer Service Excellence",
      "Personal Effectiveness",
      "Time Management",
      "Problem Solving and Decision Making",
      "Conflict Management",
      "Coaching and Mentoring",
      "Presentation and Facilitation Skills",
      "Entrepreneurship and Business Development",
      "Professional Ethics and Workplace Conduct",
      "Diversity, Equity and Inclusion",
      "Workplace Safety",
      "Safeguarding",
      "Employee Engagement",
      "Change Management",
    ],
    delivery: [
      "In-person workshops",
      "Virtual training",
      "Hybrid learning",
      "Executive retreats",
      "Leadership seminars",
      "Team development sessions",
      "Customized organizational programs",
    ],
  },
  {
    slug: "leadership-development",
    title: "Leadership Development",
    shortTitle: "Leadership Development",
    icon: "Compass",
    summary:
      "Developing leaders who create results — from emerging supervisors to senior executives.",
    intro:
      "Effective leadership is more than having a position. It is about influencing people, making sound decisions, building trust, managing performance, and creating an environment where people can thrive. Our leadership development programs help current and emerging leaders strengthen the capabilities they need to lead effectively.",
    bullets: [
      "Emerging Leaders Programs",
      "Executive Leadership Development",
      "Supervisory Leadership",
      "Servant Leadership",
      "Strategic Leadership",
      "Performance Leadership",
      "Adaptive Leadership",
      "Leadership Coaching",
      "Women in Leadership",
      "Leading High-Performance Teams",
      "Leadership Transition Programs",
    ],
    closing:
      "We help leaders move from simply managing tasks to developing people and delivering sustainable results.",
  },
  {
    slug: "organizational-development",
    title: "Organizational Development",
    shortTitle: "Organizational Development",
    icon: "Building2",
    summary:
      "Identifying the root causes of performance challenges and building organizations that perform.",
    intro:
      "Organizational challenges are rarely caused by a single factor. Performance may be affected by people, systems, structures, culture, leadership, strategy, or processes. Oakleaf helps organizations identify the root causes of performance challenges and develop practical interventions.",
    bullets: [
      "Organizational Performance Assessment",
      "Organizational Culture Assessment",
      "Employee Engagement Assessment",
      "Team Effectiveness Assessment",
      "Organizational Capacity Assessment",
      "Performance Management Systems",
      "Organizational Structure Review",
      "Change Management",
      "Workforce Development",
      "Strategic Planning",
      "Policy and Procedure Development",
      "Organizational Systems Strengthening",
      "Process Improvement",
    ],
  },
  {
    slug: "human-resource-consulting",
    title: "Human Resource Consulting",
    shortTitle: "HR Consulting",
    icon: "Users",
    summary:
      "Helping organizations build stronger people systems that attract, develop, engage, and retain talent.",
    intro:
      "Your people are one of your organization's most important assets. We help organizations establish HR systems that attract, develop, engage, and retain capable employees.",
    bullets: [
      "HR Policy Development",
      "Employee Handbook Development",
      "Job Descriptions",
      "Competency Frameworks",
      "Performance Management Systems",
      "Executive Recruitment and Selection Support",
      "Employee Onboarding Systems",
      "Training Needs Assessments",
      "Learning and Development Strategy",
      "Employee Engagement",
      "Talent Management",
      "Career Development",
      "HR Audit and Systems Review",
    ],
  },
  {
    slug: "performance-management",
    title: "Performance Management",
    shortTitle: "Performance Management",
    icon: "Target",
    summary:
      "Turning individual performance into organizational results through continuous, evidence-based systems.",
    intro:
      "A strong performance management system connects organizational goals with individual responsibilities and measurable outcomes. Oakleaf helps organizations create performance systems that encourage accountability, development, continuous feedback, and results.",
    bullets: [
      "Performance Management Frameworks",
      "KPI Development",
      "Performance Appraisal Systems",
      "Performance Improvement Plans",
      "Goal Setting",
      "Competency-Based Performance Management",
      "Performance Reviews",
      "Employee Development Plans",
      "Manager and Supervisor Training",
      "Performance Coaching",
    ],
    closing:
      "Our goal is to move organizations from annual appraisal processes to continuous performance conversations and development.",
  },
  {
    slug: "consulting-advisory",
    title: "Consulting & Advisory Services",
    shortTitle: "Consulting & Advisory",
    icon: "Lightbulb",
    summary:
      "Practical, evidence-informed solutions to complex organizational challenges, from diagnosis to implementation.",
    intro:
      "We partner with organizations to diagnose challenges, identify opportunities, develop solutions, and support implementation. Our consulting approach is collaborative and evidence-informed.",
    bullets: [
      "Organizational Strategy",
      "People and Performance",
      "Human Resources",
      "Leadership",
      "Organizational Development",
      "Policy Development",
      "Governance",
      "Organizational Culture",
      "Capacity Building",
      "Program Management",
      "Monitoring and Evaluation",
      "Business Process Improvement",
      "Training Strategy",
      "Institutional Strengthening",
    ],
  },
  {
    slug: "team-building-retreats",
    title: "Team Building & Organizational Retreats",
    shortTitle: "Team Building & Retreats",
    icon: "Users2",
    summary:
      "Customized programs that turn groups of individuals into high-performing, trust-driven teams.",
    intro:
      "High-performing teams are built on trust, communication, accountability, shared purpose, and collaboration. Our customized team-building programs help organizations improve relationships, strengthen communication, resolve challenges, and create stronger team dynamics.",
    bullets: [
      "Team-building activities",
      "Leadership retreats",
      "Strategic retreats",
      "Team effectiveness workshops",
      "Communication exercises",
      "Trust-building activities",
      "Conflict resolution sessions",
      "Problem-solving challenges",
      "Reflection and organizational alignment sessions",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
