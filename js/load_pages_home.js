document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener(
    "popstate",
    function (event) {
      var r = confirm("You pressed a Back button! Are you sure?!");

      if (r == true) {
        $("#container_docs").css("display", "flex");
        $("#container_calendar, #container_favourites, #container_tasks").css(
          "display",
          "none"
        );

        // Remove the table, to reload files of index
        deleteFileRecursive();
        readDocuments();
        resetLinkHead();
      }
    },
    false
  );
  full_size_monitor();
  readDocuments();
  load_events_pages_menu();
  load_events_add_select();
});
