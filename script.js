const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCount = document.querySelector('#note-count');
const searchInput = document.querySelector('#search-input');
const clearAllBtn = document.querySelector('#clear-all-btn');

let notes = [];

function render() {
    notesList.innerHTML = '';
    
    notes.forEach(note => {
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
        
        li.appendChild(textP);
        li.appendChild(metaDiv);
        li.appendChild(deleteBtn);
        
        notesList.appendChild(li);
    });
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = noteInput.value.trim();
    const category = noteCategory.value;
    
    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };
    
    notes.push(newNote);
    
    noteInput.value = '';
    
    render();
});
