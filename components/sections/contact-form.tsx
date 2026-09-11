"use client";

import { FormEvent, useState } from "react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icons";

const CheckCircle2 = getIcon("CheckCircle2");

const fieldClass =
  "w-full border border-oak-line bg-white px-4 py-3 text-[0.95rem] text-oak-charcoal placeholder:text-oak-charcoal/35 focus:border-oak-green";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Form submission is deferred for client integration (e.g. a form
    // endpoint or email service) once the site is deployed.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-6 flex items-start gap-3 border border-oak-green/30 bg-oak-surface-alt p-6">
        <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-oak-green" />
        <div>
          <p className="font-medium text-oak-charcoal">Message received.</p>
          <p className="mt-1 text-[0.9rem] text-oak-charcoal/65">
            Thank you for reaching out. Our team will get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[0.85rem] font-medium text-oak-charcoal">
            Name
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[0.85rem] font-medium text-oak-charcoal">
            Email
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} placeholder="you@organization.com" />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="mb-1.5 block text-[0.85rem] font-medium text-oak-charcoal">
          Organization
        </label>
        <input id="organization" name="organization" type="text" className={fieldClass} placeholder="Your organization" />
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-[0.85rem] font-medium text-oak-charcoal">
          Service Interest
        </label>
        <select id="service" name="service" className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select a service area
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[0.85rem] font-medium text-oak-charcoal">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldClass}
          placeholder="Tell us about your organization and the challenge you want to address."
        />
      </div>

      <Button type="submit" variant="primary" className="rounded-sm">
        Send Message
      </Button>
    </form>
  );
}
