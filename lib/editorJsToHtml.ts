export function editorJsToHtml(content: any): string {
  if (!content?.blocks) return "";

  const parseText = (data: any): string => {
    if (typeof data === "string") return data;

    if (Array.isArray(data)) {
      return data.map(parseText).join("");
    }

    if (typeof data === "object" && data !== null) {
      return Object.values(data).map(parseText).join("");
    }

    return "";
  };

  return content.blocks
    .map((block: any) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${parseText(block.data.text)}</p>`;

        case "header":
          return `<h${block.data.level}>${parseText(block.data.text)}</h${block.data.level}>`;

        case "list":
          const tag = block.data.style === "ordered" ? "ol" : "ul";
          const items = block.data.items
            .map((item: any) => `<li>${parseText(item)}</li>`)
            .join("");
          return `<${tag}>${items}</${tag}>`;

        case "table":
          const rows = block.data.content;

          let tableHTML = `<div class="table-wrapper"><table>`;

          rows.forEach((row: any, index: number) => {
            tableHTML += "<tr>";

            row.forEach((cell: any) => {
              if (block.data.withHeadings && index === 0) {
                tableHTML += `<th>${parseText(cell)}</th>`;
              } else {
                tableHTML += `<td>${parseText(cell)}</td>`;
              }
            });

            tableHTML += "</tr>";
          });

          tableHTML += "</table></div>";

          return tableHTML;

        default:
          return "";
      }
    })
    .join("");
}