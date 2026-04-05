"use client"

import { useEffect, useRef, useState } from "react"

type RichTextEditorProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

type EditorModelDocument = {
  on: (event: string, callback: () => void) => void
}

type EditorModel = {
  document: EditorModelDocument
}

type EditorPlugins = {
  get: (name: string) => {
    createUploadAdapter?: (loader: any) => unknown
  }
}

type CkEditorInstance = {
  model: EditorModel
  plugins: EditorPlugins
  getData: () => string
  setData: (data: string) => void
  execute: (command: string, options?: Record<string, unknown>) => void
  destroy: () => Promise<void>
}

type CkEditorConstructor = {
  create: (element: HTMLElement, config: Record<string, unknown>) => Promise<CkEditorInstance>
}

type CkModule = {
  [key: string]: unknown
  ClassicEditor?: CkEditorConstructor
}

const NAMA_PLUGIN_CKEDITOR = [
  "Essentials",
  "Autoformat",
  "Paragraph",
  "Heading",
  "Bold",
  "Italic",
  "Underline",
  "Strikethrough",
  "Subscript",
  "Superscript",
  "Code",
  "CodeBlock",
  "Link",
  "BlockQuote",
  "List",
  "ListProperties",
  "TodoList",
  "Alignment",
  "Indent",
  "IndentBlock",
  "FontFamily",
  "FontSize",
  "FontColor",
  "FontBackgroundColor",
  "Highlight",
  "RemoveFormat",
  "HorizontalLine",
  "PasteFromOffice",
  "Image",
  "ImageToolbar",
  "ImageCaption",
  "ImageStyle",
  "ImageResize",
  "ImageUpload",
  "ImageInsertViaUrl",
  "Table",
  "TableToolbar",
  "TableProperties",
  "TableCellProperties",
  "TableColumnResize",
  "WordCount",
]

const TOOLBAR_ITEMS_CKEDITOR = [
  "undo",
  "redo",
  "|",
  "heading",
  "|",
  "fontSize",
  "fontFamily",
  "fontColor",
  "fontBackgroundColor",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "subscript",
  "superscript",
  "code",
  "removeFormat",
  "|",
  "link",
  "insertImage",
  "insertTable",
  "blockQuote",
  "codeBlock",
  "horizontalLine",
  "highlight",
  "|",
  "alignment",
  "|",
  "bulletedList",
  "numberedList",
  "todoList",
  "outdent",
  "indent",
]

function hitungJumlahKataDariHtml(html: string): string {
  const teks = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  const jumlah = teks ? teks.split(" ").length : 0
  return `${jumlah.toLocaleString("id-ID")} kata`
}

async function unggahGambar(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/admin/berita/gambar", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.message ?? "Gagal mengunggah gambar.")
  }

  const payload = await response.json()
  const url = payload?.data?.url
  if (!url) {
    throw new Error("URL gambar tidak ditemukan.")
  }

  return url
}

async function unggahGambarDariUrl(url: string): Promise<string> {
  const response = await fetch("/api/admin/berita/gambar-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.message ?? "Gagal memproses URL gambar.")
  }

  const payload = await response.json()
  const urlLokal = payload?.data?.url
  if (!urlLokal) {
    throw new Error("URL gambar lokal tidak ditemukan.")
  }

  return urlLokal
}

function urlTerlihatSepertiGambar(url: string): boolean {
  return /\.(avif|gif|jpe?g|png|webp)(\?.*)?(#.*)?$/i.test(url)
}

function htmlPunyaBlobImage(html: string): boolean {
  if (!html.trim()) {
    return false
  }

  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return Array.from(doc.querySelectorAll("img")).some((img) => {
      const src = img.getAttribute("src")?.trim() || ""
      return /^blob:/i.test(src)
    })
  } catch {
    return false
  }
}

function htmlPunyaLocalImage(html: string): boolean {
  if (!html.trim()) {
    return false
  }

  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return Array.from(doc.querySelectorAll("img")).some((img) => {
      const src = img.getAttribute("src")?.trim() || ""
      return /^blob:/i.test(src) || /^file:/i.test(src)
    })
  } catch {
    return false
  }
}

function teksPunyaLocalUrl(text: string): boolean {
  const nilai = text.trim()
  if (!nilai) {
    return false
  }
  return /^blob:/i.test(nilai) || /^file:/i.test(nilai)
}

function sanitasiGambarLokalPadaHtmlEditor(html: string): {
  htmlBersih: string
  adaPerubahan: boolean
} {
  if (!html.trim()) {
    return { htmlBersih: html, adaPerubahan: false }
  }

  try {
    const doc = new DOMParser().parseFromString(html, "text/html")
    let berubah = false

    Array.from(doc.querySelectorAll("img")).forEach((img) => {
      const src = img.getAttribute("src")?.trim() || ""
      const srcset = img.getAttribute("srcset")?.trim() || ""
      const sumberTidakDiizinkan = /^blob:/i.test(src) || /^file:/i.test(src)
      const srcsetTidakDiizinkan = /(?:^|,)\s*(blob:|file:)/i.test(srcset)

      if (sumberTidakDiizinkan || srcsetTidakDiizinkan) {
        img.remove()
        berubah = true
      }
    })

    return {
      htmlBersih: doc.body.innerHTML,
      adaPerubahan: berubah,
    }
  } catch {
    return { htmlBersih: html, adaPerubahan: false }
  }
}

type HasilEkstraksiGambarClipboard = {
  url: string
  dariHtmlGambar: boolean
}

function ekstrakUrlGambarClipboard(
  html: string,
  text: string,
): HasilEkstraksiGambarClipboard | null {

  if (html.trim()) {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html")
      const gambar = doc.querySelector("img")
      const kandidat = [
        gambar?.getAttribute("src")?.trim() || "",
        gambar?.getAttribute("data-src")?.trim() || "",
        gambar?.getAttribute("data-original")?.trim() || "",
        gambar?.getAttribute("data-lazy-src")?.trim() || "",
        gambar?.getAttribute("srcset")?.split(",")[0]?.trim().split(" ")[0] || "",
      ]

      const srcValid = kandidat.find((item) => /^https?:\/\//i.test(item))
      if (srcValid) {
        return {
          url: srcValid,
          dariHtmlGambar: true,
        }
      }
    } catch {
      // ignore
    }
  }

  const teks = text.trim()
  if (teks && /^https?:\/\//i.test(teks) && urlTerlihatSepertiGambar(teks)) {
    return {
      url: teks,
      dariHtmlGambar: false,
    }
  }

  return null
}

function ambilDaftarPlugin(modul: CkModule): unknown[] {
  return NAMA_PLUGIN_CKEDITOR
    .map((namaPlugin) => modul[namaPlugin])
    .filter((plugin): plugin is unknown => Boolean(plugin))
}

function pluginUploadAdapter(editor: CkEditorInstance) {
  const fileRepository = editor.plugins.get("FileRepository")

  fileRepository.createUploadAdapter = (loader: any) => {
    const pemuat = loader as { file: Promise<File | null> }
    return {
      upload: async () => {
        const file = await pemuat.file
        if (!file) {
          throw new Error("File gambar tidak ditemukan.")
        }
        const url = await unggahGambar(file)
        return { default: url }
      },
      abort: () => {
        // no-op
      },
    }
  }
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis isi berita di sini...",
  className = "",
}: RichTextEditorProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [pesanError, setPesanError] = useState("")
  const [pesanPeringatan, setPesanPeringatan] = useState("")
  const [jumlahKata, setJumlahKata] = useState(hitungJumlahKataDariHtml(value || ""))

  const hostEditorRef = useRef<HTMLDivElement | null>(null)
  const instanceEditorRef = useRef<CkEditorInstance | null>(null)
  const sedangSinkronisasiRef = useRef(false)
  const timerPeringatanRef = useRef<number | null>(null)
  const onChangeRef = useRef(onChange)

  const tampilkanPeringatanSementara = (pesan: string) => {
    setPesanPeringatan(pesan)
    if (timerPeringatanRef.current) {
      window.clearTimeout(timerPeringatanRef.current)
    }
    timerPeringatanRef.current = window.setTimeout(() => {
      setPesanPeringatan("")
      timerPeringatanRef.current = null
    }, 6500)
  }

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    let dibatalkan = false
    let instanceLokal: CkEditorInstance | null = null
    let lepasPasteListener: (() => void) | null = null

    const inisialisasiEditor = async () => {
      try {
        setStatus("loading")
        setPesanError("")

        const modulCkEditor = (await import("ckeditor5")) as CkModule
        const ClassicEditor = modulCkEditor.ClassicEditor

        if (!ClassicEditor || !hostEditorRef.current) {
          throw new Error("Gagal memuat modul CKEditor.")
        }

        const daftarPlugin = ambilDaftarPlugin(modulCkEditor)

        instanceLokal = await ClassicEditor.create(hostEditorRef.current, {
          licenseKey: "GPL",
          removePlugins: ["Title"],
          plugins: daftarPlugin,
          extraPlugins: [pluginUploadAdapter],
          toolbar: {
            items: TOOLBAR_ITEMS_CKEDITOR,
            shouldNotGroupWhenFull: true,
          },
          placeholder,
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: "https://",
          },
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
          },
          image: {
            toolbar: [
              "toggleImageCaption",
              "imageTextAlternative",
              "|",
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "resizeImage",
            ],
            styles: ["inline", "block", "side"],
            resizeOptions: [
              {
                name: "resizeImage:original",
                label: "Original",
                value: null,
              },
              {
                name: "resizeImage:50",
                label: "50%",
                value: "50",
              },
              {
                name: "resizeImage:75",
                label: "75%",
                value: "75",
              },
            ],
            upload: {
              types: ["jpeg", "jpg", "png", "webp", "gif", "avif"],
            },
          },
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
            ],
          },
        })

        if (dibatalkan) {
          await instanceLokal.destroy()
          return
        }

        instanceEditorRef.current = instanceLokal

        if (value && value !== instanceLokal.getData()) {
          sedangSinkronisasiRef.current = true
          instanceLokal.setData(value)
          sedangSinkronisasiRef.current = false
        }

        instanceLokal.model.document.on("change:data", () => {
          if (sedangSinkronisasiRef.current) {
            return
          }

          const htmlTerbaru = instanceLokal?.getData() ?? ""
          const hasilSanitasi = sanitasiGambarLokalPadaHtmlEditor(htmlTerbaru)

          if (hasilSanitasi.adaPerubahan && instanceLokal) {
            sedangSinkronisasiRef.current = true
            instanceLokal.setData(hasilSanitasi.htmlBersih)
            sedangSinkronisasiRef.current = false
            tampilkanPeringatanSementara(
              "URL gambar file/blob tidak didukung browser. Gunakan upload file dari perangkat.",
            )
            setJumlahKata(hitungJumlahKataDariHtml(hasilSanitasi.htmlBersih))
            onChangeRef.current(hasilSanitasi.htmlBersih)
            return
          }

          setJumlahKata(hitungJumlahKataDariHtml(htmlTerbaru))
          onChangeRef.current(htmlTerbaru)
        })

        const editableElement = hostEditorRef.current.querySelector(".ck-editor__editable")
        const handlePasteGambarInternet = async (event: Event) => {
          const clipboardEvent = event as ClipboardEvent
          const clipboardData = clipboardEvent.clipboardData
          if (!clipboardData || !instanceLokal) {
            return
          }

          const adaFileGambar = Array.from(clipboardData.items ?? []).some(
            (item) => item.kind === "file" && item.type.startsWith("image/"),
          )

          if (adaFileGambar) {
            // Clipboard image file akan diproses oleh upload adapter default CKEditor.
            return
          }

          const htmlClipboard = clipboardData.getData("text/html")
          const textClipboard = clipboardData.getData("text/plain")

          if (htmlPunyaBlobImage(htmlClipboard) || htmlPunyaLocalImage(htmlClipboard) || teksPunyaLocalUrl(textClipboard)) {
            clipboardEvent.preventDefault()
            tampilkanPeringatanSementara(
              "Sumber gambar blob/file tidak didukung browser. Simpan dulu gambarnya, lalu upload dari file.",
            )
            return
          }

          const hasilEkstraksi = ekstrakUrlGambarClipboard(htmlClipboard, textClipboard)
          if (!hasilEkstraksi) {
            return
          }

          clipboardEvent.preventDefault()
          try {
            const urlLokal = await unggahGambarDariUrl(hasilEkstraksi.url)
            instanceLokal.execute("insertImage", { source: urlLokal })
          } catch (error) {
            console.error("Gagal proses paste URL gambar:", error)
            if (hasilEkstraksi.dariHtmlGambar) {
              // Fallback: jika sumbernya memang tag gambar, coba sisipkan URL langsung.
              instanceLokal.execute("insertImage", { source: hasilEkstraksi.url })
            }
            tampilkanPeringatanSementara(
              "URL gambar tidak bisa diproses otomatis. Coba upload file gambar langsung.",
            )
          }
        }

        editableElement?.addEventListener("paste", handlePasteGambarInternet)
        lepasPasteListener = () => {
          editableElement?.removeEventListener("paste", handlePasteGambarInternet)
        }

        setJumlahKata(hitungJumlahKataDariHtml(instanceLokal.getData()))
        setStatus("ready")
      } catch (error) {
        console.error("Gagal inisialisasi CKEditor:", error)
        setPesanError("Editor gagal dimuat. Coba refresh halaman.")
        setStatus("error")
      }
    }

    void inisialisasiEditor()

    return () => {
      dibatalkan = true
      if (timerPeringatanRef.current) {
        window.clearTimeout(timerPeringatanRef.current)
        timerPeringatanRef.current = null
      }
      lepasPasteListener?.()
      const instance = instanceEditorRef.current
      instanceEditorRef.current = null
      if (instance) {
        void instance.destroy()
      }
    }
  }, [placeholder])

  useEffect(() => {
    const instance = instanceEditorRef.current
    if (!instance || status !== "ready") {
      return
    }

    const htmlSaatIni = instance.getData()
    const htmlBaru = value || ""

    if (htmlBaru !== htmlSaatIni) {
      sedangSinkronisasiRef.current = true
      instance.setData(htmlBaru)
      sedangSinkronisasiRef.current = false
      setJumlahKata(hitungJumlahKataDariHtml(htmlBaru))
    }
  }, [status, value])

  return (
    <div className={`editor-berita space-y-1 ${className}`.trim()}>
      <div className="rounded-lg border border-[#d6dde6] bg-white">
        {status === "loading" && (
          <div className="rounded-lg border-b border-[#e5ebf3] bg-[#f8fbff] px-3 py-2 text-xs text-[#64748b]">
            Menyiapkan CKEditor...
          </div>
        )}

        {status === "error" && (
          <div className="rounded-lg border-b border-[#fde7e7] bg-[#fff4f4] px-3 py-2 text-xs text-[#b42318]">
            {pesanError}
          </div>
        )}

        {pesanPeringatan && (
          <div className="rounded-lg border-b border-[#f1ddad] bg-[#fffbef] px-3 py-2 text-xs text-[#7a5c1d]">
            {pesanPeringatan}
          </div>
        )}

        <div ref={hostEditorRef} className="ck-editor-host" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7b8899]">
        <span>
          Tips: bisa <strong>paste gambar langsung</strong> atau paste URL gambar dari internet, lalu sistem simpan otomatis ke folder lokal.
        </span>
        <span className="rounded-full border border-[#d6dde6] bg-[#f7f9fc] px-2 py-0.5 font-medium text-[#5f6f84]">
          {jumlahKata}
        </span>
      </div>
    </div>
  )
}
