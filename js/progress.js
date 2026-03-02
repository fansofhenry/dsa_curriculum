// ===== COURSE STATE SYSTEM =====

const CourseState = {
  get(key) {
    return localStorage.getItem(key);
  },
  set(key, value) {
    localStorage.setItem(key, value);
  },
  toggle(key) {
    const current = localStorage.getItem(key);
    localStorage.setItem(key, current === "true" ? "false" : "true");
  }
};

// ===== PROJECT COMPLETION =====

function toggleComplete(id) {
  const key = `complete-${id}`;
  CourseState.toggle(key);
  updateCompletionUI(id);
}

function updateCompletionUI(id) {
  const key = `complete-${id}`;
  const complete = CourseState.get(key) === "true";
  const el = document.querySelector(`[data-complete="${id}"]`);
  if (!el) return;
  el.innerText = complete ? "✓ Completed" : "Mark Complete";
  el.classList.toggle("completed", complete);
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-complete]").forEach(btn => {
    updateCompletionUI(btn.dataset.complete);
  });
});
