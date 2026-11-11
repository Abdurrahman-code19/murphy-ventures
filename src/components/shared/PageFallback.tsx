export function PageFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-24">
      <span
        aria-hidden="true"
        className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-navy"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        Loading page
      </span>
    </div>
  );
}
