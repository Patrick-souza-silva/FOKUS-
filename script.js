
// pegando classe button e atribuindo a uma variável  BUTTON
var button = document.getElementsByClassName("btn")
//Fazendo uma condição para percorrer todos os BUTTON
for (var i = 0; i < button.length; i++){
    //Função para pegar o botão selcionado e adicionar um evento de click
    button[i].addEventListener("click", function(){
        //Evento de click vai direcionar para uma aba fora da página
        var url = "https://wa.me/5546988090298?text=Ol%C3%A1%20equipe%20Ca-F%C3%89!%20%E2%98%95"
        window.open(url, "_blank");
    })
}

