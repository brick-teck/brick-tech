import { FileText } from "lucide-react";

// Owner-supplied originals, resized and compressed without changing the character.
export function EbookMockup({ small = false }: { small?: boolean }) {
  return (
    <div className={`product-visual ${small ? "product-visual-small" : ""}`}>
      {!small && (
        <div className="floating-code code-top">
          <span className="code-dots">
            <i />
            <i />
            <i />
          </span>
          <code>
            <span>const</span> ideia = <b>"seu próximo site"</b>;<br />
            <span>const</span> próximoPasso = <b>"um bom prompt"</b>;
          </code>
        </div>
      )}
      <img
        className="brand-product-image"
        src={small ? "/images/product-700.webp" : "/images/hero-900.webp"}
        srcSet={
          small
            ? "/images/product-400.webp 400w, /images/product-700.webp 700w"
            : "/images/hero-480.webp 480w, /images/hero-900.webp 900w"
        }
        sizes={
          small
            ? "(max-width: 700px) 85vw, 440px"
            : "(max-width: 700px) 95vw, 540px"
        }
        width={small ? 700 : 900}
        height={small ? 875 : 1125}
        alt="Avatar original BrickTech apresentando o WEBPROMPT PRO 2.0"
        loading={small ? "lazy" : "eager"}
        fetchPriority={small ? "auto" : "high"}
      />
      {!small && (
        <div className="floating-label">
          <FileText size={13} />
          <span>
            WEBPROMPT PRO 2.0 <b>EBOOK DIGITAL</b>
          </span>
        </div>
      )}
    </div>
  );
}
