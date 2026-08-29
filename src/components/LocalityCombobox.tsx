import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiCheck, FiMapPin } from "react-icons/fi";
import { LOCALITIES, localityHaystack, type Locality } from "@/data/villages";

/**
 * Type-ahead locality picker for the lucky draw form.
 *
 * A native <select> with 80 options is unusable on the phones this campaign
 * actually reaches, so this is an input that filters as you type: "kun" surfaces
 * Kunjah, Kunjari and Khunnan Garbi. Anything not on the list is kept verbatim,
 * because the flyer will inevitably reach a village the sales sheet missed.
 */

type Props = {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  id?: string;
};

const MAX_VISIBLE = 60;

export default function LocalityCombobox({ value, onChange, invalid, id }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  // Keep the visible text in sync when the parent resets the form.
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCALITIES.slice(0, MAX_VISIBLE);
    // Prefix matches first — they are almost always what the person meant.
    const starts: Locality[] = [];
    const contains: Locality[] = [];
    for (const l of LOCALITIES) {
      const hay = localityHaystack(l);
      if (!hay.includes(q)) continue;
      if (l.en.toLowerCase().startsWith(q) || l.ur.startsWith(query.trim())) starts.push(l);
      else contains.push(l);
    }
    return [...starts, ...contains].slice(0, MAX_VISIBLE);
  }, [query]);

  useEffect(() => setActive(0), [query]);

  // Close on outside click / tap.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted row in view while arrowing through 80 villages.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const commit = (l: Locality) => {
    onChange(l.en);
    setQuery(l.en);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      setActive((i) => {
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        return Math.max(0, Math.min(matches.length - 1, next));
      });
    } else if (e.key === "Enter") {
      if (open && matches[active]) {
        e.preventDefault();
        commit(matches[active]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const exactMatch = LOCALITIES.some((l) => l.en.toLowerCase() === query.trim().toLowerCase());

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <FiMapPin
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400/60"
        />
        <input
          id={inputId}
          type="text"
          dir="auto"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${inputId}-list`}
          aria-autocomplete="list"
          value={query}
          placeholder="اپنا گاؤں / علاقہ لکھیں — Type your village"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={`w-full rounded-xl border bg-navy-950/60 py-3.5 pr-11 pl-4 text-right text-ivory placeholder:text-ivory/35 outline-none transition focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 ${
            invalid ? "border-red-400/70" : "border-gold-400/25"
          }`}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Show list"
          onClick={() => setOpen((o) => !o)}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-gold-400/70"
        >
          <FiChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {open && (
        <ul
          ref={listRef}
          id={`${inputId}-list`}
          role="listbox"
          className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto overscroll-contain rounded-xl border border-gold-400/25 bg-navy-900 shadow-soft"
        >
          {matches.map((l, i) => (
            <li key={l.en} data-idx={i}>
              <button
                type="button"
                role="option"
                aria-selected={i === active}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => commit(l)}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-right transition ${
                  i === active ? "bg-gold-400/12" : ""
                }`}
              >
                <span className="text-[11px] uppercase tracking-wider text-ivory/40">{l.en}</span>
                <span className="text-[15px] text-ivory">{l.ur}</span>
              </button>
            </li>
          ))}

          {query.trim() && !exactMatch && (
            <li className="border-t border-gold-400/15">
              <button
                type="button"
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(query.trim());
                  setOpen(false);
                }}
                className="flex w-full items-center justify-end gap-2 px-4 py-3 text-right text-[15px] text-gold-300"
              >
                <span>“{query.trim()}” استعمال کریں</span>
                <FiCheck className="h-4 w-4" />
              </button>
            </li>
          )}

          {!matches.length && !query.trim() && (
            <li className="px-4 py-3 text-right text-sm text-ivory/50">کوئی علاقہ نہیں ملا</li>
          )}
        </ul>
      )}
    </div>
  );
}
