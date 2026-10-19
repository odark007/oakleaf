import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Become a Certified Trainer",
  description:
    "Register for the Become a Certified Trainer 5-day GRID training program in Tema, Ghana. Secure your seat for the next cohort.",
};

export default function TrainerRegisterPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div className="relative">
          <div className="container-oak py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-oak-green">
                Program Registration
              </span>
              <h1 className="mt-3 text-[2rem] font-semibold text-oak-charcoal md:text-[2.6rem]">
                Register for Certified Trainer Program
              </h1>
              <p className="mt-3 text-[1rem] text-oak-charcoal/70">
                Fill out the form below to register for the Certified Trainer Program.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-oak">
          <div className="mx-auto max-w-2xl">
            <div className="border border-oak-line bg-white p-6 shadow-sm md:p-8">
              <p className="text-oak-charcoal/70">
                Registration form coming soon. For now, please contact us at{" "}
                <a href="tel:+233243521917" className="text-oak-green hover:underline">
                  0243521917
                </a>{" "}
                or{" "}
                <a href="mailto:training@oakleafafrica.com" className="text-oak-green hover:underline">
                  training@oakleafafrica.com
                </a>{" "}
                to register.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
