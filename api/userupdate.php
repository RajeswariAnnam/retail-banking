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
    $branch = mysqli_real_escape_string($con, $request->branch);
    $mobile = mysqli_real_escape_string($con, $request->mobile);
    $address   = mysqli_real_escape_string($con, $request->address);
    $city = mysqli_real_escape_string($con, trim($request->city));
    $state = mysqli_real_escape_string($con, $request->state);
    $pincode = mysqli_real_escape_string($con, $request->pincode);
    $id   = mysqli_real_escape_string($con,$request->id);

    //update.
   $sql = " UPDATE customers SET name='$name', lastname='$lastname', mobile='$mobile', address='$address', city='$city', state='$state', pincode='$pincode', branch_name='$branch' WHERE id ='$id' LIMIT 1";


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
