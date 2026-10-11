import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  LayoutTemplate,
  PanelLeft,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const generic = "Crie um site moderno para minha empresa.";
const structured = (
  <>
    Crie uma <span>landing page responsiva</span> para uma empresa de
    tecnologia, com <span>hierarquia visual clara</span>, navegação acessível,
    identidade visual consistente, componentes reutilizáveis, design{" "}
    <span>mobile-first</span> e uma seção principal com{" "}
    <span>CTA destacado</span>.
  </>
);

export function PromptLab() {
  const [active, setActive] = useState(1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const change = (next: number) => {
    setActive(next);
    tabs.current[next]?.focus();
  };
  return (
    <div className="lab-window">
      <div className="lab-titlebar">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <div>
          <Code2 size={15} />
          <span>BrickTech Prompt Lab</span>
        </div>
        <span className="lab-demo">DEMONSTRAÇÃO</span>
      </div>
      <div className="lab-toolbar">
        <div
          role="tablist"
          aria-label="Comparação de prompts"
          className="lab-tabs"
        >
          {["Pedido genérico", "Pedido estruturado"].map((label, index) => (
            <button
              ref={(el) => {
                tabs.current[index] = el;
              }}
              key={label}
              id={`prompt-tab-${index}`}
              role="tab"
              aria-selected={active === index}
              aria-controls="prompt-panel"
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
                ) {
                  event.preventDefault();
                  change(
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? 1
                        : 1 - active,
                  );
                }
              }}
            >
              <span className={`tab-dot ${index ? "green" : ""}`} />
              {label}
            </button>
          ))}
        </div>
        <span className="lab-file">prompt.txt</span>
      </div>
      <div
        role="tabpanel"
        id="prompt-panel"
        aria-labelledby={`prompt-tab-${active}`}
        tabIndex={0}
        className="lab-body"
      >
        <div className="lab-editor">
          <div className="editor-comment">
            // Uma boa instrução começa com contexto.
          </div>
          <div className="editor-code">
            <div className="line-numbers" aria-hidden="true">
              01
              <br />
              02
              <br />
              03
              <br />
              04
              <br />
              05
              <br />
              06
              <br />
              07
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                className="prompt-code"
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <span className="code-key">prompt</span>{" "}
                <span className="code-muted">=</span>{" "}
                <span className="code-quote">"</span>
                <br />
                {active ? structured : generic}
                <span className="code-quote">"</span>
                <span className="cursor-caret" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="editor-context">
            <SlidersHorizontal size={14} />
            <span>
              {active
                ? "Objetivo, estrutura e estilo definidos"
                : "Objetivo e requisitos em aberto"}
            </span>
          </div>
        </div>
        <div className="lab-result">
          <div className="result-label">
            <LayoutTemplate size={14} />
            PRÉVIA CONCEITUAL
            <span className="result-status">
              {active ? "Com direção" : "Sem direção"}
            </span>
          </div>
          <div className={`mini-site ${active ? "is-structured" : ""}`}>
            <div className="mini-nav">
              <span>
                <i /> {active ? "orbit" : "Empresa"}
              </span>
              <div>
                <i />
                <i />
                <i />
              </div>
              <b />
            </div>
            <div className="mini-hero">
              <span className="mini-eyebrow">
                {active ? "TECNOLOGIA QUE CONECTA" : "BEM-VINDO"}
              </span>
              <h4>
                {active ? (
                  <>
                    Sua próxima ideia.
                    <br />
                    <em>Mais perto.</em>
                  </>
                ) : (
                  <>
                    Soluções para
                    <br />
                    sua empresa.
                  </>
                )}
              </h4>
              <div className="mini-lines">
                <i />
                <i />
              </div>
              <span className="mini-button">
                {active ? "Conheça as soluções" : "Saiba mais"}{" "}
                <ArrowUpRight size={12} />
              </span>
              {active && (
                <div className="mini-orbit">
                  <PanelLeft size={35} />
                </div>
              )}
            </div>
            <div className="mini-features">
              {[0, 1, 2].map((n) => (
                <div key={n}>
                  <span />
                  <i />
                  <i />
                </div>
              ))}
            </div>
          </div>
          <div className="result-checks">
            {(active
              ? ["Hierarquia clara", "CTA destacado", "Identidade consistente"]
              : ["Requisitos pouco definidos"]
            ).map((item) => (
              <span key={item}>
                {active ? (
                  <Check size={12} />
                ) : (
                  <span className="neutral-dot" />
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="lab-footer">
        <span className="status-dot" />
        Exemplos ilustrativos. Não são resultados de testes com IA.
      </div>
    </div>
  );
}
