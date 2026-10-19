import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/sections/cta-section";
import { programs } from "@/data/programs";
import { getIcon } from "@/lib/icons";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { ContactPhone } from "@/components/sections/contact-phone";
import { TrainerRegisterTrigger } from "@/components/sections/trainer-register-trigger";
import { socialMetadata } from "@/lib/seo";
import { courseJsonLd, breadcrumbJsonLd, educationEventJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Become a Certified Trainer",
  description: programs.certifiedTrainer.summary,
  ...socialMetadata({
    title: "Become a Certified Trainer | Oakleaf Training & Consulting",
    description: programs.certifiedTrainer.summary,
    path: "/programs/certified-trainer",
    image: "/images/Certified%20Trainer%20Course%20Banner.jpg",
  }),
};

const CheckCircle2 = getIcon("CheckCircle2");
const p = programs.certifiedTrainer;

const earnedSkills = [
  "Public Speaking",
  "Self Motivation",
  "Presentation Skills",
  "Training / Facilitation Skills",
  "Self Confidence",
  "Attitude Control",
  "Communication",
  "Interpersonal Relations",
  "Leadership",
  "Goal Setting",
];

export default function CertifiedTrainerPage() {
  return (
    <>
      <h1 className="sr-only">
        Become a Certified Trainer in Ghana â€” 5-day GRID training methodology course
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            courseJsonLd({
              name: "Become a Certified Trainer",
              description: programs.certifiedTrainer.summary,
              path: "/programs/certified-trainer",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            educationEventJsonLd({
              name: "Become a Certified Trainer â€” November 2026 Session (Tema)",
              description: programs.certifiedTrainer.summary,
              path: "/programs/certified-trainer",
              startDate: "2026-11-23",
              endDate: "2026-11-27",
              locality: "Tema",
              venueName: "Entreva Hub, Community 25, Tema",
              price: "4700",
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Programs", path: "/programs" },
              { name: "Become a Certified Trainer", path: "/programs/certified-trainer" },
            ])
          ),
        }}
      />
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div className="relative aspect-[1983/793] w-full md:hidden">
          <Image
            src="/images/Certified Trainer Course Banner.jpg"
            alt="Participants in a Become a Certified Trainer workshop session in Ghana"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative hidden min-h-[300px] md:block md:min-h-[400px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Certified Trainer Course Banner.jpg')" }}
          />
        </div>
      </section>

      <section className="border-b border-oak-line bg-oak-green-deep py-4">
        <div className="container-oak">
          <h2 className="text-center text-[0.95rem] font-semibold text-white">
            skills you&rsquo;d gain
          </h2>
        </div>
        <div className="relative mt-2 overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee">
            {[...earnedSkills, ...earnedSkills].map((skill, i) => (
              <span
                key={i}
                className="mx-5 flex items-center gap-10 whitespace-nowrap text-[0.9rem] font-medium text-white/90"
              >
                {skill}
                <span className="text-oak-amber">â€¢</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#c1121f] py-10 md:py-14">
        <div className="container-oak grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="text-white">
            <h3 className="text-[1.05rem] font-semibold text-oak-amber">
              Purpose:
            </h3>
            <p className="mt-3 leading-relaxed">
              To help reverse the skills-shortage in Africa, by &ldquo;releasing the trainer&rdquo; which
              exists within every person&rsquo;s &ldquo;hidden potential&rdquo; &ndash; and training them
              professionally, to teach and train others in the skills they possess. Participants need no
              previous experience, or particular education, or background.
            </p>

            <h3 className="mt-6 text-[1.05rem] font-semibold text-oak-amber">
              Who Should Attend
            </h3>
            <ul className="mt-3 space-y-2 leading-relaxed">
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>
                  Anyone who needs to develop their personal skills, competence and abilities in Self
                  Confidence, Public Speaking, Leadership, Goal Setting, Attitude Control, Communication,
                  Inter-Personal Relations, Self-Motivation, Presentation Skills
                </span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>Anyone who wants to develop their &ldquo;hidden potential&rdquo;</span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>Anyone who wants to develop their training/facilitation skills</span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>Anyone who wants to change the behavior and attitude of others</span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>
                  Anyone who wants to gain competence to design, write manual and facilitate training using
                  the GRID Training Method
                </span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>
                  Anyone who desires a simplified and easy-to-use methodology to design and train others
                </span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>Subject-matter experts moving into a training or facilitation role</span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>HR and L&amp;D professionals expanding their delivery skills</span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>Supervisors and managers who train and coach their teams</span>
              </li>
              <li className="flex gap-2">
                <span>â€¢</span>
                <span>Independent consultants building a training practice</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[4/3] w-full border-4 border-white">
              <Image
                src="/images/cert-trainer-1.jpg"
                alt="Certified trainer participants"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] w-full border-4 border-white">
              <Image
                src="/images/cert-trainer-2.jpg"
                alt="GRID training workshop session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

      </section>

      <section className="border-t border-oak-line pb-16 pt-8 md:pb-20 md:pt-10">
        <div className="container-oak">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 id="become-a-certified-trainer-in-5-days-of-high-impact-hands-on-training" className="scroll-mt-24 text-[1.4rem] font-semibold text-oak-charcoal md:text-[1.8rem]">
                BECOME A CERTIFIED TRAINER
              </h2>
              <p className="mt-1 text-[1.1rem] leading-relaxed text-oak-charcoal/70">
                in 5 days of high impact hands-on training
              </p>
            </div>

            <div className="mt-8 space-y-6 text-oak-charcoal/80">
              <div>
                <h3 className="text-[1.05rem] font-semibold text-oak-charcoal">
                  ABOUT THE GRID TRAINING METHODOLOGY
                </h3>
                <p className="mt-3 leading-relaxed">
                  The GRID Training Method Course was developed by Len Stevens and used in South Africa for 30+ years. In
                  Ghana, 100+ professionals have been trained and certified.
                </p>
                <p className="mt-3 leading-relaxed">
                  The GRID Training Methodology ensures effective skills transfer training. It is used to design learning
                  experiences to ensure high impact interactive training, engaging participants in discussions, practice
                  sessions, role plays, exercises, case studies and presentations. This training tool develops practical
                  skills, the right attitude and change in behavior to improve work performance. It ensures a 360-degree
                  complete training cycle. The system works!
                </p>
              </div>

              <div>
                <h3 className="text-[1.05rem] font-semibold text-oak-charcoal">
                  TRAINING OUTCOME
                </h3>
                <p className="mt-3 leading-relaxed">
                  The training will provide a toolbox of skills for the participants, giving them the practical and
                  measurable skills, attitudes, behaviors and mindset to effectively design and deliver effective training
                  workshops.
                </p>
                <p className="mt-3 leading-relaxed">The proven outcomes of this training are:</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>develop their hidden potential and be more productive</span>
                  </li>
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>
                      develop these 9 critical skills essential for any effective leader or professional:{" "}
                      <em>public speaking</em>, <em>presentation skills</em>, <em>self-confidence</em>,{" "}
                      <em>attitude control</em>, <em>self-motivation</em>, <em>communication</em>,{" "}
                      <em>interpersonal relations</em>, <em>goal setting</em>, <em>leadership</em>.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>
                      competence to design and deliver impactful, engaging and highly interactive training to give
                      learners great learning experience and transfer skills using the GRID methodology.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-oak-charcoal">DATES</h4>
                  <p className="mt-1">Monday, 23rd â€“ Friday, 27th November 2026</p>
                </div>
                <div>
                  <h4 className="font-semibold text-oak-charcoal">VENUE</h4>
                  <p className="mt-1">Entreva Hub, Community 25, Tema</p>
                </div>
              </div>

              <div>
                <h3 className="text-[1.05rem] font-semibold text-oak-charcoal">TRAINING FEE</h3>
                <p className="mt-2">GHS 4,700 per participant.</p>
                <ul className="mt-3 space-y-2">
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>5-day of 35-hours in-person training</span>
                  </li>
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>printed training workbook</span>
                  </li>
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>printed training manual</span>
                  </li>
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>printed certificate</span>
                  </li>
                  <li className="flex gap-2">
                    <span>â€¢</span>
                    <span>snack and lunch</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TrainerRegisterTrigger />
              <p className="text-sm text-oak-charcoal/70">
                Contact: <ContactPhone /> |{" "}
                <a href="mailto:training@oakleafafrica.com" className="text-oak-green hover:underline">
                  training@oakleafafrica.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-oak-line bg-oak-surface-alt py-16 md:py-20">
        <div className="container-oak">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[1.3rem] font-semibold text-oak-charcoal md:text-[1.6rem]">
              Feedback from previous participants
            </h2>
          </div>
          <div className="mt-8">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      <section className="border-t border-oak-line py-16 md:py-20">
        <div className="container-oak grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">
              Course Structure
            </h2>
            <div className="mt-6 space-y-5">
              {p.structure.map((item, i) => (
                <div key={item.title} className="flex gap-5 border-b border-oak-line pb-5 last:border-0">
                  <span className="text-[0.85rem] font-semibold text-oak-green">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-semibold text-oak-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-oak-charcoal/65">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-8 lg:pl-6">
            <div className="border border-oak-line bg-oak-surface-alt p-6">
              <h2 className="text-[0.95rem] font-semibold text-oak-charcoal">
                What you'll walk away with
              </h2>
              <ul className="mt-4 space-y-3">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[0.88rem] text-oak-charcoal/70">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-oak-amber-dark" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaSection
        title="Ready to enroll?"
        description="Tell us about your background and goals, and we'll help you find the right cohort."
        primaryLabel="Request Enrollment Info"
      />
    </>
  );
}
