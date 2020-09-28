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
    $mobile = mysqli_real_escape_string($con, $request->mobile);
    $address = mysqli_real_escape_string($con, $request->address);
    $city = mysqli_real_escape_string($con, $request->city);
    $state = mysqli_real_escape_string($con, $request->state);
    $pincode = mysqli_real_escape_string($con, $request->pincode);
    $account = mysqli_real_escape_string($con, $request->account);
    $acctype = mysqli_real_escape_string($con, $request->acctype);
    $branch = mysqli_real_escape_string($con, $request->branch);

    // Store.
    $sql = "INSERT INTO customers (name,lastname,pwd,email,mobile,address,city,state,pincode,account_no,branch_name,acc_type)
    VALUES ('{$name}','{$lastname}','{$password}','{$email}','{$mobile}','{$address}', '{$city}', '{$state}', '{$pincode}', '{$account}', '{$branch}', '{$acctype}')";

    if(mysqli_query($con, $sql))
    {
        http_response_code(201);
        $user = [
          'name' => $name,
          'lastname' => $lastname,
          'pwd' => '',
          'email' => $email,
           'mobile' => $mobile,
            'address' => $address,
            'city' => $city,
            'state' => $state,
            'pincode' => $pincode,
            'account' => $account,
            'acctype' => $acctype,
            'branch' => $branch,
            'id' => mysqli_insert_id($con)
        ];
        echo json_encode(['data'=>$user]);
    }
    else
    {
        http_response_code(422);
    }
}

?>
