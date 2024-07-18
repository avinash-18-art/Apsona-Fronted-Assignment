document.addEventListener('DOMContentLoaded', () => {
  const notesContainer = document.getElementById('notes-container')
  const createNoteBtn = document.getElementById('create-note-btn')
  const saveNoteBtn = document.getElementById('save-note-btn')
  const noteForm = document.getElementById('note-form')
  const searchInput = document.getElementById('search-input')
  const labelInput = document.getElementById('label-input')
  const viewArchivedBtn = document.getElementById('view-archived-btn')
  const viewTrashBtn = document.getElementById('view-trash-btn')
  let notes = JSON.parse(localStorage.getItem('notes')) || []
  let currentView = 'all'

  createNoteBtn.addEventListener('click', () => {
    noteForm.style.display = 'block'
  })

  saveNoteBtn.addEventListener('click', () => {
    const title = document.getElementById('note-title').value
    const content = document.getElementById('note-content').value
    const tags = document
      .getElementById('note-tags')
      .value.split(',')
      .map(tag => tag.trim())
      .slice(0, 9)
    const color = document.getElementById('note-color').value

    if (title && content) {
      const note = {
        title,
        content,
        tags,
        color,
        id: Date.now(),
        archived: false,
        deleted: false,
        deleteAt: null,
      }
      notes.push(note)
      localStorage.setItem('notes', JSON.stringify(notes))
      renderNotes()
      noteForm.reset()
      noteForm.style.display = 'none'
    }
  })

  searchInput.addEventListener('input', () => {
    renderNotes()
  })

  labelInput.addEventListener('change', () => {
    currentView = 'label'
    renderNotes()
  })

  viewArchivedBtn.addEventListener('click', () => {
    currentView = 'archived'
    renderNotes()
  })

  viewTrashBtn.addEventListener('click', () => {
    currentView = 'trash'
    renderNotes()
  })

  function renderNotes() {
    notesContainer.innerHTML = ''
    let filteredNotes = notes

    if (currentView === 'archived') {
      filteredNotes = notes.filter(note => note.archived && !note.deleted)
    } else if (currentView === 'trash') {
      filteredNotes = notes.filter(note => note.deleted)
    } else if (currentView === 'label') {
      const selectedLabel = labelInput.value
      filteredNotes = notes.filter(
        note =>
          note.tags.includes(selectedLabel) && !note.archived && !note.deleted,
      )
    } else {
      const searchQuery = searchInput.value.toLowerCase()
      filteredNotes = notes.filter(
        note =>
          (note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery)) &&
          !note.archived &&
          !note.deleted,
      )
    }

    filteredNotes.forEach(note => {
      const noteCard = document.createElement('div')
      noteCard.className = 'col-md-4 note-card'
      noteCard.innerHTML = `
                <div class="card" style="background-color: ${note.color};">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <p class="card-text">${note.content}</p>
                        <p class="tags">${note.tags.join(', ')}</p>
                        <div class="note-actions">
                            <button class="btn btn-secondary btn-sm" onclick="archiveNote(${
                              note.id
                            })">Archive</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteNote(${
                              note.id
                            })">Delete</button>
                        </div>
                    </div>
                </div>
            `
      notesContainer.appendChild(noteCard)
    })
  }

  window.archiveNote = id => {
    notes = notes.map(note =>
      note.id === id
        ? {
            ...note,
            archived: true,
          }
        : note,
    )
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes()
  }

  window.deleteNote = id => {
    notes = notes.map(note =>
      note.id === id
        ? {
            ...note,
            deleted: true,
            deleteAt: new Date(),
          }
        : note,
    )
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes()
  }

  window.addEventListener('load', () => {
    const now = new Date()
    notes = notes.filter(
      note =>
        !(
          note.deleted &&
          now - new Date(note.deleteAt) > 30 * 24 * 60 * 60 * 1000
        ),
    )
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes()
  })

  renderNotes()
})
