import sanitizeHtml from "sanitize-html"

const KONFIGURASI_SANITASI_BERITA: sanitizeHtml.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "sub",
    "sup",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
    "hr",
    "code",
    "pre",
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "tr",
    "th",
    "td",
    "span",
    "mark",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "class"],
    table: ["class", "border", "cellpadding", "cellspacing"],
    th: ["colspan", "rowspan", "class"],
    td: ["colspan", "rowspan", "class"],
    figure: ["class"],
    span: ["style", "class"],
    code: ["class"],
    pre: ["class"],
    "*": ["style", "class"],
  },
  allowedStyles: {
    "*": {
      "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      color: [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(.+\)$/, /^hsl\(.+\)$/],
      "background-color": [/^#[0-9a-fA-F]{3,8}$/, /^rgb\(.+\)$/, /^hsl\(.+\)$/],
      "font-size": [/^\d+(\.\d+)?(px|em|rem|%)$/],
      "font-family": [/^[\w\s,'"-]+$/],
      width: [/^\d+(\.\d+)?(px|%)$/],
      height: [/^\d+(\.\d+)?(px|%)$/],
    },
  },
  allowedSchemes: ["http", "https"],
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      target: "_blank",
      rel: "noopener noreferrer",
    }),
  },
}

export function sanitasiHtmlBerita(input: string): string {
  return sanitizeHtml(input || "", KONFIGURASI_SANITASI_BERITA).trim()
}

export function ekstrakTeksDariHtml(input: string): string {
  return sanitizeHtml(input || "", {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim()
}

