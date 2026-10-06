const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

function saveNotes() {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
}

function render(notesToRender = notes) {
    notesList.innerHTML = '';
    
    if (notesToRender.length === 0 && searchInput.value.trim() !== '') {
        const emptyMsg = document.createElement('li');
        emptyMsg.textContent = 'No notes match your search.';
        emptyMsg.classList.add('empty-message');
        notesList.appendChild(emptyMsg);
    }
    
    notesToRender.forEach(note => {
        const li = document.createElement('li');
        
        if (note.category === 'Personal') li.classList.add('category-personal');
        if (note.category === 'Work') li.classList.add('category-work');
        if (note.category === 'Study') li.classList.add('category-study');
        
        const textP = document.createElement('p');
        textP.classList.add('note-text');
        textP.textContent = note.text;
        
        const metaDiv = document.createElement('div');
        metaDiv.classList.add('note-meta');
        
        const catSpan = document.createElement('span');
        catSpan.classList.add('note-category-label');
        catSpan.textContent = note.category;
        
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('note-date');
        dateSpan.textContent = note.createdAt;
        
        metaDiv.appendChild(catSpan);
        metaDiv.appendChild(dateSpan);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            updateCount();
            render(notes.filter(n => n.text.toLowerCase().includes(searchInput.value.trim().toLowerCase())));
        });
        
        li.appendChild(textP);
        li.appendChild(metaDiv);
        li.appendChild(deleteBtn);
        
        notesList.appendChild(li);
    });
}

function updateCount() {
    if (notes.length === 0) {
        noteCount.textContent = 'You have no notes yet.';
    } else if (notes.length === 1) {
        noteCount.textContent = 'You have 1 note.';
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = noteInput.value.trim();
    const category = noteCategory.value;
    
    if (text === '') {
        errorMessage.textContent = 'Please type a note first.';
        return;
    }
    
    if (text.length > 200) {
        errorMessage.textContent = 'Notes must be 200 characters or fewer.';
        return;
    }
    
    errorMessage.textContent = '';
    
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };
    
    notes.push(newNote);
    saveNotes();
    updateCount();
    
    noteInput.value = '';
    searchInput.value = '';
    
    render();
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        render();
        return;
    }
    
    const filteredNotes = notes.filter(note => 
        note.text.toLowerCase().includes(searchTerm)
    );
    
    render(filteredNotes);
});

clearAllBtn.addEventListener('click', () => {
    if (notes.length > 0) {
        if (confirm("Delete all notes?")) {
            notes = [];
            saveNotes();
            updateCount();
            render();
        }
    }
});

updateCount();
render();
