import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import { useLayoutEffect } from "react";
hljs.registerLanguage("json", json);

const JsonView = ({ className, data }: any) => {
  const jsonString = JSON.stringify(data, null, 2);
  const rows = jsonString?.split("\n").length;

  useLayoutEffect(() => {
    hljs.highlightAll();
  }, [jsonString]);

  if (!jsonString) return null;

  return (
    <div className={`flex max-w-full ${className}`}>
      <div className="flex flex-col py-4 pr-4 text-right text-slate-400">
        {Array.from({ length: rows }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className="overflow-auto">
        <pre>
          <code>{jsonString}</code>
        </pre>
      </div>
    </div>
  );
};

export default JsonView;
