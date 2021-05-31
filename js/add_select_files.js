function load_events_add_select() {
  document
    .getElementById("add_file")
    .parentElement.addEventListener("change", () => {
      var file_data = $("#add_file").prop("files")[0];
      var form_data = new FormData();
      form_data.append("file", file_data);
      form_data.append("rutaDir", getPath());
      $.ajax({
        url: "./../api/uploadfile.php",
        type: "POST",
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function () {
          console.log(getPath());
          isDir(getPath());
        },
      });
    });
}
