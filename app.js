const key = "study-planner-tasks-v1";
let tasks;
try {
  const saved = JSON.parse(localStorage.getItem(key) || "[]");
  tasks = Array.isArray(saved) ? saved.filter(t => t && typeof t.text === "string") : [];
} catch {
  tasks = [];
}

const list = document.querySelector("#tasks");
const count = document.querySelector("#count");
const input = document.querySelector("#task-input");

function render() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement("li");
    if (task.done) item.classList.add("done");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = Boolean(task.done);
    check.setAttribute("aria-label", `Hoàn thành: ${task.text}`);
    check.addEventListener("change", () => { task.done = check.checked; save(); });
    const label = document.createElement("span");
    label.textContent = task.text;
    const remove = document.createElement("button");
    remove.textContent = "Xóa";
    remove.setAttribute("aria-label", `Xóa: ${task.text}`);
    remove.addEventListener("click", () => { tasks = tasks.filter(t => t.id !== task.id); save(); });
    item.append(check, label, remove);
    list.append(item);
  }
  count.textContent = `${tasks.filter(t => t.done).length}/${tasks.length} việc đã hoàn thành`;
}

function save() {
  localStorage.setItem(key, JSON.stringify(tasks));
  render();
}

document.querySelector("#task-form").addEventListener("submit", event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: crypto.randomUUID(), text, done: false });
  input.value = "";
  input.focus();
  save();
});
render();
