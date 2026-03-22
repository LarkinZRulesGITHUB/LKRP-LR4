let scripts = JSON.parse(localStorage.getItem("scripts") || "{}");

function save() {
  localStorage.setItem("scripts", JSON.stringify(scripts));
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  for (let name in scripts) {
    let card = document.createElement("div");
    card.className = "script-card";

    card.innerHTML = `
      <h3>${name}</h3>
      <button onclick="runScript('${name}')">Run</button>
      <button onclick="editScript('${name}')">Edit</button>
      <button onclick="deleteScript('${name}')">Delete</button>
    `;

    list.appendChild(card);
  }
}

document.getElementById("add").onclick = () => {
  let code = document.getElementById("code").value;
  let name = prompt("Script name:");
  if (!name) return;

  scripts[name] = code;
  save();
  render();
};

function editScript(name) {
  let newCode = prompt("Edit code:", scripts[name]);
  if (newCode !== null) {
    scripts[name] = newCode;
    save();
    render();
  }
}

function deleteScript(name) {
  delete scripts[name];
  save();
  render();
}

function runScript(name) {
  let win = window.open("about:blank", "_blank");

  setTimeout(() => {
    win.document.open();
    win.document.write(`
      <script>
        ${scripts[name]}
      <\/script>
    `);
    win.document.close();
  }, 150);
}

render();
