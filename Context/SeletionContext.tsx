import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Character } from "../Hooks/useAPI";

type SelectionContextValue = {
  selected: Character[];
  toggle: (character: Character) => void;
  isSelected: (id: number) => boolean;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Character[]>([]);
  const value = useMemo(
    () => ({
      selected,
      toggle: (character: Character) =>
        setSelected((current) =>
          current.some((item) => item.id === character.id)
            ? current.filter((item) => item.id !== character.id)
            : [...current, character],
        ),
      isSelected: (id: number) => selected.some((character) => character.id === id),
    }),
    [selected],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useSelection doit être utilisé dans SelectionProvider.");
  return context;
}