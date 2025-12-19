
class Card {
    constructor(imgPath) {
        this.imgPath = imgPath;
        this.isFlipped = false;
        this.isMatched = false;
        this.element = document.createElement("div");
        this.element.classList.add("card");
        this.img = document.createElement("img");
        this.img.src = this.imgPath;
        this.element.appendChild(this.img);
    }
    flip() {
        if (this.isMatched) return;
        this.isFlipped = true;
        this.element.classList.add("flipped");
    }
    hide() {
        this.isFlipped = false;
        this.element.classList.remove("flipped");
    }
    match() {
        this.isMatched = true;
        this.element.classList.add("matched");
    }
}

class MemoryGame {
    constructor(boardElement, movesElement) {
        this.board = boardElement;
        this.movesElement = movesElement;
        this.cards = [];
        this.flippedCards = [];
        this.moves = 0;
    }
    start() {
        const images = [
            "images/All_This_Time_CoverArt.jpg",
            "images/Lonely-CoverArt.jpg",
            "images/Here_For_Love-CoverArt.jpg",
            "images/Remember-CoverArt.jpg",
            "images/Take Me-CoverArt.jpg",
            "images/Lost_In_Your_Eyes-CoverArt.jpg",
            "images/Gone-CoverArt.jpg",
            "images/Keep_Moving_On-CoverArt.jpg"
        ];
        const cardImages = [...images, ...images];
        this.shuffle(cardImages);
        this.cards = cardImages.map(img => new Card(img));
        this.board.innerHTML = "";
        this.cards.forEach(card => {
            card.element.addEventListener("click", () => this.handleCardClick(card));
            this.board.appendChild(card.element);
        });
        this.moves = 0;
        this.movesElement.innerText = this.moves;
    }
    handleCardClick(card) {
        if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;
        card.flip();
        this.flippedCards.push(card);
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesElement.innerText = this.moves;
            this.checkMatch();
        }
    }
    checkMatch() {
        const [card1, card2] = this.flippedCards;
        if (card1.imgPath === card2.imgPath) {
            card1.match();
            card2.match();
            this.flippedCards = [];
            if (this.cards.every(card => card.isMatched)) {
                setTimeout(() => alert("Congratulations! ANG GALING MO!"), 300);
            }
        } else {
            setTimeout(() => {
                card1.hide();
                card2.hide();
                this.flippedCards = [];
            }, 800);
        }
    }
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const restartBtn = document.getElementById("restartBtn");
const game = new MemoryGame(board, movesDisplay);
game.start();
restartBtn.addEventListener("click", () => game.start());


const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('show');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });
});
