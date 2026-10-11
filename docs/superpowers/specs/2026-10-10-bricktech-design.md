# Design da landing page BrickTech

Implementar o briefing enviado pelo usuário em React, TypeScript, Vite, Tailwind, Lucide e Motion. A pasta estava inicialmente vazia; o usuário adicionou imagens originais em `assets` durante a implementação. Ainda não há PDF do ebook ou configuração comercial. O escopo é uma página de venda com componentes reutilizáveis, não um checkout próprio.

Opções consideradas: hero centrado com capa (simples, mas menos próximo do briefing), hero editorial com lab na primeira dobra (forte demonstração, reduz visibilidade do produto), hero dividido com imagem original do avatar e produto, mais lab dedicado (selecionado por atender apresentação e demonstração).

Fluxo: header sticky → hero com oferta → problema → apresentação do produto → Prompt Lab → conteúdo verificado/pendente → três passos → páginas autorizadas/pendentes → oferta → FAQ → rodapé configurável.

Separar configurações comerciais, dados do produto, telemetria opcional e componentes. Sem ativos, apresentar estados honestos e não preencher com conteúdo comercial fictício. Checkout ausente apresenta um dialog explicativo. Categorias e prévias serão habilitadas pelo preenchimento dos dados; a infraestrutura funciona com listas vazias.

Verificar build, tipos, URL/UTMs, estados sem dados, navegação e interações de teclado, responsividade e ausência de erros. Publicação requer ferramentas Git disponíveis, conexão de hosting e configuração comercial real. O trabalho local pode ser verificado independentemente.
