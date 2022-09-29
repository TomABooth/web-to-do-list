/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem } from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const itemList = document.getElementById('item-list');
const errorDisplay = document.getElementById('error-display');

/* State */
let items = [];
let error = null;

/* Events */

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        addItemForm.reset();
    }
});
/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = 'error';
    }
}

function displayItems() {
    itemList.innerHTML = '';

    if (error) {
        displayError();
    } else {
        for (const item of items) {
            const itemEl = renderItem(item);
            itemList.append(itemEl);
            // displayItems();

            /* 
            itemEl.addEventListener('click', async () => {
                const response = await buyItem(item.id);
                error = response.error;
                const updatedItem = response.data;
    
                if (error) {
                    displayError();
                } else {
                    const index = items.indexOf(item);
                    items[index] = updatedItem;
                    displayItems();
                }
            });  
            */
        }
    }
}

function renderItem(item) {
    const li = document.createElement('li');
    const p = document.createElement('p');

    p.textContent = `${item.quantity} ${item.item}`;
    li.append(p);

    return li;
}
