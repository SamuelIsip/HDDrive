import { IImages } from "./Interfaces/IImages";

$(function () {
  // Carga de imágenes
  loadImagesFromDB();

  // Descarga y borrado
  dropAndDownloadListener();

  // Listener para subir imagen
  document
    .getElementById("add_image")
    .parentElement.addEventListener("change", () => {
      toggleLoader();
      var form_data = new FormData();
      var ins = (<HTMLInputElement>document.getElementById("add_image")).files
        .length;
      for (var x = 0; x < ins; x++) {
        form_data.append(
          "file[]",
          (<HTMLInputElement>document.getElementById("add_image")).files[x]
        );
      }

      var totalSize = parseInt(localStorage.getItem("totalStorage"));
      if (totalSize >= 20000) {
        alert(
          "You have exceeded the maximum storage capacity! Please, increase it!"
        );
        toggleLoader();
        return;
      }

      $.ajax({
        url: "./../api/uploadImage.php",
        type: "POST",
        dataType: "text",
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        async: true,
        success: function () {
          updateImagesAfterModification();
        },
      });
      toggleLoader();
    });

  function loadImagesFromDB() {
    $.ajax({
      url: "./../api/readImages.php",
      type: "GET",
      dataType: "json",
      async: true,
      success: (images) => {
        createGalleryDOMelements(images);
        loadGallery(true, "a.thumbnail");
      },
    });
  }

  //Crear elementos en el DOM
  function createGalleryDOMelements(images: any) {
    images.images.forEach((image: IImages) => {
      var $div = $("<div>", { class: "col-lg-3 col-md-4 col-xs-6 thumb" });
      var $a = $("<a>", {
        href: "#",
        class: "thumbnail",
        "data-image-id": "",
        "data-toggle": "modal",
        "data-title": image.name,
        "data-image":
          "./../../HDDriveHome/UserImages/" +
          image.path +
          "?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        "data-target": "#image-gallery",
      });
      var $img = $("<img>", {
        src:
          "./../../HDDriveHome/UserImages/" +
          image.path +
          "?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        class: "img-thumbnail",
        alt: "Image",
      });
      $a.append($img);
      $div.append($a);
      $("#images_container").append($div);
    });
  }

  //Desactivar botones cuando es necesario
  function disableButtons(counter_max: number, counter_current: number) {
    $("#show-previous-image, #show-next-image").show();
    if (counter_max === counter_current) {
      $("#show-next-image").hide();
    } else if (counter_current === 1) {
      $("#show-previous-image").hide();
    }
  }

  /**
   *
   * @param setIDs        Settear los id de las imagenes
   * @param setClickAttr  Settear los atributos del click handler
   */
  function loadGallery(setIDs: boolean, setClickAttr: string) {
    let current_image: number,
      selector,
      counter: number = 0;

    $("#show-next-image, #show-previous-image").on("click", function () {
      if ($(this).attr("id") === "show-previous-image") {
        current_image--;
      } else {
        current_image++;
      }

      selector = $('[data-image-id="' + current_image + '"]');
      updateGallery(selector);
    });

    function updateGallery(selector: any) {
      let $sel = selector;
      current_image = $sel.data("image-id");
      $("#image-gallery-title").text($sel.data("title"));
      $("#image-gallery-image").attr("src", $sel.data("image"));
      disableButtons(counter, parseInt($sel.data("image-id")));
    }

    if (setIDs == true) {
      $("[data-image-id]").each(function () {
        counter++;
        $(this).attr("data-image-id", counter);
      });
    }
    $(setClickAttr).on("click", function () {
      updateGallery($(this));
    });
  }

  function dropAndDownloadListener() {
    $("#drop-actual-image").on("click", function () {
      var fileData = {
        nameFile: $("#image-gallery-title").text(),
      };
      $.ajax({
        type: "POST",
        url: "./../api/deleteImage.php",
        data: JSON.stringify(fileData),
        dataType: "text",
        async: true,
        success: function () {
          updateImagesAfterModification();
        },
      });
    });

    $("#download-actual-image").on("click", function () {
      let nameFile = $("#image-gallery-title").text();

      window.location.href = encodeURI(
        "./../api/downloadFile.php?nameFile=" + nameFile + "&isImage=true"
      );
    });
  }

  function updateImagesAfterModification() {
    // Borrar elementos antes de cargar nuevos
    var div_list = document.getElementById("images_container");
    while (div_list.hasChildNodes()) div_list.removeChild(div_list.lastChild);
    toggleLoader();
    //Cargar imagenes de neuvo
    loadImagesFromDB();
    toggleLoader();
  }
});

// build key actions
$(document).on("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft": // left
      if ($("#show-previous-image").is(":visible"))
        document.getElementById("show-previous-image").click();
      break;

    case "ArrowRight": // right
      if ($("#show-next-image").is(":visible"))
        document.getElementById("show-next-image").click();
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});
