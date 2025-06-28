// TO-DO: Add Dialog
// Add Download Function
const wholeGrid = document.querySelector('section#sketch-grid');
const newGridBtn = document.querySelector('button#invoke-choosing-new-grid');
const newGridDialog = document.querySelector('dialog#new-grid-dialog');
const closeNewGridDialog = document.querySelector('dialog#new-grid-dialog #close-new-grid-dialog-button');
const minimizeNewGridDialog = document.querySelector('dialog#new-grid-dialog #minimize-new-grid-dialog-button');
const toolbar = document.querySelector('#toolbar');
const toolbarDrag = document.querySelector('#toolbar-drag');
const colorPickerBtn = document.querySelector('#color-picker');
const drawModeBtn = document.querySelector('#draw-mode');
const eraseModeBtn = document.querySelector('#erase-mode');
const newGridDialogDrag = document.querySelector('dialog#new-grid-dialog .controls-dialog');
const colorPickerDiv = document.querySelector('div#color-picker-div');
const colorPickerPopupContainer = document.querySelector('div#color-picker-picker');
const colorPickerPopupDrag = colorPickerPopupContainer.querySelector('.controls-dialog');
const closeColorPicker = colorPickerPopupDrag.querySelector('#close-color-picker-button');
const minimizeColorPicker = colorPickerPopupDrag.querySelector('#minimize-color-picker-button');
const colorPickerSubmitBtn = colorPickerPopupContainer.querySelector('button[type="submit"]');
const colorPickerRow = document.querySelector('#color-picker-row');
const colorPicker = document.querySelector('#color-picker-row input[type="color"]');
const colorPickerHex = document.querySelector('#color-picker-hex');
const previousColorsContainer = colorPickerPopupContainer.querySelector('#previous-colors-flexbox');
const previousColorsArray = [];
const gridSizeInput = document.querySelector('#grid-size-input');
const saveGridBtn = document.querySelector('#save-grid-button');
const loadGridBtn = document.querySelector('#load-grid-button');
const successMessage = document.querySelector('#success-message');
const errorMessage = document.querySelector('#error-message');

let mouseDown = false;
let drawMode = true;
let eraseMode = false;
let isToolbarDragging = false
let offsetX;
let newGridDialogMouseDown = false;
let newGridDialogOffsetX;
let newGridDialogOffsetY;
let firstClickedOnControlButton = false;
let colorPicked = '#000000'
let colorPickerDragging;
let colorPickerOffsetX;
let colorPickerOffsetY;

colorPickerPopupDrag.addEventListener('mousedown', e => {
  colorPickerDragging = true;
  colorPickerOffsetY = e.offsetY;
  colorPickerOffsetX = e.offsetX;
});

const getHex = function getHexColorFromString(str){
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.fillStyle = str;
      return ctx.fillStyle;
}

colorPickerPopupContainer.addEventListener('click', e => {
  thisBackgroundColor = e.target.style.backgroundColor;
  if (e.target.classList.contains('previous-color')) {
    colorPicked = getHex(thisBackgroundColor);
    colorPicker.value = getHex(thisBackgroundColor);
    colorPickerHex.textContent = getHex(thisBackgroundColor);
  }
});

colorPickerPopupContainer.addEventListener('mousedown', () => {
  colorPickerPopupContainer.classList.add('focused');
  toolbar.classList.remove('focused');
});

colorPicker.addEventListener('change', e => {
  colorPicked = getHex(colorPicker.value);
  console.log(colorPicked)
});

colorPicker.addEventListener('input', e => {
  colorPickerHex.textContent = getHex(colorPicker.value);
  colorPicked = getHex(colorPicker.value);
});

newGridDialogDrag.addEventListener('mousedown', e => {
  if (e.target !== closeNewGridDialog && e.target !== minimizeNewGridDialog) {
    newGridDialogMouseDown = true;
    newGridDialogOffsetX = e.clientX - newGridDialog.getBoundingClientRect().left;
    newGridDialogOffsetY = e.clientY - newGridDialog.getBoundingClientRect().top;
  }
});

drawModeBtn.addEventListener('click', () => {
  drawMode == true ? drawMode = false : drawMode = true;
  eraseMode = false;
  drawModeBtn.classList.toggle('draw-active');
  eraseModeBtn.classList.remove('erase-active');
});

eraseModeBtn.addEventListener('click', () => {
  drawMode = false;
  eraseMode == true ? eraseMode = false : eraseMode = true;
  drawModeBtn.classList.remove('draw-active');
  eraseModeBtn.classList.toggle('erase-active');
});

toolbarDrag.addEventListener('mousedown', e => {
  isToolbarDragging = true;
  offsetY = e.offsetY;
});

document.addEventListener('mousedown', e => {
  if (isToolbarDragging) {
    offsetX = (e.clientX - toolbar.getBoundingClientRect().left);
  }
});

document.addEventListener('mousemove', e => {
  if (isToolbarDragging) {
    toolbar.style.left = `${e.screenX - offsetX}px`;
    toolbar.style.top = `${e.y - offsetY - toolbarDrag.offsetTop}px`;
    toolbar.style.transform = 'none';
  }

  if (newGridDialogMouseDown && !firstClickedOnControlButton) {
    newGridDialog.style.left = `${e.x - newGridDialogOffsetX}px`;
    newGridDialog.style.top = `${e.y - newGridDialogOffsetY}px`;
    newGridDialog.style.margin = 0;
  }

  if (colorPickerDragging && !firstClickedOnControlButton) {
    if (e.y - colorPickerOffsetY + 'px') colorPickerPopupContainer.style.top = e.y - colorPickerOffsetY + 'px';
    if (e.x - colorPickerOffsetX + 'px') colorPickerPopupContainer.style.left = e.x - colorPickerOffsetX + 'px';
  }
});

wholeGrid.addEventListener('mousedown', () => {
  mouseDown = true;
  createPrevColor(colorPicker.value);
  colorPickerBtn.style.backgroundColor = getHex(colorPicker.value) + '50';
});

document.addEventListener('mouseup', () => {
  firstClickedOnControlButton = false
  newGridDialogMouseDown = false;
  mouseDown = false;
  isToolbarDragging = false;
  colorPickerDragging = false;
});

newGridBtn.addEventListener('click', () => {
  newGridDialog.showModal();
});

const itemFlexbox = function createAndAppendFlexboxItem(appendToElement) {
  const itemFlexbox = document.createElement('div');
  itemFlexbox.classList.add('item-flexbox');
  appendToElement.appendChild(itemFlexbox);
  return itemFlexbox;
}

const flexboxRow = function createAndAppendHorizontalFlexbox(appendToElement) {
  const horizontalFlexbox = document.createElement('div');
  horizontalFlexbox.classList.add('horizontal-flexbox');
  appendToElement.appendChild(horizontalFlexbox);
  return horizontalFlexbox;
}

const createGrid = function createGridOfPredefinedVariables(rows, columns) {
  const flexboxArray = [];
  for (let i = 0; i < rows; i++) { 
    const flexboxRowElement = flexboxRow(wholeGrid);
    for (let i = 0; i < columns; i++) {
      itemFlexbox(flexboxRowElement);
    }
    flexboxArray.push(flexboxRowElement)
  }

  const itemFlexboxes = Array.from(document.querySelectorAll('section#sketch-grid .horizontal-flexbox .item-flexbox'));

  itemFlexboxes.forEach(itemFlexbox => {
    itemFlexbox.addEventListener('mousedown', () => {
      if (drawMode) itemFlexbox.style.backgroundColor = colorPicked;
      if (eraseMode) itemFlexbox.style.backgroundColor = '';
    });

    itemFlexbox.addEventListener('mousemove', () => {
      if (mouseDown) {
	if (drawMode) itemFlexbox.style.backgroundColor = colorPicked;
	if (eraseMode) itemFlexbox.style.backgroundColor = '';
      }
    });
  });

  return flexboxArray;
}

// Dark-Color-Checker
function hex_is_dark(color) {
      const hex = color.replace('#', '');
      const c_r = parseInt(hex.substring(0, 0 + 2), 16);
      const c_g = parseInt(hex.substring(2, 2 + 2), 16);
      const c_b = parseInt(hex.substring(4, 4 + 2), 16);
      const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
      return brightness < 128;
}

let thisGrid = createGrid(16, 16);

minimizeColorPicker.addEventListener('mousedown', () => {
  firstClickedOnControlButton = true;
});

closeColorPicker.addEventListener('mousedown', () => {
  firstClickedOnControlButton = true;
});

minimizeNewGridDialog.addEventListener('mousedown', () => {
  firstClickedOnControlButton = true;
});

closeNewGridDialog.addEventListener('mousedown', () => {
  firstClickedOnControlButton = true;
});

closeColorPicker.addEventListener('mouseenter', () => {
  closeColorPicker.querySelector('span').textContent = '󰅙';
});

closeColorPicker.addEventListener('mouseleave', () => {
  closeColorPicker.querySelector('span').textContent = '󰻂';
});

closeNewGridDialog.addEventListener('mouseenter', () => {
  closeNewGridDialog.querySelector('span').textContent = '󰅙';
});

closeNewGridDialog.addEventListener('mouseleave', () => {
  closeNewGridDialog.querySelector('span').textContent = '󰻂';
});

closeNewGridDialog.addEventListener('click', () => {
  newGridDialog.querySelector('form').reset();
  newGridDialog.close();
});

minimizeColorPicker.addEventListener('mouseenter', () => {
  minimizeColorPicker.querySelector('span').textContent = '󰅙';
});

minimizeColorPicker.addEventListener('mouseleave', () => {
  minimizeColorPicker.querySelector('span').textContent = '';
});

minimizeNewGridDialog.addEventListener('mouseenter', () => {
  minimizeNewGridDialog.querySelector('span').textContent = '';
});

minimizeNewGridDialog.addEventListener('mouseleave', () => {
  minimizeNewGridDialog.querySelector('span').textContent = '';
});

closeColorPicker.addEventListener('click', () => {
  colorPickerPopupContainer.classList.add('invisible');
});

minimizeColorPicker.addEventListener('click', () => {
  colorPickerPopupContainer.classList.add('invisible');
});

minimizeNewGridDialog.addEventListener('click', () => {
  newGridDialog.close();
});

newGridDialog.addEventListener('keydown', event => {
  if (event.key === 'Escape') newGridMouseDown = false;
});

const createPrevColor = function createPreviousColorIfExistsRemovePrevious(color) {
  let isUnique;
  const previousColor = document.createElement('div');
  previousColor.classList.add('previous-color');
  if (hex_is_dark(color)) previousColor.classList.add('previous-color-dark');
  previousColor.style.backgroundColor = color;
  previousColorsArray.forEach(element => {
    if (previousColor.style.backgroundColor === element.style.backgroundColor) {
      element.remove();
    }
  });
  previousColorsContainer.prepend(previousColor);
  previousColorsArray.push(previousColor);
}

newGridDialog.addEventListener('submit', event => {
  event.preventDefault();
  const rows = newGridDialog.querySelector('form').elements['rows'].value;
  const columns = newGridDialog.querySelector('form').elements['columns'].value;

  thisGrid.forEach(row => {
    row.remove();
  });

  if (rows != '' && columns != '') {
    thisGrid = createGrid(rows, columns);
  } else {
    thisGrid = createGrid(16, 16);
    wholeGrid.style.setProperty('--grid-item-size', '0.9rem');
  }

  newGridDialog.querySelector('form').reset();
  newGridDialog.close();
});

gridSizeInput.addEventListener('input', () => {
    wholeGrid.style.setProperty('--grid-item-size', `${gridSizeInput.value}px`);
});

colorPickerBtn.addEventListener('click', () => {
  colorPickerPopupContainer.classList.toggle('invisible');
  toolbar.classList.remove('focused');
  colorPickerPopupContainer.classList.add('focused');
});

toolbar.addEventListener('mousedown', () => {
  colorPickerPopupContainer.classList.remove('focused');
  toolbar.classList.add('focused');
});

const saveGrid = () => {
    const cells = Array.from(document.querySelectorAll(".item-flexbox"));
    const data = cells.map(cell => cell.style.backgroundColor || null);
    const rows = thisGrid.length;
    const cols = thisGrid[0].children.length;
    localStorage.setItem("gridData", JSON.stringify({ rows, cols, data }));
};

const loadGrid = () => {
  const saved = JSON.parse(localStorage.getItem("gridData"));

  if (!saved) return false;

  thisGrid.forEach(row => row.remove());
  thisGrid = createGrid(saved.rows, saved.cols);
  const flatCells = document.querySelectorAll(".item-flexbox");

  flatCells.forEach((cell, i) => {
    const color = saved.data[i];
    if (color) cell.style.backgroundColor = color;
  });

  return true;
};

const showSuccessMessage = function displaySuccessMessageOptionalCustomString(str = successMessage.querySelector('p').textContent) {
  successMessage.querySelector('p').textContent = str;
  successMessage.style.display = 'flex';
  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 4000);
}

const showErrorMessage = function displayErrorMessageOptionalCustomString(str = errorMessage.querySelector('p').textContent) {
  errorMessage.querySelector('p').textContent = str;
  errorMessage.style.display = 'flex';
  setTimeout(() => {
    errorMessage.style.display = 'none';
  }, 4000);
}

saveGridBtn.addEventListener('click', function() {
  saveGrid('Successfully Saved');
  showSuccessMessage('Successfully Loaded');
});

loadGridBtn.addEventListener('click', function() {
  if (!loadGrid()) {
    showErrorMessage('Couldn\'t Load');
  } else {
    showSuccessMessage('Successfully Loaded');
  }
});
