import Link from "next/link";

const links = [
  { name: "الأخبار المحلية", href: "/general" },
  { name: "السياسة", href: "/politics" },
  { name: "الرياضة", href: "/sports" },
  { name: "الثقافة و الفن", href: "/entertainment" },
  { name: "العلوم", href: "/science" },
  { name: "التكنولوجيا", href: "/technology" },
  { name: "آخر الأخبار", href: "/general" },
  { name: "الصحة", href: "/health" },
];

export function NavBar() {
  return (
    <nav className="bg-white sticky top-0 z-50 hidden md:block border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center py-4 justify-center"> {/* Centering links */}
           <ul className="flex items-center gap-8 md:gap-10">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-900 hover:text-green-700 font-extrabold text-lg transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
