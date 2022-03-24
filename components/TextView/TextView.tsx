import React, { FunctionComponent } from "react";

const TextView = (data: any) => {
  const el = React.createElement;

  const append = (parent: any, child: React.ReactNode) => {
    return el(parent, null, child);
  };

  //   const parent = el("div", null, null);
  const parent = () => <div></div>;

  function tree(parent: any, data: any) {
    if (typeof data == "object") {
      // document.write("<ul>");
      append(parent, el("ul", null, null));
      for (var i in data) {
        //   document.write("<li>" + i);
        append(parent, el("li", null, i));
        tree(parent, data[i]);
      }
      // document.write("</ul>");
    } else {
      // document.write(" => " + data);
      append(parent, el("", null, data));
    }
    console.log("parent", parent);
    return parent;
  }

  return tree(parent, data);
};
// const TextView = (data: any) => {
//   let welcome = el("ul", { style: { color: "red" } }, [
//     el("li", { style: { color: "red" } }, `Welcome to react world`),
//     el("li", { style: { color: "red" } }, `Welcome to react world`)
//   ]);

//   return welcome;
// };

export default TextView;
