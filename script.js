document.addEventListener('DOMContentLoaded', function () {

    // Menu Hamburger Mobile
    const hamburger = document.getElementById('menuHamburger');
    const navElement = document.getElementById('navElement');
    hamburger?.addEventListener('click', function () {
        this.classList.toggle('aberto');
        navElement.classList.toggle('aberto');
    });
    document.querySelectorAll('#navElement a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('aberto');
            navElement?.classList.remove('aberto');
        });
    });

    // Modal Fale Conosco
    const overlay = document.getElementById('modalOverlay');
    const btnAbrir = document.getElementById('btnAbrirForm');
    const btnFechar = document.getElementById('modalFechar');
    const form = document.getElementById('faleConoscoForm');

    btnAbrir?.addEventListener('click', () => overlay.classList.add('ativo'));
    btnFechar?.addEventListener('click', () => overlay.classList.remove('ativo'));
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('ativo');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay?.classList.remove('ativo');
    });
    form?.addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('formNome').value;
        const email = document.getElementById('formEmail').value;
        const mensagem = document.getElementById('formMensagem').value;
        const subject = encodeURIComponent(`Contato de ${nome} - Site Téras Studio`);
        const body = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`);
        window.location.href = `mailto:terasstudio08@gmail.com?subject=${subject}&body=${body}`;
    });

    // Carrossel Serviços Prestados
    const slidesServicos = document.querySelectorAll('.servicoSlide');
    const dotsServicos = document.getElementById('servicosDots');
    if (slidesServicos.length > 0 && dotsServicos) {
        let atualServico = 0;
        slidesServicos.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' ativo' : '');
            dot.setAttribute('aria-label', `Serviço ${i + 1}`);
            dot.addEventListener('click', () => irParaServico(i));
            dotsServicos.appendChild(dot);
        });
        function irParaServico(index) {
            slidesServicos[atualServico].classList.remove('ativo');
            dotsServicos.children[atualServico].classList.remove('ativo');
            atualServico = (index + slidesServicos.length) % slidesServicos.length;
            slidesServicos[atualServico].classList.add('ativo');
            dotsServicos.children[atualServico].classList.add('ativo');
        }
        document.getElementById('servicosPrev')?.addEventListener('click', () => irParaServico(atualServico - 1));
        document.getElementById('servicosNext')?.addEventListener('click', () => irParaServico(atualServico + 1));
        const carServicos = document.getElementById('servicosCarousel');
        let tXs = 0;
        carServicos?.addEventListener('touchstart', e => { tXs = e.touches[0].clientX; }, { passive: true });
        carServicos?.addEventListener('touchend', e => {
            const diff = tXs - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) irParaServico(atualServico + (diff > 0 ? 1 : -1));
        });
        setInterval(() => irParaServico(atualServico + 1), 6000);
    }

});

// Carrossel Conquistas
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.conquistaSlide');
    const dotsContainer = document.getElementById('conquistasDots');

    if (slides.length === 0 || !dotsContainer) return;

    let atual = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' ativo' : '');
        dot.setAttribute('aria-label', `Conquista ${i + 1}`);
        dot.addEventListener('click', () => irPara(i));
        dotsContainer.appendChild(dot);
    });

    function irPara(index) {
        slides[atual].classList.remove('ativo');
        dotsContainer.children[atual].classList.remove('ativo');
        atual = (index + slides.length) % slides.length;
        slides[atual].classList.add('ativo');
        dotsContainer.children[atual].classList.add('ativo');
    }

    document.getElementById('conquistasPrev')?.addEventListener('click', () => irPara(atual - 1));
    document.getElementById('conquistasNext')?.addEventListener('click', () => irPara(atual + 1));

    // Swipe touch
    let tX = 0;
    const carousel = document.getElementById('conquistasCarousel');
    carousel?.addEventListener('touchstart', e => { tX = e.touches[0].clientX; }, { passive: true });
    carousel?.addEventListener('touchend', e => {
        const diff = tX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) irPara(atual + (diff > 0 ? 1 : -1));
    });

    // Auto-play a cada 5s
    setInterval(() => irPara(atual + 1), 5000);
});

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