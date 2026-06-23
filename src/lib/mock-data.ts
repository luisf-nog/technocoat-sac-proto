export type Status = "aberta" | "em_andamento" | "resolvida" | "atrasada";
export type Severity = "baixa" | "media" | "alta" | "critica";
export type Sector = "Comercial" | "Logística" | "Financeiro" | "Operações";

export interface Complaint {
  id: string;
  title: string;
  sector: Sector;
  responsible: string;
  status: Status;
  severity: Severity;
  openDate: string;
  deadline: string;
  resolutionTime: string;
  client: string;
  description: string;
}

export const complaints: Complaint[] = [
  { id: "SAC-2041", title: "Atraso na entrega de tinta epóxi lote #8821", sector: "Logística", responsible: "Marcos Andrade", status: "atrasada", severity: "critica", openDate: "12/06/2026", deadline: "18/06/2026", resolutionTime: "—", client: "Construtora Vert", description: "Cliente relata atraso de 6 dias na entrega do pedido #8821, impactando cronograma de obra." },
  { id: "SAC-2040", title: "Divergência em nota fiscal pedido #7720", sector: "Financeiro", responsible: "Carla Mendes", status: "em_andamento", severity: "alta", openDate: "15/06/2026", deadline: "22/06/2026", resolutionTime: "—", client: "Metalúrgica Sul", description: "Valor cobrado diverge do orçamento aprovado em R$ 1.240,00." },
  { id: "SAC-2039", title: "Defeito de aderência em primer PU", sector: "Operações", responsible: "Rafael Souza", status: "em_andamento", severity: "alta", openDate: "16/06/2026", deadline: "24/06/2026", resolutionTime: "—", client: "Tintas Brasil S/A", description: "Cliente reporta descolamento após 72h de aplicação em superfície galvanizada." },
  { id: "SAC-2038", title: "Solicitação de FISPQ atualizada", sector: "Comercial", responsible: "Juliana Reis", status: "resolvida", severity: "baixa", openDate: "10/06/2026", deadline: "17/06/2026", resolutionTime: "2d 4h", client: "Indústria Vega", description: "Cliente solicitou FISPQ atualizada do produto TC-450." },
  { id: "SAC-2037", title: "Embalagem violada na recepção", sector: "Logística", responsible: "Marcos Andrade", status: "resolvida", severity: "media", openDate: "08/06/2026", deadline: "15/06/2026", resolutionTime: "3d 1h", client: "Pintec Indústria", description: "Dois galões chegaram com lacre violado." },
  { id: "SAC-2036", title: "Erro de cobrança em boleto duplicado", sector: "Financeiro", responsible: "Carla Mendes", status: "aberta", severity: "media", openDate: "20/06/2026", deadline: "27/06/2026", resolutionTime: "—", client: "Mecânica Andrade", description: "Cliente recebeu dois boletos referentes ao mesmo pedido." },
  { id: "SAC-2035", title: "Cor fora do padrão Pantone 286C", sector: "Operações", responsible: "Rafael Souza", status: "aberta", severity: "critica", openDate: "21/06/2026", deadline: "23/06/2026", resolutionTime: "—", client: "AutoParts Ltda", description: "Lote entregue apresenta variação visível de tonalidade." },
  { id: "SAC-2034", title: "Proposta comercial não recebida", sector: "Comercial", responsible: "Juliana Reis", status: "resolvida", severity: "baixa", openDate: "05/06/2026", deadline: "12/06/2026", resolutionTime: "1d 6h", client: "Engefer Estruturas", description: "Cliente não recebeu retorno após contato inicial." },
  { id: "SAC-2033", title: "Treinamento técnico de aplicação solicitado", sector: "Comercial", responsible: "Juliana Reis", status: "em_andamento", severity: "media", openDate: "14/06/2026", deadline: "30/06/2026", resolutionTime: "—", client: "Naval Coatings", description: "Cliente solicita treinamento in-loco para equipe de aplicadores." },
  { id: "SAC-2032", title: "Atraso na coleta de material reprovado", sector: "Logística", responsible: "Marcos Andrade", status: "atrasada", severity: "alta", openDate: "11/06/2026", deadline: "18/06/2026", resolutionTime: "—", client: "Refinaria Costa", description: "Material reprovado aguardando coleta há 9 dias." },
];

export const kpis = {
  open: 14,
  resolved: 86,
  avgResolutionDays: 2.4,
  overdue: 5,
};

export const sectorBars = [
  { sector: "Comercial", abertas: 4, resolvidas: 22 },
  { sector: "Logística", abertas: 5, resolvidas: 18 },
  { sector: "Financeiro", abertas: 3, resolvidas: 24 },
  { sector: "Operações", abertas: 2, resolvidas: 22 },
];

export const actionPlan = [
  { step: "Contatar transportadora e auditar rota", owner: "Marcos Andrade", state: "done" as const },
  { step: "Emitir crédito compensatório ao cliente", owner: "Carla Mendes", state: "approved" as const },
  { step: "Reagendar entrega prioritária", owner: "Marcos Andrade", state: "pending" as const },
  { step: "Atualizar SLA do contrato", owner: "Juliana Reis", state: "pending" as const },
];

export const timeline = [
  { when: "Hoje, 14:32", who: "Marcos Andrade", text: "Plano de ação revisado e enviado para aprovação do gestor." },
  { when: "Hoje, 11:08", who: "Carla Mendes", text: "Crédito compensatório de R$ 1.240,00 aprovado." },
  { when: "Ontem, 17:45", who: "Sistema", text: "SLA de resposta excedido em 12h." },
  { when: "22/06, 09:20", who: "Juliana Reis", text: "Cliente contatado por telefone, aguarda retorno formal." },
  { when: "20/06, 16:00", who: "Sistema", text: "Reclamação SAC-2041 aberta." },
];
