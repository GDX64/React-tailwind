export function readImage() {
  const node = document.createElement("input");
  node.type = "file";
  node.style.display = "none";
  return new Promise<string>((resolve) => {
    node.onchange = (event: any) => resolve(readFile(event.target.files![0]));
    document.body.appendChild(node);
    node.click();
  }).then((data) => {
    node.remove();
    return data;
  });
}

function readFile(file: File) {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        resolve(event.target.result);
      } else {
        reject(Error("Error While parsing the file"));
      }
    };
    reader.readAsDataURL(file);
  });
}
