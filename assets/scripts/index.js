// TO-DO: Add Dialog
// Add possibility to change each grid height
// Add Preview to the Dialog
const wholeGrid = document.querySelector('section#sketch-grid');
const newGridBtn = document.querySelector('button#invoke-choosing-new-grid');
const newGridDialog = document.querySelector('dialog#new-grid-dialog');
const closeNewGridDialog = document.querySelector('dialog#new-grid-dialog #close-new-grid-dialog-button');
const minimizeNewGridDialog = document.querySelector('dialog#new-grid-dialog #minimize-new-grid-dialog-button');
const toolbar = document.querySelector('#toolbar');
const toolbarDrag = document.querySelector('#toolbar-drag');
const drawModeBtn = document.querySelector('#draw-mode');
const eraseModeBtn = document.querySelector('#erase-mode');

let mouseDown = false;
let drawMode = false;
let eraseMode = false;
let isToolbarDragging = false
let offsetX;

drawModeBtn.addEventListener('click', () => {
  drawMode = true;
  eraseMode = false;
  drawModeBtn.classList.add('draw-active');
  eraseModeBtn.classList.remove('erase-active');
});

eraseModeBtn.addEventListener('click', () => {
  drawMode = false;
  eraseMode = true;
  drawModeBtn.classList.remove('draw-active');
  eraseModeBtn.classList.toggle('erase-active');
});

toolbarDrag.addEventListener('mousedown', e => {
  isToolbarDragging = true;
});

document.addEventListener('mousedown', e => {
  if (isToolbarDragging) {
    offsetX = (e.clientX - toolbar.getBoundingClientRect().left)
  }
});

document.addEventListener('mousemove', e => {
  if (isToolbarDragging) {
    toolbar.style.left = `${e.screenX - offsetX}px`;
    toolbar.style.top = `${e.screenY}px`;
  }
});

wholeGrid.addEventListener('mousedown', () => {
  mouseDown = true;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
  isToolbarDragging = false;
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

const createGrid = function createGridOfPredefinedVariables(rows, colons) {
  const flexboxArray = [];
  for (let i = 0; i < rows; i++) { 
    const flexboxRowElement = flexboxRow(wholeGrid);
    for (let i = 0; i < colons; i++) {
      itemFlexbox(flexboxRowElement);
    }
    flexboxArray.push(flexboxRowElement)
  }

  const itemFlexboxes = Array.from(document.querySelectorAll('section#sketch-grid .horizontal-flexbox .item-flexbox'));

  itemFlexboxes.forEach(itemFlexbox => {
    itemFlexbox.addEventListener('mousedown', () => {
      if (drawMode) itemFlexbox.classList.add('background-darkblue');
      if (eraseMode) itemFlexbox.classList.remove('background-darkblue');
    });

    itemFlexbox.addEventListener('mousemove', () => {
      if (mouseDown) {
	if (drawMode) itemFlexbox.classList.add('background-darkblue');
	if (eraseMode) itemFlexbox.classList.remove('background-darkblue');
      }
    });
  });

  return flexboxArray;
}

let thisGrid = createGrid(16, 16);

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

minimizeNewGridDialog.addEventListener('mouseenter', () => {
  minimizeNewGridDialog.querySelector('span').textContent = '';
});

minimizeNewGridDialog.addEventListener('mouseleave', () => {
  minimizeNewGridDialog.querySelector('span').textContent = '';
});

minimizeNewGridDialog.addEventListener('click', () => {
  newGridDialog.close();
});

newGridDialog.addEventListener('submit', event => {
  event.preventDefault();
  const rows = newGridDialog.querySelector('form').elements['rows'].value;
  const columns = newGridDialog.querySelector('form').elements['columns'].value;
  const gridItemSizeValue = newGridDialog.querySelector('form').elements['grid-item-size-value'].value;
  const gridItemSizeUnit = newGridDialog.querySelector('form').elements['grid-item-size-unit'].value;

  if (gridItemSizeValue != '') {
    wholeGrid.style.setProperty('--grid-item-size', `${gridItemSizeValue}${gridItemSizeUnit}`);
  } else {
    wholeGrid.style.setProperty('--grid-item-size', '0.9rem');
  }

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
