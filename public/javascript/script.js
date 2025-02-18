let balance = 100;
let betAmount = 10;
const winSound = new Audio('https://www.fesliyanstudios.com/play-mp3/4389');
const spinSound = new Audio('https://www.fesliyanstudios.com/play-mp3/4387');

function spinReels() {
    const symbols = [
        '🔥', '⭐', '🍋', '🍒', '7', '<img src="/public/img/firejoker.webp" alt="firejoker">'
    ];

    document.getElementById("WIN").textContent = "WIN: 0.00 kr";

    if (balance < betAmount) {
        alert("Not enough balance, please insert more!");
        return;
    }

    balance -= betAmount;
    updateBalance();
    spinSound.play();

    let results = Array(20).fill(null);  // Lagrar HTML-symboler
    let resultsClean = Array(20).fill(null); // Lagrar rena symbolvärden (för vinstkontroll)

    function updateRow(rowIndex, delay) {
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                let randomIndex = Math.floor(Math.random() * symbols.length);
                let symbol = symbols[randomIndex];

                let slotIndex = rowIndex * 5 + i + 1;
                results[slotIndex] = symbol;
                resultsClean[slotIndex] = randomIndex; // Spara indexet istället för HTML

                document.getElementById(`slot${slotIndex}`).innerHTML = symbol; // Använd innerHTML
            }
        }, delay);
    }

    updateRow(0, 0);    // Rad 1
    updateRow(1, 300);  // Rad 2
    updateRow(2, 600);  // Rad 3
    updateRow(3, 900);  // Rad 4

    setTimeout(() => checkWin(resultsClean), 1200); // Vänta tills allt är klart
}

function checkWin(resultsClean) {
    let win = false;

    // Kolla horisontella vinster (tre i rad)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            let index = row * 5 + col;
            if (
                resultsClean[index] !== null &&
                resultsClean[index] === resultsClean[index + 1] &&
                resultsClean[index] === resultsClean[index + 2]
            ) {
                win = true;
            }
        }
    }

    // Kolla diagonala vinster
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            let index = row * 5 + col;

            if (
                resultsClean[index] !== null &&
                resultsClean[index] === resultsClean[index + 6] && 
                resultsClean[index] === resultsClean[index + 12]
            ) {
                win = true;
            }

            if (
                col >= 2 && resultsClean[index] !== null &&
                resultsClean[index] === resultsClean[index + 4] &&
                resultsClean[index] === resultsClean[index + 8]
            ) {
                win = true;
            }
        }
    }

    if (win) {
        balance += betAmount * 5;
        updateBalance();
        winSound.play();
        document.getElementById("WIN").textContent = "WIN: " + betAmount * 5 + " kr";
    }
}

function updateBalance() {
    document.getElementById("balance").textContent = "Balance: " + balance + " kr";
}
