//Descricao: Situação de Aprendizagem 02
//nome_arquivo: static/javascript/script.js
//nome_exercicio: Situação de Aprendizagem 02 - Scripts
//nome_aluno: Bianca Heloisa Menezio Arruda
//email_aluno: bianca.arruda01@aluno.cps.sp.gov.br
//turma: WEBI-ISW028-A

document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const aviso = document.getElementById("avisoLogin");

      if (email === "" || senha === "") {
        aviso.textContent = "Preencha o e-mail e a senha.";
        aviso.className = "alert alert-danger py-2";
        aviso.classList.remove("d-none");
      } else {
        window.location.href = "perfil.html";
      }
    });
  }

  const formPerfil = document.getElementById("formPerfil");
  if (formPerfil) {
    formPerfil.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Dados atualizados com sucesso!");
    });
  }

  const pesquisa = document.getElementById("pesquisa");
  const tabela = document.getElementById("tabelaFuncionarios");
  const totalRegistros = document.getElementById("totalRegistros");

  if (pesquisa && tabela) {
    pesquisa.addEventListener("input", () => {
      const busca = pesquisa.value.toLowerCase();
      const linhas = tabela.querySelectorAll("tbody tr");
      let contador = 0;

      linhas.forEach((linha) => {
        const texto = linha.textContent.toLowerCase();
        if (texto.indexOf(busca) > -1) {
          linha.style.display = "";
          contador++;
        } else {
          linha.style.display = "none";
        }
      });

      if (totalRegistros) {
        totalRegistros.textContent = "Mostrando " + contador + " funcionários";
      }
    });
  }
});
