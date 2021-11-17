function load_events_pages_menu() {
  $("#documents").on("click", () => {
    $("#container_docs").css("display", "flex");
    $(
      "#container_images, #container_calendar, #container_bookmarks, #container_tasks"
    ).css("display", "none");

    // Remove the table, to reload files of index
    deleteFileRecursive();
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
    // Notifications after task is saved
    $("#notification")
      .removeClass("notification_on")
      .addClass("notification_off");
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
    deleteFileRecursive();
    readDocuments();
    resetLinkHead();
  });

  const regex = /initials.+/;
  const userName = sessionStorage.getItem("userName");

  // Foto de perfil
  document.getElementsByClassName("user_profile")[0].firstElementChild.src =
    document
      .getElementsByClassName("user_profile")[0]
      .firstElementChild.src.replace(regex, "initials/" + userName + ".svg");
}
