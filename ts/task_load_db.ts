document.getElementById("task").addEventListener("click", () => {
  (document.getElementById("tasks") as any).contentWindow.add_tasks();
});
document.getElementById("tasks_menu").addEventListener("click", () => {
  (document.getElementById("tasks") as any).contentWindow.add_tasks();
});
