// 1. Declare global variable to store the smart contract instance
let turingContract;

// 2. Set contract address and ABI
const Turing_Contract_Address = "0x7980eAC745aAA4c518Ef018869dee573746b324F";
const Turing_Contract_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "qtdSaTurings",
				"type": "uint256"
			}
		],
		"name": "issueToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "codinome",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "qtdSaTurings",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "usuarios",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "usuariosInvertido",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/* 3. Prompt user to sign in to MetaMask */
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of smart contract */
    turingContract = new ethers.Contract(
      Turing_Contract_Address,
      Turing_Contract_ABI,
      signer
    );
  });
});

// 4. Creating variables for reusable dom elements
const voteSection = document.querySelector(".vote-section");
const votarButton = document.querySelector("#votar");

/* 5. Function to vote */
const vote = () => {
    // update button value
    votarButton.value = "Votando...";

    /* 5.1 Get inputs from form */
    const nomeAlunoInput = document.querySelector("#nome-aluno");
    const qtdTuringsInput = document.querySelector("#qtd-turings");

    // 5.2 Getting values from the inputs
    nomeAluno = nomeAlunoInput.value;
    qtdTurings = qtdTuringsInput.value;

    // Conversion
    qtdTurings = String(Number(qtdTurings*(10**18)))

    /* 5.3 Vote in smart contract */
    turingContract.vote(nomeAluno, qtdTurings)
    .then(() => {
        votarButton.value = "Votar";
        getBalanco();
    })
    .catch((err) => {
        votarButton.value = "Votar";
        // If error occurs, display error message
        alert("Ocorreu um erro ao votar.\n"
            + err.message);
    });
};

/* Function to vote on click of button */
votarButton.addEventListener("click", vote);

const getBalanco = async () => {
    const balanco = await turingContract.balanceOf("0x01fe9DdD4916019beC6268724189B2EED8C2D49a");

    alert("Voto contabilizado com sucesso."
        + "Novo balanço de " + "Nicolas"
        + ": " +  String(Number(balanco*(10**-18))));
}

// /* 6. Function to get pet details */
// const getCurrentPet = async () => {
//   setPetButton.value = "Getting Pet...";

//   /* 6.1 Get pet details from smart contract */
//   const pet = await PetContract.getPet();

//   /* 6.2 Display the pet details section 
//   and
//   Hide the pet form in the DOM */
//   petSection.style.display = "block";
//   petFormSection.style.display = "none";

//   /* 6.3 Pet is an array of 3 strings [petName, petOwner, petAge] */
//   const petName = pet[0];
//   const petOwner = pet[1];
//   const petAge = pet[2];

//   /* 6.4 Display pet details in DOM */
//   document.querySelector(".pet-detail-name").innerText = petName;
//   document.querySelector(".pet-detail-owner").innerText = petOwner;
//   document.querySelector(".pet-detail-age").innerText = petAge;
// };

// /* 7. Function to show the pet form on click of button */
// showPetFormBtn.addEventListener("click", () => {
//   petSection.style.display = "none";
//   petFormSection.style.display = "block";
//   setPetButton.value = "Submit";
// });

// /* 8. Function to refresh pet details */
// refreshBtn.addEventListener("click", (e) => {
//   e.target.innerText = "Refreshing...";
//   getCurrentPet().then(() => {
//     e.target.innerText = "Refreshed";
//     setTimeout(() => {
//       e.target.innerText = "Refresh";
//     }, 2000);
//   });
// });