import Link from "next/link";
import { Download, Mail, Mountain, MoveDown } from "lucide-react";

type SiteNavProps = {
  underground?: boolean;
};

export function SiteNav({ underground = false }: SiteNavProps) {
  return (
    <header className={`site-nav ${underground ? "site-nav--underground" : ""}`}>
      <Link href="/" className="brand" aria-label="回到地上首页">
        <span className="brand-mark"><Mountain size={18} /></span>
        <span>YOUR NAME</span>
      </Link>
      <nav aria-label="主导航">
        <Link href="/"><span>地上</span></Link>
        <Link href="/portfolio"><MoveDown size={15} /><span>地下作品集</span></Link>
        <Link href="/about"><span>关于我</span></Link>
        <a href="/resume.pdf" download><Download size={15} /><span>简历</span></a>
        <a href="mailto:hello@example.com"><Mail size={15} /><span>联系</span></a>
      </nav>
    </header>
  );
}
