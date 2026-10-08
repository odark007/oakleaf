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
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const phone = String(formData.get("phone") || "");

    const newErrors: { email?: string; phone?: string } = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (phone && !/^\+?\d{7,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number (numbers and + only).";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
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
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="you@organization.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1.5 text-[0.82rem] text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-[0.85rem] font-medium text-oak-charcoal">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={fieldClass}
          placeholder="Your phone number"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="mt-1.5 text-[0.82rem] text-red-600">{errors.phone}</p>
        )}
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

      {submitError && (
        <p className="text-[0.88rem] text-red-600">{submitError}</p>
      )}

      <Button type="submit" variant="primary" className="rounded-sm" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
