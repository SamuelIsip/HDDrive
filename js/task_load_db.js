document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("task").addEventListener("click", () => {
    document.getElementById("tasks").contentWindow.add_tasks();
  });
});
