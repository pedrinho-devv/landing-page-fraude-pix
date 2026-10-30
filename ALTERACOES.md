# Atualização a partir do relatório da campanha

## Implementado
- Formulário no início da página: contato (nome e WhatsApp), seguido dos detalhes da empresa e e-mail opcional.
- Textos acolhedores, público e faixa de prejuízo explícitos, processo reduzido a três etapas.
- Rótulo do hero sem aparência de botão; CTA fixo no celular quando o formulário está fora da tela.
- O envio aguarda resposta positiva da API e preserva os campos em caso de erro.
- Confirmação /obrigado exige registro de sucesso na sessão do navegador, criado após resposta positiva do Web3Forms. É uma proteção de fluxo no cliente, não um comprovante verificável pelo servidor.
- WhatsApp opcional após confirmação, sem redirecionamento automático.
- Evento `Lead` enviado ao dataLayer apenas na confirmação; ID de evento sem dados pessoais e trava no armazenamento do navegador. Se o armazenamento estiver bloqueado, não conta a conversão.
- Clique no WhatsApp usa evento separado `ClicouWhatsApp`.
- Retrato WebP de 448 px e cerca de 8 KB, em lugar de JPEG de 100 KB; tamanhos responsivos preservados.

## Configuração necessária antes de colocar em produção
1. O formulário está conectado ao Web3Forms com a chave pública fornecida. Os cadastros são encaminhados ao e-mail associado a essa chave. Não requer configuração de webhook ou segredo de assinatura para esse fluxo.
2. Os testes simulam as respostas do provedor; não foi enviado e-mail real nem confirmada a entrega na caixa postal. O fluxo gratuito não fornece prova assinada de entrega nem idempotência garantida. O registro na sessão evita acesso casual à confirmação, mas pode ser manipulado pelo usuário; comprovação de conversão no servidor exige integração adicional verificável.
3. No Google Tag Manager (GTM-M43QGSC9), remova qualquer disparo antigo de Lead por clique, envio ou simples visita a /obrigado. Vincule o Pixel ao evento personalizado `Lead` do dataLayer e use `event_id` para deduplicação com eventual API de Conversões. Esta configuração externa não é alterada pelo código do repositório.
4. Informe dados comprovados de OAB, experiência, prazo e custo da primeira análise para completar esses conteúdos. Não foram criados dados fictícios nem promessas de gratuidade/prazo.
5. Revisão final dos textos pelo advogado e teste no navegador interno real de Instagram/Facebook. O teste em Chrome com dimensões móveis não substitui esse teste.

## Validação
15 testes automatizados de validação, entrega, falha de webhook e comprovante de cadastro. Compilação de produção com Next.js. Auditoria de navegador inclui quatro larguras, preenchimento em duas etapas, falha de envio com preservação dos dados, confirmação e deduplicação após atualização.

## Campanha
As mudanças no anúncio e no Gerenciador de Eventos dependem de acesso às contas correspondentes. Compare a conversão e o custo por lead qualificado após 300–500 visitas; o relatório registra 1,23% como referência anterior.

## Web3Forms
O envio inclui nome, WhatsApp, empresa, vínculo, prejuízo, comunicação ao banco e e-mail quando informado. HTTP 2xx sem `success: true` é tratado como erro, sem avançar ou disparar Lead. A documentação oficial recomenda envio pelo navegador: https://docs.web3forms.com/getting-started/api-reference
