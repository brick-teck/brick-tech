import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  FileText,
  Fingerprint,
  LockKeyhole,
} from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { Header } from "./components/Header";
import { Logo } from "./components/Logo";
import { CheckoutButton, CheckoutProvider } from "./components/Checkout";
import { EbookMockup } from "./components/EbookMockup";
import { PromptLab } from "./components/PromptLab";
import { PreviewGallery } from "./components/PreviewGallery";
import { FAQ } from "./components/FAQ";
import { MobilePurchase } from "./components/MobilePurchase";
import { problems, product, steps } from "./data/product";
import { commerce } from "./config/commerce";
import { track } from "./lib/analytics";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow">
      <span className="label-line" />
      {children}
    </span>
  );
}

export default function App() {
  const productSection = useRef<HTMLElement>(null);
  useEffect(() => {
    track("page_view");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track("view_product");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    if (productSection.current) observer.observe(productSection.current);
    return () => observer.disconnect();
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <CheckoutProvider>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main">
          <section id="inicio" className="hero">
            <div className="hero-grid-bg" aria-hidden="true" />
            <div className="container hero-layout">
              <motion.div
                className="hero-copy"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="hero-eyebrow">
                  <span className="status-dot" />
                  BRICKTECH APRESENTA <span className="eyebrow-divider">
                    /
                  </span>{" "}
                  WEBPROMPT PRO 2.0
                </div>
                <h1>
                  Você tem a ideia.
                  <br />A IA tem o código.
                  <br />
                  Faltam os{" "}
                  <span className="hero-accent">
                    prompts certos
                    <svg
                      viewBox="0 0 430 15"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path d="M2 10Q180-3 425 6" />
                    </svg>
                  </span>
                  .
                </h1>
                <p className="hero-description">
                  Descubra uma coleção de prompts estruturados para orientar
                  inteligências artificiais na criação de sites, interfaces e
                  projetos web com muito mais clareza.
                </p>
                <div className="hero-actions">
                  <CheckoutButton placement="hero" />
                  <a className="hero-secondary" href="#conteudo">
                    Explorar o conteúdo <ArrowDown size={15} />
                  </a>
                </div>
                <div className="hero-meta">
                  <span>
                    <FileText size={14} />
                    Material digital
                  </span>
                  <i />
                  <span>Prompts organizados</span>
                  <i />
                  <span>Checkout Kiwify</span>
                </div>
                {!commerce.checkoutUrl && (
                  <span className="checkout-note">
                    Checkout em configuração. Compras ainda indisponíveis.
                  </span>
                )}
              </motion.div>
              <motion.div
                className="hero-visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <EbookMockup />
              </motion.div>
            </div>
            <div className="container hero-bottom">
              <span>MENOS AMBIGUIDADE. MAIS DIREÇÃO.</span>
              <a href="#problema">
                Comece pela sua ideia <ArrowDown size={14} />
              </a>
            </div>
          </section>
          <div className="principle-strip">
            <div className="container">
              <span>
                <Code2 />
                Feito para projetos web
              </span>
              <span>
                <Fingerprint />
                Sua ideia, sua identidade
              </span>
              <span>
                <BookOpen />
                Um ebook. Novas possibilidades.
              </span>
            </div>
          </div>
          <section id="problema" className="section problem-section">
            <div className="container">
              <div className="section-heading problem-heading">
                <SectionLabel>O PONTO DE PARTIDA</SectionLabel>
                <h2>
                  Uma IA poderosa não resolve
                  <br className="desktop-break" /> um pedido mal explicado.
                </h2>
                <p>
                  Você pede um site, recebe algo genérico, tenta corrigir e
                  acaba gastando mais tempo ajustando instruções do que
                  desenvolvendo sua ideia?
                </p>
              </div>
              <div className="problem-grid">
                {problems.map(({ icon: Icon, title, text }) => (
                  <article className="problem-item" key={title}>
                    <span className="problem-icon">
                      <Icon size={22} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
              <p className="problem-conclusion">
                <span className="status-dot" />
                Não se trata apenas de usar IA.{" "}
                <strong>Trata-se de aprender a orientar a ferramenta.</strong>
              </p>
            </div>
          </section>
          <section
            id="produto"
            ref={productSection}
            className="section product-section"
          >
            <div className="container product-layout">
              <div className="product-art">
                <div className="product-art-corner top-left" />
                <div className="product-art-corner bottom-right" />
                <EbookMockup small />
                <span className="product-art-label">
                  <FileText size={14} />
                  EBOOK DIGITAL<span>2.0</span>
                </span>
              </div>
              <div className="product-copy">
                <SectionLabel>SUA IDEIA, BEM EXPLICADA</SectionLabel>
                <h2>
                  Apresentamos o<br />
                  <span>WEBPROMPT</span> PRO 2.0
                </h2>
                <p className="section-intro">
                  Uma biblioteca de prompts organizada para ajudar você a
                  comunicar melhor suas ideias e estruturar projetos web com
                  inteligência artificial.
                </p>
                <div className="product-principles">
                  <div>
                    <Check size={16} />
                    <span>Instruções como ponto de partida</span>
                  </div>
                  <div>
                    <Check size={16} />
                    <span>Espaço para personalizar sua ideia</span>
                  </div>
                  <div>
                    <Check size={16} />
                    <span>Foco na comunicação com a IA</span>
                  </div>
                </div>
                <a className="text-link" href="#lab">
                  Veja uma instrução na prática <ArrowRight size={17} />
                </a>
                <p className="concept-note">
                  Imagens originais da BrickTech. Produto digital WEBPROMPT PRO
                  2.0.
                </p>
              </div>
            </div>
          </section>
          <section id="lab" className="section lab-section">
            <div className="container">
              <div className="section-heading lab-heading">
                <div>
                  <SectionLabel>BRICKTECH PROMPT LAB</SectionLabel>
                  <h2>
                    Mesma ideia.
                    <br />
                    <span className="text-green">Uma direção mais clara.</span>
                  </h2>
                </div>
                <p>
                  Veja a diferença que uma instrução mais completa pode fazer.
                  Experimente os dois exemplos abaixo.
                </p>
              </div>
              <PromptLab />
              <p className="lab-disclaimer">
                Prompts mais específicos ajudam a transmitir requisitos e
                reduzir ambiguidades. Os resultados variam conforme a IA e o
                projeto.
              </p>
            </div>
          </section>
          <section id="conteudo" className="section content-section">
            <div className="container">
              <div className="section-heading">
                <SectionLabel>DENTRO DO WEBPROMPT</SectionLabel>
                <h2>O que você vai encontrar dentro?</h2>
                <p>
                  Conheça a organização do material antes de escolher seu
                  próximo ponto de partida.
                </p>
              </div>
              {product.categories.length ? (
                <div className="category-grid">
                  {product.categories.map((category) => (
                    <article key={category.title}>
                      <Code2 />
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                      <span>{category.application}</span>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="content-pending">
                  <div className="pending-file">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h3>O conteúdo merece uma prévia real.</h3>
                    <p>
                      As categorias e aplicações do ebook serão publicadas após
                      a revisão do arquivo original. Por enquanto, explore o
                      Prompt Lab para entender a proposta.
                    </p>
                  </div>
                  <a href="#lab" className="button button-secondary">
                    Explorar o Lab <ArrowUpRight size={18} />
                  </a>
                </div>
              )}
            </div>
          </section>
          <section id="como-funciona" className="section how-section">
            <div className="container">
              <div className="section-heading">
                <SectionLabel>DA LEITURA À PRÁTICA</SectionLabel>
                <h2>Do ebook ao seu próximo projeto.</h2>
                <p>
                  Um ponto de partida que você adapta ao que quer construir.
                </p>
              </div>
              <div className="steps-grid">
                {steps.map((step, index) => (
                  <article key={step.title}>
                    <div className="step-track">
                      <span>0{index + 1}</span>
                      <div />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="previa" className="section preview-section">
            <div className="container">
              <div className="section-heading">
                <SectionLabel>ANTES DE ESCOLHER</SectionLabel>
                <h2>Conheça o material antes de comprar.</h2>
                <p>
                  Uma prévia de páginas autorizadas, sem expor todo o conteúdo
                  do ebook.
                </p>
              </div>
              <PreviewGallery />
            </div>
          </section>
          <section id="oferta" className="offer-section">
            <div className="container">
              <div className="offer-panel">
                <div className="offer-art">
                  <EbookMockup small />
                  <span>UMA IDEIA PRECISA DE UM BOM COMEÇO.</span>
                </div>
                <div className="offer-copy">
                  <SectionLabel>SEU PRÓXIMO PASSO</SectionLabel>
                  <h2>
                    Seu próximo projeto começa com{" "}
                    <span>instruções melhores.</span>
                  </h2>
                  <p className="offer-product-name">
                    WEBPROMPT PRO 2.0 <span>EBOOK DIGITAL</span>
                  </p>
                  <div className="offer-price">
                    <span>R$</span>
                    <strong>10</strong>
                    <span>,00</span>
                    <div>
                      Um único ebook.
                      <br />
                      Uma nova forma de começar.
                    </div>
                  </div>
                  <CheckoutButton placement="offer" className="offer-cta">
                    Comprar agora por R$ 10
                  </CheckoutButton>
                  <p className="offer-secure">
                    <LockKeyhole size={14} />
                    {commerce.checkoutUrl
                      ? "Compra pelo checkout oficial da Kiwify"
                      : "Checkout Kiwify em configuração"}
                  </p>
                  <p className="offer-delivery">
                    As condições de entrega, suporte e reembolso serão
                    confirmadas antes da disponibilidade de compra.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="faq" className="section faq-section">
            <div className="container faq-layout">
              <div className="section-heading">
                <SectionLabel>SEM PONTAS SOLTAS</SectionLabel>
                <h2>
                  Uma ideia boa.
                  <br />
                  Nenhuma dúvida.
                </h2>
                <p>
                  As respostas para entender o material e dar o próximo passo
                  com clareza.
                </p>
                {commerce.supportUrl && (
                  <a
                    className="text-link"
                    href={commerce.supportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fale com a BrickTech <ArrowUpRight size={17} />
                  </a>
                )}
              </div>
              <FAQ />
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-main">
              <div>
                <a
                  href="#inicio"
                  className="brand-link"
                  aria-label="BrickTech — início"
                >
                  <Logo />
                </a>
                <p>
                  Ideias melhores explicadas.
                  <br />
                  Projetos com mais direção.
                </p>
              </div>
              <div className="footer-links">
                {[
                  ["Suporte", commerce.supportUrl],
                  ["Política de Privacidade", commerce.privacyUrl],
                  ["Termos de Uso", commerce.termsUrl],
                ].map(([label, url]) =>
                  url ? (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                      <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span key={label}>
                      {label}
                      <small>Em preparação</small>
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} BrickTech. Todos os direitos
                reservados.
              </span>
              <span>Feito de ideias. Construído com direção.</span>
            </div>
            {commerce.information && (
              <p className="commercial-information">{commerce.information}</p>
            )}
          </div>
        </footer>
        <MobilePurchase />
      </CheckoutProvider>
    </MotionConfig>
  );
}
