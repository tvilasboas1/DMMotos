// =============================================
// ESTOQUE DINÂMICO (integração com o Portfólio)
// Lê o endereço do Portfólio na <meta name="portfolio-api">.
// Vazio = não faz nada e o site fica 100% estático.
// Se a API não responder, o HTML estático continua na tela.
// =============================================
(function () {
    const meta = document.querySelector('meta[name="portfolio-api"]');
    const base = meta && meta.content.trim().replace(/\/$/, '');
    if (!base) return;
    window.PORTFOLIO_API = base;

    const esc = s => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    function renderGaleria(motos) {
        const grid = document.querySelector('#estoque .galeria-grid');
        if (!grid || !motos.length) return;
        grid.innerHTML = motos.map(m => `
<div class="galeria-item" data-id="${m.id}" data-fotos="${esc(JSON.stringify((m.fotos || []).slice(0, 3)))}" onclick="abrirLightbox(this)">
    <img src="${esc(m.foto_mini || m.foto)}" data-grande="${esc(m.foto)}" alt="${esc(m.alt)}" loading="lazy">
    <div class="galeria-info">
        <span class="galeria-nome">${esc(m.nome)}</span>
        <span class="galeria-ano">${esc(m.ano_texto)}</span>
    </div>
</div>`).join('');
    }

    function renderOfertas(ofertas) {
        const wrap = document.querySelector('#ofertas .swiper-wrapper');
        if (!wrap || !ofertas.length) return;
        wrap.innerHTML = ofertas.map(m => `
<div class="swiper-slide">
    <div class="moto-card" data-id="${m.id}" data-fotos="${esc(JSON.stringify((m.fotos || []).slice(0, 3)))}">
        <img src="${esc(m.foto)}" alt="${esc(m.alt)}">
        <div class="moto-info">
            <span class="moto-badge" style="background:rgba(22,163,74,0.1);color:${esc(m.selo_cor)};">${esc(m.selo)}</span>
            <h3>${esc(m.nome)}</h3>
            <p class="ano-km"><i class="fas fa-calendar-alt"></i> ${esc(m.ano_texto)} &nbsp;•&nbsp; <i class="fas fa-road"></i> ${esc(m.km_texto)}</p>
            <p class="preco">${esc(m.preco_texto)}</p>
            <p class="parcela-info"><i class="fas fa-credit-card"></i> ${esc(m.condicoes || 'Consulte condições')}</p>
        </div>
    </div>
</div>`).join('');
        if (window.criarCarrossel) window.criarCarrossel();
    }

    // Conta o clique no botão do WhatsApp da foto ampliada (sem dados pessoais)
    window.registrarInteresse = function (id) {
        if (!id || !navigator.sendBeacon) return;
        navigator.sendBeacon(base + '/api/publico/interesse/' + id);
    };

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);

    fetch(base + '/api/publico/site', { signal: ctrl.signal })
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(d => {
            renderGaleria(d.estoque || []);
            renderOfertas(d.ofertas || []);
        })
        .catch(() => { /* API fora do ar: mantém o HTML estático */ })
        .finally(() => clearTimeout(timer));
})();
