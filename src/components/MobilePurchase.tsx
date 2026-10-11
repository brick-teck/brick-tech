import { useEffect, useState } from "react";
import { CheckoutButton } from "./Checkout";

export function MobilePurchase() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="mobile-purchase" hidden={!visible}>
      <div>
        <span>WEBPROMPT PRO 2.0</span>
        <strong>R$ 10,00</strong>
      </div>
      <CheckoutButton placement="mobile-sticky">Quero meu ebook</CheckoutButton>
    </div>
  );
}
