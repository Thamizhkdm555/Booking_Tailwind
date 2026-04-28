'use client'

const footerLinks = {
  Specialties: ['Cardiology', 'Nephrology', 'Neurology', 'Orthopaedics', 'Oncology'],
  Hospital: ['About SRMC', 'Our Doctors', 'Departments', 'Research', 'Careers'],
  Contact: ['Porur, Chennai - 600116', '+91 44 4592 8888', 'appointments@srmc.edu.in'],
}

export default function FooterSection() {
  return (
    <footer className="bg-charcoal text-white py-24 px-6 md:px-14">
      <div className="max-w-[1400px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-xs">
            <h2 className="text-[48px] md:text-[64px] font-black leading-none tracking-tight mb-4">
              <span className="text-white">SR</span>
              <span className="text-neon">MC</span>
            </h2>
            <p className="text-white/35 text-[13px] leading-relaxed">
              World-class healthcare. Human-first healing. Sri Ramachandra Medical
              Centre, Chennai.
            </p>
          </div>

          {/* CTA */}
          <a
            href="#specialists"
            className="flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-charcoal transition-all duration-300 group shrink-0"
          >
            Book Appointment
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 py-16 border-b border-white/10">
          {Object.entries(footerLinks).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white/40 text-[10px] font-bold tracking-[4px] uppercase mb-6">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/60 text-[14px] font-normal hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-[12px]">
          <span>© {new Date().getFullYear()} Sri Ramachandra Medical Centre. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
