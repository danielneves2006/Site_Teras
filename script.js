let projetos = [
    {
        img:"../img/Projetos/CapyRunnerEducacionalPage.png",
        link:"../2-CapyRunnerEducacional/CapyRunnerEducacional.html"
    },
    {
        img:"../img/Projetos/MiautemagicaPage.png",
        link:"../1-Miautemagica/Miautemagica.html"
    },
    {
        img:"../img/Projetos/TresCapivarinhasPage.png",
        link:"../3-TresCapivarinhas/TresCapivarinhas.html"
    },
    {
        img:"../img/Projetos/CapyRunnerPage.png",
        link:"../4-CapyRunner/CapyRunnerIndex.html"
    },
    {
        img:"../img/Projetos/DimGonPage.png",
        link:"../5-DimGon/DinGon.html"
    }
]

let index = 1

function mover(direcao){

    let imgs = document.querySelectorAll(".item img")
    let centro = document.querySelector(".centro img")

    let animacao = direcao === 1 ? "move-direita" : "move-esquerda"

    /* fade em todas */
    imgs.forEach(img=>{
        img.classList.add("fade")
    })

    /* animação só no centro */
    centro.classList.add(animacao)

    setTimeout(()=>{

        index += direcao

        if(index < 0){
            index = projetos.length - 1
        }

        if(index >= projetos.length){
            index = 0
        }

        let esquerda = (index - 1 + projetos.length) % projetos.length
        let direita = (index + 1) % projetos.length

        document.querySelector(".esquerda img").src = projetos[esquerda].img
        document.querySelector(".centro img").src = projetos[index].img
        document.querySelector(".direita img").src = projetos[direita].img

        document.querySelector(".esquerda").href = projetos[esquerda].link
        document.querySelector(".centro").href = projetos[index].link
        document.querySelector(".direita").href = projetos[direita].link

        imgs.forEach(img=>{
            img.classList.remove("fade")
        })

        centro.classList.remove("move-direita")
        centro.classList.remove("move-esquerda")

    },350)
}