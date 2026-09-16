import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-stone-100 pt-20 pb-10 mt-auto border-t-[4px] border-sage-500">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: About */}
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wider mb-1">Yasoda Builders</h3>
              <p className="font-sans text-[10px] tracking-[0.2em] text-sage-500 uppercase">Builders & Developers</p>
            </div>
            <p className="text-stone-100/70 text-[13px] leading-relaxed max-w-xs">
              Committed to creating quality residential and commercial developments through thoughtful planning, dependable construction, and modern design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-colors duration-300 font-serif text-sm border border-white/10">
                Fb
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-colors duration-300 font-serif text-sm border border-white/10">
                Ig
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-colors duration-300 font-serif text-sm border border-white/10">
                In
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-colors duration-300 font-serif text-sm border border-white/10">
                X
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[1px] after:bg-sage-500">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Services", href: "/services" },
                { name: "Gallery", href: "/gallery" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-stone-100/70 hover:text-white transition-colors text-[13px] tracking-wide">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[1px] after:bg-sage-500">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Residential Construction", href: "/services/residential-construction" },
                { name: "Commercial Construction", href: "/services/commercial-construction" },
                { name: "Building Construction", href: "/services/building-construction" },
                { name: "Renovation & Redevelopment", href: "/services/renovation" },
                { name: "Architecture & Planning", href: "/services/architecture" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-stone-100/70 hover:text-white transition-colors text-[13px] tracking-wide">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[1px] after:bg-sage-500">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-sage-500 mr-3 mt-0.5 shrink-0" size={16} />
                <span className="text-stone-100/70 text-[13px] leading-relaxed">
                  Door No. 23/517-26, <br />
                  Manjunath Nagar, Guntakal, <br />
                  PIN 515801, Anantapur District, <br />
                  Andhra Pradesh, India
                </span>
              </li>
              <li>
                <a href="tel:+917780383825" className="flex items-center text-stone-100/70 hover:text-white transition-colors text-[13px]">
                  <Phone className="text-sage-500 mr-3 shrink-0" size={16} />
                  +91 7780383825
                </a>
              </li>
              <li>
                <a href="mailto:kkbabuyasoda@gmail.com" className="flex items-center text-stone-100/70 hover:text-white transition-colors text-[13px]">
                  <Mail className="text-sage-500 mr-3 shrink-0" size={16} />
                  kkbabuyasoda@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] tracking-wide text-stone-100/50">
          <p>© {currentYear} Yasoda Builders and Developers. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
