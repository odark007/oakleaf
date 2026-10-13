"use client";

import { useEffect, useState } from "react";

export type Testimonial = {
  text: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    text: "I have been teaching for 24 years and changed careers to be a facilitator. This course opened a new dimension of speaking and doing. I am equipped to handle any situation using the GRID Method.",
    name: "Florence Vanderpuye",
    title: "Principal Planning Officer, VRA",
  },
  {
    text: "After over 30 years in public service, I now realize I can do so much more. The GRID Training Method has equipped me to help the youth discover their hidden potential.",
    name: "Irene Dodoo",
    title: "Deputy Registrar, WAEC",
  },
  {
    text: "I am grateful for building my self-confidence and becoming a qualified trainer. The GRID training is the best I have attended globally.",
    name: "Ramatu Ali Toure",
    title: "Training Officer, Ghana Manganese Co. Ltd.",
  },
  {
    text: "I will be one of the best trainers in Ghana. This method enhanced my skills and empowered me to utilize my full potential.",
    name: "Thelma Tetteh-Quaye",
    title: "Manager (Domestic Banking Operations), Cal Bank Limited",
  },
  {
    text: "Meeting you was a wonderful opportunity to become a better person. You have adequately prepared me to sharpen my career and made a significant impact on my life.",
    name: "Ato Van-Ess",
    title: "Master Trainer, Director at Eff-Ess Company Limited",
  },
  {
    text: "Having attended several ToT courses, I thought it was a refresher - I was wrong. The GRID Method is a game changer.",
    name: "Nicholas Harry Agbeli",
    title: "Principal Training Officer - VRA Training School",
  },
  {
    text: "This was a divine meeting. I will use the GRID Training Method to train others and help make Ghana and the world a better place.",
    name: "Doreen Baffoe",
    title: "Trainer & Coach, BranchOut & Customer Service Centre Manager, Stanbic Bank",
  },
  {
    text: "The GRID Training Method has been of immense benefit. I gained more skills, insight, knowledge and techniques to improve my communication and presentation skills.",
    name: "Kofi Adu",
    title: "Trainer, Vodafone",
  },
  {
    text: "I am equipped to pursue my dream of empowering the youth. This course unearthed my hidden potential and gave me confidence to lead and deliver training for all ages.",
    name: "James Mills",
    title: "Chief Customer Officer, Transsnet Financial",
  },
  {
    text: "You brought out my hidden potential. I'm now more empowered than ever. The GRID Training Method is the best I have ever come across - it's a game changer.",
    name: "Susana Abugri",
    title: "Operations Manager, Vodafone",
  },
  {
    text: "It's been an exhilarating experience these 5 days. This is an eye-opener and a turning point in my career.",
    name: "Wilfred Ashong",
    title: "Experience Centre Operation Manager, Vodafone",
  },
  {
    text: "My previous trainings were knowledge-based with no skills developed. Now I am an effective and efficient trainer. This is the best course ever.",
    name: "Charles Imbrah",
    title: "Trainer & Community Development Professional",
  },
  {
    text: "The GRID Method has given me a new dimension to training. It brought out strengths I didn't know I had and gave me self-awareness.",
    name: "Samuel Kweku Annan",
    title: "HR Manager, AECOM",
  },
  {
    text: "This 5-day session helped me unlearn and relearn. The Attitude and Goal Setting sessions showed me I can achieve anything.",
    name: "Dzifa Amelorku",
    title: "Training Manager, Kempinski Hotel",
  },
  {
    text: "This course is a real eye-opener. The highly participatory method ensures learning stays with you for life - I cannot forget it.",
    name: "Rosemond Evans",
    title: "Lawyer",
  },
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {testimonials.map((t, i) => (
          <div key={i} className="min-w-full px-4">
            <blockquote className="mx-auto max-w-3xl rounded-lg border border-oak-line bg-white p-8 shadow-sm">
              <p className="text-center text-lg leading-relaxed text-oak-charcoal/80 md:text-xl">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 text-center">
                <p className="font-semibold text-oak-charcoal">{t.name}</p>
                <p className="text-sm text-oak-charcoal/60">{t.title}</p>
              </div>
            </blockquote>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === i ? "bg-oak-green" : "bg-oak-line"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
