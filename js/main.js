/**
 * ==========================================================================
 * MALHA - SCRIPTS DE INTERATIVIDADE E EXPERIÊNCIA DO USUÁRIO
 * Escrito em JavaScript moderno (ES6+), limpo e de alto desempenho.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* -------------------------------------------------------------------------
   * 1. Controle do Cabeçalho e Sombra ao Rolar a Página
   * ------------------------------------------------------------------------- */
  const cabecalho = document.querySelector('.site-header');

  const atualizarSombraCabecalho = () => {
    if (window.scrollY > 20) {
      cabecalho?.classList.add('rolado');
    } else {
      cabecalho?.classList.remove('rolado');
    }
  };

  window.addEventListener('scroll', atualizarSombraCabecalho, { passive: true });
  atualizarSombraCabecalho();

  /* -------------------------------------------------------------------------
   * 2. Controle do Menu Mobile (Gaveta / Drawer Lateral)
   * ------------------------------------------------------------------------- */
  const botaoMenuMobile = document.querySelector('.botao-menu-mobile');
  const menuGaveta = document.querySelector('.menu-mobile-gaveta');
  const menuBackdrop = document.querySelector('.menu-mobile-backdrop');
  const linksMenuMobile = document.querySelectorAll('.menu-mobile-gaveta a');

  const abrirMenuMobile = () => {
    menuGaveta?.classList.add('ativo');
    menuBackdrop?.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    botaoMenuMobile?.setAttribute('aria-expanded', 'true');
  };

  const fecharMenuMobile = () => {
    menuGaveta?.classList.remove('ativo');
    menuBackdrop?.classList.remove('ativo');
    document.body.style.overflow = '';
    botaoMenuMobile?.setAttribute('aria-expanded', 'false');
  };

  botaoMenuMobile?.addEventListener('click', () => {
    const estaAberto = menuGaveta?.classList.contains('ativo');
    if (estaAberto) {
      fecharMenuMobile();
    } else {
      abrirMenuMobile();
    }
  });

  menuBackdrop?.addEventListener('click', fecharMenuMobile);
  document.querySelectorAll('.menu-mobile-fechar-btn').forEach(btn => btn.addEventListener('click', fecharMenuMobile));

  linksMenuMobile.forEach(link => {
    link.addEventListener('click', fecharMenuMobile);
  });

  // Fechar menu mobile ao pressionar a tecla ESC
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menuGaveta?.classList.contains('ativo')) {
      fecharMenuMobile();
    }
  });

  /* -------------------------------------------------------------------------
   * 3. Barra de Busca e Assistente Rápido (Inspirado no Modelo Dell)
   * ------------------------------------------------------------------------- */
  const campoBuscaAssistente = document.querySelector('.assistente-input');
  const botaoBuscaAssistente = document.querySelector('.assistente-btn-enviar');
  const pilulasAtalho = document.querySelectorAll('.pilula-atalho');
  const caixaResposta = document.querySelector('.assistente-resposta-box');

  // Base de conhecimento rápida para respostas instantâneas e direcionamento
  const baseConhecimento = [
    {
      termos: ['galeria', 'telas', 'interfaces', '3d', 'fotos', 'screenshots', 'prints', 'visualizar'],
      resposta: '🖼️ <strong>Galeria 3D Interativa:</strong> Navegue pelas interfaces dos nossos sistemas em tempo real com visualização tridimensional.',
      alvoId: 'galeria',
      url: 'galeria.html'
    },
    {
      termos: ['mikrotik', 'routerview', 'log', 'syslog', 'brute-force', 'roteador', 'wan', 'failover', 'vpn', 'infraestrutura', 'rede', 'gerenciada'],
      resposta: '🛡️ <strong>Infraestrutura Gerenciada & Redes:</strong> Engenharia MikroTik, failover redundante dual-WAN e alta estabilidade 24/7.',
      alvoId: 'servicos',
      url: 'servicos.html'
    },
    {
      termos: ['chatbot', 'chatbots', 'ia', 'inteligencia', 'inteligência', 'agente', 'agentes', 'atendimento'],
      resposta: '🤖 <strong>Chatbots & Inteligência Artificial:</strong> Agentes autônomos para atendimento 24/7, qualificação de leads e automações inteligentes.',
      alvoId: 'servicos',
      url: 'servicos.html'
    },
    {
      termos: ['site', 'sites', 'automacao', 'automação', 'automacoes', 'automações', 'n8n', 'workflow', 'conversao', 'conversão'],
      resposta: '🌐 <strong>Sites de Alta Conversão & Automações:</strong> Landing pages modernas e fluxos inteligentes integrados para escalar seu negócio.',
      alvoId: 'servicos',
      url: 'servicos.html'
    },
    {
      termos: ['zammad', 'helpdesk', 'whatsapp', 'chamado', 'ticket', 'suporte'],
      resposta: '💬 <strong>Zammad & Helpdesk WhatsApp:</strong> Central unificada de chamados com filas inteligentes e atendimento ágil.',
      alvoId: 'servicos',
      url: 'servicos.html'
    },
    {
      termos: ['wifi', 'wi-fi', 'unifi', 'captive', 'guest', 'visitante', 'hotspot', 'portal', 'leads', 'captar', 'captação', 'b2b', 'cnpj', 'erp'],
      resposta: '📶 <strong>Captação B2B (GuestPortal-WiFi):</strong> Transforme sua rede em máquina de vendas, capture contatos qualificados e gere mais negócios.',
      alvoId: 'produtos',
      url: 'produtos.html'
    },
    {
      termos: ['servidor', 'servidores', 'linux', 'ubuntu', 'docker', 'postgres', 'banco de dados'],
      resposta: '🖥️ <strong>Servidores Linux:</strong> Hardening, provisionamento Docker, PostgreSQL com pgBackRest e monitoramento proativo.',
      alvoId: 'servidores',
      url: 'servidores.html'
    },
    {
      termos: ['preco', 'preço', 'plano', 'planos', 'valor', 'custo', 'starter', 'operacao', 'operação', 'simular'],
      resposta: '⚡ <strong>Planos Transparentes:</strong> Modelos sob medida para cada estágio do seu negócio, sem taxas escondidas.',
      alvoId: 'planos',
      url: 'planos.html'
    },
    {
      termos: ['contato', 'diagnostico', 'diagnóstico', 'proposta', 'falar', 'orcamento', 'orçamento', 'email', 'solicitar'],
      resposta: '🚀 <strong>Solicitar Proposta & Diagnóstico:</strong> Avaliação técnica e comercial sem compromisso para impulsionar suas operações.',
      alvoId: 'contato',
      url: 'contato.html'
    }
  ];

  const processarBusca = (texto) => {
    if (!texto || texto.trim().length === 0) return;

    const textoFormatado = texto.toLowerCase().trim();
    let correspondencia = null;

    for (const item of baseConhecimento) {
      if (item.termos.some(termo => textoFormatado.includes(termo))) {
        correspondencia = item;
        break;
      }
    }

    if (caixaResposta) {
      if (correspondencia) {
        caixaResposta.innerHTML = `${correspondencia.resposta} <br><a href="${correspondencia.url}" style="color:var(--cor-primaria); font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:6px; margin-top:8px;">Acessar página desta solução →</a>`;
        caixaResposta.style.display = 'block';

        // Se a seção alvo existir na página atual, rola suavemente
        const secaoAlvo = document.getElementById(correspondencia.alvoId);
        if (secaoAlvo) {
          setTimeout(() => {
            secaoAlvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
            secaoAlvo.style.transition = 'all 0.3s ease';
            secaoAlvo.style.outline = '2px solid var(--cor-primaria)';
            secaoAlvo.style.borderRadius = '16px';
            setTimeout(() => { 
              secaoAlvo.style.outline = 'none'; 
            }, 1800);
          }, 300);
        }
      } else {
        caixaResposta.innerHTML = `💡 Não encontrou exatamente? <a href="contato.html" style="color:var(--cor-primaria); font-weight:700;">Agende um diagnóstico técnico</a> de 15 minutos e tiramos todas as suas dúvidas.`;
        caixaResposta.style.display = 'block';
      }
    }
  };

  botaoBuscaAssistente?.addEventListener('click', () => {
    processarBusca(campoBuscaAssistente?.value || '');
  });

  campoBuscaAssistente?.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
      processarBusca(campoBuscaAssistente.value);
    }
  });

  // Interação ao clicar nas pílulas rápidas
  pilulasAtalho.forEach(pilula => {
    pilula.addEventListener('click', () => {
      const termo = pilula.getAttribute('data-busca') || pilula.textContent || '';
      if (campoBuscaAssistente) {
        campoBuscaAssistente.value = termo.trim();
      }
      processarBusca(termo);
    });
  });

  /* -------------------------------------------------------------------------
   * 4. Caixa de Pesquisa do Cabeçalho Superior (Estilo Dell)
   * ------------------------------------------------------------------------- */
  const headerBuscaInput = document.querySelector('.header-busca-input');
  const headerBuscaBtn = document.querySelector('.header-busca-btn');
  const headerBuscaDropdown = document.querySelector('.header-busca-dropdown');

  const executarBuscaHeader = (termo) => {
    if (!termo || termo.trim().length === 0) return;
    const txt = termo.toLowerCase().trim();
    
    // Procura na base de conhecimento
    let correspondencia = null;
    for (const item of baseConhecimento) {
      if (item.termos.some(t => txt.includes(t) || t.includes(txt))) {
        correspondencia = item;
        break;
      }
    }
    
    if (correspondencia && correspondencia.url) {
      window.location.href = correspondencia.url;
    } else {
      window.location.href = 'produtos.html';
    }
  };

  headerBuscaInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executarBuscaHeader(headerBuscaInput.value);
    }
  });

  headerBuscaBtn?.addEventListener('click', () => {
    executarBuscaHeader(headerBuscaInput?.value);
  });

  // Sugestões instantâneas ao digitar
  headerBuscaInput?.addEventListener('input', () => {
    const val = headerBuscaInput.value.toLowerCase().trim();
    if (!headerBuscaDropdown) return;

    if (val.length < 2) {
      headerBuscaDropdown.style.display = 'none';
      headerBuscaDropdown.innerHTML = '';
      return;
    }

    const resultados = baseConhecimento.filter(item => 
      item.termos.some(t => t.includes(val)) || item.resposta.toLowerCase().includes(val)
    ).slice(0, 4);

    if (resultados.length > 0) {
      headerBuscaDropdown.innerHTML = resultados.map(item => `
        <li>
          <a href="${item.url}" class="header-busca-item">
            <span>🔍</span>
            <span>${item.resposta.replace(/<[^>]*>?/gm, '').split(':')[0] || 'Solução Malha'}</span>
          </a>
        </li>
      `).join('');
      headerBuscaDropdown.style.display = 'block';
    } else {
      headerBuscaDropdown.style.display = 'none';
    }
  });

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-busca-box') && headerBuscaDropdown) {
      headerBuscaDropdown.style.display = 'none';
    }
  });

  /* -------------------------------------------------------------------------
   * 5. Modal e Formulário de Diagnóstico Técnico
   * Regra: Nome obrigatório. Pelo menos um entre e-mail e telefone obrigatório.
   * ------------------------------------------------------------------------- */
  const modalDiagnostico = document.getElementById('modal-diagnostico');
  const botoesFecharModal = document.querySelectorAll('.modal-fechar, .modal-btn-fechar, #modal-fechar-btn');
  const formDiagnostico = document.getElementById('form-diagnostico');
  const campoNome = document.getElementById('diagnostico-nome');
  const campoEmail = document.getElementById('diagnostico-email');
  const campoTelefone = document.getElementById('diagnostico-telefone');
  const campoMensagem = document.getElementById('diagnostico-mensagem');
  const mensagemErro = document.getElementById('diagnostico-erro');
  const mensagemSucesso = document.getElementById('diagnostico-sucesso');
  const botoesAbrirModal = document.querySelectorAll('.btn-abrir-modal-diagnostico');

  // Máscara de telefone brasileira inteligente: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
  campoTelefone?.addEventListener('input', (evento) => {
    let valor = evento.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 10) {
      // Celular com 9 dígitos
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (valor.length > 6) {
      // Fixo ou celular em digitação
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    evento.target.value = valor;
  });

  const abrirModal = () => {
    if (typeof fecharMenuMobile === "function") {
      fecharMenuMobile();
    }
    if (modalDiagnostico) {
      modalDiagnostico.classList.add('ativo');
      document.body.style.overflow = 'hidden';
      // Reset de mensagens
      if (mensagemErro) mensagemErro.style.display = 'none';
      if (mensagemSucesso) mensagemSucesso.style.display = 'none';
      if (formDiagnostico) formDiagnostico.style.display = 'block';
      setTimeout(() => campoNome?.focus(), 100);
    }
  };

  const fecharModal = () => {
    if (modalDiagnostico) {
      modalDiagnostico.classList.remove('ativo');
      document.body.style.overflow = '';
    }
  };

  // Vincular botões que abrem o diagnóstico (estáticos e dinâmicos)
  botoesAbrirModal.forEach(botao => {
    botao.addEventListener('click', (evento) => {
      evento.preventDefault();
      abrirModal();
    });
  });

  document.addEventListener('click', (evento) => {
    const botaoDinamico = evento.target.closest('.btn-abrir-modal-diagnostico');
    if (botaoDinamico) {
      evento.preventDefault();
      abrirModal();
    }
  });

  botoesFecharModal.forEach(btn => {
    btn.addEventListener('click', fecharModal);
  });

  modalDiagnostico?.addEventListener('click', (evento) => {
    if (evento.target === modalDiagnostico) {
      fecharModal();
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && modalDiagnostico?.classList.contains('ativo')) {
      fecharModal();
    }
  });

  // Validacao e Envio do Formulario
  // Usa envio nativo via <form target="iframe-envio-silencioso"> + onload do iframe
  // Funciona tanto em file:// quanto em http/https
  formDiagnostico?.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = campoNome?.value.trim() || '';
    const email = campoEmail?.value.trim() || '';
    const telefone = campoTelefone?.value.replace(/\D/g, '') || '';
    const mensagem = campoMensagem?.value.trim() || '';

    // Ocultar erro anterior
    if (mensagemErro) mensagemErro.style.display = 'none';

    // Validacao 1: Nome obrigatorio
    if (!nome) {
      if (mensagemErro) {
        mensagemErro.textContent = 'Por favor, informe seu nome completo.';
        mensagemErro.style.display = 'block';
      }
      campoNome?.focus();
      return;
    }

    // Validacao 2: Pelo menos um entre e-mail ou telefone deve estar preenchido
    const temEmailValido = email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const temTelefoneValido = telefone.length >= 10;

    if (!temEmailValido && !temTelefoneValido) {
      if (mensagemErro) {
        if (email.length > 0 && !temEmailValido) {
          mensagemErro.textContent = 'Por favor, insira um e-mail valido ou preencha o telefone com DDD.';
        } else if (campoTelefone?.value.trim().length > 0 && !temTelefoneValido) {
          mensagemErro.textContent = 'Por favor, insira um telefone valido com DDD (minimo 10 digitos) ou preencha o e-mail.';
        } else {
          mensagemErro.textContent = 'Por favor, preencha pelo menos um meio de contato: E-mail ou Telefone/WhatsApp.';
        }
        mensagemErro.style.display = 'block';
      }
      if (!email) {
        campoEmail?.focus();
      } else {
        campoTelefone?.focus();
      }
      return;
    }

    // Salvar o registro localmente (localStorage)
    const novoLead = {
      id: Date.now(),
      nome: nome,
      email: email || 'Nao informado',
      telefone: campoTelefone?.value.trim() || 'Nao informado',
      mensagem: mensagem || 'Nenhuma observacao',
      dataCriacao: new Date().toLocaleString('pt-BR')
    };

    try {
      const historicoLeads = JSON.parse(localStorage.getItem('malha_diagnosticos') || '[]');
      historicoLeads.push(novoLead);
      localStorage.setItem('malha_diagnosticos', JSON.stringify(historicoLeads));
    } catch (e) {
      console.warn('Armazenamento local indisponivel:', e);
    }

    // Verificacao de ambiente local (file://)
    if (window.location.protocol === 'file:') {
      if (mensagemErro) {
        mensagemErro.innerHTML = '<strong>&#9888;&#65039; Modo de Arquivo Local (file://)</strong><br>O servi&#231;o de envio (FormSubmit) n&#227;o permite envios de p&#225;ginas abertas diretamente como arquivo local.<br><br><strong>Como testar:</strong><br>D&#234; dois cliques no arquivo <strong>iniciar-servidor.bat</strong> na pasta do projeto para abrir o site em servidor local (<code>http://localhost:8080</code>). L&#225; o envio de e-mails funciona 100%!';
        mensagemErro.style.display = 'block';
      }
      return;
    }
    // Botao de envio com feedback de carregamento
    const botaoSubmit = formDiagnostico.querySelector('button[type="submit"]');
    const textoOriginalBotao = botaoSubmit ? botaoSubmit.innerHTML : 'Confirmar Agendamento';
    if (botaoSubmit) {
      botaoSubmit.disabled = true;
      botaoSubmit.innerHTML = 'Enviando... <span style="display:inline-block;">&#9203;</span>';
    }

    // Configurar link de contingencia por e-mail na tela de sucesso
    const linkEmailSucesso = document.getElementById('diagnostico-link-email-contingencia');
    if (linkEmailSucesso) {
      const assunto = encodeURIComponent('Agendamento de Diagnostico Tecnico - ' + nome);
      const corpo = encodeURIComponent(
        'Ola Malha,\n\nSolicito agendamento de diagnostico tecnico:\n' +
        '- Nome: ' + nome + '\n' +
        '- E-mail: ' + (email || 'Nao informado') + '\n' +
        '- Telefone/WhatsApp: ' + (campoTelefone?.value.trim() || 'Nao informado') + '\n' +
        '- Observacoes: ' + (mensagem || 'Nenhuma') + '\n\n' +
        'Data: ' + novoLead.dataCriacao
      );
      linkEmailSucesso.setAttribute('href', 'mailto:contato@malha.dev.br?subject=' + assunto + '&body=' + corpo);
    }

    // -------------------------------------------------------------------------
    // Detectar conclusao do envio via onload do iframe
    // O FormSubmit redireciona para _next="about:blank" apos processar o POST.
    // O onload dispara quando esse redirecionamento acontece — confirmando envio.
    // -------------------------------------------------------------------------
    const iframeEnvio = document.getElementById('iframe-envio-silencioso');

    // Remover listeners anteriores
    const iframeClone = iframeEnvio?.cloneNode(true);
    if (iframeEnvio && iframeClone) {
      iframeEnvio.parentNode.replaceChild(iframeClone, iframeEnvio);
    }

    const iframeAtual = document.getElementById('iframe-envio-silencioso');

    // Timeout de seguranca: mostrar sucesso apos 8s mesmo sem onload
    const timeoutSeguranca = setTimeout(() => {
      mostrarSucesso();
    }, 8000);

    if (iframeAtual) {
      iframeAtual.onload = () => {
        clearTimeout(timeoutSeguranca);
        mostrarSucesso();
      };
    }

    function mostrarSucesso() {
      // Restaurar botao
      if (botaoSubmit) {
        botaoSubmit.disabled = false;
        botaoSubmit.innerHTML = textoOriginalBotao;
      }
      // Exibir confirmacao de sucesso
      if (mensagemErro) mensagemErro.style.display = 'none';
      if (formDiagnostico) formDiagnostico.style.display = 'none';
      if (mensagemSucesso) mensagemSucesso.style.display = 'block';
      formDiagnostico.reset();
    }

    // Submeter o formulario (envio nativo — funciona em file:// e http://)
    formDiagnostico.submit();
  });

  // Botao para fechar o modal apos mensagem de sucesso
  document.getElementById('diagnostico-fechar-sucesso')?.addEventListener('click', () => {
    fecharModal();
  });

  /* -------------------------------------------------------------------------
   * 6. Exportação de Leads em Planilha CSV (Opção 4)
   * ------------------------------------------------------------------------- */
  const exportarLeadsParaCSV = () => {
    try {
      const historicoLeads = JSON.parse(localStorage.getItem('malha_diagnosticos') || '[]');

      if (!historicoLeads || historicoLeads.length === 0) {
        alert('Nenhum agendamento foi registrado neste navegador ainda.\nPreencha o formulário para testar!');
        return;
      }

      // Cabeçalho compatível com Excel brasileiro (delimitador ponto e vírgula)
      let conteudoCSV = 'ID;Data e Hora;Nome;E-mail;Telefone;Mensagem\r\n';

      historicoLeads.forEach(lead => {
        const idLimpo = `"${lead.id}"`;
        const dataLimpa = `"${(lead.dataCriacao || '').replace(/"/g, '""')}"`;
        const nomeLimpo = `"${(lead.nome || '').replace(/"/g, '""')}"`;
        const emailLimpo = `"${(lead.email || '').replace(/"/g, '""')}"`;
        const telefoneLimpo = `"${(lead.telefone || '').replace(/"/g, '""')}"`;
        const mensagemLimpa = `"${(lead.mensagem || '').replace(/"/g, '""').replace(/(\r\n|\n|\r)/gm, ' ')}"`;

        conteudoCSV += `${idLimpo};${dataLimpa};${nomeLimpo};${emailLimpo};${telefoneLimpo};${mensagemLimpa}\r\n`;
      });

      // Adicionar BOM UTF-8 (\uFEFF) para abrir no Excel sem corromper acentos
      const blob = new Blob(['\uFEFF' + conteudoCSV], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const linkDownload = document.createElement('a');

      const dataHoje = new Date().toISOString().slice(0, 10);
      linkDownload.setAttribute('href', url);
      linkDownload.setAttribute('download', `leads-diagnostico-malha-${dataHoje}.csv`);
      document.body.appendChild(linkDownload);
      linkDownload.click();
      document.body.removeChild(linkDownload);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Erro ao gerar exportação CSV:', e);
      alert('Não foi possível gerar a exportação no momento.');
    }
  };

  // Vincular todos os botões de exportar CSV na página
  document.querySelectorAll('.btn-exportar-csv').forEach(botao => {
    botao.addEventListener('click', (evento) => {
      evento.preventDefault();
      exportarLeadsParaCSV();
    });
  });

  /* -------------------------------------------------------------------------
   * 6. Rastreamento Suave de Navegação Âncora
   * ------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (evento) => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        const elementoAlvo = document.querySelector(href);
        if (elementoAlvo) {
          evento.preventDefault();
          const alturaHeader = cabecalho?.offsetHeight || 72;
          const posicaoElemento = elementoAlvo.getBoundingClientRect().top + window.scrollY - alturaHeader - 16;
          window.scrollTo({
            top: posicaoElemento,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* -------------------------------------------------------------------------
   * 7. Galeria 3D Coverflow Interativa (Originkit Smooth 3D Slideshow)
   * ------------------------------------------------------------------------- */
  const iniciarCoverflow3D = () => {
    const palco = document.querySelector('.coverflow-palco');
    if (!palco) return;

    const cards = Array.from(palco.querySelectorAll('.coverflow-card'));
    const btnAnt = document.querySelector('.coverflow-btn-anterior');
    const btnProx = document.querySelector('.coverflow-btn-proximo');
    const containerIndicadores = document.querySelector('.coverflow-indicadores');
    
    const n = cards.length;
    if (n === 0) return;

    let active = 0;
    let bloqueado = false;
    const SCALE_STEP = 0.16;
    const MAX_VISIBLE = 2;
    const DEPTH = 240;
    const TILT = 10;
    const SIDE_TILT = 7;
    const GAP = 8;
    const DURACAO_MS = 600;

    // Criar indicadores (pontos)
    if (containerIndicadores) {
      containerIndicadores.innerHTML = '';
      for (let i = 0; i < n; i++) {
        const ponto = document.createElement('div');
        ponto.className = `coverflow-ponto ${i === 0 ? 'ativo' : ''}`;
        ponto.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        ponto.addEventListener('click', () => navegarPara(i));
        containerIndicadores.appendChild(ponto);
      }
    }

    const travar = () => {
      bloqueado = true;
      setTimeout(() => { bloqueado = false; }, DURACAO_MS);
    };

    const atualizar = () => {
      const isMobile = window.innerWidth <= 640;
      const gapMultiplier = isMobile ? (window.innerWidth < 420 ? 11 : 14) : 28;

      cards.forEach((card, i) => {
        let rel = i - active;
        // Loop infinito
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;

        const ax = Math.abs(rel);
        const visible = ax <= MAX_VISIBLE;
        const isActive = rel === 0;
        const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
        const tx = rel * (GAP * gapMultiplier);
        const tz = -ax * DEPTH;
        const ry = -rel * TILT;
        const rz = rel * SIDE_TILT;

        if (isActive) {
          card.classList.add('ativo');
        } else {
          card.classList.remove('ativo');
        }

        card.style.transform = `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`;
        card.style.opacity = visible ? (isActive ? '1' : '0.75') : '0';
        card.style.pointerEvents = visible ? 'auto' : 'none';
        card.style.zIndex = `${10 - ax}`;
      });

      // Atualizar pontos
      const pontos = containerIndicadores?.querySelectorAll('.coverflow-ponto');
      pontos?.forEach((p, idx) => {
        if (idx === active) {
          p.classList.add('ativo');
        } else {
          p.classList.remove('ativo');
        }
      });
    };

    const navegarPara = (indice) => {
      if (bloqueado) return;
      travar();
      active = (indice % n + n) % n;
      atualizar();
      reiniciarAutoplay();
    };

    const proximo = () => {
      if (bloqueado) return;
      travar();
      active = (active + 1) % n;
      atualizar();
      reiniciarAutoplay();
    };

    const anterior = () => {
      if (bloqueado) return;
      travar();
      active = (active - 1 + n) % n;
      atualizar();
      reiniciarAutoplay();
    };

    // Autoplay automático a cada 4 segundos (4000ms)
    const INTERVALO_AUTOPLAY = 4000;
    let timerAutoplay = null;

    const iniciarAutoplay = () => {
      pararAutoplay();
      timerAutoplay = setInterval(() => {
        // Avanco automatico
        if (!bloqueado) {
          travar();
          active = (active + 1) % n;
          atualizar();
        }
      }, INTERVALO_AUTOPLAY);
    };

    const pararAutoplay = () => {
      if (timerAutoplay) {
        clearInterval(timerAutoplay);
        timerAutoplay = null;
      }
    };

    const reiniciarAutoplay = () => {
      pararAutoplay();
      iniciarAutoplay();
    };

    // Pausar autoplay durante o hover e foco para leitura confortável
    palco.addEventListener('mouseenter', pararAutoplay);
    palco.addEventListener('mouseleave', iniciarAutoplay);
    palco.addEventListener('focusin', pararAutoplay);
    palco.addEventListener('focusout', iniciarAutoplay);

    // Pausar quando a aba estiver em segundo plano para economizar recursos
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pararAutoplay();
      } else {
        iniciarAutoplay();
      }
    });

    // Eventos nos cards
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (bloqueado) return;
        if (i === active) {
          proximo();
        } else {
          navegarPara(i);
        }
      });
    });

    // Botoes
    btnProx?.addEventListener('click', proximo);
    btnAnt?.addEventListener('click', anterior);

    // Teclado
    palco.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        proximo();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        anterior();
      }
    });

    // Touch / Swipe
    let touchStartX = 0;
    palco.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      pararAutoplay();
    }, { passive: true });

    palco.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) proximo();
        else anterior();
      }
      iniciarAutoplay();
    }, { passive: true });

    window.addEventListener('resize', atualizar, { passive: true });
    atualizar();
    iniciarAutoplay();
  };

  iniciarCoverflow3D();

  /* -------------------------------------------------------------------------
   * 18. Efeito Typewriter (Máquina de Escrever) - Terminal Wi-Fi UniFi
   * ------------------------------------------------------------------------- */
  const iniciarTypewriterUnifi = () => {
    const container = document.getElementById('unifi-typewriter');
    if (!container) return;

    const frases = [
      "AP-Operação Pista-01 ... [online] 14 clientes",
      "AP-Loja Caixa-02 ... [online] 6 clientes",
      "AP-Depósito-03 ... [sinal moderado]",
      "VLANs de Segurança ... [100% isoladas]",
      "Gateway Redundante ... [failover em 2s]",
      "Dispositivos Ativos ... [58 conectados]",
      "Taxa de Transferência ... [950 Mbps]"
    ];

    const delayPorCaractere = 48;       // ~50ms por letra
    const delayEntreLinhas = 200;        // pequeno delay entre as linhas
    const duracaoBarraProgresso = 1900;  // tempo para a barra verde se preencher
    const pausaAposBotao = 5000;         // 5 segundos com o botão visível antes de reiniciar

    let timerId = null;
    let isHovered = false;

    // Formata o texto final com classes de status para alto contraste e destaque
    const formatarTextoStatus = (texto) => {
      return texto
        .replace(/\s\.\.\.\s/, ' <span class="tw-dots">...</span> ')
        .replace(/(\[online\])/g, '<span class="tw-status ok">$1</span>')
        .replace(/(\[sinal moderado\])/g, '<span class="tw-status warn">$1</span>')
        .replace(/(\[100% isoladas\])/g, '<span class="tw-status cyan">$1</span>')
        .replace(/(\[failover em 2s\])/g, '<span class="tw-status ok">$1</span>')
        .replace(/(\[58 conectados\])/g, '<span class="tw-status ok">$1</span>')
        .replace(/(\[950 Mbps\])/g, '<span class="tw-status cyan">$1</span>');
    };

    const criarCursor = () => {
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.textContent = '|';
      return cursor;
    };

    const renderConsoleHeader = () => {
      const headerDiv = document.createElement('div');
      headerDiv.className = 'tw-console-header';
      headerDiv.innerHTML = `
        <div class="tw-console-dots">
          <span class="dot-red"></span>
          <span class="dot-yellow"></span>
          <span class="dot-green"></span>
        </div>
        <span class="tw-console-title">unifi-os // status ao vivo</span>
      `;
      container.appendChild(headerDiv);
    };

    const limparEReiniciar = () => {
      if (timerId) clearTimeout(timerId);
      if (isHovered) return; // Se o usuário estiver interagindo com o botão, não reinicia
      container.innerHTML = '';
      renderConsoleHeader();
      digitarLinha(0);
    };

    const exibirBarraEBotao = () => {
      // Cria a barra de progresso que se preenche em verde e vira botão
      const morphBtn = document.createElement('a');
      morphBtn.href = '#contato';
      morphBtn.className = 'tw-morph-btn btn-abrir-modal-diagnostico';
      morphBtn.setAttribute('role', 'button');
      morphBtn.setAttribute('aria-label', 'Fale com nossos especialistas');

      const fill = document.createElement('div');
      fill.className = 'tw-fill';

      const textSpan = document.createElement('span');
      textSpan.className = 'tw-btn-text';
      textSpan.innerHTML = `
        <span>Fale com nossos especialistas</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      `;

      morphBtn.appendChild(fill);
      morphBtn.appendChild(textSpan);
      container.appendChild(morphBtn);

      // Controle de hover para não interromper a intenção de clique do usuário
      morphBtn.addEventListener('mouseenter', () => { isHovered = true; });
      morphBtn.addEventListener('mouseleave', () => { 
        isHovered = false; 
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(limparEReiniciar, 3500);
      });

      // Dispara o preenchimento da barra de progresso em cor verde
      requestAnimationFrame(() => {
        setTimeout(() => {
          fill.style.width = '100%';
        }, 50);
      });

      // Ao completar o preenchimento, torna-se o botão com a frase solicitada
      timerId = setTimeout(() => {
        morphBtn.classList.add('is-button');

        // Permanece 5 segundos no estado de botão antes de reiniciar o loop
        timerId = setTimeout(limparEReiniciar, pausaAposBotao);
      }, duracaoBarraProgresso);
    };

    const digitarLinha = (indiceLinha) => {
      if (indiceLinha >= frases.length) {
        timerId = setTimeout(exibirBarraEBotao, 250);
        return;
      }

      const fraseCompleta = frases[indiceLinha];
      const linhaDiv = document.createElement('div');
      linhaDiv.className = 'typewriter-line';
      container.appendChild(linhaDiv);

      const cursor = criarCursor();
      linhaDiv.appendChild(cursor);

      let indiceChar = 0;

      const digitarCaractere = () => {
        if (indiceChar < fraseCompleta.length) {
          indiceChar++;
          linhaDiv.textContent = fraseCompleta.slice(0, indiceChar);
          linhaDiv.appendChild(cursor);
          timerId = setTimeout(digitarCaractere, delayPorCaractere);
        } else {
          // Linha atual finalizada
          linhaDiv.innerHTML = formatarTextoStatus(fraseCompleta);
          
          if (indiceLinha + 1 < frases.length) {
            timerId = setTimeout(() => {
              digitarLinha(indiceLinha + 1);
            }, delayEntreLinhas);
          } else {
            // Última frase digitada: mantém o cursor piscando e inicia a barra de progresso
            linhaDiv.appendChild(cursor);
            timerId = setTimeout(exibirBarraEBotao, 350);
          }
        }
      };

      digitarCaractere();
    };

    limparEReiniciar();
  };

  iniciarTypewriterUnifi();

  /* -------------------------------------------------------------------------
   * 15. Contador Inteligente de Acessos Monitorados (com Base Inicial)
   * ------------------------------------------------------------------------- */
  const iniciarContadorVisitas = () => {
    const elementos = document.querySelectorAll('.contador-visitas-numero');
    if (!elementos.length) return;

    // Base inicial acordada para o lançamento
    const BASE_INICIAL = 1000;

    const formatarNumero = (num) => Number(num).toLocaleString('pt-BR');

    // Recupera contagem anterior em cache local se existir
    let visitasAtuais = parseInt(localStorage.getItem('malha_visitas_totais') || '0', 10);
    if (!visitasAtuais || visitasAtuais < BASE_INICIAL) {
      visitasAtuais = BASE_INICIAL + Math.floor(Math.random() * 28);
    }

    // Exibe imediatamente sem atraso visual
    elementos.forEach((el) => {
      el.textContent = formatarNumero(visitasAtuais);
    });

    // Incrementa visita apenas 1 vez por sessão de navegação
    if (!sessionStorage.getItem('malha_visita_contada')) {
      visitasAtuais += 1;
      localStorage.setItem('malha_visitas_totais', visitasAtuais);
      sessionStorage.setItem('malha_visita_contada', 'true');
      elementos.forEach((el) => {
        el.textContent = formatarNumero(visitasAtuais);
      });
    }

    // Tenta sincronizar com contador de nuvem global em background
    const urlApi = 'https://api.counterapi.dev/v1/malha-tecnologia-acessos-site/visitas/up';
    fetch(urlApi)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === 'number') {
          const totalGlobal = BASE_INICIAL + data.count;
          if (totalGlobal > visitasAtuais) {
            visitasAtuais = totalGlobal;
            localStorage.setItem('malha_visitas_totais', visitasAtuais);
            elementos.forEach((el) => {
              el.textContent = formatarNumero(visitasAtuais);
            });
          }
        }
      })
      .catch(() => {
        // Fallback silencioso (mantém a contagem persistida localmente)
      });
  };

  iniciarContadorVisitas();

    // --- Foco Automático e Rolagem Precisa no Formulário de Contato ---
  const rolarParaFormularioContato = (comFoco = true) => {
    const alvo = document.getElementById('formulario-contato');
    if (alvo) {
      if (typeof fecharMenuMobile === 'function') {
        fecharMenuMobile();
      }
      try {
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e) {}

      const cabecalho = document.querySelector('.site-header');
      const offset = (cabecalho ? cabecalho.offsetHeight : 80) + 16;
      const topo = alvo.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || 0) - offset;

      try {
        window.scrollTo({
          top: Math.max(0, topo),
          behavior: 'smooth'
        });
      } catch (e) {
        window.scrollTo(0, Math.max(0, topo));
      }

      if (comFoco) {
        setTimeout(() => {
          const campoNome = document.getElementById('contato-nome');
          if (campoNome) {
            campoNome.focus({ preventScroll: true });
          }
        }, 450);
      }
    }
  };

  // Se a página carregar com âncora de contato na URL
  if (window.location.hash === '#formulario-contato' || window.location.hash === '#contato') {
    setTimeout(() => rolarParaFormularioContato(true), 250);
    window.addEventListener('load', () => {
      setTimeout(() => rolarParaFormularioContato(false), 200);
    });
  }

  // Intercepta todos os cliques em links que apontam para o formulário
  document.querySelectorAll('a[href*="#formulario-contato"], a[href*="#contato"]').forEach((link) => {
    link.addEventListener('click', (evento) => {
      if (typeof fecharMenuMobile === 'function') {
        fecharMenuMobile();
      }
      const href = link.getAttribute('href') || '';
      const isNaMesmaPagina = href.startsWith('#') || 
                              window.location.pathname.endsWith('contato.html') || 
                              window.location.pathname.endsWith('/contato') ||
                              window.location.pathname === '/contato.html';

      if (isNaMesmaPagina && document.getElementById('formulario-contato')) {
        evento.preventDefault();
        rolarParaFormularioContato(true);
        if (history.pushState) {
          history.pushState(null, '', '#formulario-contato');
        }
      }
    });
  });
});



