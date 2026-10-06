# QuickNotes

QuickNotes is a clean and responsive web application designed to help you capture your thoughts instantly. It allows users to create notes categorized into Personal, Work, or Study, keeping them organized and easily accessible directly from your browser.

## Features
- **Add Notes**: Create notes up to 200 characters with specific categories.
- **Categorization**: Visual indicators (colors and labels) for Personal, Work, and Study notes.
- **Delete Notes**: Easily remove individual notes when they are no longer needed.
- **Clear All**: A bonus feature to quickly delete all notes after confirmation.
- **Search**: Real-time filtering of notes by matching text.
- **Validation**: Prevents adding empty notes or notes exceeding the character limit.
- **Persistence**: Notes are automatically saved to the browser's `localStorage` and persist across page refreshes.
- **Responsive Design**: Works perfectly on both desktop and mobile devices.

## How to run the project locally
1. Clone this repository to your local machine using `git clone`.
2. Navigate to the `quicknotes-app` folder.
3. Open the `index.html` file in any modern web browser. No server setup is required!

## What I learned
- **DOM Manipulation**: Creating and appending elements dynamically using `document.createElement()` and maintaining safe updates with `textContent`.
- **Data Persistence**: Using `localStorage` with `JSON.stringify()` and `JSON.parse()` to persist state across browser sessions.
- **CSS Flexbox**: Creating a responsive form layout and organizing elements clearly using flexbox properties.
- **Client-Side Validation**: Implementing instant feedback for user inputs like character count limits and empty fields.
