// src/components/icons/MosqueIcon.tsx
export function MosqueIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22V19" />
      <path d="M8 19H16" />
      <path d="M12 19V15" />
      <path d="M8 15H16" />
      <path d="M12 15V12" />
      <path d="M8 12H16" />
      <path d="M12 12V8" />
      <path d="M8 8H16" />
      <path d="M12 8V5" />
      <path d="M8 5H16" />
      <circle cx="12" cy="3" r="1" />
      <path d="M4 22V18C4 15 6 13 9 13H15C18 13 20 15 20 18V22" />
    </svg>
  );
}