function readFile(file, onloadCallback) {
  if (!file) {
    console.log("Invalid file.");
    return;
  }

  var reader = new FileReader();
  reader.onload = onloadCallback;
  reader.readAsText(file);
}
