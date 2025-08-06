
// só roda depois que o HTML todo for lido
document.addEventListener('DOMContentLoaded', () => {
    // → coloque aqui a URL exata do seu Web App:
    const URL            = 'https://script.google.com/macros/s/AKfycbyu2ZJy5i39ONPhyn9N11tJVHcqBHtEbnRTz5ZjWIFgwSzrUjdfTTChgpIFZUXFsbCd/exec';
    const publishBtn     = document.getElementById('publish-btn');
    const contentEl      = document.getElementById('post-content');
    const passwordEl     = document.getElementById('post-password');
    const postsContainer = document.getElementById('posts-container');
  
    // formata ISO → pt-BR
    function formatDate(iso) {
      return new Date(iso).toLocaleDateString('pt-BR', {
        day:   '2-digit',
        month: 'long',
        year:  'numeric'
      });
    }
  
    // carrega posts da planilha
    function loadPosts() {
      fetch(`${URL}?action=get`)
        .then(r => r.json())
        .then(posts => {
          postsContainer.innerHTML = '';
          posts.forEach(p => {
            const div = document.createElement('div');
            div.classList.add('post');
            div.dataset.id = p.id;
            div.innerHTML = `
              <div class="post-avatar">
                <img src="imagem/Imagem_Diogo.jpg" alt="Minha Foto">
              </div>
              <div class="post-body">
                <div class="post-header">
                  <span class="date">${formatDate(p.date)}</span>
                </div>
                <div class="bubble">${p.content}</div>
                <div class="post-actions">
                  <button class="like-btn">
                    <span class="like-icon">👍</span>
                    <span class="count">${p.likes}</span>
                  </button>
                  <button class="delete-btn">🗑️</button>
                </div>
              </div>
            `;
            postsContainer.append(div);
          });
        })
        .catch(err => console.error('Erro ao carregar posts:', err));
    }
  
    // publica novo post
    publishBtn.addEventListener('click', () => {
      const content  = contentEl.value.trim();
      const password = passwordEl.value;
      if (!content) {
        alert('Escreva algo antes de publicar.');
        return;
      }
  
      fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          action:   'new',
          content:  content,
          password: password
        })
      })
      .then(r => r.json())
      .then(res => {
        if (res.error) {
          alert(res.error);
        } else {
          contentEl.value  = '';
          passwordEl.value = '';
          loadPosts();
        }
      })
      .catch(err => console.error('Erro ao publicar:', err));
    });
  
    // curtidas e exclusão
    postsContainer.addEventListener('click', e => {
      const postEl = e.target.closest('.post');
      if (!postEl) return;
      const id = postEl.dataset.id;
  
      // CURTIR
      if (e.target.closest('.like-btn')) {
        const btn     = e.target.closest('.like-btn');
        const icon    = btn.querySelector('.like-icon');
        const countSp = btn.querySelector('.count');
        const liked   = btn.classList.toggle('liked');
        const delta   = liked ? 1 : -1;
  
        fetch(URL, {
          method: 'POST',
          body: JSON.stringify({
            action: 'like',
            id:     id,
            delta:  delta
          })
        })
        .then(r => r.json())
        .then(data => {
          if (data.likes != null) {
            countSp.textContent = data.likes;
            icon.classList.add('jump');
            icon.addEventListener('animationend', () => icon.classList.remove('jump'), { once: true });
          }
        })
        .catch(err => console.error('Erro ao curtir:', err));
  
        return;
      }
  
      // APAGAR
      if (e.target.closest('.delete-btn')) {
        const senha = prompt('Digite a senha para apagar este post:');
        fetch(URL, {
          method: 'POST',
          body: JSON.stringify({
            action:   'delete',
            id:       id,
            password: senha
          })
        })
        .then(r => r.json())
        .then(res => {
          if (res.error) {
            alert(res.error);
          } else {
            loadPosts();
          }
        })
        .catch(err => console.error('Erro ao apagar:', err));
      }
    });
  
    // inicializa feed
    loadPosts();
  });
  
  
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

// Função para atualizar o badge com o total de projetos
function atualizarBadgeTotal() {
    const total = Object.values(projetos)
        .reduce((sum, arr) => sum + arr.length, 0);
    const badge = document.getElementById('total-projetos');
    if (badge) badge.textContent = total;
}

// Evento para abrir/fechar menu mobile
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

/* Checklist / Gamificação */

// Array para armazenar as tarefas
let tarefas = [];

// Variáveis para ouro, XP e nível
let ouro = 0;
let xp = 0;
let nivel = 1;
let xpNecessario = 100; // XP necessário para o próximo nível

// Lista de desafios
const desafios = [
    { id: 1, descricao: 'Complete 5 tarefas', objetivo: 5, recompensa: 50, concluido: false },
    { id: 2, descricao: 'Ganhe 100 de ouro', objetivo: 100, recompensa: 100, concluido: false },
    { id: 3, descricao: 'Alcance o nível 5', objetivo: 5, recompensa: 200, concluido: false },
];

// Função para salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('ouro', ouro);
    localStorage.setItem('xp', xp);
    localStorage.setItem('nivel', nivel);
    localStorage.setItem('xpNecessario', xpNecessario);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    localStorage.setItem('desafios', JSON.stringify(desafios));
}

// Função para carregar dados do localStorage
function carregarDados() {
    ouro = parseInt(localStorage.getItem('ouro')) || 0;
    xp = parseInt(localStorage.getItem('xp')) || 0;
    nivel = parseInt(localStorage.getItem('nivel')) || 1;
    xpNecessario = parseInt(localStorage.getItem('xpNecessario')) || 100;
    tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const desafiosSalvos = JSON.parse(localStorage.getItem('desafios'));
    if (desafiosSalvos) {
        desafios.forEach((desafio, index) => {
            if (desafiosSalvos[index]) {
                desafio.concluido = desafiosSalvos[index].concluido;
            }
        });
    }
}

// Função para calcular o XP necessário para o próximo nível
function calcularXpNecessario() {
    return 100 + (nivel - 1) * 50; // Aumenta a dificuldade progressivamente
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.textContent = mensagem;

    document.body.appendChild(notificacao);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Função para verificar desafios
function verificarDesafios() {
    desafios.forEach(desafio => {
        if (!desafio.concluido) {
            let objetivoAlcancado = false;

            switch (desafio.id) {
                case 1: // Complete 5 tarefas
                    objetivoAlcancado = tarefas.filter(t => t.concluida).length >= desafio.objetivo;
                    break;
                case 2: // Ganhe 100 de ouro
                    objetivoAlcancado = ouro >= desafio.objetivo;
                    break;
                case 3: // Alcance o nível 5
                    objetivoAlcancado = nivel >= desafio.objetivo;
                    break;
            }

            if (objetivoAlcancado) {
                desafio.concluido = true;
                ouro += desafio.recompensa;
                mostrarNotificacao(`Desafio concluído: ${desafio.descricao}. Você ganhou ${desafio.recompensa} ouro!`);
                atualizarStatus();
            }
        }
    });
}

// Função para atualizar o status (ouro, XP, nível e barra de XP)
function atualizarStatus() {
    document.getElementById('contador-ouro').textContent = ouro;
    document.getElementById('contador-xp').textContent = xp;
    document.getElementById('contador-nivel').textContent = nivel;
    document.getElementById('progresso-xp').style.width = `${(xp / xpNecessario) * 100}%`;

    // Verifica se o usuário subiu de nível
    if (xp >= xpNecessario) {
        nivel++;
        xp -= xpNecessario; // Remove o XP gasto para subir de nível
        xpNecessario = calcularXpNecessario(); // Atualiza o XP necessário para o próximo nível
        mostrarNotificacao(`Parabéns! Você subiu para o nível ${nivel}.`);
        atualizarStatus();
    }

    verificarDesafios(); // Verifica se algum desafio foi concluído
    salvarDados(); // Salva os dados após cada atualização
}

// Função para renderizar as tarefas
function renderizarTarefas() {
    const listaAFazer = document.getElementById('lista-a-fazer');
    const listaConcluidas = document.getElementById('lista-concluidas');

    // Limpa as listas antes de renderizar
    listaAFazer.innerHTML = '';
    listaConcluidas.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');

        // Título, descrição, horário e importância da tarefa
        const titulo = document.createElement('div');
        titulo.className = 'tarefa-titulo';
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement('div');
        descricao.className = 'tarefa-descricao';
        descricao.textContent = tarefa.descricao;

        const horario = document.createElement('div');
        horario.className = 'tarefa-horario';
        horario.textContent = `Criada em: ${tarefa.horario}`;

        const importancia = document.createElement('div');
        importancia.className = `tarefa-importancia ${tarefa.importancia}`;
        importancia.textContent = `Importância: ${tarefa.importancia.toUpperCase()}`;

        // Botões de ação
        const botoes = document.createElement('div');
        botoes.className = 'botoes-tarefa';

        const botaoConcluir = document.createElement('button');
        botaoConcluir.className = 'concluir';
        botaoConcluir.textContent = tarefa.concluida ? 'Desfazer' : 'Concluir';
        botaoConcluir.dataset.index = index; // Adiciona o índice da tarefa
        botaoConcluir.addEventListener('click', () => toggleConcluida(index, botaoConcluir));

        const botaoRemover = document.createElement('button');
        botaoRemover.className = 'remover';
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', () => removerTarefa(index));

        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoRemover);

        // Adiciona os elementos ao item da lista
        li.appendChild(titulo);
        li.appendChild(descricao);
        li.appendChild(horario);
        li.appendChild(importancia);
        li.appendChild(botoes);

        // Adiciona o item à lista correta
        if (tarefa.concluida) {
            listaConcluidas.appendChild(li);
        } else {
            listaAFazer.appendChild(li);
        }
    });
}

// Função para renderizar os desafios
function renderizarDesafios() {
    const listaDesafios = document.getElementById('lista-desafios');
    listaDesafios.innerHTML = '';

    desafios.forEach(desafio => {
        const li = document.createElement('li');
        if (desafio.concluido) li.classList.add('concluido');

        const descricao = document.createElement('span');
        descricao.textContent = desafio.descricao;

        const recompensa = document.createElement('span');
        recompensa.textContent = `Recompensa: ${desafio.recompensa} ouro`;

        li.appendChild(descricao);
        li.appendChild(recompensa);
        listaDesafios.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function adicionarTarefa(titulo, descricao, importancia) {
    const horario = new Date().toLocaleString(); // Captura o horário atual
    tarefas.push({ titulo, descricao, importancia, horario, concluida: false });
    renderizarTarefas();
    salvarDados();
}

// Função para remover uma tarefa
function removerTarefa(index) {
    tarefas.splice(index, 1);
    renderizarTarefas();
    salvarDados();
}

// Função para criar bolinhas verdes
function criarBolinhas(quantidade, botaoConcluir) {
    const container = document.getElementById('bolinhas-container');

    // Obtém a posição do botão "Concluir"
    const rect = botaoConcluir.getBoundingClientRect();
    const posicaoX = rect.left + rect.width / 2; // Centro horizontal do botão
    const posicaoY = rect.top + rect.height / 2; // Centro vertical do botão

    for (let i = 0; i < quantidade; i++) {
        const bolinha = document.createElement('div');
        bolinha.className = 'bolinha';

        // Posiciona a bolinha no centro do botão "Concluir"
        bolinha.style.left = `${posicaoX}px`;
        bolinha.style.top = `${posicaoY}px`;

        // Adiciona a bolinha ao container
        container.appendChild(bolinha);

        // Remove a bolinha após a animação
        bolinha.addEventListener('animationend', () => {
            bolinha.remove();
        });
    }
}

// Função para marcar/desmarcar como concluída
function toggleConcluida(index, botaoConcluir) {
    const tarefa = tarefas[index];
    tarefa.concluida = !tarefa.concluida;

    // Adiciona ouro e XP com base na importância
    if (tarefa.concluida) {
        let xpGanho = 0;
        let ouroGanho = 0;

        switch (tarefa.importancia) {
            case 'baixa':
                ouroGanho = 10;
                xpGanho = 10;
                break;
            case 'media':
                ouroGanho = 20;
                xpGanho = 20;
                break;
            case 'alta':
                ouroGanho = 30;
                xpGanho = 30;
                break;
        }

        ouro += ouroGanho;
        xp += xpGanho;

        // Cria bolinhas verdes
        criarBolinhas(xpGanho, botaoConcluir);

        mostrarNotificacao(`Você ganhou ${xpGanho} XP e ${ouroGanho} ouro!`);
    } else {
        // Remove ouro e XP se a tarefa for desfeita
        switch (tarefa.importancia) {
            case 'baixa':
                ouro -= 10;
                xp -= 10;
                break;
            case 'media':
                ouro -= 20;
                xp -= 20;
                break;
            case 'alta':
                ouro -= 30;
                xp -= 30;
                break;
        }
    }

    atualizarStatus();
    renderizarTarefas();
}

// Evento para o formulário de adicionar tarefa
document.getElementById('form-adicionar').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o recarregamento da página

    const inputTitulo = document.getElementById('input-titulo');
    const inputDescricao = document.getElementById('input-descricao');
    const inputImportancia = document.getElementById('input-importancia');

    const titulo = inputTitulo.value.trim();
    const descricao = inputDescricao.value.trim();
    const importancia = inputImportancia.value;

    if (titulo !== '' && descricao !== '') {
        adicionarTarefa(titulo, descricao, importancia);
        inputTitulo.value = ''; // Limpa o campo de título
        inputDescricao.value = ''; // Limpa o campo de descrição
    }
});

// Inicialização ao carregar a página
carregarDados();
atualizarStatus();
renderizarTarefas();
renderizarDesafios();
atualizarBadgeTotal();
// Formata data em pt-BR

  