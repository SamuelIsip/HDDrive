function load_events_pages_menu() {
  document.getElementById("documents").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "flex";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "none";
  });
  document.getElementById("images").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "flex";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "none";
  });
  document.getElementById("calendar").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "flex";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "none";
  });
  document.getElementById("bookmark").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "flex";
    document.getElementById("container_tasks").style.display = "none";
  });
  document.getElementById("task").addEventListener("click", () => {
    document.getElementById("container_docs").style.display = "none";
    document.getElementById("container_images").style.display = "none";
    document.getElementById("container_calendar").style.display = "none";
    document.getElementById("container_bookmarks").style.display = "none";
    document.getElementById("container_tasks").style.display = "flex";
  });
}
