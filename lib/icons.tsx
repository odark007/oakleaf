import {
  GraduationCap,
  Compass,
  Building2,
  Users,
  Target,
  Lightbulb,
  Users2,
  Award,
  ShieldCheck,
  Sprout,
  Handshake,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Leaf,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Laptop,
  ShieldAlert,
  TrendingUp,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

function LinkedinIcon(props: LucideProps) {
  const { size = 24, color = "currentColor", strokeWidth, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      {...rest}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  );
}

function FacebookIcon(props: LucideProps) {
  const { size = 24, color = "currentColor", strokeWidth, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      {...rest}
    >
      <path d="M13.5 21v-7.5H16l.5-3.3h-3V8.1c0-.96.32-1.6 1.72-1.6H16.6V3.5C16.3 3.46 15.28 3.36 14.1 3.36c-2.44 0-4.12 1.49-4.12 4.22v2.62H7.4v3.3h2.58V21h3.52Z" />
    </svg>
  );
}

export const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Compass,
  Building2,
  Users,
  Target,
  Lightbulb,
  Users2,
  Award,
  ShieldCheck,
  Sprout,
  Handshake,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Linkedin: LinkedinIcon as unknown as LucideIcon,
  Facebook: FacebookIcon as unknown as LucideIcon,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Leaf,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Laptop,
  ShieldAlert,
  TrendingUp,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Leaf;
}
