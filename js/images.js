let modalId = document.querySelector("#image-gallery");

document.addEventListener("DOMContentLoaded", () => {
  loadGallery(true, "a.thumbnail");

  //This function disables buttons when needed
  function disableButtons(counter_max, counter_current) {
    document.querySelector("#show-previous-image, #show-next-image").show();
    if (counter_max === counter_current) {
      document.querySelector("#show-next-image").hide();
    } else if (counter_current === 1) {
      document.querySelector("#show-previous-image").hide();
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

    document
      .querySelector("#show-next-image, #show-previous-image")
      .click(function () {
        if (document.querySelector(this).attr("id") === "show-previous-image") {
          current_image--;
        } else {
          current_image++;
        }

        selector = document.querySelector(
          '[data-image-id="' + current_image + '"]'
        );
        updateGallery(selector);
      });

    function updateGallery(selector) {
      let $sel = selector;
      current_image = $sel.data("image-id");
      document.querySelector("#image-gallery-title").text($sel.data("title"));
      document
        .querySelector("#image-gallery-image")
        .attr("src", $sel.data("image"));
      disableButtons(counter, $sel.data("image-id"));
    }

    if (setIDs == true) {
      document.querySelector("[data-image-id]").each(function () {
        counter++;
        document.querySelector(this).attr("data-image-id", counter);
      });
    }
    document.querySelector(setClickAttr).addEventListener("click", function () {
      updateGallery(document.querySelector(this));
    });
  }
});

// build key actions
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case 37: // left
      if (
        (modalId.data("bs.modal") || {})._isShown &&
        document.querySelector("#show-previous-image").is(":visible")
      ) {
        document.querySelector("#show-previous-image").click();
      }
      break;

    case 39: // right
      if (
        (modalId.data("bs.modal") || {})._isShown &&
        document.querySelector("#show-next-image").is(":visible")
      ) {
        document.querySelector("#show-next-image").click();
      }
      break;

    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});
