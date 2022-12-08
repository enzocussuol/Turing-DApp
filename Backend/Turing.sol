// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Turing is ERC20 {
    address chaveProfessora;
    mapping(string => address) public usuarios;
    mapping(address => string) public usuariosInvertido;
    mapping(address => string[]) votos;
    bool public votacaoAberta;

    constructor() ERC20("Turing", "TRG") {
        chaveProfessora = 0xA5095296F7fF9Bdb01c22e3E0aC974C8963378ad;

        usuarios["Andre"] = 0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6;
        usuarios["Antonio"] = 0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6;
        usuarios["Ratonilo"] = 0x5d84D451296908aFA110e6B37b64B1605658283f;
        usuarios["eduardo"] = 0x500E357176eE9D56c336e0DC090717a5B1119cC2;
        usuarios["Enzo"] = 0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8;
        usuarios["Fernando"] = 0xFED450e1300CEe0f69b1F01FA85140646E596567;
        usuarios["Juliana"] = 0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e;
        usuarios["Altoe"] = 0x6701D0C23d51231E676698446E55F4936F5d99dF;
        usuarios["Salgado"] = 0x8321730F4D59c01f5739f1684ABa85f8262f8980;
        usuarios["Regata"] = 0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a;
        usuarios["Luis"] = 0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33;
        usuarios["Nicolas"] = 0x01fe9DdD4916019beC6268724189B2EED8C2D49a;
        usuarios["Rauta"] = 0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1;
        usuarios["Silva"] = 0xCAFE34A88dCac60a48e64107A44D3d8651448cd9;
        usuarios["Sophie"] = 0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3;
        usuarios["Thiago"] = 0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97;
        usuarios["Brito"] = 0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f;
        usuarios["ulopesu"] = 0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee;
        usuarios["Vinicius"] = 0x48cd1D1478eBD643dba50FB3e99030BE4F84d468;
        usuarios["Bonella"] = 0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c;

        usuariosInvertido[0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6] = "Andre";
        usuariosInvertido[0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6] = "Antonio";
        usuariosInvertido[0x5d84D451296908aFA110e6B37b64B1605658283f] = "Ratonilo";
        usuariosInvertido[0x500E357176eE9D56c336e0DC090717a5B1119cC2] = "eduardo";
        usuariosInvertido[0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8] = "Enzo";
        usuariosInvertido[0xFED450e1300CEe0f69b1F01FA85140646E596567] = "Fernando";
        usuariosInvertido[0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e] = "Juliana";
        usuariosInvertido[0x6701D0C23d51231E676698446E55F4936F5d99dF] = "Altoe";
        usuariosInvertido[0x8321730F4D59c01f5739f1684ABa85f8262f8980] = "Salgado";
        usuariosInvertido[0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a] = "Regata";
        usuariosInvertido[0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33] = "Luis";
        usuariosInvertido[0x01fe9DdD4916019beC6268724189B2EED8C2D49a] = "Nicolas";
        usuariosInvertido[0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1] = "Rauta";
        usuariosInvertido[0xCAFE34A88dCac60a48e64107A44D3d8651448cd9] = "Silva";
        usuariosInvertido[0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3] = "Sophie";
        usuariosInvertido[0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97] = "Thiago";
        usuariosInvertido[0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f] = "Brito";
        usuariosInvertido[0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee] = "ulopesu";
        usuariosInvertido[0x48cd1D1478eBD643dba50FB3e99030BE4F84d468] = "Vinicius";
        usuariosInvertido[0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c] = "Bonella";

        votacaoAberta = true;
    }

    modifier permissaoIssueToken {
        require(msg.sender == chaveProfessora, "[ERRO] Apenas a professora possui permiss\xC3\xA3o para realizar essa a\xC3\xA7\xC3\xA3o.");
        _;
    }
    function issueToken(address receiver, uint256 qtdSaTurings) public permissaoIssueToken {
        _mint(receiver, qtdSaTurings);
    }

    modifier permissaoVote(string memory codinome, uint256 qtdSaTurings) {
        require(keccak256(bytes(usuariosInvertido[msg.sender])) != keccak256(bytes("")), "[ERRO] Usu\xC3\xA1rio n\xC3\xA3o \xC3\xA9 um aluno."); // Requer que o usuario seja valido
        require(qtdSaTurings <= 2*10**18, "[ERRO] N\xC3\xA3o \xC3\xA9 permitido votar com mais de 2 Turings."); // Requer que nao seja passado mais de 2 saTurings
        require(votacaoAberta == true, "[ERRO] A vota\xC3\xA7\xC3\xA3o est\xC3\xA1 fechada."); // Requer que a votacao esteja aberta
        require(usuarios[codinome] != msg.sender, "[ERRO] N\xC3\xA3o \xC3\xA9 poss\xC3\xADvel votar em si mesmo."); // Requer que o usuário vote em um aluno diferente de si mesmo

        // Requer que o codinome ja nao tenha sido votado pelo usuario
        bool codinomeJaFoiVotadoPeloUsuario = false;
        string[] memory votosDoUsuario = votos[msg.sender];
        for (uint i = 0; i < votosDoUsuario.length; i++) {
            if (keccak256(bytes(votosDoUsuario[i])) == keccak256(bytes(codinome))) {
                codinomeJaFoiVotadoPeloUsuario = true;
            }
        }
        require(codinomeJaFoiVotadoPeloUsuario == false);

        _;
    }
    function vote(string memory codinome, uint256 qtdSaTurings) public permissaoVote(codinome, qtdSaTurings) {
        _mint(usuarios[codinome], qtdSaTurings);
        _mint(msg.sender, 0.2*10**18);

        votos[msg.sender].push(codinome);
    }

    modifier permissaoEndVoting {
        require(msg.sender == chaveProfessora, "[ERRO] Apenas a professora possui permiss\xC3\xA3o para realizar essa a\xC3\xA7\xC3\xA3o.");
        require(votacaoAberta == true, "[ERRO] A vota\xC3\xA7\xC3\xA3o est\xC3\xA1 fechada.");

        _;
    }
    function endVoting() public permissaoEndVoting {
        votacaoAberta = false;
    }
}