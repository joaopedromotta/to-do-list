//Itens de referencias
const formulario = document.getElementById("formulario");
const containerMain = document.getElementById("container__main")
const lista = document.getElementById("lista-impirica");
const subtitulo = document.querySelector(".lista-vazia");

//Itens de consultoria
let carregamentoMemoria = JSON.parse(localStorage.getItem("lista")) || [];
const dataCompleta = () => {
    const data = new Date();
    return `${data.toLocaleDateString()} ás ${data.toLocaleTimeString("pt-br")}`
};

//Atualizar memoria 
const atualizarMemoria = () => { localStorage.setItem("lista", JSON.stringify(carregamentoMemoria)); };

// Renderizador da lista de itens
function renderLista() {
    if (carregamentoMemoria.length >= 1) {
        subtitulo.classList.add("hidden");
        lista.classList.remove("hidden");
        lista.innerHTML = "";
        for (let i = 0; i < carregamentoMemoria.length; i++) {
            criarListaItem(carregamentoMemoria[i]);
        };
    } else {
        lista.classList.add("hidden");
        subtitulo.classList.remove("hidden")
        lista.innerHTML = "";
    };
};

// Criador de Item da lista
function criarListaItem(item) {
    // Lista de elementos de criação
    const listaItem = document.createElement("li");
    const containerLista = document.createElement("div");
    const inputLista = document.createElement("input");
    const labelLista = document.createElement("label");
    const dataLista = document.createElement("p");
    const botao = document.createElement("button");
    const iconeImg = document.createElement("img");

    // Lista de atribuições
    listaItem.classList.add("lista__item");
    containerLista.classList.add("lista__item-checkbox");
    inputLista.type = "checkbox"
    dataLista.classList.add("lista__item-data");
    botao.classList.add("lista__item-botao");
    iconeImg.src = "assets/excluir.png";
    // Fim das atribuições

    // Lista de ligações
    lista.appendChild(listaItem);
    listaItem.appendChild(containerLista);
    listaItem.appendChild(dataLista);
    containerLista.appendChild(inputLista);
    containerLista.appendChild(labelLista);
    listaItem.appendChild(botao);
    botao.appendChild(iconeImg);
    // Fim de ligações
    labelLista.innerHTML = item.titulo
    dataLista.innerHTML = item.data;

    if (item.concluido === true) {
        labelLista.style.textDecorationLine = "line-through"
        inputLista.checked = true
    };

    // Escutadores de evento
    inputLista.addEventListener("change", () => {
        let finalizado = item.concluido ? false : true;
        const campoMarcado = carregamentoMemoria.find((memoria) => memoria.id === item.id);
        if (campoMarcado) {
            carregamentoMemoria.map((memoria) => {
                if (memoria.id === item.id) {
                    item.concluido = finalizado;
                };
            });
            atualizarMemoria();
        };
        renderLista();
    });

    botao.addEventListener("click", () => {
        carregamentoMemoria = carregamentoMemoria.filter((itens) => itens.id !== item.id);
        atualizarMemoria();
        renderLista();
    });

};


// Formulario 
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let contador = carregamentoMemoria.length + 1
    const valorFormulario = document.getElementById("campo_buscativo").value;
    if (valorFormulario.trim() !== "" && valorFormulario.length <= 30) {
        const valores = {
            id: contador,
            titulo: valorFormulario,
            data: dataCompleta(),
            concluido: false
        }
        // Locação de memoria
        carregamentoMemoria.push(valores)
        atualizarMemoria();
    };
    //Fazendo um "Return" depois de tudo feito
    renderLista();
});

//Inicialização da lista
renderLista();