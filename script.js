document.addEventListener('DOMContentLoaded', () => {
    // Garante que o script só será executado depois que todo o HTML for carregado

    // -----------------------------------------------------
    // 1. CÓDIGO DO MODAL (FOTO DE PERFIL) E SCROLL DA HEADER
    // -----------------------------------------------------

    // Seleciona os elementos do Modal (o pop-up de imagem)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modal-img");
    const profileImg = document.getElementById("profile-img");
    const closeBtn = document.getElementsByClassName("close-btn")[0];

    // Lógica para abrir o modal ao clicar na imagem de perfil
    if (profileImg) {
        profileImg.onclick = function() {
            modal.style.display = "block"; // Torna o modal visível
            modalImg.src = this.src; // Define a imagem do modal como a imagem clicada
            modalImg.alt = this.alt; // Copia o texto alternativo (alt)
        }
    }

    // Lógica para fechar o modal ao clicar no botão "X"
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none"; // Oculta o modal
        }
    }

    // Lógica para fechar o modal ao clicar em qualquer lugar FORA da imagem
    window.onclick = function(event) {
        if (event.target == modal) { // Verifica se o clique foi no fundo escuro do modal
            modal.style.display = "none"; // Oculta o modal
        }
    }

    // Lógica de SCROLL da Header
    const header = document.querySelector('header'); // Seleciona o elemento <header>
    // Define a altura em pixels após a qual a mudança de estilo da header ocorre (500px)
    const heroHeight = 500; 

    // Adiciona um "ouvinte" de evento de rolagem (scroll) na janela
    window.addEventListener('scroll', () => {
        // Se a posição de rolagem vertical for maior que 500px (saiu do hero)
        if (window.scrollY > heroHeight) { 
            // Aplica um fundo branco semitransparente
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            // Adiciona uma sombra para destacá-lo
            header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        } else {
            // Se estiver no topo (ou nos primeiros 500px), remove os estilos
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = 'none';
        }
    });

    // ----------------------------------------------------------------------
    // 2. CARROSSEL DE FUNDO: CURSO TÉCNICO (8 FOTOS) - Agendado para funcionar
    // ----------------------------------------------------------------------

    // Seleciona o elemento hero da página Curso Técnico
    const cursoHero = document.getElementById('cursotec-hero'); 
    // Array com os nomes dos arquivos de imagem
    const cursoImages = [
        'tec1.jpg', 'tec2.jpg', 'tec3.jpg', 'tec4.jpg', 
        'tec5.jpg', 'tec6.jpg', 'tec7.jpg', 'tec8.jpg'
    ];
    let cursoImageIndex = 0; // Inicializa o índice da imagem (começa na 0)

    if (cursoHero) {
        function changeCursoBackground() {
            // Calcula o próximo índice, voltando para 0 após a última imagem (o operador % é o módulo)
            cursoImageIndex = (cursoImageIndex + 1) % cursoImages.length; 
            const nextImage = cursoImages[cursoImageIndex]; // Pega o nome da próxima imagem
            // Altera a imagem de fundo do elemento hero (o CSS fará a transição suave)
            cursoHero.style.backgroundImage = `url(${nextImage})`; 
        }

        let imagesLoaded = 0; // Contador de imagens carregadas
        // Pré-carregamento das imagens:
        cursoImages.forEach(imagePath => { 
            const img = new Image(); // Cria um novo objeto Imagem na memória
            img.onload = () => { // Função a ser executada quando a imagem terminar de carregar
                imagesLoaded++; // Incrementa o contador
                // Quando todas as imagens tiverem sido carregadas
                if (imagesLoaded === cursoImages.length) { 
                    // Inicia a troca de imagens a cada 2000 milissegundos (2 segundos)
                    setInterval(changeCursoBackground, 2000); 
                }
            };
            img.src = imagePath; // Inicia o carregamento da imagem
        });
    }

    // ----------------------------------------------------------------------
    // 3. HOVER LIGHTBOX (PÁGINA AMIGOS) - CORRIGIDO
    // ----------------------------------------------------------------------

    // Seleciona todos os itens da galeria de amigos
    const lightboxItems = document.querySelectorAll('.hover-lightbox');
    
    if (lightboxItems.length > 0) {
        // Itera sobre cada item da galeria
        lightboxItems.forEach(item => {
            // Adiciona a classe 'is-hovered' (que ativa o zoom no CSS) quando o mouse ENTRA
            item.addEventListener('mouseenter', () => {
                item.classList.add('is-hovered');
