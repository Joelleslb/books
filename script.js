let items = [];
const itemsList = document.getElementById('items-list');

document.addEventListener('DOMContentLoaded', function() {
    // Display the Saved Items
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
        items = JSON.parse(savedItems);
        items.forEach(function(item) {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');

            if (item.category === "movie") {
                itemDiv.classList.add("movie-item");
            } else if (item.category === "book") {
                itemDiv.classList.add("book-item");
            }

            const titleSpan = document.createElement('span');
            titleSpan.textContent = item.title;
            itemDiv.appendChild(titleSpan);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete');
            itemDiv.appendChild(deleteBtn);

            itemsList.appendChild(itemDiv);

            deleteBtn.addEventListener('click', function() {
                itemsList.removeChild(itemDiv);
                items = items.filter(i => i.title !== item.title);
                localStorage.setItem('items', JSON.stringify(items));
            })
        })
    }

    // Display the Username
    const nameInput = document.getElementById('name');
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        nameInput.value = savedUsername;
    }

    const form = document.getElementById('new-item-form');
    const contentInput = document.getElementById('content');
    const movie = document.getElementById('category1');
    const book = document.getElementById('category2');

    nameInput.addEventListener('input', function() {
        localStorage.setItem('username', nameInput.value);
    });
    
    // Handling Form Submition
    form.addEventListener('submit', e => {
        e.preventDefault();

        const title = contentInput.value.trim();
        const selectedCategory = document.querySelector('input[name="category"]:checked');

        if (!title || !selectedCategory) {
            alert('Please enter a title and select a category!');
            return;
        }

        const category = selectedCategory.value;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        if (category === "movie") {
            itemDiv.classList.add("movie-item");
        } else if (category === "book") {
            itemDiv.classList.add("book-item");
        }

        const titleSpan = document.createElement('span');
        titleSpan.textContent = title;
        itemDiv.appendChild(titleSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete');
        itemDiv.appendChild(deleteBtn);

        itemsList.appendChild(itemDiv);

        contentInput.value = '';
        document.querySelector('input[name="category"]:checked').checked = false;

        deleteBtn.addEventListener('click', function() {
            itemsList.removeChild(itemDiv);
        })

        items.push({ title: title, category: category });
        localStorage.setItem('items', JSON.stringify(items));

    })
})

