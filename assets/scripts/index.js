const mainElement = document.querySelector('main#flexbox-16x16');

// Step 0: Create a flexbox inside a flexbox

const horizontalFlexbox = document.createElement('div');
horizontalFlexbox.classList.add('horizontal-flexbox');
mainElement.appendChild(horizontalFlexbox);

const itemFlexbox = document.createElement('div');
itemFlexbox.classList.add('item-flexbox');
horizontalFlexbox.appendChild(itemFlexbox);
horizontalFlexbox.appendChild(itemFlexbox);

// Step 1: Create 4 horizontal flexboxes


// Step 2: Create 4 items within the flexboxes
