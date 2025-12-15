let decisions = JSON.parse(localStorage.getItem("decisions")) || [];

const titleInput = document.getElementById("titleInput");
const contextInput = document.getElementById("contextInput");
const expectedInput = document.getElementById("expectedInput");
const confidenceInput = document.getElementById("confidenceInput");
const confidenceValue = document.getElementById("confidenceValue");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("decisionList");

/* ===== Confidence slider animation ===== */
confidenceInput.addEventListener("input", () => {
  const value = confidenceInput.value;
  confidenceValue.textContent = value;

  confidenceInput.style.background = `
    linear-gradient(
      90deg,
      #6366f1 ${value * 10}%,
      #e5e7eb ${value * 10}%
    )
  `;
});

/* ===== Add decision ===== */
addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  if (!title) return;

  decisions.push({
    title,
    context: contextInput.value,
    expected: expectedInput.value,
    confidence: confidenceInput.value,
    date: new Date().toISOString().slice(0, 10)
  });

  save();
  render();
  clearInputs();

  // Button feedback animation
  addBtn.textContent = "Decision Saved";
  addBtn.disabled = true;

  setTimeout(() => {
    addBtn.textContent = "Add Decision";
    addBtn.disabled = false;
  }, 900);
});

/* ===== Save to localStorage ===== */
function save() {
  localStorage.setItem("decisions", JSON.stringify(decisions));
}

/* ===== Clear inputs ===== */
function clearInputs() {
  titleInput.value = "";
  contextInput.value = "";
  expectedInput.value = "";
  confidenceInput.value = 5;
  confidenceValue.textContent = 5;

  confidenceInput.style.background = `
    linear-gradient(90deg, #6366f1 50%, #e5e7eb 50%)
  `;
}

/* ===== Render decisions ===== */
function render() {
  list.innerHTML = "";

  decisions.forEach((d, index) => {
    const li = document.createElement("li");
    li.className = "decision";

    li.innerHTML = `
      <strong>${d.title}</strong>
      <p>${d.context}</p>
      <small>
        Confidence: ${d.confidence}/10 · ${d.date}
      </small>
    `;

    list.appendChild(li);
  });
}

/* ===== Initial render ===== */
render();
if (decisions.length === 0) {
  list.innerHTML = "<p class='empty'>No decisions yet.</p>";
  return;
}

