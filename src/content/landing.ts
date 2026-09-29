export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FoundationBlock {
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl?: string;
}

export const landingContent = {
  meta: {
    title: "Fraude via Pix em empresas | Análise jurídica — Dr. Ronney Menezes",
    description:
      "Entenda os critérios de análise jurídica de fraudes via Pix envolvendo empresas e solicite contato para avaliação individual do caso.",
  },
  header: {
    brandName: "Dr. Ronney Menezes",
    ctaLabel: "Solicitar análise",
    ctaHref: "#analise",
  },
  hero: {
    label: "ANÁLISE JURÍDICA DE FRAUDES BANCÁRIAS",
    titlePrefix: "Sua empresa sofreu um ",
    titleHighlight: "golpe via Pix",
    titleSuffix: " com prejuízo a partir de R$ 10 mil?",
    support:
      "Entenda quais elementos precisam ser analisados para avaliar a responsabilidade da instituição financeira e a possibilidade de buscar reparação.",
    complement:
      "A análise considera as características da transação, os mecanismos de segurança e os documentos disponíveis em cada caso.",
    audienceLine:
      "Atendimento a empresas e empresários · Avaliação individual de viabilidade",
    cta: "Solicitar análise de viabilidade",
    note: "A análise não implica garantia de ressarcimento ou contratação automática.",
  },
  process: {
    label: "COMO FUNCIONA",
    title: "Uma análise estruturada antes de definir o próximo passo.",
    introduction:
      "A avaliação de uma fraude bancária exige entender o que aconteceu, examinar os documentos e identificar os fundamentos aplicáveis ao caso.",
    steps: [
      {
        number: "01",
        title: "Entendimento da operação.",
        description:
          "Levantamento do perfil da empresa, das circunstâncias da fraude e do padrão de movimentação da conta.",
      },
      {
        number: "02",
        title: "Exame dos mecanismos de segurança.",
        description:
          "Análise dos indícios de falha na prevenção, no monitoramento ou no tratamento da transação suspeita.",
      },
      {
        number: "03",
        title: "Organização dos documentos.",
        description:
          "Conferência de comprovantes do Pix, extratos, boletim de ocorrência e registros de comunicação com o banco, conforme o caso.",
      },
      {
        number: "04",
        title: "Avaliação de viabilidade.",
        description:
          "Exame do conjunto de provas e dos fundamentos jurídicos antes da recomendação de medidas.",
      },
      {
        number: "05",
        title: "Definição da estratégia.",
        description:
          "Quando houver viabilidade e contratação, definição das medidas adequadas, inclusive eventual ação judicial.",
      },
      {
        number: "06",
        title: "Acompanhamento do caso.",
        description:
          "Havendo contratação, acompanhamento das etapas pertinentes e comunicação sobre os desdobramentos.",
      },
    ] as StepItem[],
    postscript:
      "As etapas 5 e 6 dependem de viabilidade e contratação prévia. Cada caso possui particularidades que demandam análise individualizada.",
  },
  audience: {
    label: "PERFIL DE ATENDIMENTO",
    title: "Confira o foco desta avaliação.",
    columnA: {
      title: "Situações priorizadas",
      items: [
        "Fraude via Pix envolvendo recursos da empresa.",
        "Prejuízo a partir de R$ 10.000,00, conforme o recorte de atendimento desta página.",
        "Contato feito por sócio, gestor ou representante autorizado.",
        "Disponibilidade de informações e registros para iniciar a análise.",
      ],
    },
    columnB: {
      title: "O que precisa ser considerado",
      items: [
        "Não há promessa de ganho de causa ou devolução garantida.",
        "Documentos incompletos podem exigir complementação.",
        "O custo e a adequação das medidas dependem das particularidades do caso.",
        "A resposta do banco e os protocolos de atendimento integram a avaliação.",
      ],
    },
    note: "O valor informado delimita o foco deste atendimento e não define, por si só, a existência de direitos. A falta de um documento ou de resposta do banco não autoriza uma conclusão automática sobre o caso.",
    cta: "Solicitar análise de viabilidade",
  },
  foundations: {
    label: "O QUE É AVALIADO",
    title: "Responsabilidade bancária exige análise do caso concreto.",
    blocks: [
      {
        title: "Falhas relacionadas à operação bancária",
        description:
          "O entendimento do STJ sobre fraudes ligadas ao risco interno das operações bancárias é um dos fundamentos que podem ser examinados na avaliação. Sua aplicação depende das circunstâncias do caso.",
        sourceLabel: "STJ — Súmula 479",
        sourceUrl:
          "https://arquivocidadao.stj.jus.br/index.php/sumula-479?listLimit=100&listPage=1&sf_culture=pt_BR&sort=referenceCode&sortDir=desc",
      },
      {
        title: "Mecanismos de segurança e resposta à fraude",
        description:
          "São examinados os registros da operação, os mecanismos de segurança e as providências adotadas após a comunicação da ocorrência.",
        sourceLabel: "Banco Central — Segurança no Pix",
        sourceUrl: "https://www.bcb.gov.br/estabilidadefinanceira/pix-seguranca",
      },
      {
        title: "Documentos e enquadramento jurídico",
        description:
          "O conjunto de provas e a relação entre as partes orientam a avaliação. O enquadramento de uma pessoa jurídica como consumidora precisa ser analisado individualmente.",
        sourceLabel: "Análise técnica individualizada",
      },
    ] as FoundationBlock[],
    note: "Não existe conclusão automática a partir do valor perdido ou do uso do Pix. A avaliação não assegura resultado administrativo ou judicial.",
    urgentNotice: {
      title: "Orientações imediatas para comunicação da ocorrência",
      text: "Se a fraude acabou de ocorrer, comunique imediatamente o banco por um canal oficial e informe-se sobre os mecanismos disponíveis, incluindo o MED. Guarde os protocolos e comprovantes. Não espere o retorno deste formulário para comunicar a ocorrência.",
    },
  },
  professional: {
    name: "Dr. Ronney Menezes",
    description:
      "Atendimento jurídico voltado à análise de fraudes bancárias envolvendo empresas e empresários.",
    location: "Teresina – PI",
  },
  form: {
    sectionId: "analise",
    label: "SOLICITAÇÃO DE CONTATO",
    title: "Solicite a análise jurídica do seu caso.",
    support:
      "Informe seus dados de contato e responda a três perguntas sobre a situação da empresa. A equipe utilizará essas informações para avaliar os próximos passos do atendimento.",
    fields: {
      fullName: {
        label: "Nome completo",
        placeholder: "Seu nome completo",
      },
      companyName: {
        label: "Nome da empresa",
        placeholder: "Razão social ou nome fantasia",
      },
      phone: {
        label: "Telefone / WhatsApp",
        placeholder: "(11) 99999-9999",
      },
      email: {
        label: "E-mail (opcional)",
        placeholder: "contato@empresa.com.br",
      },
      companyRole: {
        label: "Qual é o seu vínculo com a empresa?",
        options: [
          "Sócio(a) / proprietário(a)",
          "Gestor(a) / responsável financeiro",
          "Representante autorizado",
          "Outro",
        ],
      },
      lossRange: {
        label: "Qual é a faixa aproximada do prejuízo?",
        options: [
          "Menos de R$ 10 mil",
          "De R$ 10 mil a menos de R$ 30 mil",
          "De R$ 30 mil a menos de R$ 100 mil",
          "R$ 100 mil ou mais",
          "Ainda não sei",
        ],
      },
      bankContacted: {
        label: "A empresa já comunicou a ocorrência ao banco?",
        options: [
          "Sim, aguarda resposta",
          "Sim, recebeu negativa ou resposta insatisfatória",
          "Sim, houve devolução parcial",
          "Ainda não",
        ],
      },
    },
    privacyNotice:
      "Usaremos as informações para responder à sua solicitação, conforme a Política de Privacidade.",
    submitButton: "Enviar solicitação de análise",
    submittingButton: "Enviando solicitação…",
    successMessage:
      "Solicitação recebida. A equipe poderá entrar em contato pelo canal informado para orientar os próximos passos. O envio não constitui contratação nem garante a viabilidade do caso.",
    errorMessage:
      "Não foi possível enviar sua solicitação. Seus dados continuam preenchidos. Tente novamente.",
  },
  footer: {
    name: "Dr. Ronney Menezes",
    location: "Teresina – PI",
    year: 2026,
    disclaimer:
      "Conteúdo informativo. Cada caso depende de análise individual. Não há garantia de resultado.",
    links: [
      { label: "Política de Privacidade", href: "/privacidade" },
      { label: "Termos de Uso", href: "/termos" },
    ],
  },
};
