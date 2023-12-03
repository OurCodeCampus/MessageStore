
const addBtn = document.getElementById("add");
const mainContainer = document.querySelector(".notes-container");


const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const noteArr = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return noteArr.push(note.value);
        console.log(note)
    });


    localStorage.setItem('noteArr', JSON.stringify(noteArr));
}

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('notes');
    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea  id="mess" class="${text ? "hidden" : ""}"></textarea>`;

    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(noteContainer);

    // getting the reference
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');


    // deleting the node
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLSData();
    });

    // toggle button note


    editBtn.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (e) => {
        const value = e.target.value;
        mainDiv.textContent = value;

        updateLSData();
    });

    mainContainer.appendChild(note);
}

// getting data back from localstorage
const noteData = JSON.parse(localStorage.getItem('noteArr'));

if (noteData) { noteData.forEach((note) => addNewNote(note)) };
addBtn.addEventListener('click', () => addNewNote());