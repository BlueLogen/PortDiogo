// Dados dos projetos (simulando um banco de dados)
// Dados dos projetos (simulando um banco de dados)
const projetos = {
    sites: [
        {
            imagem: "imagem/Higilabor.jpg",
            titulo: "Plataforma Higilabor",
            descricao: "Sistema online para controle e gestão de produtos laboratoriais.",
            link: "https://higilabor.mercadoopen.inf.br/"
        },
        {
            imagem: "imagem/Topinvest.jpg",
            titulo: "Portal Top Invest",
            descricao: "Plataforma digital para investimentos e análises financeiras.",
            link: "https://topinvest.mercadoopen.inf.br/"
        },
        {
            imagem: "imagem/seniorfit.jpg",
            titulo: "Portal Senior Fit",
            descricao: "Site oficial para informações e serviços fitness especializados.",
            link: "https://seniorfit.com.br/"
        },
        {
            imagem: "imagem/Laaluminio.jpg",
            titulo: "Indústria LA Alumínio",
            descricao: "Site corporativo para apresentação de produtos em alumínio.",
            link: "https://laaluminio.com.br/"
        }
    ],
    ecommerce: [
        {
            imagem: "imagem/Vinoteca.jpg",
            titulo: "Vinoteca Junqueira",
            descricao: "E-commerce especializado em vinhos e produtos importados.",
            link: "https://vinotecajunqueira.com.br/"
        },
        {
            imagem: "imagem/Tendencia.jpg",
            titulo: "Tendência Telecom",
            descricao: "Loja online de produtos e serviços para telecomunicações.",
            link: "https://tendenciatelecom.com.br/"
        },
        {
            imagem: "imagem/sfcar.jpg",
            titulo: "SF Car Service",
            descricao: "Serviços especializados para manutenção e estética automotiva.",
            link: "https://sfcarservice.com.br/"
        },
        {
            imagem: "imagem/impar.jpg",
            titulo: "Ímpar Brasil",
            descricao: "Soluções em serviços especializados para diferentes setores.",
            link: "https://imparbrasil.com.br/servicos/"
        },
        {
            imagem: "imagem/billy.jpg",
            titulo: "Billy Segurança",
            descricao: "Empresa especializada em segurança patrimonial e privada.",
            link: "https://billyseguranca.com.br/"
        }
    ],
    cursos: [
        {
            imagem: "imagem/maranata.jpg",
            titulo: "Maranata Engenharia",
            descricao: "Plataforma de cursos e treinamentos em engenharia civil.",
            link: "https://maranataengenharia.com.br/"
        }
    ],
    "landing-pages": [
        {
            imagem: "imagem/ascensao.jpg",
            titulo: "Ascensão Humana",
            descricao: "Landing page com informações e serviços sobre desenvolvimento pessoal.",
            link: "https://ascensaohumana.com.br/"
        },
        {
            imagem: "imagem/copy.jpg",
            titulo: "Venda Todo Santo Dia",
            descricao: "Landing page voltada para estratégias de vendas e marketing digital.",
            link: "https://vendatodosantodia.com.br/lightcopy/"
        },
        {
            imagem: "imagem/oen.jpg",
            titulo: "O Henrique Melo",
            descricao: "Landing page para mentorias, cursos e treinamentos exclusivos.",
            link: "https://ohenriquemelo.com/"
        }
    ]
};


// Função para carregar projetos
function carregarProjetos(segmento) {
    const conteudo = document.getElementById("projetos-conteudo");

    // Adiciona classe de carregamento
    conteudo.classList.add("carregando");

    // Simula um delay para a animação
    setTimeout(() => {
        const projetosSegmento = projetos[segmento];

        if (projetosSegmento) {
            conteudo.innerHTML = projetosSegmento.map(projeto => `
                <div class="projeto-item">
                    <img src="${projeto.imagem}" alt="${projeto.titulo}">
                    <h3>${projeto.titulo}</h3>
                    <p>${projeto.descricao}</p>
                    <a href="${projeto.link}" class="btn-visitar" target="_blank">Visitar Site</a>
                </div>
            `).join("");
        } else {
            conteudo.innerHTML = "<p>Nenhum projeto encontrado para este segmento.</p>";
        }

        // Remove classe de carregamento após atualizar o conteúdo
        conteudo.classList.remove("carregando");
    }, 300); // Delay de 300ms para a animação
}

// Eventos para os links de segmentos
document.querySelectorAll(".segmentos-lista a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const segmento = e.target.getAttribute("data-segmento");
        carregarProjetos(segmento);
    });
});