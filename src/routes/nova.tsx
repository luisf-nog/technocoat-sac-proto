import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { UploadCloud, Info } from "lucide-react";
import { SECTORS, RESPONSIBLES } from "@/lib/mock-data";

export const Route = createFileRoute("/nova")({
  head: () => ({ meta: [{ title: "Nova reclamação — Technocoat SAC" }] }),
  component: NewComplaint,
});

const sectors = SECTORS;
const responsibles = RESPONSIBLES;
const severities = [
  { v: "baixa", label: "Baixa", cls: "border-border" },
  { v: "media", label: "Média", cls: "border-warning text-warning" },
  { v: "alta", label: "Alta", cls: "border-destructive/40 text-destructive" },
  { v: "critica", label: "Crítica", cls: "border-destructive bg-destructive/5 text-destructive" },
];

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-1.5">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}

function NewComplaint() {
  return (
    <AppShell title="Nova reclamação" subtitle="Registre uma nova ocorrência no sistema SAC">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form className="lg:col-span-2 card-elevated p-6 space-y-5">
          <Field label="Título da reclamação" required>
            <input
              type="text"
              placeholder="Ex: Tubetes com ovalização no lote #8821"
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Setor responsável" required>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                <option value="">Selecione…</option>
                {sectors.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Responsável" required>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                <option value="">Selecione…</option>
                {responsibles.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Severidade" required hint="A severidade impacta o SLA de atendimento.">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {severities.map((s, i) => (
                <label key={s.v} className={`cursor-pointer rounded-md border-2 px-3 py-2.5 text-center text-sm font-semibold transition ${s.cls} ${i === 2 ? "ring-2 ring-ring/20" : ""}`}>
                  <input type="radio" name="sev" className="sr-only" defaultChecked={i === 2} />
                  {s.label}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Cliente" required>
            <input type="text" placeholder="Razão social ou CNPJ" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm" />
          </Field>

          <Field label="Descrição detalhada" required>
            <textarea
              rows={5}
              placeholder="Descreva o problema reportado, contexto, impacto e qualquer informação relevante…"
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </Field>

          <Field label="Anexos" hint="PDF, JPG, PNG ou XLSX — máx. 10MB por arquivo.">
            <label className="block rounded-md border-2 border-dashed border-border bg-secondary/40 p-6 text-center hover:border-brand-navy/40 transition cursor-pointer">
              <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">Arraste arquivos ou <span className="text-brand-red">clique para enviar</span></p>
              <p className="text-xs text-muted-foreground mt-1">Notas fiscais, fotos do material, laudos técnicos</p>
              <input type="file" multiple className="sr-only" />
            </label>
          </Field>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <Link to="/reclamacoes" className="h-10 px-4 rounded-md border border-border bg-card text-sm font-semibold hover:bg-secondary inline-flex items-center">
              Cancelar
            </Link>
            <button type="button" className="h-10 px-4 rounded-md border border-border bg-card text-sm font-semibold hover:bg-secondary">
              Salvar rascunho
            </button>
            <button type="submit" className="h-10 px-5 rounded-md bg-brand-red text-brand-red-foreground text-sm font-semibold hover:opacity-90 shadow-sm">
              Registrar reclamação
            </button>
          </div>
        </form>

        <aside className="space-y-4">
          <div className="card-elevated p-5">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-md bg-brand-navy text-brand-navy-foreground flex items-center justify-center shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">SLA por severidade</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Prazos automáticos aplicados ao registrar.</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { l: "Crítica", t: "4 horas", cls: "text-brand-red" },
                { l: "Alta", t: "24 horas", cls: "text-destructive" },
                { l: "Média", t: "3 dias úteis", cls: "text-warning" },
                { l: "Baixa", t: "7 dias úteis", cls: "text-success" },
              ].map((r) => (
                <li key={r.l} className="flex justify-between border-b border-border last:border-0 pb-2 last:pb-0">
                  <span className={`font-semibold ${r.cls}`}>{r.l}</span>
                  <span className="text-foreground tabular-nums">{r.t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground">Boas práticas</h3>
            <ul className="mt-3 text-xs text-muted-foreground space-y-2 list-disc pl-4">
              <li>Inclua o número do pedido ou nota fiscal sempre que possível.</li>
              <li>Anexe fotos nítidas do material ou embalagem.</li>
              <li>Descreva o impacto operacional ou financeiro ao cliente.</li>
              <li>Identifique se há risco de saúde ou meio ambiente.</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
