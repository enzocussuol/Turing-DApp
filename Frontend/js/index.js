const tabelaClassificacao = document.querySelector(".table");
const statusVotacao = document.getElementById("status-votacao");
const inputAlunoVotar = document.getElementById("inputAlunoVotar");
const inputTuringsVotar = document.getElementById("inputTuringsVotar");
const inputAlunoMineirar = document.getElementById("inputAlunoMineirar");
const inputTuringsMineirar = document.getElementById("inputTuringsMineirar");
const botaoVotar = document.getElementById("botaoVotar");
const botaoMineirar = document.getElementById("botaoMineirar");
const botaoAtualizar = document.getElementById("botaoAtualizar");
const botaoEncerrarVotacao = document.getElementById("botaoEncerrarVotacao");

async function atualizaTurings() {
    for (const aluno of alunos) {
        turings = await turingContract.balanceOf(aluno.endereco);
        aluno.turings = Number(turings) / (10 ** 18);
    }
}

async function ordenaAlunos() {
    alunos.sort(function (aluno1, aluno2) {
        if (aluno1.turings > aluno2.turings) {
            return -1;
        } else if (aluno1.turings < aluno2.turings) {
            return 1;
        } else {
            if (aluno1.apelido.localeCompare(aluno2.apelido) === 1) {
                return 1
            } else {
                return -1;
            }
        }
    });
}

async function preencheTabelaClassificacao() {
    var linhas = tabelaClassificacao.getElementsByTagName('tbody')[0];
    var novasLinhas = document.createElement('tbody');

    cont = 1;
    for (const aluno of alunos) {
        var linha = novasLinhas.insertRow(-1);

        if (cont == 1) {
            linha.classList.add("table-success");
        } else if (cont == 2) {
            linha.classList.add("table-primary");
        } else if (cont == 3) {
            linha.classList.add("table-secondary");
        }

        var posicao = linha.insertCell(0);
        var nomeAluno = linha.insertCell(1);
        var qtdTurings = linha.insertCell(2);

        posicao.innerHTML = cont;
        nomeAluno.innerHTML = aluno.apelido;
        qtdTurings.innerHTML = aluno.turings;

        cont++;
    }

    linhas.parentNode.replaceChild(novasLinhas, linhas);
}

async function setaStatusVotacao(status) {
    const iconeVotacao = document.createElement('i');

    if (status === true) {
        statusVotacao.innerHTML = "Aberta ";
        statusVotacao.style.color = "rgb(49, 179, 92)";

        iconeVotacao.className = '';
        iconeVotacao.classList.add("fa-solid");
        iconeVotacao.classList.add("fa-lock-open");
    } else {
        statusVotacao.innerHTML = "Fechada ";
        statusVotacao.style.color = "rgb(179, 49, 60)";

        iconeVotacao.className = '';
        iconeVotacao.classList.add("fa-solid");
        iconeVotacao.classList.add("fa-lock");
    }

    statusVotacao.appendChild(iconeVotacao)
}

async function atualizaStatusVotacao() {
    turingContract.votacaoAberta()
        .then((status) => {
            setaStatusVotacao(status);
        })
}

async function votar(e) {
    e.preventDefault();

    if (inputAlunoVotar.value === "") {
        alert("É necessário informar um aluno para votar.");
        return;
    }

    if (inputTuringsVotar.value === "") {
        alert("É necessário informar a quantidade de Turings ao votar.");
        return;
    }

    var endereco = inputAlunoVotar.value;
    var turings = String(Number(inputTuringsVotar.value) * (10 ** 18));

    turingContract.vote(endereco, turings)
        .then(() => {
            alert("Voto bem sucedido. Aguarde a blockchain atualizar.");
            refresh();
        })
        .catch((err) => {
            alert("Ocorreu um erro ao votar.\n\n" + err.message);
            refresh();
        });
}

async function mineirar(e) {
    e.preventDefault();

    if (inputAlunoMineirar.value === "") {
        alert("É necessário informar um aluno para mineirar.");
        return;
    }

    if (inputTuringsMineirar.value === "") {
        alert("É necessário informar a quantidade de Turings ao mineirar.");
        return;
    }

    var endereco = "";
    for (const aluno of alunos) {
        if (inputAlunoMineirar.value == aluno.apelido) {
            endereco = aluno.endereco;
            break;
        }
    }
    var turings = String(Number(inputTuringsMineirar.value) * (10 ** 18));

    turingContract.issueToken(endereco, turings)
        .then(() => {
            alert("Mineração bem sucedida. Aguarde a blockchain atualizar.");
            refresh();
        })
        .catch((err) => {
            alert("Ocorreu um erro ao mineirar.\n\n" + err.message);
            refresh();
        });
}

async function encerrarVotacao(e) {
    e.preventDefault();

    turingContract.endVoting()
        .then(() => {
            alert("Votação encerrada. Aguarde a blockchain atualizar.");
            refresh();
        })
        .catch((err) => {
            alert("Ocorreu um erro ao encerrar a votação.\n\n" + err.message);
            refresh();
        });
}

function init() {
    alunos.push(new Aluno("Altoe", "0x6701D0C23d51231E676698446E55F4936F5d99dF", 0));
    alunos.push(new Aluno("Andre", "0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6", 0));
    alunos.push(new Aluno("Antonio", "0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6", 0));
    alunos.push(new Aluno("Bonella", "0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c", 0));
    alunos.push(new Aluno("Brito", "0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f", 0));
    alunos.push(new Aluno("eduardo", "0x500E357176eE9D56c336e0DC090717a5B1119cC2", 0));
    alunos.push(new Aluno("Enzo", "0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8", 0));
    alunos.push(new Aluno("Fernando", "0xFED450e1300CEe0f69b1F01FA85140646E596567", 0));
    alunos.push(new Aluno("Juliana", "0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e", 0));
    alunos.push(new Aluno("Luis", "0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33", 0));
    alunos.push(new Aluno("Nicolas", "0x01fe9DdD4916019beC6268724189B2EED8C2D49a", 0));
    alunos.push(new Aluno("Ratonilo", "0x5d84D451296908aFA110e6B37b64B1605658283f", 0));
    alunos.push(new Aluno("Rauta", "0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1", 0));
    alunos.push(new Aluno("Regata", "0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a", 0));
    alunos.push(new Aluno("Salgado", "0x8321730F4D59c01f5739f1684ABa85f8262f8980", 0));
    alunos.push(new Aluno("Sophie", "0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3", 0));
    alunos.push(new Aluno("Thiago", "0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97", 0));
    alunos.push(new Aluno("ulopesu", "0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee", 0));
    alunos.push(new Aluno("Vinicius", "0x48cd1D1478eBD643dba50FB3e99030BE4F84d468", 0));
}

async function refresh() {
    atualizaStatusVotacao();
    atualizaTurings();
    ordenaAlunos();
    preencheTabelaClassificacao();
}

init();

setInterval(refresh, 1000);
botaoVotar.addEventListener("click", votar);
botaoMineirar.addEventListener("click", mineirar);
botaoEncerrarVotacao.addEventListener("click", encerrarVotacao);
botaoAtualizar.addEventListener("click", function (e) {
    e.preventDefault();
    refresh();
});