function controleAba() {
    let aba_selecionada = document.getElementsByName('abas');
    console.clear();
    console.log(aba_selecionada);
    aba_selecionada.forEach(function(elemento, i) {
        //console.log(i + ' ' + elemento.checked);
        if(i == 0 && elemento.checked) {
            console.log('Aba 1 está ' + elemento.checked);
            document.getElementById('containerAba1').classList.remove('conteudoAbaFechado');
            document.getElementById('containerAba2').classList.add('conteudoAbaFechado');
        }else if (i == 1 && elemento.checked) {
            console.log('Aba 2 está ' + elemento.checked);
            document.getElementById('containerAba1').classList.add('conteudoAbaFechado');
            document.getElementById('containerAba2').classList.remove('conteudoAbaFechado');
        }
    })
}