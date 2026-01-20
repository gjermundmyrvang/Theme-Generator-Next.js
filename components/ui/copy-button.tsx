"use client";

import { useState } from "react";
import { CopyIcon } from "../icons/CopyIcon";
import { CheckIcon } from "../icons/CheckIcon";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        group relative flex items-center gap-2 px-5 py-2.5 rounded-full 
        font-mono text-sm font-bold transition-all duration-200 cursor-pointer
        ${
          copied
            ? "bg-green-600 text-white shadow-green-900/20"
            : "bg-foreground text-background hover:opacity-90 shadow-primary/10"
        }
        active:scale-95 shadow-lg
      `}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 stroke-[3px]" />
      ) : (
        <CopyIcon className="h-4 w-4 stroke-[3px]" />
      )}
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}
