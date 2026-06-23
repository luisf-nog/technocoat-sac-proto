import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FilePlus2, ListChecks, Inbox, Bell, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/technocoat-logo.png.asset.json";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reclamacoes", label: "Reclamações", icon: Inbox },
  { to: "/nova", label: "Nova reclamação", icon: FilePlus2 },
  { to: "/reclamacao/SAC-2041", label: "Detalhe (exemplo)", icon: ListChecks },
];

export function AppShell({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <div className="bg-white rounded-md px-3 py-2 flex items-center justify-center">
            <img src={logo.url} alt="Technocoat Group" className="h-8 w-auto" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-sidebar-foreground/60 uppercase">Technocoat</span>
            <span className="text-[11px] font-bold text-sidebar-primary tracking-wider">SAC</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-sidebar-foreground/40">Atendimento</p>
          {nav.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{n.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-semibold text-sm">
              FR
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">Fernanda Rocha</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Gestora SAC</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar reclamação, cliente ou ID…"
                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative h-9 w-9 rounded-md border border-border bg-card hover:bg-secondary flex items-center justify-center">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-red" />
            </button>
            <button className="h-9 px-3 rounded-md border border-border bg-card hover:bg-secondary flex items-center gap-2 text-sm font-medium">
              Matriz · SP <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        <div className="px-6 md:px-8 pt-6 pb-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        <div className="px-6 md:px-8 pb-10 flex-1">{children}</div>
      </main>
    </div>
  );
}
