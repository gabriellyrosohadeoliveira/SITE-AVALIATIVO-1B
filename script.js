/* =========================================
   GESTÃO DE DADOS (DATABASE SIMULADA)
   ========================================= */
const especies = [
    { nome: "Lobo Cinzento", desc: "O mais comum e adaptável dos lobos." },
    { nome: "Lobo do Ártico", desc: "Sobrevive em temperaturas extremas de até -53°C." },
    { nome: "Lobo Ibérico", desc: "Subespécie nativa da Península Ibérica." }
];

const comportamentos = [
    { titulo: "Hierarquia", conteudo: "A alcateia é liderada por um casal reprodutor." },
    { titulo: "Comunicação", conteudo: "Uivos servem para reunir o grupo e marcar território." }
];

/* =========================================
   FUNÇÕES DE RENDERIZAÇÃO
   ========================================= */
function init() {
    const grid = document.getElementById('grid-especies');
    especies.forEach(esp => {
        grid.innerHTML += `
            <article class="card">
                <h3>${esp.nome}</h3>
                <p>${esp.desc}</p>
            </article>
        `;
    });

    const acc = document.getElementById('accordion-comportamento');
    comportamentos.forEach((item, index) => {
        acc.innerHTML += `
            <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(this)">
                    ${item.titulo}
                </button>
                <div class="accordion-content" style="display:none; padding: 1rem;">
                    <p>${item.conteudo}</p>
                </div>
            </div>
        `;
    });
    
    setupA11y();
    handleScrollReveal();
}

/* =========================================
   ACESSIBILIDADE E COMPONENTES
   ========================================= */
function setupA11y() {
    // Alto Contraste
    document.getElementById('btn-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // Controle de Fonte
    let fontSize = 100;
    document.getElementById('font-up').addEventListener('click', () => {
        fontSize += 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
    });
    document.getElementById('font-down').addEventListener('click', () => {
        fontSize -= 10;
        document.documentElement.style.fontSize = `${fontSize}%`;
    });
}

function toggleAccordion(btn) {
    const content = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    btn.setAttribute('aria-expanded', !isExpanded);
    content.style.display = isExpanded ? 'none' : 'block';
}

/* =========================================
   SCROLL REVEAL (ANIMAÇÃO)
   ========================================= */
function handleScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
}

window.onload = init;
