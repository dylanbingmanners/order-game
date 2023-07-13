const cards = document.querySelectorAll(".card");
const cardslots = document.querySelectorAll(".cardslot");
const sortText = document.querySelector(".sort-text");
const sortCards = document.querySelector(".order-cards");
const sortButton = document.querySelector("#button-sort");
const verifyButton = document.querySelector("#button-verify");

const sortTextConst = "Number of Sorts: ";

let sortNum = 0;
let dragged = null;

let letters = ['A', 'B', 'C', 'D', 'E',
               'F', 'G', 'H', 'I', 'J',
               'K', 'L', 'M', 'N', 'O',
               'P', 'Q', 'R', 'S', 'T',
               'U', 'V', 'W', 'X', 'Y']
shuffleArray(letters);
let cardValues = {};
for (let i = 0; i < 25; i++) {
    cardValues[letters[i]] = i+1;
}


cards.forEach(card => {
    card.addEventListener("drop", () => {
        if(card.classList.contains("card")) {
            card.classList.remove("swap-spot");
            swap(card, dragged);
        }
    });

    card.addEventListener("dragstart", (e) => {
        dragged = e.target;
    });

    card.addEventListener("dragover", (e) => {
        e.preventDefault();
        card.classList.add("swap-spot");
    });

    card.addEventListener("dragleave", () => {
        card.classList.remove("swap-spot");
    });
})

cardslots.forEach(cardslot => {
    cardslot.addEventListener("drop", () => {
        if(cardslot.classList.contains("cardslot")) {
            cardslot.classList.remove("swap-spot");
            swap(cardslot, dragged);
        }
    });

    cardslot.addEventListener("dragover", (e) => {
        e.preventDefault();
        cardslot.classList.add("swap-spot");
    });

    cardslot.addEventListener("dragleave", () => {
        cardslot.classList.remove("swap-spot");
    });
});

sortButton.addEventListener("click", sort);
verifyButton.addEventListener("click", verify);


function sort() {
    const cardsToSort = document.querySelector(".sort-cards");
    let cardBuffer = [];
    for(const card of cardsToSort.children) {
        if(card.className == "cardslot") {
            return;
        } else {
            cardBuffer.push(card);
        }
    }

    cardBuffer.sort((a, b) => {
        return cardValues[a.textContent] - cardValues[b.textContent];
    });

    for(card of cardBuffer) {
        cardsToSort.append(card);
    }

    sortNum++;
    sortText.textContent = sortTextConst + sortNum;
}

function verify() {
    const cardsToVerify = document.querySelector(".final-cards");
    for(const card of cardsToVerify.children) {
        if(card.className == "cardslot") {
            return;
        }
    }

    for(const card of cards) {
        if(card.parentElement.className == "final-cards") {
            if(cardValues[card.textContent] < 23) {
                card.classList.add("card-incorrect");
            }
        }

        card.classList.add("card-revealed");
        card.textContent = card.textContent + "\n" + cardValues[card.textContent];
        card.removeAttribute("draggable");

    }

    sortButton.setAttribute("disabled", "");
    verifyButton.setAttribute("disabled", "");

}

function shuffleArray(array) {
    for(var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function swap(A, B) {
    const parentA = A.parentNode;
    const siblingA = A.nextSibling === B ? A : A.nextSibling;
    B.parentNode.insertBefore(A, B);
    parentA.insertBefore(B, siblingA);
}