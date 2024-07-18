# Notes App

This is a simple Notes App built with HTML, CSS, and JavaScript. The app allows users to create, search, label, archive, and delete notes. It also supports viewing archived and trashed notes.

## Features

- **User Authentication and Content Sync:** Basic localStorage sync for content.
- **Create a New Note:** Add title, content, tags (up to 9), and background color for notes.
- **Search Notes:** Search notes by title or content.
- **Label View:** View all notes with a selected label.
- **Archived Notes:** Archive notes and view archived notes.
- **Trash Notes:** Delete notes and view trashed notes for the last 30 days.
- **Toggle Background Colors:** Change background color for notes.

## Technologies Used

- HTML
- CSS
- JavaScript
- Bootstrap 4

## Getting Started

### Prerequisites

Make sure you have a web browser installed to run the application.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/avinash-18-art/Apsona-Fronted-Assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd notes-app
   ```

3. Open `index.html` in your web browser.

### Usage

1. **Create a Note:**

   - Click on the "Create Note" button.
   - Fill in the title, content, tags (comma separated), and choose a background color.
   - Click on "Save Note" to add the note.

2. **Search Notes:**

   - Use the search input to find notes by title or content.

3. **Label View:**

   - Select a label from the dropdown to view notes with that label.

4. **Archived Notes:**

   - Click on the "Archive" button on a note to archive it.
   - Click on the "View Archived" button to view all archived notes.

5. **Trash Notes:**
   - Click on the "Delete" button on a note to move it to trash.
   - Click on the "View Trash" button to view all trashed notes.
   - Notes in the trash will be automatically deleted after 30 days.

### File Structure

```plaintext
.
├── index.html
├── style.css
├── app.js
└── README.md
```
