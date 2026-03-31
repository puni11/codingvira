"use client";

import { useEffect, useRef } from "react";

type EditorJSInstance = {
  isReady: Promise<void>;
  save: () => Promise<any>;
  destroy: () => void;
};

interface EditorProps {
  onChange: (data: any) => void;
  data?: any;
}

export default function Editor({ onChange, data }: EditorProps) {
  const editorRef = useRef<EditorJSInstance | null>(null);
  const holderRef = useRef<HTMLDivElement | null>(null);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  useEffect(() => {
    let isMounted = true;
    let timeout: NodeJS.Timeout;

    const initializeEditor = async () => {
      if (!holderRef.current) return;

      const [
        EditorJS,
        Header,
        List,
        Paragraph,
        ImageTool,
        Quote,
        Code,
        Table,
        Embed,
        Marker,
        InlineCode,
        Delimiter,
      ] = await Promise.all([
        import("@editorjs/editorjs").then((m) => m.default),
        import("@editorjs/header").then((m) => m.default),
        import("@editorjs/list").then((m) => m.default),
        import("@editorjs/paragraph").then((m) => m.default),
        import("@editorjs/image").then((m) => m.default),
        import("@editorjs/quote").then((m) => m.default),
        import("@editorjs/code").then((m) => m.default),
        import("@editorjs/table").then((m) => m.default),
        import("@editorjs/embed").then((m) => m.default),
        import("@editorjs/marker").then((m) => m.default),
        import("@editorjs/inline-code").then((m) => m.default),
        import("@editorjs/delimiter").then((m) => m.default),
      ]);

      if (!isMounted) return;

      const editor = new EditorJS({
        holder: holderRef.current,
        autofocus: false,
        placeholder: "Write your blog content here...",
        data: data || {},

        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              levels: [2, 3, 4],
              defaultLevel: 2,
            },
          },

          list: {
            class: List,
            inlineToolbar: true,
          },

          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },

          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter quote",
              captionPlaceholder: "Quote author",
            },
          },

          code: Code,

          inlineCode: InlineCode,
          marker: Marker,

          table: {
            class: Table,
            inlineToolbar: true,
          },

          delimiter: Delimiter,

          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                codepen: true,
              },
            },
          },

          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const result = await res.json();

                  return {
                    success: 1,
                    file: {
                      url: result.url,
                    },
                  };
                },
              },
            },
          },
        },

        onChange: async () => {
          clearTimeout(timeout);

          timeout = setTimeout(async () => {
            if (!editorRef.current) return;

            const content = await editor.save();
            onChangeRef.current(content);
          }, 500); // debounce
        },
      });

      await editor.isReady;

      if (!isMounted) {
        editor.destroy();
        return;
      }

      editorRef.current = editor;
    };

    if (!editorRef.current) {
      initializeEditor();
    }

    return () => {
      isMounted = false;

      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={holderRef}
      className="prose max-w-none min-h-[350px] rounded-lg p-4 bg-white"
    />
  );
}