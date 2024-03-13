const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector(".Btn");

let currentPlayer;
let gameGrid;

const winingPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

////let's create function to initalize the game
function initGame() {
    currentPlayer = "x";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //ui pr empty bhi krna pdega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        ///one more thing remove green color also
        box.classList = `box box${index + 1}`;
    });
    newGameButton.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn() {
    if (currentPlayer === "x") {
        currentPlayer = "o";
    }
    else {
        currentPlayer = "x";
    }
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}


function checkGameOver() {

    let answer = "";
    winingPosition.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "x") {
                answer = "x"
            }
            else {
                answer = "o"
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        };
    });

    if (answer !== "") {
        gameInfo.innerText = `winner Player-${answer}`;
        newGameButton.classList.add("active");
        return;
    };

    //when there is no winner
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        };
    });

    //board is fill ,game is tie
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameButton.classList.add("active");
    };

    // newGameButton.classList.add("active");
};

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //sweap turn
        swapTurn();
        ///chech koi jeet to nhe gaya
        checkGameOver();
    };
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameButton.addEventListener("click", initGame);

