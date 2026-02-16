
//Coloca o peso da mochila na tela
let pesoTotal = document.getElementById('peso');
let numID = -1;
let vidaAtual = Number(localStorage.getItem('vidaAtual'));

let pesoMochila = Number(localStorage.getItem('pesoMochila'));
let itensInventario = JSON.parse(localStorage.getItem('inventarioJogador'));
console.log(itensInventario);

function dadosExistente() { //Verifica se exite informações sobre o personagem no navegador
    let nomePerssona = localStorage.getItem('nome');
    let vidaerssona = localStorage.getItem('vida-max');
    
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
        localStorage.setItem('vida-max', vida);
        localStorage.setItem('inventarioJogador', JSON.stringify([])); //Cria o armazenamento da mochila
            itensInventario = JSON.parse(localStorage.getItem('inventarioJogador'));
        localStorage.setItem('pesoMochila', 0); //Cria o peso da mochila
        console.log('Dados foram salvos');

        document.getElementById('subtituloNome').innerText = nome;

        vidaAtual = vida;
        localStorage.setItem('vidaAtual', vida);
        document.getElementById('infoVida').innerText = vidaAtual + ' de vida';
        
        //Apagando formulario
        document.getElementById('corpo').removeChild(document.getElementById('formulario'));

        //Adiciona função aos botões de controle de vida do personagem
        controleVidaPersonagem();
    }else {
        alert('Insira as informações do personagem');
    }
}

function itens(nomeItem, pesoItem, val, num) { //Cria os elementos da lista
    let lista = document.getElementById('listaItens');
    
    let itemLista = document.createElement("li");
    let spanNome = document.createElement('span');
    let spanPeso = document.createElement('span');

    itemLista.addEventListener('click', function() {
        numID = num;
        console.log("ID do item: " + val);
        console.log('Número do item no inventario: ' + numID);
    });
    itemLista.setAttribute('id', val);
    
    lista.appendChild(itemLista);
    itemLista.appendChild(spanNome);
    spanNome.innerText = nomeItem;
    itemLista.appendChild(spanPeso);
    spanPeso.innerText = String(pesoItem).replace('.', ',');
}


document.getElementById('botaoIncluirItem').addEventListener("click", function() { //Botão de adicionar itens
    //Pega as informações do item adicionado
    let nomeItem = document.getElementById('textNameItem').value
    let pesoItem = Number(document.getElementById('numberPesoItem').value)
    let res;

    if(nomeItem != '' && pesoItem != '' && dadosExistente()) { //Só adiciona o item se os inputs não estiverem vazios
        
        //Adiciona o peso do item a mochila e atualiza a informação no navegador
        pesoMochila += pesoItem;
        localStorage.setItem('pesoMochila', pesoMochila);
        textoPeso()

        //Adiciona o item ao inventario da mochila no navegador
        itensInventario.push({
            nome: nomeItem,
            peso: pesoItem,
            id: String(nomeItem).toLocaleLowerCase().replace(/\s/g, '')
        })
        localStorage.setItem('inventarioJogador', JSON.stringify(itensInventario));
        
        res = itensInventario.length - 1;
        itens(nomeItem, pesoItem, nomeItem, res);
        console.log(itensInventario);
    }else if(!dadosExistente()) {
        alert('Insira as informações do personagem.'); 
    }else if(nomeItem == '' && pesoItem == '') {
        alert('Insira dados do item.');
    }else if(nomeItem === '(reset)') {
        alert('Dados apagados');
        localStorage.removeItem('inventarioJogador');
        localStorage.removeItem('pesoMochila');
        localStorage.removeItem('nome');
        localStorage.removeItem('vida-max');
        localStorage.removeItem('vidaAtual');
    }
});

function removerItem() {
    let lista = document.getElementById('listaItens');
    let item = document.getElementById(itensInventario[numID].id);
    let valItem = itensInventario[numID].peso;
    if(numID > -1) {
        pesoMochila -= valItem;
        localStorage.setItem('pesoMochila', pesoMochila);
        textoPeso();
        itensInventario.splice(numID, 1);
        localStorage.setItem('inventarioJogador', JSON.stringify(itensInventario));
        lista.removeChild(item);
        numID = -1;
        console.log(itensInventario);
    }
}

//Adiciona função aos botões de controle de vida do personagem
function controleVidaPersonagem() {
    const botaoControle = document.getElementsByName('botaoControle');
    const vidaMax = Number(localStorage.getItem('vida-max'));
    let val;
    for(let i=0; i < botaoControle.length; i++) {
        botaoControle[i].addEventListener('click', () => {
            val = Number(botaoControle[i].innerText);
            if(val > 0) {
                vidaAtual += val;
                if(vidaAtual > vidaMax) {
                    vidaAtual = vidaMax;
                }
                localStorage.setItem('vidaAtual', vidaAtual);
                document.getElementById('infoVida').innerText = vidaAtual + " de vida";
            }else {
                vidaAtual += val;
                if(vidaAtual < 0) {
                    vidaAtual = 0;
                }
                document.getElementById('infoVida').innerText = vidaAtual + " de vida";
                localStorage.setItem('vidaAtual', vidaAtual);
            }
        });
    }
}

function textoPeso() {
    //Informação vizual do peso da mochila
    if(pesoMochila == 20) {
        pesoTotal.style.color = 'orange';
    }else if(pesoMochila > 20) {
        pesoTotal.style.color = 'red';
    }
    pesoTotal.innerText = "Peso: " + String(pesoMochila).replace('.', ',') + 'kg';
}

if(itensInventario != null && dadosExistente()) { //Coloca as informações no site
    //Coloca os itens do inventario na tela
    for(let i=0; i < itensInventario.length; i++) {
        itens(itensInventario[i].nome, itensInventario[i].peso, itensInventario[i].id, i)
    }

    textoPeso()
    controleVidaPersonagem();


    document.getElementById('subtituloNome').innerText = localStorage.getItem('nome');
    if(localStorage.getItem('vidaAtual') == null) {
        document.getElementById('infoVida').innerText = localStorage.getItem('vida-max') + ' de vida';
    }else {
        document.getElementById('infoVida').innerText = localStorage.getItem('vidaAtual') + ' de vida';
    }
    
    
    //Apagando formulario
    document.getElementById('corpo').removeChild(document.getElementById('formulario'));
}