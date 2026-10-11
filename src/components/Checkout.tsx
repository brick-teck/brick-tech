import { createContext, useContext, useRef, type ReactNode } from "react";
import { ArrowUpRight, ExternalLink, Settings2, X } from "lucide-react";
import { buildCheckoutUrl, commerce } from "../config/commerce";
import { track } from "../lib/analytics";

const CheckoutContext = createContext<() => void>(() => {});

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <CheckoutContext.Provider value={() => dialog.current?.showModal()}>
      {children}
      <dialog
        ref={dialog}
        className="checkout-dialog"
        aria-labelledby="checkout-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          className="icon-button dialog-close"
          aria-label="Fechar"
          onClick={() => dialog.current?.close()}
          autoFocus
        >
          <X size={22} />
        </button>
        <span className="dialog-symbol">
          <Settings2 size={28} />
        </span>
        <span className="eyebrow">CHECKOUT INDISPONÍVEL</span>
        <h2 id="checkout-title">As compras ainda não estão disponíveis.</h2>
        <p>
          O link oficial da Kiwify ainda não foi configurado. Você poderá
          comprar o WEBPROMPT PRO 2.0 por R$ 10,00 quando a BrickTech
          disponibilizar o checkout.
        </p>
        {commerce.supportUrl && (
          <a
            href={commerce.supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Falar com o suporte <ExternalLink size={16} />
          </a>
        )}
        <button
          className="button button-primary"
          onClick={() => dialog.current?.close()}
        >
          Continuar explorando <ArrowUpRight size={18} />
        </button>
      </dialog>
    </CheckoutContext.Provider>
  );
}

export function CheckoutButton({
  children = "Quero meu ebook por R$ 10",
  className = "",
  placement = "page",
}: {
  children?: ReactNode;
  className?: string;
  placement?: string;
}) {
  const showPending = useContext(CheckoutContext);
  const url = buildCheckoutUrl(commerce.checkoutUrl, window.location.search);
  const content = (
    <>
      {children}
      <ArrowUpRight size={19} aria-hidden="true" />
    </>
  );
  return url ? (
    <a
      className={`button button-primary ${className}`}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_checkout", { placement })}
    >
      {content}
    </a>
  ) : (
    <button
      className={`button button-primary ${className}`}
      onClick={showPending}
    >
      {content}
    </button>
  );
}
