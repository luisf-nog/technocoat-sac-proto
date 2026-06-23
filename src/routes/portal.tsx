import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UploadCloud, CheckCircle2, Mail, ShieldCheck, Clock } from "lucide-react";
import logo from "@/assets/technocoat-logo.png.asset.json";
import { SECTORS } from "@/lib/mock-data";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal do Cliente — Technocoat SAC" },
      { name: "description", content: "Canal oficial de atendimento ao cliente Technocoat Group." },
    ],
  }),
  component: PortalPage,
});

const sectors = SECTORS;
const severities = [
  { v: "baixa", label: "Baixa", desc: "Sem impacto operacional" },
  { v: "media", label: "Média", desc: "Impacto moderado" },
  { v: "alta", label: "Alta", desc: "Impacto relevante" },
  { v: "critica", label: "Crítica", desc: "Operação parada" },
];

function generateProtocol() {
  const year = new Date().getFullYear();
  const n = Math.floor(1000 + Math.random() * 9000);
  return `#${year}-${String(n).padStart(4, "0")}`;
}

function PortalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [protocol, setProtocol] = useState("");
  const [severity, setSeverity] = useState("media");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProtocol(generateProtocol());
    setSubmitted(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/40 via-background to-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="bg-white rounded-md px-3 py-2 flex items-center border border-border shadow-sm">
            <img src={logo.url} alt="Technocoat Group" className="h-7 w-auto" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            <span className="hidden sm:inline">Canal oficial · Conexão segura</span>
            <span className="sm:hidden">Canal oficial</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {submitted ? (
          <SuccessView protocol={protocol} onNew={() => setSubmitted(false)} />
        ) : (
          <>
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-red mb-3">
                Canal de Atendimento
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
                Abra sua reclamação
              </h1>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
                Sua manifestação é registrada diretamente em nosso sistema SAC. Você receberá um número de protocolo e atualizações por e-mail.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="card-elevated p-5 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Nome completo" required>
                  <input required type="text" placeholder="Ex: Maria Silva" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </Field>
                <Field label="Empresa" required>
                  <input required type="text" placeholder="Razão social" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="E-mail" required>
                  <input required type="email" placeholder="voce@empresa.com.br" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </Field>
                <Field label="Telefone" hint="Opcional">
                  <input type="tel" placeholder="(11) 99999-0000" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </Field>
              </div>

              <Field label="Categoria da reclamação" required>
                <select required className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="">
                  <option value="" disabled>Selecione uma categoria…</option>
                  {sectors.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>

              <Field label="Severidade" required hint="Selecione o nível de impacto que melhor descreve sua situação.">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {severities.map((s) => {
                    const active = severity === s.v;
                    return (
                      <label
                        key={s.v}
                        className={`cursor-pointer rounded-md border-2 px-3 py-2.5 text-center transition ${
                          active
                            ? s.v === "critica"
                              ? "border-brand-red bg-brand-red/5"
                              : "border-brand-navy bg-brand-navy/5"
                            : "border-border hover:border-brand-navy/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="severity"
                          value={s.v}
                          checked={active}
                          onChange={() => setSeverity(s.v)}
                          className="sr-only"
                        />
                        <span className={`block text-sm font-semibold ${
                          active ? (s.v === "critica" ? "text-brand-red" : "text-brand-navy") : "text-foreground"
                        }`}>{s.label}</span>
                        <span className="block text-[10px] text-muted-foreground mt-0.5">{s.desc}</span>
                      </label>
                    );
                  })}
                </div>
              </Field>

              <Field label="Descrição detalhada" required>
                <textarea
                  required
                  rows={5}
                  placeholder="Descreva o ocorrido com o máximo de detalhes possível: número do pedido, nota fiscal, datas, impactos…"
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </Field>

              <Field label="Anexos" hint="PDF, JPG ou PNG — máx. 10MB por arquivo.">
                <label className="block rounded-md border-2 border-dashed border-border bg-secondary/30 p-6 text-center hover:border-brand-navy/40 transition cursor-pointer">
                  <UploadCloud className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">
                    Arraste arquivos ou <span className="text-brand-red">clique para enviar</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Notas fiscais, fotos do material, laudos</p>
                  <input type="file" multiple className="sr-only" />
                </label>
              </Field>

              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/40 rounded-md p-3">
                <ShieldCheck className="h-4 w-4 text-brand-navy shrink-0 mt-0.5" />
                <p>
                  Seus dados serão utilizados exclusivamente para o tratamento desta manifestação, conforme nossa Política de Privacidade e a LGPD.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-md bg-brand-red text-brand-red-foreground text-base font-bold hover:opacity-90 shadow-sm transition"
                >
                  Enviar reclamação
                </button>
              </div>
            </form>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              {[
                { icon: Clock, t: "Resposta em até 24h", d: "Para casos críticos" },
                { icon: Mail, t: "Atualizações por e-mail", d: "A cada etapa" },
                { icon: ShieldCheck, t: "Tratamento seguro", d: "Conforme LGPD" },
              ].map((it) => (
                <div key={it.t} className="rounded-md border border-border bg-card p-4">
                  <it.icon className="h-5 w-5 text-brand-navy mx-auto mb-1.5" />
                  <p className="text-sm font-semibold text-foreground">{it.t}</p>
                  <p className="text-xs text-muted-foreground">{it.d}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border mt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Technocoat Group · Todos os direitos reservados ·{" "}
          <a href="#" className="text-brand-navy font-semibold hover:underline">Política de Privacidade</a>
        </div>
      </footer>
    </div>
  );
}

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

function SuccessView({ protocol, onNew }: { protocol: string; onNew: () => void }) {
  return (
    <div className="card-elevated p-8 sm:p-12 text-center">
      <div className="h-16 w-16 rounded-full bg-success/10 mx-auto flex items-center justify-center mb-5">
        <CheckCircle2 className="h-9 w-9 text-success" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
        Reclamação registrada com sucesso!
      </h1>
      <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
        Recebemos sua manifestação e nossa equipe iniciará o tratamento em breve. Guarde seu número de protocolo para consultas futuras.
      </p>

      <div className="mt-7 inline-block rounded-lg border-2 border-dashed border-brand-navy/30 bg-brand-navy/5 px-6 sm:px-10 py-5">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Protocolo</p>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight mt-1 tabular-nums">{protocol}</p>
      </div>

      <div className="mt-7 max-w-md mx-auto flex items-start gap-3 text-left bg-secondary/40 rounded-md p-4">
        <Mail className="h-5 w-5 text-brand-navy shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-foreground">Acompanhe por e-mail</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Você receberá atualizações automáticas a cada etapa do atendimento no e-mail informado.
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2">
        <button
          onClick={onNew}
          className="h-10 px-5 rounded-md border border-border bg-card text-sm font-semibold hover:bg-secondary"
        >
          Abrir nova reclamação
        </button>
        <a
          href="#"
          className="h-10 px-5 rounded-md bg-brand-navy text-brand-navy-foreground text-sm font-semibold hover:opacity-90 inline-flex items-center"
        >
          Voltar ao site Technocoat
        </a>
      </div>
    </div>
  );
}
