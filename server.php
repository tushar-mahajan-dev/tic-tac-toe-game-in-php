<?php
session_start();

if (!isset($_SESSION['board'])) {
    $_SESSION['board'] = array_fill(0, 3, array_fill(0, 3, ''));
    $_SESSION['currentPlayer'] = 'X';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $row = $_POST['row'];
    $col = $_POST['col'];

    if (empty($_SESSION['board'][$row][$col])) {
        $_SESSION['board'][$row][$col] = $_SESSION['currentPlayer'];
        $_SESSION['currentPlayer'] = ($_SESSION['currentPlayer'] === 'X') ? 'O' : 'X';
    }
}

header('Content-Type: application/json');
echo json_encode($_SESSION['board']);
