Etch a sketch: HTML/CSS Drawing Program

This is a web application that imitates a basic digital painting program (like Microsoft Paint), utilizing fundamental HTML elements (divs) as pixels and styled with pure CSS for the drawing grid. A key feature is the inclusion of persistent data storage using Javascript, allowing users to save and load their pixel art sessions.

Features

Pixel-Based Drawing: Draw directly onto a grid where each cell is an individual HTML div element.

Color Palette: Select from a predefined set of colors to apply to the canvas.

Drawing & Erasing: Click to paint the chosen color; use the dedicated Erase tool to revert cells to the default background.

Persistent Storage: Save the current state of the canvas grid to the cloud (Firestore) and load previous sessions by clicking the "Load" button.

Clear Canvas: clear the canvas by pressing the "New" button (the canvas persists in the memory if the "save" button is clicked)

Technology Stack

HTML
CSS
JavaScript - Handles all drawing logic, state management, storage and interaction listeners.

How to Use the Application

Select a Color: Click on one of the color swatches in the toolbar to set your active drawing color.

Draw: Click or hold the mouse button and drag across the canvas cells to apply the selected color.

Erase: Select the Eraser tool to remove colors (reverting the cell to white/default).

Save Your Work: Click the Save button. The application automatically saves the grid's current state to your private Firestore collection, linked to your current session.

Load Work: Click the Load button to retrieve the last saved drawing from the database and populate the canvas.
