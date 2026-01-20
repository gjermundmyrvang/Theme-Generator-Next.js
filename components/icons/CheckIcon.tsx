export const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={["w-6 h-6", className].filter(Boolean).join(" ")}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
