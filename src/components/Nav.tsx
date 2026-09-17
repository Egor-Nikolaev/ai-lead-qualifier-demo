import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const links = [
  { to: '/', label: 'Overview' },
  { to: '/pipeline', label: 'Try a lead' },
  { to: '/metrics', label: 'Metrics' },
  { to: '/how', label: 'How it works' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-canvas/70 border-b hairline">
      <div className="mx-auto max-w-[1120px] px-6 h-12 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group" end>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-ink">
            <circle cx="11" cy="11" r="10.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 11 L9.5 14.5 L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-ink">Lead Qualifier</span>
        </NavLink>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'px-3 h-8 flex items-center rounded-full text-[13px] font-medium transition-colors',
                  isActive
                    ? 'bg-ink text-canvas'
                    : 'text-ink-3 hover:text-ink',
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
