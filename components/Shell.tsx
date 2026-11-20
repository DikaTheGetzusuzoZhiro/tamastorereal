import Link from "next/link";
import { STORE_NAME, WHATSAPP_DISPLAY, waLink } from "@/lib/config";

export function Header() {
  return <header className="header"><Link className="brand" href="/"><span className="brand-mark">T</span><span>{STORE_NAME}<small>DIGITAL SERVICE</small></span></Link>
    <nav><Link href="/#layanan">Layanan</Link><Link href="/akun">Cari Akun</Link><Link href="/topup">Top Up</Link><Link href="/jual-akun">Jual Akun</Link><Link href="/admin">Admin</Link></nav>
    <a className="nav-cta" href={waLink("Halo Tama Store, saya ingin bertanya.")} target="_blank" rel="noreferrer">Hubungi CS</a>
  </header>;
}
export function Footer() {
  return <footer className="footer"><div><b>TAMA STORE</b><p>Layanan digital dengan konfirmasi admin.</p></div><div><span>WhatsApp resmi</span><a href={waLink("Halo Tama Store.")} target="_blank" rel="noreferrer">{WHATSAPP_DISPLAY}</a></div><small>© {new Date().getFullYear()} Tama Store. Semua hak dilindungi.</small></footer>;
}
