# DM Motos - Site Oficial

**Status:** Site no ar
**Endereço:** https://www.dmmotos.com.br
**Última atualização:** 12/10/2026 (v1.11)

## TECNOLOGIAS
- HTML5
- CSS3
- JavaScript (Vanilla)
- Swiper.js (Carrossel)
- Font Awesome (Ícones)

---

## ESTRUTURA DO REPOSITÓRIO

```
/
├── index.html
├── README.md
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── script.js
    │   └── estoque.js   (estoque dinâmico; só age se a meta portfolio-api estiver preenchida)
    └── img/
        ├── dmlogo.png
        ├── planoDeFundo1.jpeg      (sem uso)
        ├── planoDeFundo2.webp      (foto da fachada no topo do site e na prévia do WhatsApp)
        ├── logo-bv-financeira.png
        ├── logo-c6.jpg
        ├── logo-pan.webp
        ├── logo-santander.png
        └── motoscarrocel/
            ├── eletricas/
            │   ├── bolin-1822-eletrica.jpeg
            │   ├── bolin-1970-eletrica.jpeg
            │   ├── gt-hitway-eletrica.jpeg
            │   └── wd2s-eletrica.jpeg
            ├── Honda/
            │   ├── Biz/
            │   ├── Bros/       (vazia)
            │   ├── Fan/
            │   ├── Titan/
            │   └── Twister/    (vazia)
            └── Yamaha/
                ├── Factor/
                ├── Fazer/
                └── XTZ/
```

**Padrão de nome das fotos:** `Marca Modelo Cor AnoFab-AnoMod.jpeg`
Exemplo: `Honda Fan 160 vermelha 2025-2025.jpeg`, salva em `Honda/Fan/`.
Elétricas seguem o padrão `modelo-eletrica.jpeg` em `eletricas/`.

---

## COMO PUBLICAR

O site fica na **Cloudflare Pages**, ligado ao repositório do GitHub: todo `push` na branch principal publica sozinho.

1. Testar local, de dentro da pasta do projeto: `python3 -m http.server 8000` e abrir `http://localhost:8000` (Ctrl+Shift+R depois de cada mudança; conferir também no modo celular do navegador)
2. Conferir o que vai subir: `git status` (não deixar zip de pacote nem arquivo de teste entrar)
3. `git add -A` e `git commit -m "vX.Y: o que mudou"`
4. `git push` (ou Sync no VS Code)
5. Acompanhar o deploy no painel da Cloudflare (Workers & Pages) e abrir https://www.dmmotos.com.br com Ctrl+Shift+R
6. Se a prévia do link no WhatsApp não atualizar, forçar no Depurador de Compartilhamento do Facebook (https://developers.facebook.com/tools/debug/), botão "Coletar novamente"

---

## TOPO DO SITE (como funciona, pra não quebrar)

- A foto é um `<img class="hero-foto">` no HTML (`assets/img/planoDeFundo2.webp`), não fundo de CSS
- **PC:** foto centralizada, laterais com a mesma foto desfocada (`.hero::before`). Dois números de ajuste no `style.css`, bloco "TOPO (v1.7)":
  - `aspect-ratio: 1.36` em `.hero-foto`: quanto a foto abre pros lados (1.14 = inteira, sem corte)
  - `padding-bottom: calc((100svh - 68px) * 0.24)` em `.hero`: altura do bloco de texto (maior sobe, menor desce)
- **Celular:** foto inteira; "Financiamento para negativados" + título presos no pé da foto (`.hero-chamada`); botões numa faixa escura abaixo
- Selo de horário (`#heroBadge`) preso no topo da foto; texto montado pelo script no fim do `index.html` (Seg a Sex 8h às 18h, Sáb 8h às 12h)

---

## COMO ATUALIZAR O ESTOQUE (manual)

A fonte da verdade é o **catálogo do WhatsApp** da DM Motos.

1. Tirar print do catálogo inteiro no WhatsApp.
2. Cruzar com a galeria do `index.html` (seção `id="estoque"`):
   - Está no WhatsApp e não está no site: **entrou**. Salvar a foto na pasta da marca/modelo e adicionar um bloco `galeria-item`.
   - Está no site e não está no WhatsApp: **vendida**. Remover o bloco `galeria-item` e apagar a foto.
3. Conferir o carrossel de Ofertas (seção `id="ofertas"`): preço, ano e foto de cada card.
4. Atualizar a lista do JSON-LD "Estoque de Motos DM Motos" no `<head>` (usada pelo Google) e o `numberOfItems`.
5. Rodar a conferência de fotos, de dentro da pasta do projeto:

   ```bash
   grep -o 'src="assets/img/motoscarrocel/[^"]*"' index.html | sed 's/^src="//;s/"$//' | sort -u | while read -r f; do [ -f "$f" ] || echo "FALTANDO: $f"; done
   ```

   Sem nenhuma linha de saída = todas as fotos existem.
6. Atualizar a versão no rodapé do `index.html`, o `lastmod` do `sitemap.xml` e o CHANGELOG abaixo.

Modelo de bloco da galeria:

```html
<div class="galeria-item" onclick="abrirLightbox(this)">
    <img src="assets/img/motoscarrocel/Honda/Fan/Honda Fan 160 vermelha 2025-2025.jpeg" alt="Honda Fan 160 2025 Vermelha" loading="lazy">
    <div class="galeria-info">
        <span class="galeria-nome">Honda Fan 160</span>
        <span class="galeria-ano">2025</span>
    </div>
</div>
```

---

## ESTOQUE ATUAL (12/10/2026, conferido com o WhatsApp)

20 motos. Preços conforme o catálogo do WhatsApp (a galeria do site não exibe preço).

| # | Moto | Ano | Preço WhatsApp | Foto |
|---|------|-----|----------------|------|
| 1 | Honda Biz 125 preta | 2014 | R$ 13.000,00 | `Honda/Biz/Honda Biz 125 Preta 2014-2014.jpeg` |
| 2 | Honda Biz 125 branca | 2015 | R$ 14.000,00 | `Honda/Biz/Honda Biz 125 branca 2015-2015.jpeg` |
| 3 | Honda Biz 125 vermelha | 2024 | R$ 18.500,00 | `Honda/Biz/Honda Biz 125 vermelha 2024-2024.jpeg` |
| 4 | Honda Fan 150 Esdi | 2010/2011 | R$ 11.500,00 | `Honda/Fan/Honda Fan 150 Esdi 2010-2011.jpeg` |
| 5 | Honda CG Fan 150 Esdi preta | 2012 | R$ 11.900,00 | `Honda/Fan/Honda Cg Fan 150 Esdi preta 2012-2012.jpeg` |
| 6 | Honda Fan 150 Esdi | 2013/2014 | R$ 12.500,00 | `Honda/Fan/Honda Fan 150 Esdi 2013-2014.jpeg` |
| 7 | Honda Fan 160 vermelha | 2018 | R$ 14.500,00 | `Honda/Fan/Honda Fan 160 vermelha 2018-2018.jpeg` |
| 8 | Honda Fan 160 vermelha | 2025 | R$ 19.900,00 | `Honda/Fan/Honda Fan 160 vermelha 2025-2025.jpeg` |
| 9 | Honda CG Titan 150 vermelha | 2007 | R$ 9.500,00 | `Honda/Titan/Honda Cg Titan 150 Vermelha 2007-2007.jpeg` |
| 10 | Yamaha Factor 150 preta | 2018 | R$ 12.500,00 | `Yamaha/Factor/Yamaha Factor 150  preta 2018-2018.jpeg` (nome com 2 espaços) |
| 11 | Yamaha Factor 150 preta | 2022/2023 | R$ 15.000,00 | `Yamaha/Factor/Yamaha Factor 150 preta 2022-2023.jpeg` |
| 12 | Yamaha Fazer 250 azul | 2022/2023 | R$ 23.000,00 | `Yamaha/Fazer/Yamaha Fazer 250 Azul 2022-2023.jpeg` |
| 13 | Yamaha Fazer 250 | 2023/2024 | R$ 23.500,00 | `Yamaha/Fazer/Yamaha Fazer 250 2023-2024.jpeg` |
| 14 | Yamaha Fz25 | 2022/2023 | R$ 23.000,00 | `Yamaha/Fazer/Yamaha Fz25 2022-2023.jpeg` |
| 15 | Yamaha Xtz 125 K preta | 2004/2005 | R$ 9.000,00 | `Yamaha/XTZ/Xtz 125 K preta 2004-2005.jpeg` |
| 16 | Yamaha Xtz 150 Crosser S | 2021/2022 | R$ 16.900,00 | `Yamaha/XTZ/Yamaha Xtz 150 Crosser S 2021-2022.jpeg` |
| 17 | Bolin 1822 elétrica | | R$ 8.500,00 | `eletricas/bolin-1822-eletrica.jpeg` |
| 18 | Bolin 1970 elétrica | | R$ 10.000,00 | `eletricas/bolin-1970-eletrica.jpeg` |
| 19 | Wd2S elétrica | | R$ 9.250,00 | `eletricas/wd2s-eletrica.jpeg` |
| 20 | Gt Hitway elétrica | | R$ 11.500,00 | `eletricas/gt-hitway-eletrica.jpeg` |

Condições informadas no catálogo do WhatsApp:
- Fan 160 2018: entrada de R$ 8.500,00 + restante em até 10x de R$ 900,00 (outras opções em 12x).
- Factor 150 2022/2023: entrada de R$ 9.000,00 + restante em até 10x de R$ 900,00 (outras opções em 12x).

**Carrossel de Ofertas (5 cards):** Biz 125 2024, Fazer 250 2023/2024, Fan 160 2025, Bolin 1970, Wd2S.

---

## BAIXAS DE ESTOQUE (motos vendidas)

### 12/10/2026
Critério: estavam na galeria do site e não constavam mais no catálogo do WhatsApp. Fotos apagadas da pasta (`rm`). O site não exibia preço na galeria, então não há valor registrado.

| # | Moto | Ano | Arquivo removido |
|---|------|-----|------------------|
| 1 | Honda Biz 125 Ex | 2011/2012 | `Honda/Biz/Honda Biz 125 Ex 2011-2012.jpeg` |
| 2 | Honda Biz 125 branca | 2014 | `Honda/Biz/Honda Biz 125 branca 2014-2014.jpeg` |
| 3 | Honda Biz 125 | 2015 | `Honda/Biz/Honda Biz 125 2015-2015.jpeg` |
| 4 | Honda Fan 160 vermelha | 2015/2016 | `Honda/Fan/Honda Fan 160 vermelha 2015-2016.jpeg` |
| 5 | Honda Fan 160 preta | 2018 | `Honda/Fan/Honda Fan 160 preta 2018-2018.jpeg` |
| 6 | Honda Fan 160 | 2022/2023 | `Honda/Fan/Honda Fan 160 2022-2023.jpeg` |
| 7 | Honda Titan 150 Ex | 2015 | `Honda/Titan/Honda Titan 150 Ex 2015-2015.jpeg` |
| 8 | Honda Titan 160 | 2021 | `Honda/Titan/Honda Titan 160 2021-2021.jpeg` |
| 9 | Yamaha Xtz Crosser 150 | 2020/2021 | `Yamaha/XTZ/Yamaha Xtz Crosser 150 2020-2021.jpeg` |

Observações:
- #2: saiu a Biz 2014 branca, mas entrou uma Biz 2014 **preta** (moto diferente).
- #3: o site tinha duas Biz 2015 e o WhatsApp só uma (branca). Ficou o arquivo `branca`. Se a foto apagada era a da moto que continua, revisar aqui primeiro.

---

## PENDÊNCIAS

- [ ] Confirmar a foto da Fazer 250 2022/2023: o site usa a `Azul`. A `Yamaha Fazer 250 2022-2023.jpeg` (sem cor) ficou sem uso; apagar se for duplicada.
- [ ] Datas do CHANGELOG (v0.5 a v1.1 marcadas como 2025) não batem com o rodapé ("Landing Page criada em Abril de 2026"). Confirmar o ano certo.

---

## CHANGELOG

### v1.11 - 12/10/2026 (Atual)
**Tema:** Outras fotos na foto ampliada
- Foto ampliada: quando a moto vem do Portfólio com mais de uma foto, as miniaturas aparecem lado a lado acima do nome; tocar numa troca a foto grande. Com uma foto só, ou nas motos do HTML estático, o bloco nem é criado (sem espaço vazio, sem erro)
- `estoque.js` passa a lista de fotos (até 3) no atributo `data-fotos` de cada item

### v1.10 - 12/10/2026
**Tema:** Foto ampliada, brilho na galeria e preparação para o estoque dinâmico
- Foto ampliada (lightbox): mostra o ano abaixo do nome; botão do WhatsApp menor ("Falar sobre esta moto no WhatsApp")
- Galeria: brilho discreto passando pelas fotos, escalonado (desligado para quem reduz animações); o véu azul do hover virou um leve clareamento
- `assets/js/estoque.js` (novo): se a `<meta name="portfolio-api">` do `<head>` tiver um endereço, busca estoque e ofertas de lá e monta a galeria e o carrossel; se a API não responder, mantém o HTML estático. Meta vazia = site estático como sempre
- `assets/js/script.js`: carrossel virou `criarCarrossel()` (recriável depois que o estoque vem da API)


### v1.9 - 12/10/2026
**Tema:** Textos do topo mais baixos, pra foto respirar
- PC: bloco (Financiamento para negativados + título + botões) desce até logo acima dos retrovisores das motos (`align-items: flex-end` + `padding-bottom: calc((100svh - 68px) * 0.24)`; maior que 0.24 sobe, menor desce)
- Celular: "Financiamento para negativados" + título presos no pé da foto (`.hero-chamada`); botões saíram de cima da foto e foram pra uma faixa escura logo abaixo dela (`.hero-content { display: contents }` + grid de 2 linhas)
- HTML: selo amarelo e título agrupados em `<div class="hero-chamada">`

### v1.8 - 12/10/2026
**Tema:** Ajuste fino do topo no PC (celular sem mudança)
- Foto mais aberta pros lados: caixa com `aspect-ratio: 1.36` e `object-fit: cover`, segurando a placa em cima (`object-position: center 15%`); corta uma faixa pequena embaixo. Pra foto inteira sem corte, voltar o `aspect-ratio` pra 1.14
- Título menor: `clamp(2.4rem, 4.2vw, 3.6rem)` (era até 5rem)
- Botões do topo com fonte e altura menores (0.85rem)

### v1.7 - 12/10/2026
**Tema:** Topo refeito no celular e no PC + efeitos nas ofertas
- Foto do topo virou `<img class="hero-foto">` no HTML (antes era fundo no CSS). Aparece INTEIRA nos dois formatos e começa abaixo do menu fixo (antes o menu escondia o topo da placa, inclusive no celular)
- PC: foto inteira no centro, laterais com a mesma foto desfocada e escurecida (`.hero::before`)
- Celular: foto e texto na mesma célula de grid (o topo fica com a altura da foto); título menor (`clamp(1.7rem, 7.4vw, 2.1rem)`), botões mais baixos
- Selo de horário preso no topo da foto, nos dois formatos, com fundo escuro (sumia em cima das letras brancas da placa)
- "Financiamento para negativados!" passou para ANTES do título, também com fundo escuro
- Compra Programada: fundo trocado de preto para a mesma cor da galeria e do rodapé (`var(--dark)` = #111827); cards de vantagens em `var(--dark-2)`
- Ofertas: carrossel gira sozinho a cada 3,5s (pausa com o mouse em cima), brilho passando pela foto dos cards, selo (SEMINOVA/LANÇAMENTO/ELÉTRICA) em pílula pulsando de leve; tudo desligado para quem ativou "reduzir movimento" no aparelho
- `assets/js/script.js` alterado (autoplay)

### v1.6 - 12/10/2026
**Tema:** Foto do topo inteira + Compra Programada em fundo preto
- Topo no PC: a foto `planoDeFundo2.webp` aparece INTEIRA (contain), começando abaixo do menu fixo (antes os primeiros 68px ficavam escondidos atrás dele); as laterais são preenchidas com a mesma foto desfocada e escurecida, no lugar do branco. A foto nítida fica na `<div class="hero-fundo">`; o desfoque é o `.hero::before`
- Celular: sem mudança
- Compra Programada: fundo preto (só essa seção), "Como funciona?" e o texto de abertura centralizados, cards de vantagens escuros
- Etapa 3 ("Retire sua Moto!") em verde: borda, número e a frase "sai de moto na loja" (classe `valor-verde`)
- Texto das etapas de 0.84rem para 0.92rem: no tamanho menor, em negrito, o "i" de "sai" parecia "l"
- "Só R$ 450 de adesão" passou a "Só R$ 450,00 de adesão"

### v1.5 - 12/10/2026
**Tema:** Ajuste do topo
- PC: foto do `planoDeFundo2.webp` preenchendo o topo com `cover` (descartado na v1.6 porque cortava a foto)
- Celular: sem mudança de layout
- Removido o subtítulo "Escolha sua moto e já saia rodando com aprovação rápida."
- Selo de horário: "Fechado · Abre amanhã às 8h" passou a ser "Loja fechada, abre amanhã às 8h" (e "abre segunda às 8h" no fim de semana)

### v1.4 - 12/10/2026
**Tema:** Correção visual da Compra Programada
- Corrigido o CSS embaralhado das etapas (título de cada etapa aparecia como "caixa dentro da caixa")
- Teste de trocar o topo pela foto `fachadalojanova.jpeg` foi descartado: o topo continua com o `planoDeFundo2.webp` e o texto por cima, como na v1.3; og:image e twitter:image também voltaram para o `planoDeFundo2.webp`

### v1.3 - 12/10/2026
**Tema:** Atualização de estoque (cruzamento com o catálogo do WhatsApp)
- Galeria: 9 motos vendidas removidas, 6 adicionadas (total 20)
- Fotos das motos vendidas apagadas da pasta
- Carrossel: Biz 125 com ano corrigido (2025 para 2024), Fan 160 2025 com preço atualizado (R$ 19.900), "Bolin 1982" corrigido para Bolin 1970 com foto própria
- JSON-LD do catálogo (SEO) atualizado com as 20 motos reais
- Badge de horário: corrigido o sábado entre 12h e 13h (mostrava "Abre hoje às 8h")
- HTML: fechadas as `div` da galeria que estavam abertas
- Rodapé: versão corrigida (estava 1.1 desde a v1.2)
- sitemap.xml: `lastmod` atualizado

### v1.2 - 26/06/2026
**Tema:** Ajuste Header Desktop + Hero Mobile
- Header desktop: max-width reduzido de 1200px para 960px (logo e navegação mais próximos)
- Hero mobile: imagem 4:3 ajustada sem cortar (background-size: 100% auto)
- Hero mobile: overlay gradiente escuro para legibilidade do texto
- Hero mobile: fundo escuro (#0a0e1a) onde a imagem não cobre

### v1.1 - 24/04/2025
**Tema:** Polimento e Otimização
- Mapa centralizado na seção Contato
- Mensagens automáticas personalizadas para cada botão WhatsApp
- Redundâncias removidas (botões duplicados)
- Textos enxugados
- Ícone de informação removido

### v1.0 - 22/04/2025
**Tema:** Lançamento Oficial
- Site publicado e captando clientes
- Carrossel de Ofertas (Swiper.js)
- Galeria de Estoque com Lightbox
- Seção Financiamento (4 bancos)
- Compra Programada (card com etapas)
- Badge "Atendimento disponível" (automático por horário de Brasília)
- Menu hamburger responsivo

### v0.5 - 20/04/2025
**Tema:** Fundação
- Header com logo e menu
- Hero section com imagem de fundo
- Links internos funcionando
- Botões flutuantes (WhatsApp + Instagram)

**Desenvolvido por:** Thiago Vilas Boas
**Contato:** [LinkedIn](https://www.linkedin.com/in/thiago-s-vilas-boas-696107b5/)
