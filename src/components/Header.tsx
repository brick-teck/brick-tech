import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { CheckoutButton } from "./Checkout";
const links = [
  ["#produto", "O produto"],
  ["#conteudo", "Conteúdo"],
  ["#como-funciona", "Como funciona"],
  ["#faq", "FAQ"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    if (open) window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a
          href="#inicio"
          aria-label="BrickTech — início"
          className="brand-link"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>
        <nav aria-label="Navegação principal" className="desktop-nav">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <CheckoutButton className="header-cta" placement="header">
          Comprar por R$ 10
        </CheckoutButton>
        <button
          id="menu-toggle"
          className="icon-button menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-label="Navegação mobile"
        hidden={!open}
      >
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <CheckoutButton placement="mobile-menu">
          Comprar por R$ 10
        </CheckoutButton>
      </nav>
    </header>
  );
}
