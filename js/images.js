let modalId = $("#image-gallery");

$(function () {
  document
    .getElementById("add_image")
    .parentElement.addEventListener("change", () => {
      var form_data = new FormData();
      form_data.append("rutaDir", getPath());
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

  loadGallery(true, "a.thumbnail");

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
