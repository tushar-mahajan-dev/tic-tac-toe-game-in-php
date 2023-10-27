<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="tic-tac-toe">
        <h1>Tic Tac Toe</h1>
        <div class="message">Player X's turn</div>
        <div class="board">
            <?php
                for ($i = 0; $i < 3; $i++) {
                    echo '<div class="row">';
                    for ($j = 0; $j < 3; $j++) {
                        echo '<div class="cell" data-row="'.$i.'" data-col="'.$j.'"></div>';
                    }
                    echo '</div>';
                }
            ?>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
