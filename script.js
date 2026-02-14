
function salvarDados() {
    let nome = document.getElementById('nomePersonagem').value;
    let vida = Number(document.getElementById('vidaPersonagem').value);

    if(nome != '' && vida != '') {
        localStorage.setItem('nome', nome);
        localStorage.setItem('vida', vida);
    }else {
        alert('Insira as informações do personagem');
    }
}

function itens(nomeItem, pesoItem) {
    let lista = document.getElementById('listaItens');
    
    let itemLista = document.createElement("li");
    let spanNome = document.createElement('span');
    let spanPeso = document.createElement('span');
    
    lista.appendChild(itemLista);
    itemLista.appendChild(spanNome);
    spanNome.innerText = nomeItem;
    itemLista.appendChild(spanPeso);
    spanPeso.innerText = pesoItem;
}

document.getElementById('botaoIncluirItem').addEventListener("click", function() {
    let nomeItem = document.getElementById('textNameItem').value
    let pesoItem = document.getElementById('numberPesoItem').value
    
    
    
    itens(nomeItem, pesoItem);
});