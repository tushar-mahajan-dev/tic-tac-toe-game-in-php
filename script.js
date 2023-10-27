document.addEventListener('DOMContentLoaded', function () {
    const message = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            const row = cell.getAttribute('data-row');
            const col = cell.getAttribute('data-col');

            if (cell.textContent === '') {
                cell.textContent = getCurrentPlayer();
                makeMove(row, col);
            }
        });
    });

    function getCurrentPlayer() {
        return message.textContent.includes('X') ? 'X' : 'O';
    }

    function makeMove(row, col) {
        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `row=${row}&col=${col}`,
        })
            .then(response => response.json())
            .then(data => {
                updateBoard(data);
                checkWinner(data);
            });
    }

    function updateBoard(board) {
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            cell.textContent = board[row][col];
        });
    }

    function checkWinner(board) {
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (
                board[a[0]][a[1]] &&
                board[a[0]][a[1]] === board[b[0]][b[1]] &&
                board[a[0]][a[1]] === board[c[0]][c[1]]
            ) {
                message.textContent = `Player ${board[a[0]][a[1]]} wins!`;
                cells.forEach(cell => (cell.style.pointerEvents = 'none'));
                return;
            }
        }

        if (board.flat().every(value => value !== '')) {
            message.textContent = "It's a draw!";
        }
    }
});
