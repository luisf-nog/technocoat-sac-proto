export type Status = "aberta" | "em_andamento" | "resolvida" | "atrasada";
export type Severity = "baixa" | "media" | "alta" | "critica";
export type Origin = "portal" | "interno";

// Setores de atendimento do SAC Technocoat
export const SECTORS = ["Comercial", "Logística", "Financeiro", "Qualidade", "Produção"] as const;
export type Sector = (typeof SECTORS)[number];

// Responsáveis pelo tratamento das reclamações
export const RESPONSIBLES = ["Marcos Andrade", "Carla Mendes", "Rafael Souza", "Juliana Reis", "Anderson Lima"] as const;

// Unidades do Grupo Technocoat (Araucária-PR). A primeira é a visão consolidada.
export const FILIAIS = [
  "Todas as unidades",
  "Matriz · Araucária-PR",
  "Technofibra · Araucária-PR",
  "Technobio · Araucária-PR",
  "Comercial · São Paulo-SP",
] as const;
export type Filial = (typeof FILIAIS)[number];

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
  resolutionDays?: number;
  client: string;
  filial: Exclude<Filial, "Todas as unidades">;
  origin: Origin;
  product?: string;
  description: string;
}

export const complaints: Complaint[] = [
  { id: "SAC-2041", title: "Tubetes com ovalização no lote #8821", sector: "Qualidade", responsible: "Rafael Souza", status: "atrasada", severity: "critica", openDate: "12/06/2026", deadline: "18/06/2026", resolutionTime: "—", client: "Bobinas Paraná S/A", filial: "Matriz · Araucária-PR", origin: "portal", product: "Tubete de Alta Performance", description: "Cliente relata ovalização e perda de rigidez nos tubetes do lote #8821, comprometendo a bobinagem de filme flexível na linha de produção." },
  { id: "SAC-2040", title: "Divergência em nota fiscal do pedido #7720", sector: "Financeiro", responsible: "Carla Mendes", status: "em_andamento", severity: "alta", openDate: "15/06/2026", deadline: "22/06/2026", resolutionTime: "—", client: "Embalagens Flexipack", filial: "Comercial · São Paulo-SP", origin: "interno", description: "Valor cobrado diverge do orçamento aprovado de slip sheets em R$ 1.240,00." },
  { id: "SAC-2039", title: "Descolamento de barreira no Technotray", sector: "Qualidade", responsible: "Rafael Souza", status: "em_andamento", severity: "alta", openDate: "16/06/2026", deadline: "24/06/2026", resolutionTime: "—", client: "Alimentos NutriMais", filial: "Technobio · Araucária-PR", origin: "portal", product: "Technotray", description: "Bandejas Technotray apresentam descolamento da barreira termoplástica após 48h em contato com produto refrigerado." },
  { id: "SAC-2038", title: "Solicitação de laudo de migração para contato com alimentos", sector: "Comercial", responsible: "Juliana Reis", status: "resolvida", severity: "baixa", openDate: "10/06/2026", deadline: "17/06/2026", resolutionTime: "2d 4h", resolutionDays: 2.2, client: "Frigorífico Boa Carne", filial: "Matriz · Araucária-PR", origin: "interno", product: "Coldpaper", description: "Cliente solicitou laudo de migração e segurança alimentar atualizado do Coldpaper." },
  { id: "SAC-2037", title: "Bobinas de Techtogo recebidas com embalagem violada", sector: "Logística", responsible: "Marcos Andrade", status: "resolvida", severity: "media", openDate: "08/06/2026", deadline: "15/06/2026", resolutionTime: "3d 1h", resolutionDays: 3.0, client: "Gráfica Flexo Print", filial: "Technofibra · Araucária-PR", origin: "portal", product: "Techtogo", description: "Duas bobinas de papel kraft Techtogo chegaram com filme de proteção rompido." },
  { id: "SAC-2036", title: "Boleto duplicado no pedido de slip sheets", sector: "Financeiro", responsible: "Carla Mendes", status: "aberta", severity: "media", openDate: "20/06/2026", deadline: "27/06/2026", resolutionTime: "—", client: "Distribuidora LogPallet", filial: "Comercial · São Paulo-SP", origin: "interno", product: "Techslip", description: "Cliente recebeu dois boletos referentes ao mesmo pedido de slip sheets." },
  { id: "SAC-2035", title: "Registro flexográfico desalinhado nas bobinas impressas", sector: "Produção", responsible: "Anderson Lima", status: "aberta", severity: "critica", openDate: "21/06/2026", deadline: "23/06/2026", resolutionTime: "—", client: "Bopp Embalagens", filial: "Matriz · Araucária-PR", origin: "portal", description: "Impressão flexográfica com desvio de registro entre cores, fora do padrão de cor aprovado pelo cliente." },
  { id: "SAC-2034", title: "Proposta comercial não recebida pelo cliente", sector: "Comercial", responsible: "Juliana Reis", status: "resolvida", severity: "baixa", openDate: "05/06/2026", deadline: "12/06/2026", resolutionTime: "1d 6h", resolutionDays: 1.3, client: "Cartonagem Litoral", filial: "Comercial · São Paulo-SP", origin: "interno", description: "Cliente não recebeu retorno após contato inicial sobre cotação de tubetes." },
  { id: "SAC-2033", title: "Treinamento técnico de aplicação de Techslip", sector: "Comercial", responsible: "Juliana Reis", status: "em_andamento", severity: "media", openDate: "14/06/2026", deadline: "30/06/2026", resolutionTime: "—", client: "Operador Logístico Sul", filial: "Technobio · Araucária-PR", origin: "portal", product: "Techslip", description: "Cliente solicita treinamento in-loco para a equipe de paletização sobre uso de slip sheets." },
  { id: "SAC-2032", title: "Atraso na coleta de tubetes reprovados para rebobinamento", sector: "Logística", responsible: "Marcos Andrade", status: "atrasada", severity: "alta", openDate: "11/06/2026", deadline: "18/06/2026", resolutionTime: "—", client: "Bobinas Paraná S/A", filial: "Technofibra · Araucária-PR", origin: "interno", product: "Tubete de Alta Performance", description: "Material reprovado aguardando coleta para rebobinamento há 9 dias." },
  { id: "SAC-2031", title: "Falha de barreira no Coldpaper causando vazamento", sector: "Qualidade", responsible: "Rafael Souza", status: "atrasada", severity: "critica", openDate: "13/06/2026", deadline: "19/06/2026", resolutionTime: "—", client: "Laticínios Vale Verde", filial: "Matriz · Araucária-PR", origin: "portal", product: "Coldpaper", description: "Cartão duplex Coldpaper apresenta falha na barreira termoplástica, causando vazamento em embalagem de laticínio." },
  { id: "SAC-2030", title: "Diâmetro interno do tubete fora de tolerância", sector: "Produção", responsible: "Anderson Lima", status: "em_andamento", severity: "media", openDate: "17/06/2026", deadline: "25/06/2026", resolutionTime: "—", client: "Indústria de Filmes Araucária", filial: "Matriz · Araucária-PR", origin: "interno", product: "Tubete de Alta Performance", description: "Tubetes com diâmetro interno acima da tolerância não encaixam no eixo da bobinadeira do cliente." },
  { id: "SAC-2029", title: "Umidade em tubetes durante o transporte", sector: "Logística", responsible: "Marcos Andrade", status: "resolvida", severity: "media", openDate: "06/06/2026", deadline: "13/06/2026", resolutionTime: "2d 8h", resolutionDays: 2.3, client: "Embalagens Flexipack", filial: "Comercial · São Paulo-SP", origin: "portal", product: "Tubete de Alta Performance", description: "Tubetes apresentaram absorção de umidade no transporte, reduzindo a rigidez na chegada." },
  { id: "SAC-2028", title: "Erro de cadastro de condição de pagamento", sector: "Financeiro", responsible: "Carla Mendes", status: "resolvida", severity: "baixa", openDate: "04/06/2026", deadline: "11/06/2026", resolutionTime: "1d 2h", resolutionDays: 1.1, client: "Distribuidora LogPallet", filial: "Comercial · São Paulo-SP", origin: "interno", description: "Condição de pagamento cadastrada divergente da negociada no pedido." },
  { id: "SAC-2027", title: "Variação de cor na impressão do Technotray", sector: "Qualidade", responsible: "Rafael Souza", status: "resolvida", severity: "alta", openDate: "07/06/2026", deadline: "14/06/2026", resolutionTime: "3d 4h", resolutionDays: 3.2, client: "Alimentos NutriMais", filial: "Technobio · Araucária-PR", origin: "portal", product: "Technotray", description: "Lote de bandejas Technotray apresenta variação visível de tonalidade entre paletes." },
  { id: "SAC-2026", title: "Emendas visíveis em tubetes de papel kraft reciclado", sector: "Produção", responsible: "Anderson Lima", status: "aberta", severity: "alta", openDate: "19/06/2026", deadline: "26/06/2026", resolutionTime: "—", client: "Bobinas Paraná S/A", filial: "Technofibra · Araucária-PR", origin: "interno", product: "Tubete de Alta Performance", description: "Tubetes de kraft reciclado apresentam emendas aparentes na superfície externa, fora do padrão estético." },
  { id: "SAC-2025", title: "Solicitação de ficha técnica atualizada do Techtogo", sector: "Comercial", responsible: "Juliana Reis", status: "em_andamento", severity: "baixa", openDate: "18/06/2026", deadline: "02/07/2026", resolutionTime: "—", client: "Gráfica Flexo Print", filial: "Comercial · São Paulo-SP", origin: "portal", product: "Techtogo", description: "Cliente solicita ficha técnica e dados de gramatura atualizados do papel Techtogo." },
  { id: "SAC-2024", title: "Paletização de slip sheets fora do padrão acordado", sector: "Logística", responsible: "Marcos Andrade", status: "resolvida", severity: "media", openDate: "03/06/2026", deadline: "10/06/2026", resolutionTime: "2d 0h", resolutionDays: 2.0, client: "Operador Logístico Sul", filial: "Matriz · Araucária-PR", origin: "interno", product: "Techslip", description: "Slip sheets entregues com paletização diferente da especificação acordada em contrato." },
];

// ----- Helpers de filtro e agregação por filial -----

export function filterByFilial(list: Complaint[], filial: Filial): Complaint[] {
  return filial === FILIAIS[0] ? list : list.filter((c) => c.filial === filial);
}

export interface Kpis {
  open: number;
  resolved: number;
  avgResolutionDays: number;
  overdue: number;
}

export function computeKpis(list: Complaint[]): Kpis {
  const open = list.filter((c) => c.status !== "resolvida").length;
  const resolved = list.filter((c) => c.status === "resolvida").length;
  const overdue = list.filter((c) => c.status === "atrasada").length;
  const resolvedDays = list
    .filter((c) => c.status === "resolvida" && typeof c.resolutionDays === "number")
    .map((c) => c.resolutionDays as number);
  const avgResolutionDays = resolvedDays.length
    ? Math.round((resolvedDays.reduce((a, b) => a + b, 0) / resolvedDays.length) * 10) / 10
    : 0;
  return { open, resolved, avgResolutionDays, overdue };
}

export interface SectorBar {
  sector: Sector;
  abertas: number;
  resolvidas: number;
}

export function computeSectorBars(list: Complaint[]): SectorBar[] {
  return SECTORS.map((sector) => ({
    sector,
    abertas: list.filter((c) => c.sector === sector && c.status !== "resolvida").length,
    resolvidas: list.filter((c) => c.sector === sector && c.status === "resolvida").length,
  }));
}

export function computeSeverity(list: Complaint[]): { label: string; key: Severity; val: number; cls: string }[] {
  const active = list.filter((c) => c.status !== "resolvida");
  return [
    { label: "Crítica", key: "critica" as Severity, cls: "bg-brand-red" },
    { label: "Alta", key: "alta" as Severity, cls: "bg-warning" },
    { label: "Média", key: "media" as Severity, cls: "bg-brand-navy" },
    { label: "Baixa", key: "baixa" as Severity, cls: "bg-success" },
  ].map((r) => ({ ...r, val: active.filter((c) => c.severity === r.key).length }));
}

// ----- Dados auxiliares da tela de detalhe -----

export const actionPlan = [
  { step: "Auditar o lote #8821 e isolar os tubetes ovalizados", owner: "Rafael Souza", state: "done" as const },
  { step: "Emitir crédito e reposição prioritária ao cliente", owner: "Carla Mendes", state: "approved" as const },
  { step: "Reprogramar produção com novo ajuste da bobinadeira", owner: "Anderson Lima", state: "pending" as const },
  { step: "Revisar parâmetro de umidade e SLA do contrato", owner: "Juliana Reis", state: "pending" as const },
];

export const timeline = [
  { when: "Hoje, 14:32", who: "Rafael Souza", text: "Plano de ação revisado e enviado para aprovação do gestor." },
  { when: "Hoje, 11:08", who: "Carla Mendes", text: "Crédito e reposição de 1.200 tubetes aprovados." },
  { when: "Ontem, 17:45", who: "Sistema", text: "SLA de resposta excedido em 12h." },
  { when: "22/06, 09:20", who: "Juliana Reis", text: "Cliente contatado por telefone, aguarda retorno formal." },
  { when: "20/06, 16:00", who: "Sistema", text: "Reclamação SAC-2041 aberta via Portal do Cliente." },
];
