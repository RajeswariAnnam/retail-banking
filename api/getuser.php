<?php

    require 'connect.php';

    $id = $_GET['id'];

    //get by id
$sql = "SELECT * FROM customers WHERE id= '{$id}' LIMIT 1";

$result = mysqli_query($con, $sql);
$row = mysqli_fetch_assoc($result);

//print_r($row);
$user = [
              'firstName' => $row['name'],
              'lastName' => $row['lastname'],
              'username' => $row['email'],
              'mobile' => $row['mobile'],
              'account' => $row['account_no'],
              'branch' => $row['branch_name'],
              'address' => $row['address'],
              'city' => $row['city'],
              'state' => $row['state'],
              'pincode' => $row['pincode'],
              'id'    => $row['id']
              //'token' => 'fake-jwt-token'
            ];

echo $json = json_encode($user);
//echo json_encode(['data'=> $json]);

