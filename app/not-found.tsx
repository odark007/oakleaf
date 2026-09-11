import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const Leaf = getIcon("Leaf");

export default function NotFound() {
  return (
    <section className="bg-oak-surface-alt">
      <div className="container-oak flex min-h-[70vh] flex-col items-start justify-center py-20">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-oak-green-deep text-oak-amber">
          <Leaf size={22} />
        </span>
        <p className="mt-6 text-[0.85rem] font-medium text-oak-green">404 error</p>
        <h1 className="mt-2 text-[2.2rem] font-semibold leading-tight text-oak-charcoal md:text-[2.6rem]">
          We couldn't find that page
        </h1>
        <p className="mt-4 max-w-md text-[1rem] leading-relaxed text-oak-charcoal/65">
          The page you're looking for may have moved or no longer exists. Let's get you
          back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/" variant="primary" className="rounded-sm">
            Back to Home
          </LinkButton>
          <LinkButton href="/contact" variant="outline" className="rounded-sm">
            Contact Us
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
