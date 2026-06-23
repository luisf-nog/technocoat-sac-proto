import type { Status, Severity } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusMap: Record<Status, { label: string; cls: string; dot: string }> = {
  aberta: { label: "Aberta", cls: "bg-secondary text-secondary-foreground border-border", dot: "bg-muted-foreground" },
  em_andamento: { label: "Em andamento", cls: "bg-warning/15 text-warning border-warning/30", dot: "bg-warning" },
  resolvida: { label: "Resolvida", cls: "bg-success/15 text-success border-success/30", dot: "bg-success" },
  atrasada: { label: "Atrasada", cls: "bg-destructive/10 text-destructive border-destructive/30", dot: "bg-destructive" },
};

const sevMap: Record<Severity, { label: string; cls: string }> = {
  baixa: { label: "Baixa", cls: "bg-secondary text-muted-foreground border-border" },
  media: { label: "Média", cls: "bg-warning/15 text-warning border-warning/30" },
  alta: { label: "Alta", cls: "bg-accent text-accent-foreground border-destructive/30" },
  critica: { label: "Crítica", cls: "bg-destructive text-destructive-foreground border-destructive" },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = statusMap[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", s.cls)}>
      <span className={cn("status-dot", s.dot)} />
      {s.label}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const s = sevMap[severity];
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide", s.cls)}>
      {s.label}
    </span>
  );
}
