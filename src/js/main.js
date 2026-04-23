const categoryWrapper = document.getElementById('category-wrapper');
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const categorySelect = document.getElementById('category-select');

const inventarioBase = {
    "Laticínios e Ovos 🥚 🥛": [
        "Leite", 
        "Leite Achocolatado", 
        "Iogurtes", 
        "Manteiga", 
        "Ovos", 
        "Queijo", 
        "Fiambre"
    ],
    "Frutas & Vegetais 🍎": [
        "Maçãs", 
        "Pêras", 
        "Bananas", 
        "Fruta da Época", 
        "Saladas", 
        "Tomate", 
        "Pepino", 
        "Cebola"
    ],
    "Talho 🥩": [
        "Frango", 
        "Bifes de Peru", 
        "Peito de Frango", 
        "Carne Picada", 
        "Hambúrguer"
    ],
    "Congelados 🥶": [
        "Nuggets", 
        "Douradinhos", 
        "Brócolos", 
        "Couve Flor", 
        "Feijão verde"
    ],
    "Mercearia 🧺": [
        "Cereais", 
        "Arroz", 
        "Massa", 
        "Farinha", 
        "Azeite", 
        "Conservas",
        "Temperos e Sal",
        "Chocolate de Barrar", 
        "Açúcar"
    ],

    "Higiene 🧼 e Limpeza 🫧": [
        "Champôs e Condicionadores", 
        "Gel de banho", 
        "Papel Higiénico", 
        "Pasta de Dentes"
    ],

    "Extras ✨": [

    ]
};

function renderizarInventario() {
    categoryWrapper.innerHTML = '';

    for (const categoria in inventarioBase) {
        const group = document.createElement('div');
        group.className = 'category-group';

        const title = document.createElement('h2');
        title.textContent = categoria;
        group.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'items-container';

        inventarioBase[categoria].forEach(item => {
            const li = document.createElement('li');
            li.className = 'inventory-item';
            li.innerHTML = `<span>${item}</span>`;

            li.addEventListener('click', () => {
                if (!li.classList.contains('missing') && !li.classList.contains('checked')) {
                    li.classList.add('missing');
                } else if (li.classList.contains('missing')) {
                    li.classList.remove('missing');
                    li.classList.add('checked');
                } else {
                    li.classList.remove('checked');
                }
                guardarlocalStorage(); // Guarda sempre que mudas a cor
            });
            list.appendChild(li);
        });

        group.appendChild(list);
        categoryWrapper.appendChild(group);
    }
}

itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const valor = itemInput.value.trim();
    const categoriaEscolhida = categorySelect.value;

    if (valor !== "") {
        if (inventarioBase[categoriaEscolhida]) {
            inventarioBase[categoriaEscolhida].push(valor);
            itemInput.value = "";
            renderizarInventario();
            itemInput.focus();
            guardarlocalStorage(); // Guarda o novo item adicionado
        } else {
            console.error("Categoria não encontrada:" + categoriaEscolhida);
        }
    }
});

function guardarlocalStorage() {
    // Guarda a lista de nomes (incluindo os extras novos)
    localStorage.setItem('meuInventario', JSON.stringify(inventarioBase));

    // Guarda os estados das cores
    const estados = {};
    document.querySelectorAll('.inventory-item').forEach(li => {
        const nome = li.querySelector('span').textContent;
        if (li.classList.contains('missing')) {
            estados[nome] = 'missing';
        } else if (li.classList.contains('checked')) {
            estados[nome] = 'checked';
        }
    });
    localStorage.setItem('meuInventario_estados', JSON.stringify(estados));
}

function carregarLocalStorage() {
    const dadosSalvos = localStorage.getItem('meuInventario');
    const estadosSalvos = JSON.parse(localStorage.getItem('meuInventario_estados')) || {};

    if (dadosSalvos) {
        const inventarioRecuperado = JSON.parse(dadosSalvos);
        for (const cat in inventarioRecuperado) {
            inventarioBase[cat] = inventarioRecuperado[cat];
        }
    }

    // Desenha a interface com os itens carregados
    renderizarInventario();

    // Aplica as cores guardadas aos itens que acabaram de ser criados
    document.querySelectorAll('.inventory-item').forEach(li => {
        const nome = li.querySelector('span').textContent;
        if (estadosSalvos[nome]) {
            li.classList.add(estadosSalvos[nome]);
        }
    });
}

// Inicializa a aplicação carregando os dados da memória
carregarLocalStorage();