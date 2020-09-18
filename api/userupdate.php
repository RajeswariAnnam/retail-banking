<?php
    require 'connect.php';

    //get the posted data.
    $postdata = file_get_contents("php://input");    

    if(isset($postdata) && !empty($postdata))
    {
        // Extract the data
        $request = json_decode($postdata);

        //sanitize.
    $name   = mysqli_real_escape_string($con,$request->firstName);
    $lastname = mysqli_real_escape_string($con, trim($request->lastName));    
    $email = mysqli_real_escape_string($con, $request->username);
    $id   = mysqli_real_escape_string($con,$request->id);

    //update.
   $sql = " UPDATE users SET name='$name', lastname='$lastname', email='$email' WHERE id ='$id' LIMIT 1";


if(mysqli_query($con, $sql))
    {
        http_response_code(201);
        $msg = ['success' => 200];
        echo json_encode($msg);
    }
else
    {
        return http_response_code(422);
    }
    }
