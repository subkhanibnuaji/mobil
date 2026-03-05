import Link from "next/link";
import { SITE_CONFIG, DOMAINS } from "@/lib/constants";

export default function Footer() {
  const topDomains = DOMAINS.slice(0, 6);

  return (
    <footer className="bg-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-3">
              <span className="text-secondary">Otomotif</span> Nexus
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Personal automotive knowledge hub. Panduan lengkap otomotif
              Indonesia — dari beli mobil, perawatan, hingga kalkulasi finansial.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Kategori Populer</h4>
            <ul className="space-y-1.5">
              {topDomains.map((domain) => (
                <li key={domain.slug}>
                  <Link
                    href={`/${domain.slug}`}
                    className="text-gray-300 hover:text-secondary text-sm transition-colors"
                  >
                    {domain.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tools</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/kalkulator/kredit" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Simulasi Kredit
                </Link>
              </li>
              <li>
                <Link href="/kalkulator/tco" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Kalkulator TCO
                </Link>
              </li>
              <li>
                <Link href="/kalkulator/depresiasi" className="text-gray-300 hover:text-secondary text-sm transition-colors">
                  Estimasi Depresiasi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-light mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Personal Knowledge Hub by {SITE_CONFIG.author}.</p>
          <p className="mt-1">
            Semua harga bersifat estimasi. Selalu verifikasi dengan sumber resmi.
          </p>
        </div>
      </div>
    </footer>
  );
}
