let modalId = $("#image-gallery");

$(function () {
  loadImagesFromDB();

  loadGallery(false, "a.thumbnail");

  //This function disables buttons when needed
  function disableButtons(counter_max, counter_current) {
    $("#show-previous-image, #show-next-image").show();
    if (counter_max === counter_current) {
      $("#show-next-image").hide();
    } else if (counter_current === 1) {
      $("#show-previous-image").hide();
    }
  }

  /**
   *
   * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
   * @param setClickAttr  Sets the attribute for the click handler.
   */

  function loadGallery(setIDs, setClickAttr) {
    let current_image,
      selector,
      counter = 0;

    $("#show-next-image, #show-previous-image").click(function () {
      if ($(this).attr("id") === "show-previous-image") {
        current_image--;
      } else {
        current_image++;
      }

      selector = $('[data-image-id="' + current_image + '"]');
      updateGallery(selector);
    });

    function updateGallery(selector) {
      let $sel = selector;
      current_image = $sel.data("image-id");
      $("#image-gallery-title").text($sel.data("title"));
      $("#image-gallery-image").attr("src", $sel.data("image"));
      disableButtons(counter, $sel.data("image-id"));
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
  document
    .getElementById("add_image")
    .parentElement.addEventListener("change", () => {
      var form_data = new FormData();
      var ins = document.getElementById("add_image").files.length;
      for (var x = 0; x < ins; x++) {
        form_data.append(
          "file[]",
          document.getElementById("add_image").files[x]
        );
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
        success: function () {},
      });
    });

  function loadImagesFromDB() {
    $.ajax({
      url: "./../api/readImages.php",
      type: "GET",
      dataType: "json",
      async: true,
      success: (images) => {
        console.log(images);
        createGalleryDOMelements(images);
      },
    });
  }

  function createGalleryDOMelements(images) {
    images.forEach((image) => {
      var $div = $("<div>", { class: "col-lg-3 col-md-4 col-xs-6 thumb" });
      var $a = $("<a>", {
        href: "#",
        class: "thumbnail",
        "data-image-id": "",
        "data-toggle": "modal",
        "data-title": "",
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
});

// build key actions
$(document).on("keydown", function (e) {
  switch (e.key) {
    case 37: // left
      if (
        (modalId.data("bs.modal") || {})._isShown &&
        $("#show-previous-image").is(":visible")
      ) {
        $("#show-previous-image").click();
      }
      break;

    case 39: // right
      if (
        (modalId.data("bs.modal") || {})._isShown &&
        $("#show-next-image").is(":visible")
      ) {
        $("#show-next-image").click();
      }
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});
