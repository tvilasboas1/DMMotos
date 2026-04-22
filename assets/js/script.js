// Inicializa o Swiper (Carrossel de Estoque)
const swiper = new Swiper('.meuCarrossel', {
    // Parâmetros principais
    slidesPerView: 1, // Começa mostrando 1 card no celular
    spaceBetween: 20, // Espaço entre os cards
    loop: true,       // Fica girando infinito
    
    // Ativa as bolinhas
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    
    // Ativa as setas
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Responsividade (A mágica acontece aqui)
    breakpoints: {
        // Quando a tela for >= 640px (Tablets)
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // Quando a tela for >= 968px (Desktops)
        968: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});