import Link from "next/link";
import { Service } from "@/data/services";
import { getIcon } from "@/lib/icons";

const ArrowUpRight = getIcon("ArrowUpRight");

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = getIcon(service.icon);
  const accent = index % 2 === 0 ? "border-oak-green" : "border-oak-amber";
  const iconColor = index % 2 === 0 ? "text-oak-green" : "text-oak-amber-dark";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex flex-col justify-between border-l-2 ${accent} bg-white p-6 transition-colors hover:bg-oak-surface-alt md:p-7`}
    >
      <div>
        <Icon size={26} strokeWidth={1.6} className={iconColor} />
        <h3 className="mt-4 text-[1.1rem] font-semibold text-oak-charcoal">
          {service.title}
        </h3>
        <p className="mt-2.5 text-[0.92rem] leading-relaxed text-oak-charcoal/65">
          {service.summary}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-oak-charcoal group-hover:text-oak-green">
        Learn more
        <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}
