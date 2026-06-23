import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatusBadge, SeverityBadge, OriginBadge } from "@/components/status-badge";
import { complaints, filterByFilial, computeKpis, computeSectorBars, computeSeverity } from "@/lib/mock-data";
import { useAppFilters } from "@/lib/app-filters";
import { ArrowUpRight, Clock, CheckCircle2, AlertTriangle, Inbox, Plus } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Dashboard — Technocoat SAC" }] }),
  component: Dashboard,
});

function KpiCard({ label, value, hint, icon: Icon, tone }: { label: string; value: string; hint: string; icon: any; tone: "navy" | "red" | "amber" | "green" }) {
  const tones = {
    navy: "bg-brand-navy text-brand-navy-foreground",
    red: "bg-brand-red text-brand-red-foreground",
    amber: "bg-warning text-warning-foreground",
    green: "bg-success text-success-foreground",
  } as const;
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs text-muted-foreground font-medium">{hint}</span>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function Dashboard() {
  const { filial } = useAppFilters();
  const list = filterByFilial(complaints, filial);
  const kpis = computeKpis(list);
  const sectorBars = computeSectorBars(list);
  const severity = computeSeverity(list);
  const severityMax = Math.max(1, ...severity.map((s) => s.val));
  const recent = list.slice(0, 6);
  const filialLabel = filial === "Todas as unidades" ? "todas as unidades" : filial;
  return (
    <AppShell
      title="Dashboard"
      subtitle={`Visão geral do atendimento — ${filialLabel} · junho/2026`}
      actions={
        <Link to="/nova" className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-brand-red text-brand-red-foreground font-semibold text-sm hover:opacity-90 shadow-sm">
          <Plus className="h-4 w-4" /> Nova reclamação
        </Link>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Reclamações ativas" value={String(kpis.open)} hint="abertas + em tratamento" icon={Inbox} tone="navy" />
        <KpiCard label="Resolvidas (mês)" value={String(kpis.resolved)} hint="junho/2026" icon={CheckCircle2} tone="green" />
        <KpiCard label="Tempo médio de resolução" value={kpis.avgResolutionDays ? `${kpis.avgResolutionDays}d` : "—"} hint="meta: 3d" icon={Clock} tone="amber" />
        <KpiCard label="Atrasadas / SLA estourado" value={String(kpis.overdue)} hint="ação imediata" icon={AlertTriangle} tone="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-foreground">Reclamações por setor</h2>
              <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="status-dot bg-brand-red" /> Abertas</span>
              <span className="inline-flex items-center gap-1.5"><span className="status-dot bg-brand-navy" /> Resolvidas</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorBars} barGap={6} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="oklch(0.91 0.01 255)" />
                <XAxis dataKey="sector" tickLine={false} axisLine={false} tick={{ fill: "oklch(0.5 0.02 257)", fontSize: 12, fontWeight: 500 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "oklch(0.5 0.02 257)", fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "oklch(0.96 0.008 250)" }}
                  contentStyle={{ borderRadius: 8, border: "1px solid oklch(0.91 0.01 255)", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ display: "none" }} />
                <Bar dataKey="abertas" fill="oklch(0.554 0.221 28)" radius={[4, 4, 0, 0]} maxBarSize={36} />
                <Bar dataKey="resolvidas" fill="oklch(0.318 0.094 257)" radius={[4, 4, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h2 className="text-base font-semibold text-foreground">Distribuição de severidade</h2>
          <p className="text-xs text-muted-foreground mb-4">Reclamações ativas</p>
          <ul className="space-y-3">
            {severity.map((r) => (
              <li key={r.label}>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-foreground">{r.label}</span>
                  <span className="text-muted-foreground">{r.val}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${r.cls}`} style={{ width: `${(r.val / severityMax) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          {kpis.overdue > 0 && (
            <div className="mt-6 p-4 rounded-md bg-accent border border-destructive/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-brand-red mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-brand-red">
                    {kpis.overdue} {kpis.overdue === 1 ? "reclamação com SLA estourado" : "reclamações com SLA estourado"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Requerem priorização imediata da equipe.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card-elevated mt-6">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-base font-semibold text-foreground">Reclamações recentes</h2>
            <p className="text-xs text-muted-foreground">Atualizado há 2 minutos</p>
          </div>
          <Link to="/reclamacoes" className="text-sm font-semibold text-brand-navy hover:text-brand-red inline-flex items-center gap-1">
            Ver todas <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recent.map((c) => (
            <Link
              to="/reclamacao/$id"
              params={{ id: c.id }}
              key={c.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3.5 hover:bg-secondary/50 transition-colors"
            >
              <span className="font-mono text-xs font-semibold text-muted-foreground w-20 shrink-0">{c.id}</span>
              <div className="flex-1 min-w-0 order-3 sm:order-none basis-full sm:basis-auto">
                <p className="text-sm font-semibold text-foreground truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground truncate">{c.client} · {c.sector} · {c.responsible}</p>
              </div>
              <OriginBadge origin={c.origin} className="hidden lg:inline-flex" />
              <SeverityBadge severity={c.severity} />
              <StatusBadge status={c.status} />
              <span className="text-xs text-muted-foreground w-20 text-right tabular-nums shrink-0 hidden sm:inline">{c.openDate}</span>
            </Link>
          ))}
          {recent.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">Nenhuma reclamação para esta unidade.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
