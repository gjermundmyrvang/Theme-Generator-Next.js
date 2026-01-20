export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative group">
      <pre className="bg-slate-950 text-slate-200 p-4 rounded-lg overflow-x-auto border border-border font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
