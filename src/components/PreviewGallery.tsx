import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Expand,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { product } from "../data/product";
import { track } from "../lib/analytics";

export function PreviewGallery() {
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const page = product.previews[index];
  const move = (direction: number) => {
    setZoomed(false);
    setIndex(
      (current) =>
        (current + direction + product.previews.length) %
        product.previews.length,
    );
  };
  if (!product.previews.length)
    return (
      <div className="preview-pending">
        <div className="preview-outline" aria-hidden="true">
          <BookOpen size={35} />
          <span>WEBPROMPT PRO 2.0</span>
        </div>
        <div>
          <span className="eyebrow">PRÉVIA EM PREPARAÇÃO</span>
          <h3>Um olhar por dentro, em breve.</h3>
          <p>
            As páginas reais serão exibidas aqui assim que forem
            disponibilizadas e autorizadas pela BrickTech.
          </p>
          <span className="pending-note">
            Nenhum conteúdo demonstrativo é apresentado como parte do ebook.
          </span>
        </div>
      </div>
    );
  return (
    <>
      <div className="preview-grid">
        {product.previews.map((item, n) => (
          <button
            key={item.src}
            className="preview-thumb"
            onClick={() => {
              setIndex(n);
              setZoomed(false);
              dialog.current?.showModal();
              track("view_ebook_preview", { page: String(n + 1) });
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
            />
            <span>
              {item.title}
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        className="preview-dialog"
        ref={dialog}
        aria-label="Prévia do ebook"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="preview-controls">
          <span>
            {page.title} · {index + 1}/{product.previews.length}
          </span>
          <button
            className="icon-button"
            aria-label={zoomed ? "Reduzir zoom" : "Ampliar página"}
            onClick={() => setZoomed(!zoomed)}
          >
            {zoomed ? <ZoomOut /> : <ZoomIn />}
          </button>
          <button
            className="icon-button"
            aria-label="Fechar prévia"
            autoFocus
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <div className={`preview-image ${zoomed ? "zoomed" : ""}`}>
          <img
            src={page.src}
            alt={page.alt}
            width={page.width}
            height={page.height}
          />
        </div>
        <div className="preview-pagination">
          <button className="button button-secondary" onClick={() => move(-1)}>
            <ArrowLeft size={17} />
            Anterior
          </button>
          <button className="button button-secondary" onClick={() => move(1)}>
            Próxima
            <ArrowRight size={17} />
          </button>
        </div>
      </dialog>
    </>
  );
}
