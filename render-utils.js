export function renderList(need) {
    const div = document.createElement('p');
    const p = document.createElement('p');

    div.classList.add(need.complete ? 'complete' : 'incomplete');
    div.classList.add('need');

    p.textContent = need.need;

    div.append(p);
    return div;
}