function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku() {
    let board = [];
    for (let row = 0; row < 9; row++) {
        let currentRow = [];
        for (let col = 0; col < 9; col++) {
            let cellValue = document.getElementById(`cell-${row}-${col}`).value;
            
            currentRow.push(cellValue === "" ? 0 : parseInt(cellValue));
        }
        board.push(currentRow);
    }
    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            if(board[row][col] > 0){
                let num = board[row][col];
                board[row][col] = 0;
                if(!isValid(board, row, col, num)){
                    alert("Given input is invalid")
                    return ;
                }
                board[row][col] = num;
            }
        }
    }

    if (solve(board)) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                document.getElementById(`cell-${row}-${col}`).value = board[row][col];
            }
        }
    }
    else{
        alert("Given input is wroung");
    }
}

function resetSudoku() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).value = "";
        }
    }
}