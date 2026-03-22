import { Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerColumns = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', to: '/products' },
      { label: 'Cooktops', to: '/products?category=Cooktops' },
      { label: 'Appliances', to: '/products?category=Appliances' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Cart', to: '/cart' },
      { label: 'Checkout', to: '/checkout' },
      { label: 'Account', to: '/login' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'YouTube', href: '#', icon: Youtube },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_repeat(2,0.7fr)] lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold uppercase tracking-[0.28em] text-white dark:bg-white dark:text-slate-950">
              AK
            </div>
            <div>
              <p className="font-heading text-xl font-semibold tracking-tight">Aurel Kitchen</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Quiet tools for considered homes.
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
            Premium kitchen objects with an architectural point of view: soft finishes, useful
            details, and a storefront designed to feel as calm as the products themselves.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((socialLink) => {
              const SocialIcon = socialLink.icon;

              return (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-400 dark:hover:text-emerald-300"
                  aria-label={socialLink.label}
                >
                  <SocialIcon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              {column.title}
            </h2>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/5 bg-white/40 px-4 py-5 text-sm text-slate-500 dark:border-white/10 dark:bg-white/0 dark:text-slate-400 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Aurel Kitchen. Frontend demo only.</p>
          <p>Free shipping over $300. 30-day returns.</p>
        </div>
      </div>
    </footer>
  );
}
