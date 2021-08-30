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
  /* document.getElementById("documents").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "flex";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "none";
  }); */
  /* document.getElementById("images").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "flex";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "none";
  }); */
  /*  document.getElementById("calendar").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "flex";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "none";
  }); */
  /*  document.getElementById("bookmark").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "flex";
    document.getElementById("container_tasks").style.display = "none";
  }); */
  /*  document.getElementById("task").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "flex";
  }); */
}
