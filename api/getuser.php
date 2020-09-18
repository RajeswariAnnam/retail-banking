<?php 

    require 'connect.php';

    $id = $_GET['id'];

    //get by id
$sql = "SELECT * FROM users WHERE id= '{$id}' LIMIT 1";

$result = mysqli_query($con, $sql);
$row = mysqli_fetch_assoc($result);

//print_r($row);
$user = [
              'firstName' => $row['name'],
              'lastName' => $row['lastname'],              
              'username' => $row['email'],
              'id'    => $row['id']
              //'token' => 'fake-jwt-token'
            ]; 

echo $json = json_encode($user);
//echo json_encode(['data'=> $json]);

