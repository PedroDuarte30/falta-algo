const categoryWrapper = document.getElementById('category-wrapper');
const itemForm = document.getElementById('item-form');
const imtemInput = document.getElementById('item-input');

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

};

function renderizarInventário() {
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
                li.classList.toggle('selected');
            });

            // Add the LI inside the UL
            list.appendChild(li);
        });

        //Close the structure: UL goes into the Group, Group goes into the Wrapper
        group.appendChild(list);
        categoryWrapper.appendChild(group);
        
    }
}

renderizarInventário();
