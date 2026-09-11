import { ApproachStep } from "@/data/approach-steps";

export function StepTimeline({ steps }: { steps: ApproachStep[] }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => (
        <li key={step.number} className="relative flex gap-6 pb-10 last:pb-0">
          <div className="flex flex-col items-center">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-oak-green text-[0.95rem] font-semibold text-oak-green">
              {step.number}
            </span>
            {i < steps.length - 1 && (
              <span className="mt-1 w-px flex-1 bg-oak-line" aria-hidden="true" />
            )}
          </div>
          <div className="pt-1.5">
            <h3 className="text-[1.15rem] font-semibold text-oak-charcoal">
              {step.title}
            </h3>
            <p className="mt-1.5 max-w-md text-[0.94rem] leading-relaxed text-oak-charcoal/65">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
