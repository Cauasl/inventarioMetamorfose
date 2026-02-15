
function apagarDados() {
    localStorage.removeItem('inventarioJogador');
    localStorage.removeItem('pesoMochila');
    localStorage.removeItem('nome');
    localStorage.removeItem('vida');
    //localStorage.removeItem('');
}

//Coloca o peso da mochila na tela
let pesoTotal = document.getElementById('peso');
let numID = -1;

let pesoMochila = Number(localStorage.getItem('pesoMochila'));
let itensInventario = JSON.parse(localStorage.getItem('inventarioJogador'));
console.log(itensInventario);

function dadosExistente() { //Verifica se exite informações sobre o personagem no navegador
    let nomePerssona = localStorage.getItem('nome');
    let vidaerssona = localStorage.getItem('vida');
    
    if(nomePerssona != null && vidaerssona != null) {
        console.log('foi');
        return true;
    }else {
        return false;
    }
    
}

function salvarDados() { //Salva os dados do usúario e inicia as outras informações
    let nome = document.getElementById('nomePersonagem').value;
    let vida = Number(document.getElementById('vidaPersonagem').value);

    if(nome != '' && vida != null && !dadosExistente()) {
        localStorage.setItem('nome', nome);
        localStorage.setItem('vida', vida);
        localStorage.setItem('inventarioJogador', JSON.stringify([])); //Cria o armazenamento da mochila
            itensInventario = JSON.parse(localStorage.getItem('inventarioJogador'));
        localStorage.setItem('pesoMochila', 0); //Cria o peso da mochila
        console.log('Dados foram salvos');

        document.getElementById('subtituloNome').innerText = nome;
        document.getElementById('infoVida').innerText = vida + ' de vida';
    }else {
        alert('Insira as informações do personagem');
    }
}

function itens(nomeItem, pesoItem, val) { //Cria os elementos da lista
    let lista = document.getElementById('listaItens');
    
    let itemLista = document.createElement("li");
    let spanNome = document.createElement('span');
    let spanPeso = document.createElement('span');
    numID = val;

    itemLista.addEventListener('click', function() {
        numID = val;
        console.log(numID);
    });
    itemLista.setAttribute('id', numID);
    
    lista.appendChild(itemLista);
    itemLista.appendChild(spanNome);
    spanNome.innerText = nomeItem;
    itemLista.appendChild(spanPeso);
    spanPeso.innerText = pesoItem;
}


document.getElementById('botaoIncluirItem').addEventListener("click", function() { //Botão de adicionar itens
    //Pega as informações do item adicionado
    let nomeItem = document.getElementById('textNameItem').value
    let pesoItem = Number(document.getElementById('numberPesoItem').value)
    let res;

    //Adiciona o peso do item a mochila e atualiza a informação no navegador
    pesoMochila += pesoItem;
    localStorage.setItem('pesoMochila', pesoMochila);
    pesoTotal.innerText = "Peso: " + pesoMochila + 'kg';

    //Informação vizual do peso da mochila
    if(pesoMochila == 20) {
        pesoTotal.style.color = 'orange';
    }else if(pesoMochila > 20) {
        pesoTotal.style.color = 'red';
    }

    //Adiciona o item ao inventario da mochila no navegador
    itensInventario.push({
        nome: nomeItem,
        peso: pesoItem,
        id: itensInventario.length
    })
    localStorage.setItem('inventarioJogador', JSON.stringify(itensInventario));
    console.log(itensInventario);



    if(nomeItem != '' && pesoItem != '') { //Só adiciona o item se os inputs não estiverem vazios
        res = itensInventario.length - 1
        itens(nomeItem, pesoItem, itensInventario[res].id);
    }  
});

function removerItem() {
    let lista = document.getElementById('listaItens');
    let item = document.getElementById(String(numID));
    if(numID > -1) {
        lista.removeChild(item);
        numID = -1;
    }
}


if(itensInventario != null && dadosExistente()) { //Coloca as informações no site
    for(let i=0; i < itensInventario.length; i++) {
        itens(itensInventario[i].nome, itensInventario[i].peso, itensInventario[i].id)
    }
    document.getElementById('peso').innerText = "Peso: " + pesoMochila + 'kg';

    //Informação vizual do peso da mochila
    if(pesoMochila == 20) {
        pesoTotal.style.color = 'orange';
    }else if(pesoMochila > 20) {
        pesoTotal.style.color = 'red';
    }

    document.getElementById('subtituloNome').innerText = localStorage.getItem('nome');
    document.getElementById('infoVida').innerText = localStorage.getItem('vida') + ' de vida';
}