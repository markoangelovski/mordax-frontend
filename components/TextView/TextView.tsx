const TextView = ({ data }: any) => {
  let html = "";

  function tree(data: any) {
    // Function from https://stackoverflow.com/questions/6692538/generate-unordered-list-from-json-data
    if (typeof data == "object") {
      html += "<ul class='list-disc' style='margin:auto; padding:revert;' >";
      for (var i in data) {
        html += `<li class='hljs-attr'>${i}: `;
        tree(data[i]);
        html += "</li>";
      }
      html += "</ul>";
    } else {
      html += `<span class='${
        typeof data === "string"
          ? "hljs-string"
          : typeof data === "number"
          ? "hljs-number"
          : "hljs-keyword"
      }'>${data}</span>`;
    }
  }
  tree(data || {}); // Empty object to be used as a placeholder/check while the data is fetched

  return (
    <div className="-ml-4 py-4" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default TextView;
