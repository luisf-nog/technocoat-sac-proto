import { createContext, useContext, useState, type ReactNode } from "react";
import { FILIAIS, type Filial } from "./mock-data";

interface AppFiltersValue {
  filial: Filial;
  setFilial: (f: Filial) => void;
  search: string;
  setSearch: (s: string) => void;
}

const AppFiltersContext = createContext<AppFiltersValue | null>(null);

export function AppFiltersProvider({ children }: { children: ReactNode }) {
  const [filial, setFilial] = useState<Filial>(FILIAIS[0]);
  const [search, setSearch] = useState("");
  return (
    <AppFiltersContext.Provider value={{ filial, setFilial, search, setSearch }}>
      {children}
    </AppFiltersContext.Provider>
  );
}

export function useAppFilters(): AppFiltersValue {
  const ctx = useContext(AppFiltersContext);
  if (!ctx) throw new Error("useAppFilters precisa estar dentro de <AppFiltersProvider>");
  return ctx;
}
