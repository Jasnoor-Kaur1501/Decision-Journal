let decisions = JSON.parse(localStorage.getItem("decisions")) || [];

const titleInput = document.getElementById("titleInput");
const contextInput = document.getElementById("contextInput");
const expectedInput = document.getElementById("expectedInput");
const confidenceInput = document.getElementById("confidenceInput");
const confidenceValue = document.getElementById("confidenceValue");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("decisionList");

/* ===== Confidence slider ===== */
confidenceInput.addEventListener("input", () => {
  const value = confidenceInput.value;
  confidenceValue.textContent = value;
  confidenceInput.style.background =
    `linear-gradient(90deg, #6366f1 ${value * 10}%, #e5e7eb ${value * 10}%)`;
});

/* ===== Add decision ===== */
addBtn.addEventListener("click", addDecision);
titleInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addDecision();
});

function addDecision() {
  const title = titleInput.value.trim();
  if (!title) return;

  decisions.push({
    title,
    context: contextInput.value,
    expected: expectedInput.value,
    confidence: confidenceInput.value,
    date: formatDate(new Date())
  });

  save();
  render();
  clearInputs();

  addBtn.textContent = "Decision Saved";
  addBtn.disabled = true;

  setTimeout(() => {
    addBtn.textContent = "Add Decision";
    addBtn.disabled = false;
  }, 900);
}

/* ===== Helpers ===== */
function formatDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function save() {
  localStorage.setItem("decisions", JSON.stringify(decisions));
}

function clearInputs() {
  titleInput.value = "";
  contextInput.value = "";
  expectedInput.value = "";
  confidenceInput.value = 5;
  confidenceValue.textContent = 5;
  confidenceInput.dispatchEvent(new Event("input"));
}

/* ===== Delete ===== */
function deleteDecision(index) {
  decisions.splice(index, 1);
  save();
  render();
}

/* ===== Render ===== */
function render() {
  list.innerHTML = "";

  if (decisions.length === 0) {
    list.innerHTML = "<p class='empty'>No decisions yet.</p>";
    return;
  }

  decisions.forEach((d, index) => {
    const li = document.createElement("li");
    li.className = "decision";

    li.innerHTML = `
      <button class="delete" onclick="deleteDecision(${index})">✕</button>
      <strong>${d.title}</strong>
      <p>${d.context}</p>
      <small>Confidence: ${d.confidence}/10 · ${d.date}</small>
    `;

    list.appendChild(li);
  });
}

/* ===== Init ===== */
confidenceInput.dispatchEvent(new Event("input"));
render();
