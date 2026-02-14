
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
