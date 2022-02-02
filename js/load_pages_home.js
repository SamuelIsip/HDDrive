document.addEventListener("DOMContentLoaded", () => {
  document.onmouseover = function () {
    //User's mouse is inside the page.
    window.innerDocClick = true;
  };

  document.onmouseleave = function () {
    //User's mouse has left the page.
    window.innerDocClick = false;
  };

  window.onhashchange = function () {
    if (!window.innerDocClick) {
      //Your own in-page mechanism triggered the hash change
      $("#container_docs").css("display", "flex");
      $(
        "#container_calendar, #container_images, #container_favourites, #container_tasks"
      ).css("display", "none");

      // Remove the table, to reload files of index
      deleteFileRecursive();
      readDocuments();
      resetLinkHead();
    }
  };

  full_size_monitor();
  readDocuments();
  load_events_pages_menu();
  load_events_add_select();
});
