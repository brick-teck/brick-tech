import { Code2, Layers, MessageSquareText } from "lucide-react";

export type ProductCategory = {
  title: string;
  description: string;
  application: string;
};
export type PreviewPage = {
  src: string;
  title: string;
  alt: string;
  width: number;
  height: number;
};
export const product = {
  name: "WEBPROMPT PRO 2.0",
  price: "10,00",
  avatarSrc: "/images/hero-900.webp", // Original BrickTech avatar supplied by the owner.
  coverSrc: "",
  categories: [] as ProductCategory[], // Add categories verified against the supplied ebook.
  previews: [] as PreviewPage[], // Only pages explicitly authorized for public preview.
};

export const problems = [
  {
    icon: Layers,
    title: "Sites genéricos",
    text: "Interfaces que não representam o estilo e o objetivo do seu projeto.",
  },
  {
    icon: Code2,
    title: "Retrabalho constante",
    text: "Muitas tentativas para ajustar detalhes que poderiam ser especificados desde o início.",
  },
  {
    icon: MessageSquareText,
    title: "Ideias difíceis de explicar",
    text: "Você sabe o que quer criar, mas transformar a ideia em instruções completas é outra história.",
  },
];

export const steps = [
  {
    title: "Escolha seu prompt",
    text: "Explore o material e encontre instruções relacionadas ao projeto que deseja criar.",
  },
  {
    title: "Personalize os detalhes",
    text: "Adapte o prompt ao seu objetivo, à aparência desejada e às necessidades do seu site.",
  },
  {
    title: "Utilize com sua IA",
    text: "Envie a instrução para uma ferramenta compatível e ajuste o resultado quando necessário.",
  },
];

export const faqs = [
  {
    question: "O que é o WEBPROMPT PRO 2.0?",
    answer:
      "É um ebook digital da BrickTech com uma biblioteca de prompts organizada para ajudar você a comunicar suas ideias e estruturar projetos web com inteligência artificial.",
  },
  {
    question: "Preciso saber programar?",
    answer:
      "O material ajuda a formular instruções para IA. Conhecimentos de programação podem ajudar a revisar e ajustar o código produzido. O nível de conhecimento exigido pelo conteúdo será confirmado após a revisão do ebook.",
  },
  {
    question: "Em quais ferramentas posso utilizar os prompts?",
    answer:
      "Você pode adaptar instruções a ferramentas de IA que aceitem texto. A compatibilidade específica depende da ferramenta; a lista de ferramentas verificadas ainda não foi fornecida.",
  },
  {
    question: "O produto é um curso ou um ebook?",
    answer:
      "A oferta é um único ebook digital, o WEBPROMPT PRO 2.0. Não é um curso e não inclui outros produtos.",
  },
  {
    question: "Como recebo o material?",
    answer:
      "A compra será feita pelo checkout oficial da Kiwify. As condições de entrega e acesso ainda precisam ser confirmadas pela BrickTech e deverão estar disponíveis antes da compra.",
  },
  {
    question: "Posso personalizar os prompts?",
    answer:
      "Sim. A proposta é adaptar as instruções ao objetivo, à aparência desejada e às necessidades do seu projeto.",
  },
  {
    question: "Os prompts garantem que um site seja criado?",
    answer:
      "Não. Prompts mais específicos ajudam a transmitir requisitos e reduzir ambiguidades, mas os resultados variam conforme a IA, o projeto e os ajustes feitos por você.",
  },
  {
    question: "Como funciona o suporte e o reembolso?",
    answer:
      "Os canais de suporte e as condições de reembolso ainda não foram fornecidos. Consulte as condições oficiais disponibilizadas pela BrickTech e no checkout antes de comprar.",
  },
];
