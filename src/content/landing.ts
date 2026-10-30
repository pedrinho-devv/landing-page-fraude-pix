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
    ctaHref: "/#analise",
  },
  hero: {
    label: "ANÁLISE JURÍDICA DE FRAUDES BANCÁRIAS",
    titlePrefix: "Sua empresa sofreu um ",
    titleHighlight: "golpe via Pix",
    titleSuffix: " com prejuízo a partir de R$ 10 mil?",
    support:
      "Conte o que aconteceu e receba o retorno da equipe do Dr. Ronney com uma avaliação de viabilidade do seu caso.",
    complement:
      "Comece com seu nome e WhatsApp. Depois, perguntas rápidas ajudam a equipe a entender a situação da sua empresa.",
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
      { number: "01", title: "Você conta o que aconteceu.", description: "Informe seu contato e responda a perguntas rápidas sobre a fraude envolvendo sua empresa." },
      { number: "02", title: "Analisamos as informações e os documentos.", description: "A equipe orienta quais comprovantes e protocolos são necessários para avaliar seu caso." },
      { number: "03", title: "Você recebe a avaliação de viabilidade.", description: "Entenda os caminhos possíveis e os próximos passos, antes de decidir sobre eventual contratação." },
    ] as StepItem[],
    postscript:
      "Eventuais medidas administrativas ou judiciais dependem de análise individual e contratação prévia.",
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
    whatsapp: {
      rawNumber: "5586981572651",
      displayNumber: "(86) 98157-2651",
    },
  },
  form: {
    sectionId: "analise",
    label: "SOLICITAÇÃO DE CONTATO",
    title: "Solicite a análise jurídica do seu caso.",
    support:
      "Deixe seu nome e WhatsApp. Depois, perguntas rápidas ajudam o Dr. Ronney a avaliar seu caso.",
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
    submitButton: "Enviar meu caso para análise",
    submittingButton: "Enviando solicitação…",
    whatsappRedirectNote:
      "Após a confirmação do envio, a equipe poderá entrar em contato pelo WhatsApp informado.",
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
  obrigado: {
    meta: {
      title: "Solicitação Recebida com Sucesso | Dr. Ronney Menezes",
      description:
        "Sua solicitação de análise jurídica foi enviada com sucesso. Confira as orientações e os próximos passos do atendimento.",
    },
    badge: "SOLICITAÇÃO ENVIADA COM SUCESSO",
    title: "Obrigado! Recebemos sua solicitação.",
    subtitle:
      "Nossa equipe jurídica iniciará a triagem técnica das informações fornecidas para avaliar a viabilidade de atuação para o seu caso.",
    stepsTitle: "O que acontece agora?",
    steps: [
      {
        number: "01",
        title: "Triagem técnica das informações",
        description:
          "Examinamos os dados informados sobre a empresa, faixa de prejuízo e histórico da transação sob as normas bancárias e entendimentos vigentes.",
      },
      {
        number: "02",
        title: "Contato da equipe jurídica",
        description:
          "Um membro da equipe entrará em contato pelo telefone ou WhatsApp informado em horário comercial para orientar sobre o enquadramento do caso.",
      },
      {
        number: "03",
        title: "Separação de provas e documentos",
        description:
          "Se o caso apresentar viabilidade inicial, você receberá orientações específicas sobre como reunir e organizar comprovantes, protocolos e boletins.",
      },
    ],
    documentsSection: {
      title: "Documentos que você já pode deixar organizados:",
      items: [
        "Comprovantes de transferência do Pix contendo o ID da transação (End-to-End ID) e chaves utilizadas.",
        "Boletim de Ocorrência policial detalhado com a narrativa exata do ocorrido.",
        "Protocolos de atendimento e registros de contestação junto ao banco de origem e de destino (MED).",
        "Extrato bancário da conta empresarial comprovando o débito e o saldo do período.",
      ],
    },
    urgentNotice: {
      title: "Atenção: A fraude acabou de acontecer?",
      text: "Se a ocorrência for recente e sua empresa ainda não comunicou a instituição bancária, não aguarde o retorno da equipe: acione imediatamente os canais oficiais do seu banco para registrar a contestação e solicitar o Mecanismo Especial de Devolução (MED). Guarde todos os números de protocolo.",
    },
    disclaimer:
      "O envio deste formulário constitui solicitação prévia de triagem técnica e não configura relação contratual automática de prestação de serviços advocatícios, procuração ou garantia de recuperação de valores. Os dados informados são tratados sob sigilo profissional e nos termos da Lei Geral de Proteção de Dados (LGPD).",
    backButton: "Voltar para a página inicial",
  },
};
