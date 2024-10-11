function createShortId(text) {
    return btoa(text).slice(0, 10);
}

function addItem() {
    const task = document.querySelector("#newItem").value;
    if (!task) {
        alert("Please enter a task");
        return;
    }

    // Create a new div element
    const parentDiv = document.createElement("div");
    parentDiv.style.display = "flex";
    parentDiv.style.alignItems = "center";
    parentDiv.style.gap = "10px";

    // Create a new input element
    const taskId = createShortId(task);
    const newInput = document.createElement("input");
    newInput.type = "checkbox";
    newInput.value = task;
    newInput.id = `task-${taskId}`;
    newInput.name = `task-${taskId}`;

    // Create a new label element
    const newLabel = document.createElement("label");
    newLabel.htmlFor = `task-${taskId}`;
    newLabel.textContent = task;

    // Create a new button element
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItem(taskId);
    removeButton.classList.add("removeBtn");
    removeButton.style.display = "none";

    parentDiv.appendChild(newInput);
    parentDiv.appendChild(newLabel);
    parentDiv.appendChild(removeButton);

    // Add it to the fieldset
    const fieldset = document.querySelector("fieldset");
    fieldset.appendChild(parentDiv);

    // Clear the input
    document.querySelector("#newItem").value = "";
}

function showRemove() {
    const fieldset = document.querySelector("fieldset");
    const removeButtons = fieldset.querySelectorAll("button");
    removeButtons.forEach(button => button.style.display = "inline");
}

function removeItem(id) {
    const task = document.querySelector(`#task-${id}`);
    task.parentElement.remove();
}
