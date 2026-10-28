import Image from "next/image";
import { PlateCaption } from "@/components/ui/primitives";

/**
 * Full-bleed photographic break between content blocks. No frame, no card — the image
 * runs edge to edge and the caption sits beneath it like a plate in a report.
 */
export function Interlude({
  src = "/page-header.png",
  plate,
  caption,
  annotation,
  objectPosition = "center",
}: {
  src?: string;
  plate: string;
  caption: string;
  annotation?: string;
  objectPosition?: string;
}) {
  return (
    <div className="relative isolate bg-ink-950">
      <figure>
        <div className="grain relative h-[clamp(16rem,40vw,30rem)] w-full overflow-hidden" data-reveal="curtain">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            quality={75}
            className="graded object-cover"
            style={{ objectPosition }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,16,15,0.78)_0%,rgba(16,16,15,0.18)_42%,rgba(16,16,15,0)_70%)]" />
          {annotation && (
            <p className="tech absolute bottom-5 left-[var(--gutter)] right-[var(--gutter)] z-[2] max-w-[52ch] text-stone-300 sm:bottom-7">
              <span aria-hidden="true" className="mr-3 inline-block h-px w-8 align-middle bg-gold" />
              {annotation}
            </p>
          )}
        </div>
        <div className="shell">
          <PlateCaption plate={plate} tone="dark" className="border-t border-hair-dark py-s3">
            {caption}
          </PlateCaption>
        </div>
      </figure>
    </div>
  );
}
