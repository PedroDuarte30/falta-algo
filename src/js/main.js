const categoryWrapper = document.getElementById('category-wrapper');
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const categorySelect = document.getElementById('category-select');

let baseInventory = {
    "Laticínios e Ovos 🥚 🥛": ["Leite", "Leite Achocolatado", "Iogurtes", "Manteiga", "Ovos", "Queijo", "Natas"],
    "Frutas & Vegetais 🍎": ["Maçãs", "Pêras", "Bananas", "Fruta da Época", "Saladas", "Tomate", "Pepino"],
    "Talho 🥩": ["Frango", "Bifes de Peru", "Peito de Frango", "Carne Picada", "Hambúrguer"],
    "Charcutaria 🥓": ["Fiambre", "Bacon"],
    "Congelados 🥶": ["Nuggets", "Coxinhas", "Brócolos", "Couve Flor", "Feijão verde", "Salteado batata e salsicha"],
    "Mercearia 🧺": ["Cereais", "Arroz", "Massa", "Farinha", "Azeite", "Conservas", "Pão", "Bolachas", "Pães de leite", "Madalenas", "Croissant", "Polpa de tomate"],
    "Higiene 🧼 e Limpeza 🫧": ["Champôs e Condicionadores", "Gel de banho", "Papel Higiénico", "Pasta de Dentes", "Esfregonas", "Gel WC", "Esponjas", "Toalhetes limpa óculos"],
    "Essenciais ⭐": [],
};

let activeTab = 'inventory';

const tabInventory = document.createElement('button');
tabInventory.className = 'tab-btn active';
tabInventory.textContent = '📋 Inventário';

const tabEssentials = document.createElement('button');
tabEssentials.className = 'tab-btn';
tabEssentials.textContent = '⭐ Essenciais';

const main = document.querySelector('main');
const inventorySection = document.querySelector('#inventory-section');

// Dark Mode
const darkModeBtn = document.createElement('button');
darkModeBtn.className = 'dark-mode-btn';
darkModeBtn.innerHTML = '<i class="ri-moon-line"></i>';

darkModeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        darkModeBtn.innerHTML = '<i class="ri-sun-line"></i>';
    } else {
        darkModeBtn.innerHTML = '<i class="ri-moon-line"></i>';
    }
});
document.querySelector('header').appendChild(darkModeBtn);

const resetBtn = document.createElement('button');
resetBtn.className = "reset-button";
resetBtn.innerHTML = '<i class="ri-reset-right-fill"></i> Repor Lista';

resetBtn.addEventListener('click', () => {
    if (window.confirm("Tem a certeza que pretende repor a lista?")) {
        localStorage.removeItem('meuInventario');
        localStorage.removeItem('meuInventario_estados');
        location.reload();
    }
});

const navBar = document.createElement('div');
navBar.className = 'nav-bar';
navBar.appendChild(tabInventory);
navBar.appendChild(tabEssentials);
navBar.appendChild(resetBtn);
main.insertBefore(navBar, inventorySection);



function renderInventory() {
    categoryWrapper.innerHTML = '';

    const savedStates = JSON.parse(localStorage.getItem('meuInventario_estados')) || {};

    for (const category in baseInventory) {
        const group = document.createElement('div');
        group.className = 'category-group';
        if (category === 'Essenciais ⭐') {
            group.classList.add('category-essenciais');
        }

        const title = document.createElement('h2');
        title.textContent = category;
        group.appendChild(title);

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.innerHTML = '<i class="ri-arrow-down-s-line"></i>';
        title.appendChild(toggleBtn);

        title.addEventListener('click', () => {
            list.classList.toggle('collapsed');
            if (list.classList.contains('collapsed')) {
                toggleBtn.innerHTML = '<i class="ri-arrow-right-s-line"></i>';
            } else {
                toggleBtn.innerHTML = '<i class="ri-arrow-down-s-line"></i>';
            }
        });

        const list = document.createElement('ul');
        list.className = 'items-container';

        baseInventory[category].forEach((item) => {
            const li = document.createElement('li');
            li.className = 'inventory-item';
            li.innerHTML = `
                <span>${item}</span>
                <div class="item-actions">
                    <span class="item-status"></span>
                    <button class="remove-btn" aria-label="Remove ${item}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            `;

            if (savedStates[item]) {
                li.classList.add(savedStates[item]);
            }

            li.addEventListener('click', () => {
                if (!li.classList.contains('missing') && !li.classList.contains('checked')) {
                    li.classList.add('missing');
                } else if (li.classList.contains('missing')) {
                    li.classList.remove('missing');
                    li.classList.add('checked');
                } else {
                    li.classList.remove('checked');
                }
                saveToLocalStorage();
            });

            const removeBtn = li.querySelector('.remove-btn');
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                baseInventory[category] = baseInventory[category].filter((i) => i !== item);
                saveToLocalStorage();
                renderInventory();
            });

            list.appendChild(li);
        });

        group.appendChild(list);
        categoryWrapper.appendChild(group);
    }

    if (activeTab === 'essentials') {
        const groups = document.querySelectorAll('.category-group');
        groups.forEach(group => {
            if (group.classList.contains('category-essenciais')) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });
    } else {
        const groups = document.querySelectorAll('.category-group');
        groups.forEach(group => {
            if (group.classList.contains('category-essenciais')) {
                group.style.display = 'none';
            } else {
                group.style.display = 'block';
            }
        });
    }
}

function saveToLocalStorage() {
    localStorage.setItem('meuInventario', JSON.stringify(baseInventory));

    const states = {};
    document.querySelectorAll('.inventory-item').forEach(li => {
        const name = li.querySelector('span').textContent;
        if (li.classList.contains('missing')) {
            states[name] = 'missing';
        } else if (li.classList.contains('checked')) {
            states[name] = 'checked';
        }
    });
    localStorage.setItem('meuInventario_estados', JSON.stringify(states));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('meuInventario');

    if (savedData) {
        baseInventory = JSON.parse(savedData);
    }

    renderInventory();
}

itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const value = itemInput.value.trim();
    const selectedCategory = categorySelect.value;

    if (value !== "") {
        if (baseInventory[selectedCategory]) {
            baseInventory[selectedCategory].push(value);
            itemInput.value = "";
            saveToLocalStorage();
            renderInventory();
            itemInput.focus();
        }
    }
});

tabEssentials.addEventListener('click', () => {
    activeTab = 'essentials';
    const groups = document.querySelectorAll('.category-group');
    tabInventory.classList.remove('active');
    tabEssentials.classList.add('active');

    groups.forEach(group => {
        if (group.classList.contains('category-essenciais')) {
            group.style.display = 'block';
        } else {
            group.style.display = 'none';
        }
    });
});

tabInventory.addEventListener('click', () => {
    activeTab = 'inventory';
    const groups = document.querySelectorAll('.category-group');
    tabInventory.classList.add('active');
    tabEssentials.classList.remove('active');

    groups.forEach(group => {
        if (group.classList.contains('category-essenciais')) {
            group.style.display = 'none';
        } else {
            group.style.display = 'block';
        }
    });
});

loadFromLocalStorage();