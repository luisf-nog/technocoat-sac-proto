import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatusBadge, SeverityBadge } from "@/components/status-badge";
import { complaints, actionPlan, timeline } from "@/lib/mock-data";
import { ArrowLeft, Check, Clock, CircleDashed, Send, Paperclip, Calendar, User, Building2, Hash } from "lucide-react";

export const Route = createFileRoute("/reclamacao/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id} — Technocoat SAC` }] }),
  component: Detail,
});

function Detail() {
  const { id } = Route.useParams();
  const c = complaints.find((x) => x.id === id) ?? complaints[0];

  return (
    <AppShell
      title={c.title}
      subtitle={`${c.id} · ${c.client}`}
      actions={
        <>
          <Link to="/reclamacoes" className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm font-medium hover:bg-secondary">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <button className="h-9 px-3 rounded-md border border-border bg-card text-sm font-semibold hover:bg-secondary">Reatribuir</button>
          <button className="h-9 px-4 rounded-md bg-brand-navy text-brand-navy-foreground text-sm font-semibold hover:opacity-90 shadow-sm">Marcar como resolvida</button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card-elevated p-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <StatusBadge status={c.status} />
              <SeverityBadge severity={c.severity} />
              <span className="ml-auto text-xs text-muted-foreground">SLA: vence em 1 dia 4 horas</span>
            </div>
            <h2 className="text-base font-semibold text-foreground mb-2">Descrição</h2>
            <p className="text-sm text-foreground leading-relaxed">{c.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-border">
              {[
                { icon: Hash, l: "ID", v: c.id },
                { icon: Building2, l: "Setor", v: c.sector },
                { icon: User, l: "Responsável", v: c.responsible },
                { icon: Calendar, l: "Abertura", v: c.openDate },
              ].map((f) => (
                <div key={f.l}>
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    <f.icon className="h-3 w-3" /> {f.l}
                  </div>
                  <p className="text-sm font-semibold text-foreground">{f.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">Plano de ação</h2>
                <p className="text-xs text-muted-foreground">4 etapas — 1 concluída, 1 aprovada, 2 pendentes</p>
              </div>
              <button className="text-sm font-semibold text-brand-navy hover:text-brand-red">+ Adicionar etapa</button>
            </div>
            <ol className="space-y-3">
              {actionPlan.map((a, i) => {
                const meta =
                  a.state === "done"
                    ? { icon: Check, cls: "bg-success text-success-foreground", label: "Concluída", chip: "bg-success/15 text-success border-success/30" }
                    : a.state === "approved"
                    ? { icon: Check, cls: "bg-brand-navy text-brand-navy-foreground", label: "Aprovada", chip: "bg-brand-navy/10 text-brand-navy border-brand-navy/30" }
                    : { icon: CircleDashed, cls: "bg-secondary text-muted-foreground border border-border", label: "Pendente", chip: "bg-warning/15 text-warning border-warning/30" };
                const Icon = meta.icon;
                return (
                  <li key={i} className="flex items-start gap-3 rounded-md border border-border p-3 hover:bg-secondary/40 transition">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${meta.cls}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{a.step}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Responsável: {a.owner}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${meta.chip}`}>
                      {meta.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="card-elevated p-6">
            <h2 className="text-base font-semibold text-foreground mb-1">Comentários e respostas</h2>
            <p className="text-xs text-muted-foreground mb-4">Adicione uma atualização ou responda diretamente ao cliente.</p>
            <div className="rounded-md border border-input bg-background focus-within:ring-2 focus-within:ring-ring/30">
              <textarea
                rows={3}
                placeholder="Escreva uma resposta…"
                className="w-full px-3 py-2.5 bg-transparent text-sm resize-none focus:outline-none"
              />
              <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                <button className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
                  <Paperclip className="h-4 w-4" /> Anexar
                </button>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
                    <input type="checkbox" className="rounded" /> Enviar ao cliente
                  </label>
                  <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-brand-red text-brand-red-foreground text-sm font-semibold hover:opacity-90">
                    <Send className="h-3.5 w-3.5" /> Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground mb-1">Cliente</h3>
            <p className="text-base font-bold text-foreground">{c.client}</p>
            <p className="text-xs text-muted-foreground">CNPJ 12.345.678/0001-90</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground">Reclamações</p>
                <p className="text-base font-bold text-foreground">7</p>
              </div>
              <div>
                <p className="text-muted-foreground">NPS médio</p>
                <p className="text-base font-bold text-success">+42</p>
              </div>
            </div>
            <button className="mt-4 w-full h-9 rounded-md border border-border bg-card text-sm font-semibold hover:bg-secondary">
              Ver histórico do cliente
            </button>
          </div>

          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Linha do tempo</h3>
            <ol className="relative border-l-2 border-border ml-2 space-y-5">
              {timeline.map((t, i) => (
                <li key={i} className="pl-5 relative">
                  <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-brand-navy ring-4 ring-card" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {t.when}
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{t.who}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
