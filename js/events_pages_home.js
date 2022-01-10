function load_events_pages_menu() {
  $("#documents").on("click", () => {
    $("#container_docs").css("display", "flex");
    $("#container_calendar, #container_favourites, #container_tasks").css(
      "display",
      "none"
    );

    // Remove the table, to reload files of index
    deleteFileRecursive();
    readDocuments();
    resetLinkHead();
  });
  $("#calendar").on("click", () => {
    $("#container_calendar").css("display", "flex");
    $("#container_docs, #container_favourites, #container_tasks").css(
      "display",
      "none"
    );
  });
  $("#fav").on("click", () => {
    // Notifications after favorite files have been saved
    $("#notification_favourites")
      .removeClass("notification_on")
      .addClass("notification_off");
    $("#container_favourites").css("display", "flex");
    $("#container_docs, #container_calendar, #container_tasks").css(
      "display",
      "none"
    );
  });
  $("#task").on("click", () => {
    // Notifications after task has been saved
    $("#notification_task")
      .removeClass("notification_on")
      .addClass("notification_off");
    $("#container_tasks").css("display", "flex");
    $("#container_docs, #container_calendar, #container_favourites").css(
      "display",
      "none"
    );
  });

  // Menu Lateral
  $("#documents_menu").on("click", () => {
    $("#container_docs").css("display", "flex");
    $("#container_calendar, #container_favourites, #container_tasks").css(
      "display",
      "none"
    );

    // Remove the table, to reload files of index
    deleteFileRecursive();
    readDocuments();
    resetLinkHead();
  });

  $("#favourites_menu").on("click", () => {
    $("#container_favourites").css("display", "flex");
    $("#container_calendar, #container_docs, #container_tasks").css(
      "display",
      "none"
    );

    // Remove the table, to reload files of index
    document.getElementById("favourites").contentWindow.load_favourites();
  });

  const regex = /initials.+/;
  const userName = localStorage.getItem("userName");

  // Foto de perfil
  document.getElementsByClassName("user_profile")[0].firstElementChild.src =
    document
      .getElementsByClassName("user_profile")[0]
      .firstElementChild.src.replace(regex, "initials/" + userName + ".svg");
}
