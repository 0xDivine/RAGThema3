const chatHistory = [];

const form = document.querySelector("#question-form");
const input = document.querySelector("#question");
const messages = document.querySelector("#messages");
const error = document.querySelector("#error");
const button = form.querySelector("button");

function addMessage(role, content) {
  const message = document.createElement("article");
  message.className = `message ${role}`;
  message.innerHTML = `<span class="label">${role === "student" ? "Jij" : "Assistent"}</span><p></p>`;
  message.querySelector("p").textContent = content;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

async function askQuestion(question) {
  const response = await fetch("http://localhost:8000/api/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({question}),
  });
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "De verkeerde webserver draait op poort 8000. Voer eerst de deploymentcel uit."
    );
  }
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Server gaf status ${response.status}.`);
  }

  console.group("RAG-resultaat");
  console.table(data.retrieval);
  console.groupEnd();
  return data.answer;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;

  error.hidden = true;
  input.value = "";
  addMessage("student", question);
  chatHistory.push({role: "student", content: question});
  button.disabled = true;

  try {
    const answer = await askQuestion(question);
    addMessage("assistant", answer);
    chatHistory.push({role: "assistant", content: answer});
  } catch (exception) {
    error.textContent = `De vraag kon niet worden verwerkt: ${exception.message}`;
    error.hidden = false;
  } finally {
    button.disabled = false;
    input.focus();
  }
});
