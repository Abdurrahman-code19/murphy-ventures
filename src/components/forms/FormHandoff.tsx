import { Check, Copy, PencilLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "../../config/site";
import { buttonStyles } from "../shared/Button";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

/**
 * Shown after a form is valid. It makes the handoff explicit: the enquiry is
 * prepared locally, but WhatsApp must still be opened and the message sent by
 * the visitor. No false "message sent" confirmation is displayed.
 */
export function FormHandoff({
  title,
  message,
  whatsappHref,
  onEdit,
  editLabel = "Edit details",
}: {
  title: string;
  message: string;
  whatsappHref: string;
  onEdit: () => void;
  editLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = message;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  }

  return (
    <div aria-live="polite">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-[22px] font-semibold tracking-[-0.02em] text-navy"
      >
        {title}
      </h2>
      <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
        Your message has been prepared below.{" "}
        <strong className="font-semibold text-ink">Nothing has been sent yet.</strong> Open
        WhatsApp and press send to deliver it to Murphy Ventures.
      </p>

      <div className="mt-5 rounded-[12px] border border-gold/30 bg-ivory p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
            Prepared message
          </p>
          <span className="text-[10px] text-muted">You can edit before sending</span>
        </div>
        <textarea
          readOnly
          value={message}
          rows={9}
          aria-label="Prepared WhatsApp message"
          className="w-full resize-y rounded-[8px] border border-line bg-white p-3 font-sans text-[12.5px] leading-relaxed text-ink focus:border-royal focus:ring-2 focus:ring-royal/10"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles("gold", "md", "w-full sm:w-auto")}
        >
          <WhatsAppIcon className="h-4 w-4" />
          Open WhatsApp to send
        </a>
        <button
          type="button"
          onClick={copyMessage}
          className={buttonStyles("outline", "md", "w-full sm:w-auto")}
        >
          {copied ? (
            <>
              <Check aria-hidden="true" className="h-4 w-4 text-[#256B45]" />
              Copied
            </>
          ) : (
            <>
              <Copy aria-hidden="true" className="h-4 w-4" />
              Copy message
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className={buttonStyles("ghost", "md", "w-full sm:w-auto")}
        >
          <PencilLine aria-hidden="true" className="h-4 w-4" />
          {editLabel}
        </button>
      </div>

      <p className="mt-4 text-[11.5px] leading-snug text-muted">
        WhatsApp opens in a new tab. If it does not open, copy the message and send it to{" "}
        <span className="font-medium text-ink">{site.whatsapp.display}</span>.
      </p>
    </div>
  );
}
