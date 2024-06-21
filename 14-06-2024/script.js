const heading = document.querySelector(".heading");
const description = document.querySelector(".description");
const addBtn = document.querySelector(".add-btn");
const notesContainer = document.querySelector(".notes-container");

let allNotes = JSON.parse(localStorage.getItem("notes")) || [];

// for checkbox
const notesCompleted = (myNotesId) => {
  const getNotes = allNotes.find((note) => note.id === myNotesId);
  if (getNotes) {
    getNotes.isCompleted = !getNotes.isCompleted;
  }
  localStorage.setItem("notes", JSON.stringify(allNotes));
  showNotes();
};

// for delete
const deleteNotes = (myNotesId) => {
  allNotes = allNotes.filter((note) => note.id !== myNotesId);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  showNotes();
};

const updateInputField1 = document.getElementById("update-input1");
const updateInputField2 = document.getElementById("update-input2");
const updateBtn = document.getElementById("update-btn");

// for update
const updateNotes = (myNotesId) => {
  const getUpdateNotes = allNotes.find((note) => note.id === myNotesId);

  updateInputField1.value = getUpdateNotes.noteHeading;
  updateInputField2.value = getUpdateNotes.noteDescription;

  // Remove existing event listeners
  const newUpdateBtn = updateBtn.cloneNode(true);
  updateBtn.replaceWith(newUpdateBtn);

  newUpdateBtn.addEventListener("click", () => {
    if (
      getUpdateNotes.noteHeading === updateInputField1.value &&
      getUpdateNotes.noteDescription === updateInputField2.value
    ) {
      return alert("There is no change in your notes...") ;
    }

    getUpdateNotes.noteHeading = updateInputField1.value;
    getUpdateNotes.noteDescription = updateInputField2.value;
    localStorage.setItem("notes", JSON.stringify(allNotes));
    showNotes();
    
  });
 
};
console.log(updateNotes)

// rendering by using for-loop
const showNotes = () => {
  notesContainer.innerHTML = "";

  allNotes.forEach((myNotes) => {
    const { noteHeading, noteDescription, isCompleted, id } = myNotes;
    const isChecked = isCompleted ? "checked" : "";

    const html = `
      <div class="content-container">
        <h6 class="mt-1 ${
          isChecked ? "text-decoration-line-through" : ""
        }">Heading: ${noteHeading}</h6>
        <h6 class="mt-1 ${
          isChecked ? "text-decoration-line-through" : ""
        }">Description: ${noteDescription}</h6>
        <input onclick="notesCompleted(${id})" class="check" type="checkbox" ${isChecked} />
        <button onclick="updateNotes(${id})" type="button" class="btn-1 text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
        <button onclick="deleteNotes(${id})" class="btn-2">Delete</button>
      </div>`;
    notesContainer.innerHTML += html;
  });
};

addBtn.addEventListener("click", () => {
  const userHeading = heading.value;
  const userDescription = description.value;
  if (!userHeading && !userDescription) {
    return alert("Please enter the columns...");
  }

  allNotes.push({
    noteHeading: userHeading,
    noteDescription: userDescription,
    isCompleted: false,
    id: Date.now(),
  });

  heading.value = "";
  description.value = "";
  localStorage.setItem("notes", JSON.stringify(allNotes));
  showNotes();
});

window.onload = showNotes;