const images = ["assets/images/koya.png", "assets/images/koya.png",
     "assets/images/rj.png", "assets/images/rj.png", 
     "assets/images/mang.png", "assets/images/mang.png",
     "assets/images/sh.png", "assets/images/sh.png", 
     "assets/images/tata.png", "assets/images/tata.png",
     "assets/images/van.png", "assets/images/van.png", 
     "assets/images/chimmy.png", "assets/images/chimmy.png", 
     "assets/images/kooky.png", "assets/images/kooky.png"]

let openCards = [];
let score = 0;
let time = 0;
let timerInterval = null;
let gameStarted = false;

// Embaralhar as cartas
let shuffleCards = images.sort(() => (Math.random() > 0.5 ? 2 : -1));

// Gerar o tabuleiro das cartas/pares
for (let i = 0; i < images.length; i++) {
    let box = document.createElement("div");
    box.className = "item";

    let img = document.createElement("img");
    img.src = shuffleCards[i];
    img.className = "hidden";

    box.appendChild(img);
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

// Contador de tempo
function startTimer() {
    timerInterval = setInterval(() => {
      time++;
      document.getElementById("time-count").textContent = time;
    }, 1000);
}

// Lógica do clique na carta
function handleClick() {
    if (!gameStarted) {
        startTimer();
        gameStarted = true;
    }

    if (openCards.length < 2) {
        const img = this.querySelector("img");
        img.classList.remove("hidden");
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// Verificar a correspondência das cartas/pares
function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        score++;       //incrementa a contagem a medida que aceta os pares
        document.getElementById("score").textContent = `${score}/${images.length / 2}`;
        if (score === images.length / 2) {
            clearInterval(timerInterval);
            clearInterval(time);
        }
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === images.length) {
        alert(`VOCÊ VENCEU!!! \n Tempo: ${time} segundos.`);
    }
}