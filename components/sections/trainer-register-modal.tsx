"use client";

import { useState } from "react";

export function TrainerRegisterModal({
  isOpen,
  onClose,
  program = "certified-trainer",
  programLabel = "Certified Trainer Program",
}: {
  isOpen: boolean;
  onClose: () => void;
  program?: string;
  programLabel?: string;
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    organization: "",
    position: "",
    phone: "",
    whatsapp: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });
      form.append("program", program);

      const response = await fetch("/api/trainer-register.php", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-6">
          {!submitted ? (
            <>
              <h2 className="mb-4 text-xl font-semibold text-oak-charcoal">
                Register for {programLabel}
              </h2>

              {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Full name *</label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oak-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Organisation</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oak-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oak-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="^\+?\d{7,15}$"
                    title="Enter valid phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oak-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">WhatsApp number (optional)</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    pattern="^\+?\d{7,15}$"
                    title="Enter valid WhatsApp number"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oak-green"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-oak-green"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded bg-oak-green px-4 py-2 text-sm font-medium text-white hover:bg-oak-green/90 disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mb-4 text-4xl text-green-600">✓</div>
              <h2 className="mb-2 text-xl font-semibold text-oak-charcoal">Thank you for registering</h2>
              <p className="mb-6 text-sm text-gray-600">
                We have received your registration and will get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="rounded bg-oak-green px-6 py-2 text-sm font-medium text-white hover:bg-oak-green/90"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
