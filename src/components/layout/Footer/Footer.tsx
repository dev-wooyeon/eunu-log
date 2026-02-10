const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/dev-wooyeon' },
  { name: 'Email', href: 'mailto:une@kakao.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-grey-100 bg-white">
      <div className="max-w-content-lg mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-grey-500">
            © {new Date().getFullYear()} eunu.log. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-grey-600 hover:text-toss-blue transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
