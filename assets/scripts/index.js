const mainElement = document.querySelector('main#flexbox-16x16');

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

const createGrid = function create16x16GridOfPredefinedVariables() {
  for (let i = 0; i < 4; i++) { 
    const flexboxRowElement = flexboxRow(mainElement);
    for (let i = 0; i < 4; i++) {
      itemFlexbox(flexboxRowElement);
    }
  }
}

createGrid();

const itemFlexboxes = Array.from(document.querySelectorAll('main#flexbox-16x16 .horizontal-flexbox .item-flexbox'));

itemFlexboxes.forEach(itemFlexbox => {
  itemFlexbox.addEventListener('mouseover', () => {
    itemFlexbox.classList.add('background-darkblue');
    setTimeout(() => {
      itemFlexbox.classList.remove('background-darkblue');
    }, 1000);
  });
});

