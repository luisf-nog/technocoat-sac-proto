import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatusBadge, SeverityBadge, OriginBadge } from "@/components/status-badge";
import { complaints, filterByFilial, SECTORS, type Status, type Origin } from "@/lib/mock-data";
import { useAppFilters } from "@/lib/app-filters";
import { Download, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/reclamacoes")({
  head: () => ({ meta: [{ title: "Reclamações — Technocoat SAC" }] }),
  component: List,
});

const statusFilters: { label: string; value: "todas" | Status }[] = [
  { label: "Todas", value: "todas" },
  { label: "Abertas", value: "aberta" },
  { label: "Em andamento", value: "em_andamento" },
  { label: "Atrasadas", value: "atrasada" },
  { label: "Resolvidas", value: "resolvida" },
];
const sectorFilters = ["Todos os setores", ...SECTORS];
const originFilters: { label: string; value: "todas" | Origin }[] = [
  { label: "Todas as origens", value: "todas" },
  { label: "Portal do Cliente", value: "portal" },
  { label: "Interno", value: "interno" },
];

function List() {
  const navigate = useNavigate();
  const { filial, search, setSearch } = useAppFilters();
  const [status, setStatus] = useState<(typeof statusFilters)[number]["value"]>("todas");
  const [sector, setSector] = useState(sectorFilters[0]);
  const [origin, setOrigin] = useState<(typeof originFilters)[number]["value"]>("todas");

  const base = useMemo(() => filterByFilial(complaints, filial), [filial]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return base.filter((c) => {
      if (status !== "todas" && c.status !== status) return false;
      if (sector !== sectorFilters[0] && c.sector !== sector) return false;
      if (origin !== "todas" && c.origin !== origin) return false;
      if (q && ![c.id, c.title, c.client, c.responsible].some((f) => f.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [base, search, status, sector, origin]);

  const activeChips: { label: string; clear: () => void }[] = [];
  if (status !== "todas") activeChips.push({ label: `Status: ${statusFilters.find((s) => s.value === status)?.label}`, clear: () => setStatus("todas") });
  if (sector !== sectorFilters[0]) activeChips.push({ label: `Setor: ${sector}`, clear: () => setSector(sectorFilters[0]) });
  if (origin !== "todas") activeChips.push({ label: `Origem: ${originFilters.find((o) => o.value === origin)?.label}`, clear: () => setOrigin("todas") });
  if (search) activeChips.push({ label: `Busca: ${search}`, clear: () => setSearch("") });

  return (
    <AppShell
      title="Reclamações"
      subtitle={filial === "Todas as unidades" ? "Todas as unidades · ocorrências consolidadas" : `${filial} · ocorrências da unidade`}
      actions={
        <>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border bg-card text-sm font-medium hover:bg-secondary">
            <Download className="h-4 w-4" /> <span className="hidden sm:inline">Exportar</span>
          </button>
          <Link to="/nova" className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-brand-red text-brand-red-foreground font-semibold text-sm hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Nova
          </Link>
        </>
      }
    >
      <div className="card-elevated p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ID, título ou cliente…"
              className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium"
          >
            {statusFilters.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium"
          >
            {sectorFilters.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value as typeof origin)}
            className="h-9 px-3 rounded-md border border-input bg-background text-sm font-medium"
          >
            {originFilters.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeChips.map((chip) => (
              <span key={chip.label} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                {chip.label}
                <button onClick={chip.clear} className="text-muted-foreground hover:text-foreground" aria-label={`Remover ${chip.label}`}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            to="/reclamacao/$id"
            params={{ id: c.id }}
            className="card-elevated p-4 block hover:bg-secondary/40 transition"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono text-xs font-semibold text-brand-navy">{c.id}</span>
              <SeverityBadge severity={c.severity} />
            </div>
            <p className="text-sm font-semibold text-foreground">{c.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.client} · {c.sector}</p>
            <div className="flex items-center gap-2 mt-2">
              <OriginBadge origin={c.origin} />
              <span className="text-[11px] text-muted-foreground truncate">{c.filial}</span>
            </div>
            <div className="flex items-center justify-between gap-2 mt-3">
              <StatusBadge status={c.status} />
              <span className="text-xs text-muted-foreground tabular-nums">{c.openDate}</span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="card-elevated p-8 text-center text-sm text-muted-foreground">Nenhuma reclamação encontrada.</div>
        )}
      </div>

      {/* Desktop table */}
      <div className="card-elevated overflow-hidden hidden md:block">
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
                <th className="text-left font-semibold px-4 py-3">Origem</th>
                <th className="text-left font-semibold px-4 py-3">Abertura</th>
                <th className="text-left font-semibold px-4 py-3">Prazo</th>
                <th className="text-left font-semibold px-4 py-3">Resolução</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate({ to: "/reclamacao/$id", params: { id: c.id } })}
                  className="hover:bg-secondary/40 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <Link
                      to="/reclamacao/$id"
                      params={{ id: c.id }}
                      onClick={(e) => e.stopPropagation()}
                      className="font-mono text-xs font-semibold text-brand-navy hover:text-brand-red"
                    >
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
                  <td className="px-4 py-3"><OriginBadge origin={c.origin} /></td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{c.openDate}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{c.deadline}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{c.resolutionTime}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    Nenhuma reclamação encontrada com os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
          <span>Exibindo {filtered.length} de {base.length} reclamações</span>
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
