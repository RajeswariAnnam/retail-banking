<?php

    require 'connect.php';

    $id = $_GET['id'];

    //get by id
$sql = "SELECT * FROM customers WHERE id= '{$id}' LIMIT 1";

$result = mysqli_query($con, $sql);
$row = mysqli_fetch_assoc($result);

//print_r($row);
$user = [

              'account' => $row['account_no'],
              'toAccount' => '',
              'amount' => '',
              'desc' => '',
              'balance' => $row['balance'],
              'id'    => $row['id']
              //'token' => 'fake-jwt-token'
            ];
//print_r($user);
echo $json = json_encode($user);
//echo json_encode(['data'=> $json]);

