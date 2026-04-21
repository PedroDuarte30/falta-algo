const categoryWrapper = document.getElementById('category-wrapper');
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');

const inventarioBase = {
    "Laticínios e Ovos 🥚 🥛":
        [
            "Leite",
            "Leite Achocolatado",
            "Iogurtes",
            "Manteiga",
            "Ovos",
            "Queijo",
            "Fiambre",
        ],

    "Frutas & Vegetais 🍎":
        [
            "Maçãs",
            "Pêras",
            "Bananas",
            "Fruta da Época",
            "Saladas",
            "Tomate",
            "Pepino",
            "Cebola"
        ],

    "Talho 🥩":
        [
            "Frango",
            "Bifes de Peru",
            "Peito de Frango",
            "Carne Picada",
            "Hambúrguer"
        ],

    "Congelados 🥶":
        [
            "Nuggets",
            "Douradinhos",
            "Brócolos",
            "Couve Flor",
            "Feijão verde"
        ],

    "Mercearia 🧺":
        [
            "Cereais",
            "Arroz",
            "Massa",
            "Farinha",
            "Azeite",
            "Conservas",
            "Temperos e Sal",
            "Chocolate de Barrar",
            "Açúcar",
        ],

    "Higiene 🧼 e Limpeza 🫧 ":
        [
            "Champôs e Condicionadores",
            "Gel de banho",
            "Papel Higiénico",
            "Pasta de Dentes"
        ],
    "Extras ✨":
        [
        
        ],
};

function renderizarInventario() {
    categoryWrapper.innerHTML = '';

    for (const categoria in inventarioBase) {
        //Create group 
        const group = document.createElement('div');
        group.className = 'category-group';

        //Create title
        const title = document.createElement('h2');
        title.textContent = categoria;
        group.appendChild(title);

        //Create the LIST (ul) that will hold the items in this category
        const list = document.createElement('ul');
        list.className = 'items-container';

        inventarioBase[categoria].forEach(item => {
            const li = document.createElement('li');
            li.className = 'inventory-item';
            li.innerHTML = `<span>${item}</span>`;

            /* Selection toggle */
            li.addEventListener('click', () => {
                if (!li.classList.contains('missing') && !li.classList.contains('checked')) {
                    li.classList.add('missing');
                }
                else if (li.classList.contains('missing')) {
                    li.classList.remove('missing');
                    li.classList.add('checked');
                }
                else {
                    li.classList.remove('checked');
                }
            });

            list.appendChild(li);
        });

        //Close the structure: UL goes into the Group, Group goes into the Wrapper
        group.appendChild(list);
        categoryWrapper.appendChild(group);
    }
}

renderizarInventario();

itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const valor = itemInput.value.trim();

    if(valor !== "") {
        inventarioBase["Extras ✨", "Laticínios e Ovos 🥚 🥛", "Frutas & Vegetais 🍎", "Talho 🥩", "Congelados 🥶", "Mercearia 🧺", "Higiene 🧼 e Limpeza 🫧"].push(valor);

        itemInput.value = "";

        renderizarInventario();

        itemInput.focus();
    }
})