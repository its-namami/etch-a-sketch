// TO-DO: Add Dialog
// Add possibility to change each grid height
// Add Preview to the Dialog
const wholeGrid = document.querySelector('div#flexbox-16x16');
const newGridBtn = document.querySelector('button#invoke-choosing-new-grid');
const newGridDialog = document.querySelector('dialog#new-grid-dialog');
const closeNewGridDialog = document.querySelector('dialog#new-grid-dialog .close-dialog');

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

  const itemFlexboxes = Array.from(document.querySelectorAll('div#flexbox-16x16 .horizontal-flexbox .item-flexbox'));

  itemFlexboxes.forEach(itemFlexbox => {
    itemFlexbox.addEventListener('mousedown', () => {
      itemFlexbox.classList.add('background-darkblue');
    });

    itemFlexbox.addEventListener('mousemove', () => {
      if (mouseDown) {
	itemFlexbox.classList.add('background-darkblue');
      }
    });
  });

  return flexboxArray;
}

let thisGrid = createGrid(16, 32);


let mouseDown = false;
let drawMode = true;
let eraseMode = false;

document.addEventListener('mousedown', () => {
  mouseDown = true;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});
newGridBtn.addEventListener('click', () => {
  newGridDialog.showModal();
});

closeNewGridDialog.addEventListener('mouseenter', () => {
  closeNewGridDialog.querySelector('span').textContent = '󰅙';
});

closeNewGridDialog.addEventListener('mouseleave', () => {
  closeNewGridDialog.querySelector('span').textContent = '󰻂';
});

closeNewGridDialog.addEventListener('click', () => {
  newGridDialog.close();
});

newGridDialog.addEventListener('submit', event => {
  event.preventDefault();
  const rows = newGridDialog.querySelector('form').elements['rows'].value;
  const columns = newGridDialog.querySelector('form').elements['columns'].value;
  thisGrid.forEach(row => {
    row.remove();
  });
  thisGrid = createGrid(rows, columns);
  newGridDialog.close();

});

