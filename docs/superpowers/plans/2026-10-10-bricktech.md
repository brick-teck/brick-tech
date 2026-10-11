# Plano de implementação

1. Criar configuração Vite/React/TypeScript/Tailwind, dependências, metadados, favicon e fontes locais. Verificação: instalação e compilação.
2. Escrever testes de configuração de checkout antes da implementação: URL HTTPS Kiwify, rejeição de destinos inválidos, preservação de UTMs e isolamento de dados sensíveis. Executar com `npm test`.
3. Implementar `src/config/commerce.ts`, `src/lib/analytics.ts`, `src/data/product.ts` e `.env.example`. Dados não recebidos permanecem vazios e explícitos.
4. Implementar componentes Logo, EbookMockup, CheckoutButton/Dialog, Header, PromptLab, PreviewGallery e FAQ, com HTML semântico, acessibilidade, reduced motion e estados pendentes.
5. Montar seções em App e tokens/layouts em styles.css. Usar as imagens originais adicionadas pelo usuário; não criar avatar ou páginas falsas. Mobile-first e CTA inferior sem encobrir conteúdo.
6. Executar build, testes e QA de browser disponível em desktop/mobile: menu, tabs, FAQ, dialog, âncoras, overflow, console e configuração. Corrigir falhas observadas; documentar dependências externas no README.
