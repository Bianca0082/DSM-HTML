/*--
Descricao: Aula 15 - Javascript & DOM - Desafios Interativos
nome_arquivo: index.html
nome_exercicio: Aula 15 - Desafios de JavaScript & DOM
nome_aluno: Bianca Heloisa Menezio Arruda
email_aluno: bianca.arruda01@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
-->*/
document.addEventListener("DOMContentLoaded", () => {

  
  (() => {
    const textarea = document.getElementById("comentario");
    const contador = document.getElementById("contador-chars");
    const btnEnviar = document.getElementById("btn-enviar-comentario");
    const LIMITE_MAX = 140;

    textarea.addEventListener("input", () => {
      if (textarea.value.length > LIMITE_MAX) {
        textarea.value = textarea.value.slice(0, LIMITE_MAX);
      }

      const restantes = LIMITE_MAX - textarea.value.length;
      contador.textContent = `${restantes} caracteres restantes`;

      if (restantes === 0) {
        contador.classList.add("text-danger", "fw-bold");
        contador.classList.remove("text-secondary");
        btnEnviar.disabled = true;
      } else {
        contador.classList.remove("text-danger", "fw-bold");
        contador.classList.add("text-secondary");
        btnEnviar.disabled = false;
      }
    });

    btnEnviar.addEventListener("click", () => {
      if (textarea.value.trim().length > 0) {
        alert("Comentário enviado com sucesso:\n\n" + textarea.value);
        textarea.value = "";
        contador.textContent = `${LIMITE_MAX} caracteres restantes`;
        contador.classList.remove("text-danger", "fw-bold");
        contador.classList.add("text-secondary");
        btnEnviar.disabled = false;
      } else {
        alert("Digite algum texto antes de enviar.");
      }
    });
  })();

  
  (() => {
    const senha = document.getElementById("senha");
    const confirmaSenha = document.getElementById("confirma-senha");
    const msgSenha = document.getElementById("msg-senha");
    const btnCadastrar = document.getElementById("btn-cadastrar-senha");

    function validarSenhas() {
      const val1 = senha.value;
      const val2 = confirmaSenha.value;

      if (!val2 && !val1) {
        msgSenha.textContent = "";
        btnCadastrar.disabled = true;
        return;
      }

      if (val1 === val2 && val1.length > 0) {
        msgSenha.textContent = "✓ As senhas coincidem";
        msgSenha.className = "form-text fw-bold mt-2 text-success";
        btnCadastrar.disabled = false;
      } else {
        msgSenha.textContent = "✗ As senhas são diferentes";
        msgSenha.className = "form-text fw-bold mt-2 text-danger";
        btnCadastrar.disabled = true;
      }
    }

    confirmaSenha.addEventListener("input", validarSenhas);
    senha.addEventListener("input", validarSenhas);

    btnCadastrar.addEventListener("click", () => {
      alert("Cadastro realizado com sucesso! Senhas válidas.");
    });
  })();

  
  (() => {
    const selectProduto = document.getElementById("select-produto");
    const qtdProduto = document.getElementById("qtd-produto");
    const totalPedido = document.getElementById("total-pedido");

    function calcularTotal() {
      const precoUnitario = parseFloat(selectProduto.value) || 0;
      const quantidade = parseInt(qtdProduto.value, 10) || 0;
      const total = Math.max(0, precoUnitario * quantidade);

      const totalFormatado = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });

      totalPedido.textContent = `Total: ${totalFormatado}`;
    }

    selectProduto.addEventListener("change", calcularTotal);
    qtdProduto.addEventListener("input", calcularTotal);
    qtdProduto.addEventListener("change", calcularTotal);
  })();

  
  (() => {
    const formProduto = document.getElementById("form-produto");
    const prodNome = document.getElementById("prod-nome");
    const prodCategoria = document.getElementById("prod-categoria");
    const prodPreco = document.getElementById("prod-preco");
    const outputJson = document.getElementById("output-json");

    formProduto.addEventListener("submit", (event) => {
      event.preventDefault(); // Impede o recarregamento da página

      const produto = {
        nome: prodNome.value.trim(),
        categoria: prodCategoria.value.trim(),
        preco: parseFloat(prodPreco.value) || 0,
        cadastradoEm: new Date().toISOString()
      };

      console.log("Objeto JavaScript do Produto:", produto);

      const jsonString = JSON.stringify(produto, null, 2);
      outputJson.textContent = jsonString;
    });
  })();

  
  (() => {
    const inputTelefone = document.getElementById("telefone");
    const telefoneLimpo = document.getElementById("telefone-limpo");

    function formatarTelefone() {
      let apenasDigitos = inputTelefone.value.replace(/\D/g, "");

      if (apenasDigitos.length > 11) {
        apenasDigitos = apenasDigitos.slice(0, 11);
      }

      telefoneLimpo.textContent = apenasDigitos || "Nenhum";

      let formatado = "";
      if (apenasDigitos.length > 6) {
        formatado = apenasDigitos.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
      } else if (apenasDigitos.length > 2) {
        formatado = apenasDigitos.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else if (apenasDigitos.length > 0) {
        formatado = apenasDigitos.replace(/^(\d{0,2})/, "($1");
      }

      inputTelefone.value = formatado;
    }

    inputTelefone.addEventListener("input", formatarTelefone);
    inputTelefone.addEventListener("keyup", formatarTelefone);
  })();

  
  (() => {
    const selectDept = document.getElementById("select-departamento");
    const selectFunc = document.getElementById("select-funcionario");
    const infoFunc = document.getElementById("info-funcionario");

    const dadosFuncionarios = {
      TI: ["Allan", "Beatriz", "Carlos"],
      RH: ["Daniela", "Eduardo"]
    };

    selectDept.addEventListener("change", () => {
      const departamentoSelecionado = selectDept.value;

      selectFunc.innerHTML = "";

      if (dadosFuncionarios[departamentoSelecionado]) {
        selectFunc.disabled = false;

        const optionDefault = document.createElement("option");
        optionDefault.value = "";
        optionDefault.textContent = "Selecione um funcionário...";
        optionDefault.disabled = true;
        optionDefault.selected = true;
        selectFunc.appendChild(optionDefault);

        dadosFuncionarios[departamentoSelecionado].forEach((nome) => {
          const option = document.createElement("option");
          option.value = nome;
          option.textContent = nome;
          selectFunc.appendChild(option);
        });

        infoFunc.innerHTML = `Departamento <strong>${departamentoSelecionado}</strong> selecionado. Escolha o funcionário.`;
      } else {
        selectFunc.disabled = true;
        infoFunc.textContent = "Selecione as opções para visualizar o resultado.";
      }
    });

    selectFunc.addEventListener("change", () => {
      if (selectFunc.value) {
        infoFunc.innerHTML = `Funcionário: <strong>${selectFunc.value}</strong> &bull; Setor: <strong>${selectDept.value}</strong>`;
      }
    });
  })();

  
  (() => {
    const inputHab = document.getElementById("input-habilidade");
    const btnAdd = document.getElementById("btn-add-habilidade");
    const containerTags = document.getElementById("container-tags");
    const placeholder = document.getElementById("placeholder-tags");

    function adicionarHabilidade() {
      const texto = inputHab.value.trim();
      if (!texto) return;

      if (placeholder && placeholder.style.display !== "none") {
        placeholder.style.display = "none";
      }

      const badge = document.createElement("span");
      badge.className = "badge bg-primary d-inline-flex align-items-center gap-2 p-2 fs-6 shadow-sm tag-item";

      const textoNode = document.createTextNode(texto);
      badge.appendChild(textoNode);

      const btnRemover = document.createElement("button");
      btnRemover.type = "button";
      btnRemover.className = "btn-close btn-close-white btn-sm";
      btnRemover.setAttribute("aria-label", `Remover ${texto}`);

      btnRemover.addEventListener("click", () => {
        badge.remove();

        const tagsRestantes = containerTags.querySelectorAll(".tag-item");
        if (tagsRestantes.length === 0 && placeholder) {
          placeholder.style.display = "inline";
        }
      });

      badge.appendChild(btnRemover);

      containerTags.appendChild(badge);

      inputHab.value = "";
      inputHab.focus();
    }

    btnAdd.addEventListener("click", adicionarHabilidade);

    inputHab.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        adicionarHabilidade();
      }
    });
  })();

  
  (() => {
    const dataNascimento = document.getElementById("data-nascimento");
    const avisoIdade = document.getElementById("aviso-idade");
    const btnFinalizar = document.getElementById("btn-finalizar-cadastro");

    function calcularIdade(dataNascStr) {
      if (!dataNascStr) return null;

      const hoje = new Date();
      const partes = dataNascStr.split("-");
      const anoNasc = parseInt(partes[0], 10);
      const mesNasc = parseInt(partes[1], 10) - 1; // Mês inicia em 0 no JS
      const diaNasc = parseInt(partes[2], 10);

      const nascimento = new Date(anoNasc, mesNasc, diaNasc);

      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const diaAtual = hoje.getDate();

      if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
        idade--;
      }

      return idade;
    }

    function validarIdade() {
      const idade = calcularIdade(dataNascimento.value);

      if (idade === null || isNaN(idade)) {
        avisoIdade.textContent = "";
        btnFinalizar.disabled = true;
        return;
      }

      if (idade < 18) {
        btnFinalizar.disabled = true;
        avisoIdade.textContent = `Apenas para maiores de idade (Idade calculada: ${idade} anos)`;
        avisoIdade.className = "mt-2 fw-semibold small text-danger";
      } else {
        btnFinalizar.disabled = false;
        avisoIdade.textContent = `✓ Idade confirmada: ${idade} anos. Cadastro liberado!`;
        avisoIdade.className = "mt-2 fw-semibold small text-success";
      }
    }

    dataNascimento.addEventListener("change", validarIdade);
    dataNascimento.addEventListener("input", validarIdade);

    btnFinalizar.addEventListener("click", () => {
      alert("Cadastro finalizado com sucesso!");
    });
  })();

  
  (() => {
    const chkTodos = document.getElementById("chk-selecionar-todos");
    const chkItens = document.querySelectorAll(".chk-item");
    const contadorSelecionados = document.getElementById("contador-selecionados");

    function atualizarContador() {
      const selecionados = Array.from(chkItens).filter(chk => chk.checked).length;
      contadorSelecionados.textContent = selecionados;
    }

    chkTodos.addEventListener("change", () => {
      const estado = chkTodos.checked;
      chkItens.forEach((chk) => {
        chk.checked = estado;
      });
      atualizarContador();
    });

    chkItens.forEach((chk) => {
      chk.addEventListener("change", () => {
        if (!chk.checked) {
          chkTodos.checked = false;
        } else {
          const todosMarcados = Array.from(chkItens).every(item => item.checked);
          chkTodos.checked = todosMarcados;
        }
        atualizarContador();
      });
    });
  })();

  
  (() => {
    const toggleNavbar = document.getElementById("toggle-tema");
    const toggleCard = document.getElementById("toggle-tema-card");
    const statusStorage = document.getElementById("status-storage");
    const iconeTema = document.getElementById("icone-tema");

    const CHAVE_STORAGE = "tema_preferido";

    function aplicarTema(modoEscuro) {
      if (modoEscuro) {
        document.body.classList.add("dark-theme");
        document.documentElement.setAttribute("data-bs-theme", "dark");

        toggleNavbar.checked = true;
        toggleCard.checked = true;

        statusStorage.textContent = "dark-theme (Ativo)";
        statusStorage.className = "badge bg-info text-dark font-monospace";

        iconeTema.className = "bi bi-moon-stars-fill text-info";
        localStorage.setItem(CHAVE_STORAGE, "dark");
      } else {
        document.body.classList.remove("dark-theme");
        document.documentElement.setAttribute("data-bs-theme", "light");

        toggleNavbar.checked = false;
        toggleCard.checked = false;

        statusStorage.textContent = "light (Padrão)";
        statusStorage.className = "badge bg-secondary font-monospace";

        iconeTema.className = "bi bi-sun-fill text-warning";
        localStorage.setItem(CHAVE_STORAGE, "light");
      }
    }

    const temaSalvo = localStorage.getItem(CHAVE_STORAGE);
    if (temaSalvo === "dark") {
      aplicarTema(true);
    } else {
      aplicarTema(false);
    }

    toggleNavbar.addEventListener("change", () => {
      aplicarTema(toggleNavbar.checked);
    });

    toggleCard.addEventListener("change", () => {
      aplicarTema(toggleCard.checked);
    });
  })();

});
