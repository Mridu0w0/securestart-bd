"use client";
import { useState } from "react";
import {
  Check,
  Code,
  Copy,
  Database,
  Funnel,
  LockKey,
  ShieldWarning,
} from "@phosphor-icons/react";
import { templates } from "@/lib/templates";

const icons = { auth: LockKey, encryption: Database, validation: Funnel };

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";

export default function TemplatesPage() {
  const list = templates ?? [];
  const [activeId, setActiveId] = useState(list[0]?.id);
  const [status, setStatus] = useState("idle"); // idle | copied | error

  const active = list.find((t) => t.id === activeId) ?? list[0];

  async function copy() {
    if (!active?.code) return;
    try {
      await navigator.clipboard.writeText(active.code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 2000);
  }

  function select(id) {
    setActiveId(id);
    setStatus("idle");
  }

  if (!active) {
    return (
      <div className="card flex flex-col items-start gap-3 p-8">
        <Code
          size={32}
          weight="duotone"
          className="text-emerald-700"
          aria-hidden="true"
        />
        <h1 className="heading-5">No templates yet</h1>
        <p className="body-3 max-w-[680px] text-neutral-600">
          Add a template to lib/templates.js and it will appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="mb-12 flex flex-col gap-4">
        <h1 className="heading-3">Secure templates</h1>
        <p className="body-3 max-w-[680px] text-neutral-600">
          Pick a template, read what it protects against, then copy the code
          into your project.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        {/* Template list */}
        <ul className="card flex flex-col gap-2 self-start p-2">
          {list.map((t) => {
            const Icon = icons[t.id] ?? Code;
            const selected = t.id === active.id;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => select(t.id)}
                  aria-pressed={selected}
                  className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-[background-color,border-color,transform] duration-300 ease-base active:scale-[0.98] ${focus} ${
                    selected
                      ? "border-emerald-700 bg-emerald-50"
                      : "border-transparent hover:bg-neutral-50"
                  }`}
                >
                  <Icon
                    size={20}
                    weight={selected ? "fill" : "regular"}
                    className="mt-0.5 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="title-3">{t.title}</span>
                    <span className="caption-4 truncate font-mono text-neutral-500">
                      {t.filename}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Active template */}
        <section className="flex min-w-0 flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="heading-5">{active.title}</h2>
            <p className="body-3 max-w-[680px] text-neutral-600">
              {active.description}
            </p>
          </div>

          {active.attack && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-900">
              <ShieldWarning
                size={20}
                weight="bold"
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-0.5">
                <p className="title-4">Attack it prevents</p>
                <p className="caption-2">{active.attack}</p>
              </div>
            </div>
          )}

          {/* Code card: outer 16px radius, 8px padding, so inner shapes use 8px */}
          <div className="card min-w-0 p-2">
            <div className="flex items-center justify-between gap-4 pb-2">
              <span className="caption-4 truncate px-2 font-mono text-neutral-600">
                {active.filename}
              </span>
              <button
                type="button"
                onClick={copy}
                className={`button-sm inline-flex items-center gap-2 rounded-lg border px-3 py-2 transition-[background-color,border-color,color,transform] duration-300 ease-base active:scale-[0.98] ${focus} ${
                  status === "copied"
                    ? "border-emerald-700 bg-emerald-50 text-emerald-900"
                    : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {status === "copied" ? (
                  <Check size={16} weight="bold" aria-hidden="true" />
                ) : (
                  <Copy size={16} weight="bold" aria-hidden="true" />
                )}
                {status === "copied" ? "Copied" : "Copy code"}
              </button>
            </div>

            <div className="rounded-lg bg-[#181818] p-4">
              <pre className="caption-2 overflow-x-auto font-mono text-neutral-100">
                <code>{active.code}</code>
              </pre>
            </div>

            <span role="status" className="sr-only">
              {status === "copied" ? "Code copied to clipboard" : ""}
            </span>
          </div>

          {status === "error" && (
            <p role="alert" className="caption-2 text-red-700">
              Copy failed. Select the code and copy it by hand.
            </p>
          )}
        </section>
      </div>
    </>
  );
}
