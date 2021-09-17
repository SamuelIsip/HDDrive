document.addEventListener("DOMContentLoaded", () => {
  import Dropzone from "../node_modules/dropzone";

  // Make sure Dropzone doesn't try to attach itself to the
  // element automatically.
  // This behaviour will change in future versions.
  Dropzone.autoDiscover = false;

  let myDropzone = new Dropzone("#my-form");
  myDropzone.on("addedfile", (file) => {
    console.log(`File added: ${file.name}`);
  });
});
