import "server-only";
import sanitizeHtml from "sanitize-html";

/** Sanitizes CMS article HTML: keeps editorial markup, drops scripts, styles and inline handlers. */
export function sanitizeArticle(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "h2", "h3", "h4", "ul", "ol", "li", "a", "figure", "table", "thead", "tbody", "tr", "td", "th", "blockquote"],
    allowedAttributes: { a: ["href", "target", "rel"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const out: Record<string, string> = /^https?:/.test(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
        return { tagName, attribs: out };
      },
    },
    // Drop the empty spacer paragraphs (<p><br>&nbsp;</p>) the CMS editor leaves behind.
    exclusiveFilter: (frame) => frame.tag === "p" && !frame.text.replace(/ /g, "").trim(),
  });
}
