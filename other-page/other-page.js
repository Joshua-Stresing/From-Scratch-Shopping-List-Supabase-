import { checkAuth, completeNeed, createNeed, deleteList, getNeeds, logout } from '../fetch-utils.js';
import { renderList } from '../render-utils.js';

const logoutButton = document.getElementById('logout');
const form = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete');
const listEl = document.querySelector('.list');

checkAuth();

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    const formData = new FormData(form);
    const need = formData.get('need');

    await createNeed(need);

    form.reset();
    displayNeeds();
});

async function displayNeeds() {
    const needs = await getNeeds();
    listEl.textContent = '';
    for (let need of needs) {
        const listEl = renderList(need);
        listEl.addEventListener('click', async () => {
            await completeNeed(need.id);
            displayNeeds();
        });
        listEl.append(listEl);
    }
}

window.addEventListener('load', async () => {
    displayNeeds();
});

logoutButton.addEventListener('click', async () => {
    console.log('click');
    await logout();
});

deleteButton.addEventListener('click', async () =>{
    await deleteList();
    displayNeeds();
});