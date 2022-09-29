/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getItem, buyItem, deleteItem } from './fetch-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const itemList = document.getElementById('item-list');
const errorDisplay = document.getElementById('error-display');
const removeButton = document.getElementById('remove-button');

/* State */
let items = [];
let error = null;

/* Events */

window.addEventListener('load', async () => {
    const response = await getItem();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    }

    if (items) {
        displayItems();
    }
});

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

removeButton.addEventListener('click', async () => {
    const response = await deleteItem();
    error = response.error;

    if (error) {
        displayError();
    } else {
        items = [];
        displayItems();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayItems() {
    itemList.innerHTML = '';

    if (error) {
        displayError();
    } else {
        for (let item of items) {
            const itemEl = renderItem(item);
            itemList.append(itemEl);

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
        }
    }
}

function renderItem(item) {
    const li = document.createElement('li');

    if (item.bought) {
        li.classList.add('bought');
    }

    li.textContent = `${item.quantity} ${item.item}`;

    return li;
}
