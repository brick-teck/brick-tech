# BrickTech — WEBPROMPT PRO 2.0

## Objetivo e público
Landing page em pt-BR para visitantes de TikTok, YouTube e Instagram. Uma única oferta: ebook digital WEBPROMPT PRO 2.0 por R$ 10,00, com checkout oficial Kiwify configurável.

## Direção visual
Estúdio de ferramentas web: tipografia expressiva, composição assimétrica, edição de código e imagens originais do avatar apresentando o ebook. O BrickTech Prompt Lab é a assinatura interativa. As imagens foram adicionadas pelo usuário em `assets`; ainda não há logo vetorial ou PDF do ebook.

## Tokens e fonte canônica
`src/styles.css` é a fonte dos tokens de execução. Fundo #0B1220, fundo secundário #111C2E, superfície #172438, verde #00E58B, hover #00C978, branco #F6F9FC, texto secundário #9CA3AF, borda #263449. Display Space Grotesk; texto Inter; utilitário JetBrains Mono. Fontes locais com fallback sem dependência de CDN em runtime.

## Layout e comportamento
Conteúdo de até 1200px, hero texto/visual 55/45, margens fluidas e áreas de toque de 44px. Sem rolagem horizontal. Menu mobile acessível e rolável em landscape; acordeão nativo; tabs com setas e foco; modal nativo com Escape, foco restaurado, anterior/próximo e zoom. Foco visível, scrollbars globais e reduced motion obrigatórios. CTA inferior aparece apenas depois do hero; scroll tem espaço reservado para o foco acima da barra.

## Limites de conteúdo
Usar as imagens originais sem gerar outro avatar. Categorias e páginas reais permanecem em estado pendente até arquivos verificáveis e autorização. Não inventar promessas, prazos, reembolso, depoimentos, contagens, dados legais ou checkout. O Prompt Lab é uma demonstração ilustrativa, não uma execução de IA.

## Configuração
`src/config/commerce.ts` concentra checkout HTTPS Kiwify, dados legais e suporte. `src/data/product.ts` concentra conteúdo verificado e páginas autorizadas. CTAs sem URL abrem estado explicativo de indisponibilidade. Somente parâmetros de campanha permitidos são encaminhados. Eventos são locais e neutros até existir mensuração configurada; nunca representam pagamento concluído.
