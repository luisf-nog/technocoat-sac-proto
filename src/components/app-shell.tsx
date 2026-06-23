import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, FilePlus2, ListChecks, Inbox, Bell, Search, ChevronDown, Menu, X, Check, ExternalLink, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/technocoat-logo.png.asset.json";
import { useEffect, useRef, useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/reclamacoes", label: "Reclamações", icon: Inbox },
  { to: "/nova", label: "Nova reclamação", icon: FilePlus2 },
  { to: "/reclamacao/SAC-2041", label: "Detalhe (exemplo)", icon: ListChecks },
];

const filiais = ["Matriz · SP", "Filial · RJ", "Filial · MG", "Filial · PR", "Filial · BA"];

export function AppShell({ title, subtitle, actions, children }: { title: string; subtitle?: string; actions?: ReactNode; children: ReactNode }) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filial, setFilial] = useState(filiais[0]);
  const [filialOpen, setFilialOpen] = useState(false);
  const filialRef = useRef<HTMLDivElement>(null);

  // close mobile drawer on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  // close filial dropdown on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (filialRef.current && !filialRef.current.contains(e.target as Node)) setFilialOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const Sidebar = (
    <>
      <div className="px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-between gap-2">
          <div className="bg-white rounded-md px-3 py-2 flex items-center justify-center flex-1">
            <img src={logo.url} alt="Technocoat Group" className="h-8 w-auto" />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="md:hidden h-9 w-9 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent flex items-center justify-center shrink-0"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-[0.18em] text-sidebar-foreground/60 uppercase">Technocoat</span>
          <span className="text-[11px] font-bold text-sidebar-primary tracking-wider">SAC</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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

        <p className="px-3 pt-5 pb-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-sidebar-foreground/40">Externo</p>
        <Link
          to="/portal"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Globe className="h-4 w-4 shrink-0" />
          <span className="truncate flex-1">Portal do Cliente</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </Link>
      </nav>

      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-semibold text-sm shrink-0">
            FR
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">Fernanda Rocha</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Gestora SAC</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shrink-0">
        {Sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
            {Sidebar}
          </aside>
        </div>
      )}

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center gap-2 sm:gap-3 px-3 sm:px-6 sticky top-0 z-20">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden h-9 w-9 rounded-md border border-border bg-card hover:bg-secondary flex items-center justify-center shrink-0"
            aria-label="Abrir menu"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar reclamação, cliente…"
                className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button className="relative h-9 w-9 rounded-md border border-border bg-card hover:bg-secondary flex items-center justify-center">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-red" />
            </button>

            <div ref={filialRef} className="relative">
              <button
                type="button"
                onClick={() => setFilialOpen((v) => !v)}
                className="h-9 px-3 rounded-md border border-border bg-card hover:bg-secondary flex items-center gap-2 text-sm font-medium"
                aria-haspopup="listbox"
                aria-expanded={filialOpen}
              >
                <span className="hidden sm:inline">{filial}</span>
                <span className="sm:hidden">{filial.split("·")[1]?.trim() ?? filial}</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", filialOpen && "rotate-180")} />
              </button>
              {filialOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 mt-1 w-48 rounded-md border border-border bg-popover shadow-lg z-30 py-1"
                >
                  {filiais.map((f) => (
                    <li key={f}>
                      <button
                        type="button"
                        onClick={() => {
                          setFilial(f);
                          setFilialOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm hover:bg-secondary text-left",
                          filial === f && "font-semibold text-brand-navy"
                        )}
                      >
                        {f}
                        {filial === f && <Check className="h-3.5 w-3.5" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 md:px-8 pt-6 pb-3 grid grid-cols-[minmax(0,1fr)_auto] sm:flex sm:flex-wrap sm:items-end sm:justify-between gap-3 sm:gap-4 items-start">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight truncate">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2 justify-end">{actions}</div>}
        </div>

        <div className="px-4 sm:px-6 md:px-8 pb-10 flex-1">{children}</div>
      </main>
    </div>
  );
}
