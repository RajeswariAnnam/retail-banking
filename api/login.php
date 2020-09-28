<?php
require 'connect.php';
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
    $pwd = mysqli_real_escape_string($con, trim($request->password));
    $email = mysqli_real_escape_string($con, trim($request->username));
    $role = mysqli_real_escape_string($con, trim($request->role));
    $sql = "SELECT * FROM customers where email='$email' and pwd='$pwd' and role_id='$role'";
    if($result = mysqli_query($con,$sql))
    {
        $rows = array();
        while($row = mysqli_fetch_assoc($result))
        {
            $user = [
              'name' => $row['name'],
              'lastname' => $row['lastname'],
              'email' => $row['email'],
              'account' => $row['account_no'],
              'branch' => $row['branch_name'],
              'balance' => $row['balance'],
              'role_id' => $row['role_id'],
              'id'    => $row['id']
              //'token' => 'fake-jwt-token'
            ];
        }
        echo json_encode($user);
    }
    else
    {
        http_response_code(404);
    }
}
