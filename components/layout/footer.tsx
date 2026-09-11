import Link from "next/link";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { getIcon } from "@/lib/icons";

const Leaf = getIcon("Leaf");
const Mail = getIcon("Mail");
const Phone = getIcon("Phone");
const MapPin = getIcon("MapPin");
const MessageCircle = getIcon("MessageCircle");
const Linkedin = getIcon("Linkedin");
const Facebook = getIcon("Facebook");

export function Footer() {
  return (
    <footer className="bg-oak-green-deep text-white/90">
      <div className="container-oak py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-oak-amber">
                <Leaf size={18} />
              </span>
              <span className="font-semibold text-white text-[1.05rem]">Oakleaf</span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.92rem] leading-relaxed text-white/65">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-[0.85rem] font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[0.88rem] text-white/65 hover:text-oak-amber"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.85rem] font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/about" className="text-[0.88rem] text-white/65 hover:text-oak-amber">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/approach" className="text-[0.88rem] text-white/65 hover:text-oak-amber">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-[0.88rem] text-white/65 hover:text-oak-amber">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/digital-transformation" className="text-[0.88rem] text-white/65 hover:text-oak-amber">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[0.88rem] text-white/65 hover:text-oak-amber">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.85rem] font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5 text-[0.88rem] text-white/65">
                <Mail size={16} className="mt-0.5 shrink-0 text-oak-amber" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-oak-amber">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.88rem] text-white/65">
                <Phone size={16} className="mt-0.5 shrink-0 text-oak-amber" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-oak-amber">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.88rem] text-white/65">
                <MessageCircle size={16} className="mt-0.5 shrink-0 text-oak-amber" />
                <span>WhatsApp: {siteConfig.whatsapp}</span>
              </li>
              <li className="flex items-start gap-2.5 text-[0.88rem] text-white/65">
                <MapPin size={16} className="mt-0.5 shrink-0 text-oak-amber" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.linkedin}
                aria-label="Oakleaf on LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-oak-amber hover:text-oak-charcoal"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={siteConfig.facebook}
                aria-label="Oakleaf on Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-oak-amber hover:text-oak-charcoal"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Oakleaf Training &amp; Consulting. All rights reserved.</p>
          <p>Growing people. Strengthening organizations. Creating impact.</p>
        </div>
      </div>
    </footer>
  );
}
