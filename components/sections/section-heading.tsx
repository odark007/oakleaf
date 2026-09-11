export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && <p className="text-[0.85rem] font-medium text-oak-green">{kicker}</p>}
      <h2 className="mt-2.5 text-[1.9rem] font-semibold leading-tight tracking-tight text-oak-charcoal md:text-[2.2rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[1rem] leading-relaxed text-oak-charcoal/65">
          {description}
        </p>
      )}
    </div>
  );
}
