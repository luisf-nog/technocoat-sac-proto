import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatusBadge, SeverityBadge } from "@/components/status-badge";
import { complaints } from "@/lib/mock-data";
import { Download, Filter, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/reclamacoes")({
  head: () => ({ meta: [{ title: "Reclamações — Technocoat SAC" }] }),
  component: List,
});

const statusFilters = ["Todas", "Abertas", "Em andamento", "Atrasadas", "Resolvidas"];
const sectorFilters = ["Todos os setores", "Comercial", "Logística", "Financeiro", "Operações"];

function List() {
  return (
    <AppShell
      title="Reclamações"
      subtitle="Gerencie e acompanhe todas as ocorrências registradas"
      actions={
        <>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm font-medium hover:bg-secondary">
            <Download className="h-4 w-4" /> Exportar
          </button>
          <Link to="/nova" className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-brand-red text-brand-red-foreground font-semibold text-sm hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Nova
          </Link>
        </>
      }
    >
      <div className="card-elevated p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar por ID, título ou cliente…"
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <select className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium">
            {statusFilters.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium">
            {sectorFilters.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button className="h-9 px-3 rounded-md border border-border bg-card text-sm font-medium hover:bg-secondary inline-flex items-center gap-2">
            <Filter className="h-4 w-4" /> Mais filtros
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Status: Em andamento", "Setor: Logística", "Severidade: Alta"].map((chip) => (
            <span key={chip} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {chip}
              <button className="text-muted-foreground hover:text-foreground">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="text-left font-semibold px-4 py-3">ID</th>
                <th className="text-left font-semibold px-4 py-3">Título</th>
                <th className="text-left font-semibold px-4 py-3">Setor</th>
                <th className="text-left font-semibold px-4 py-3">Responsável</th>
                <th className="text-left font-semibold px-4 py-3">Severidade</th>
                <th className="text-left font-semibold px-4 py-3">Status</th>
                <th className="text-left font-semibold px-4 py-3">Abertura</th>
                <th className="text-left font-semibold px-4 py-3">Prazo</th>
                <th className="text-left font-semibold px-4 py-3">Resolução</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {complaints.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/40 transition-colors">
                  <td className="px-4 py-3">
                    <Link to="/reclamacao/$id" params={{ id: c.id }} className="font-mono text-xs font-semibold text-brand-navy hover:text-brand-red">
                      {c.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-semibold text-foreground truncate">{c.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.client}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground">{c.sector}</td>
                  <td className="px-4 py-3 text-foreground">{c.responsible}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={c.severity} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{c.openDate}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{c.deadline}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{c.resolutionTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
          <span>Exibindo 1–{complaints.length} de 100 reclamações</span>
          <div className="flex items-center gap-1">
            <button className="h-7 px-2 rounded border border-border bg-card hover:bg-secondary">Anterior</button>
            <button className="h-7 w-7 rounded bg-brand-navy text-brand-navy-foreground font-semibold">1</button>
            <button className="h-7 w-7 rounded border border-border bg-card hover:bg-secondary">2</button>
            <button className="h-7 w-7 rounded border border-border bg-card hover:bg-secondary">3</button>
            <button className="h-7 px-2 rounded border border-border bg-card hover:bg-secondary">Próximo</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
