function load_events_pages_menu() {
  $("#documents").on("click", () => {
    $("#container_docs").css("display", "flex");
    $(
      "#container_images, #container_calendar, #container_bookmarks, #container_tasks"
    ).css("display", "none");

    // Remove the table, to reload files of index
    if ($(".table_files").children().length > 0) $(".table_files").remove();
    readDocuments();
    resetLinkHead();
  });
  $("#images").on("click", () => {
    $("#container_images").css("display", "flex");
    $(
      "#container_docs, #container_calendar, #container_bookmarks, #container_tasks"
    ).css("display", "none");
  });
  $("#calendar").on("click", () => {
    $("#container_calendar").css("display", "flex");
    $(
      "#container_docs, #container_images, #container_bookmarks, #container_tasks"
    ).css("display", "none");
  });
  $("#bookmark").on("click", () => {
    $("#container_bookmarks").css("display", "flex");
    $(
      "#container_docs, #container_images, #container_calendar, #container_tasks"
    ).css("display", "none");
  });
  $("#task").on("click", () => {
    $("#container_tasks").css("display", "flex");
    $(
      "#container_docs, #container_images, #container_calendar, #container_bookmarks"
    ).css("display", "none");
  });

  // Menu Lateral
  $("#documents_menu").on("click", () => {
    $("#container_docs").css("display", "flex");
    $(
      "#container_images, #container_calendar, #container_bookmarks, #container_tasks"
    ).css("display", "none");

    // Remove the table, to reload files of index
    if ($(".table_files").children().length > 0) $(".table_files").remove();
    readDocuments();
    resetLinkHead();
  });
}
