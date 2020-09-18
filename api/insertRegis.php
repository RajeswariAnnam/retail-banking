<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);


    // Sanitize.
    $name   = mysqli_real_escape_string($con,$request->firstName);
    $lastname = mysqli_real_escape_string($con, trim($request->lastName));
    $password = mysqli_real_escape_string($con, trim($request->password));
    $email = mysqli_real_escape_string($con, $request->username);

    // Store.
    $sql = "INSERT INTO users (`id`,`name`,`lastname`,`password`,`email`)
    VALUES (null,'{$name}','{$lastname}','{$password}','{$email}')";

    if(mysqli_query($con, $sql))
    {
        http_response_code(201);
        $user = [
          'name' => $name,
          'lastname' => $lastname,
          'password' => $password,
          'email' => $email,
          'id'    => mysqli_insert_id($con)
        ];
        echo json_encode(['data'=>$user]);
    }
    else
    {
        http_response_code(422);
    }   
}

?>