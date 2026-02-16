
function apagarDados() {
    localStorage.removeItem('inventarioJogador');
    localStorage.removeItem('pesoMochila');
    localStorage.removeItem('nome');
    localStorage.removeItem('vida-max');
    localStorage.removeItem('vidaAtual');
}

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

    if(nomeItem != '' && pesoItem != '' && dadosExistente()) { //Só adiciona o item se os inputs não estiverem vazios

        controleVidaPersonagem(); //Adiciona função aos botões de controle de vida do personagem
        
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
        
        res = itensInventario.length - 1;
        itens(nomeItem, pesoItem, itensInventario[res].id);
        console.log(itensInventario);
    }else {
       alert('Insira as informações do personagem'); 
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

if(itensInventario != null && dadosExistente()) { //Coloca as informações no site
    //Coloca os itens do inventario na tela
    for(let i=0; i < itensInventario.length; i++) {
        itens(itensInventario[i].nome, itensInventario[i].peso, itensInventario[i].id)
    }
    document.getElementById('peso').innerText = "Peso: " + pesoMochila + 'kg';

    controleVidaPersonagem();

    //Informação vizual do peso da mochila
    if(pesoMochila == 20) {
        pesoTotal.style.color = 'orange';
    }else if(pesoMochila > 20) {
        pesoTotal.style.color = 'red';
    }

    document.getElementById('subtituloNome').innerText = localStorage.getItem('nome');
    if(localStorage.getItem('vidaAtual') == null) {
        document.getElementById('infoVida').innerText = localStorage.getItem('vida-max') + ' de vida';
    }else {
        document.getElementById('infoVida').innerText = localStorage.getItem('vidaAtual') + ' de vida';
    }
    
    
    //Apagando formulario
    document.getElementById('corpo').removeChild(document.getElementById('formulario'));
}