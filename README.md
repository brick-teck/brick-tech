# BrickTech — WEBPROMPT PRO 2.0

Landing page em português com React, TypeScript, Vite, Tailwind CSS, Lucide e Motion. Fontes locais, imagens originais otimizadas em WebP, Prompt Lab interativo, menu mobile, FAQ, CTAs e infraestrutura de prévia acessível.

## Executar

No Windows com PowerShell, use `npm.cmd` para evitar o bloqueio de `npm.ps1` pela política de execução:

```powershell
npm.cmd install
npm.cmd run dev
```

Nos demais terminais:

```sh
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para validar: `npm test`, `npm run test:e2e` e `npm run build`. Os testes de interface usam o Microsoft Edge instalado, em modo headless, e precisam de uma prévia em `http://127.0.0.1:5173`. O build está em `dist/` e pode ser servido em qualquer hosting estático HTTPS.

## Habilitar vendas

Copie `.env.example` para `.env.local` e configure `VITE_KIWIFY_CHECKOUT_URL` com a URL HTTPS oficial, em domínio `kiwify.com.br`. Todos os CTAs usam essa configuração. Apenas UTMs conhecidas são encaminhadas; parâmetros do checkout têm prioridade. Sem URL válida, abre-se um modal que informa a indisponibilidade de compra, sem simular checkout.

Configure também `VITE_SUPPORT_URL`, `VITE_PRIVACY_URL`, `VITE_TERMS_URL` e `VITE_COMMERCIAL_INFORMATION`. Não há dados legais, contatos, garantias ou condições de entrega inventados. Atualize as respostas comerciais do FAQ em `src/data/product.ts` após confirmar as condições reais.

## Conteúdo e prévia

O usuário forneceu imagens em `assets/`, mas não o PDF do ebook, categorias verificáveis, páginas autorizadas para demonstração ou link de checkout. As imagens originais são preservadas; execute `node scripts/optimize-assets.mjs` para regenerar os WebPs.

Preencha `product.categories` somente com informações extraídas do produto real. Preencha `product.previews` somente com páginas autorizadas, colocando as imagens em `public/`; cada entrada inclui `src`, `title`, `alt`, `width` e `height`. A galeria oferece modal nativo, anterior/próximo, setas, Escape e zoom. Não publique todo o conteúdo pago. Sem entradas, a seção informa que a prévia está em preparação.

O Prompt Lab é ilustrativo: as pequenas interfaces não representam execuções reais de modelos de IA.

## Mensuração e publicação

Eventos locais são emitidos em `window` como `bricktech:analytics`. Conecte seu provedor ao evento após configurar as políticas apropriadas. Não há rede de analytics por padrão nem confirmação de compra por clique. Os eventos disponíveis estão em `src/lib/analytics.ts`.

Após definir um domínio público, adicione URL canônica e uma URL absoluta ao `og:image` em `index.html`; a imagem social local está em `public/images/social-1200.webp`.

Não há publicação automática configurada. O ambiente inicial não dispõe de Git. Os testes de interface usam um navegador headless dedicado à página local. As condições comerciais precisam ser confirmadas antes de habilitar a compra em produção.
# brick-tech
