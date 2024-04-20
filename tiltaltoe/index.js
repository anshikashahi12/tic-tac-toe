const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let getGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//lets create a fun to initialize the game
function initGame(){
    currentPlayer = "X";
    getGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}
initGame();
function swapTurns(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }
    //ui update
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}
function checkGameOver(){
 let ans = "";

 winningPositions.forEach((position) => {
    if((getGrid[position[0]] !== "" || getGrid[position[1]] !== "" || getGrid[position[2]] !== "" 
) && (getGrid[position[0]] === getGrid[position[1]] ) && (getGrid[position[1]] === getGrid[position[2]]))  {

    if(getGrid[position[0]] === "X") {
        ans = "X";
    }else{
        ans = "O";
    }
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");

}
 });
 if(ans !== ""){
    gameInfo.innerText = `${ans} has won the game`;
    newGameBtn.classList.add("active");
    return;
 }
 let fillCount = 0;
 getGrid.forEach((box) => {
    if(box !== ""){
        fillCount++;
    }
 });

 if(fillCount === 9){
    gameInfo.innerText = "Draw";
    newGameBtn.classList.add("active");
    return;
 }
}
function handleClick(index){
    if(getGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        getGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurns();
        checkGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
})
});
newGameBtn.addEventListener("click", initGame);