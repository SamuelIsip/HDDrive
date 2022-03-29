"use strict";
document.getElementById("task").addEventListener("click", () => {
    document.getElementById("tasks").contentWindow.add_tasks();
});
document.getElementById("tasks_menu").addEventListener("click", () => {
    document.getElementById("tasks").contentWindow.add_tasks();
});
