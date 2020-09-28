<?php
require 'connect.php';

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);


    // Sanitize.
    $debit_acc   = mysqli_real_escape_string($con,$request->account);
    $credit_acc = mysqli_real_escape_string($con, trim($request->toAccount));
    $cust_id = mysqli_real_escape_string($con, trim($request->id));
    $amount = mysqli_real_escape_string($con, $request->amount);
    $trans_dec = mysqli_real_escape_string($con, $request->desc);
    $balance = mysqli_real_escape_string($con, $request->balance);
    $remaing_bal = $balance- $amount;

    // Store.
   $sql = "INSERT INTO transaction (cust_id,debit_account,credit_account,amount,closing_bal,trans_desc)
    VALUES ('{$cust_id}','{$debit_acc}','{$credit_acc}','{$amount}','{$remaing_bal}','{$trans_dec}')";

    if(mysqli_query($con, $sql))
    {
        http_response_code(201);
        $sql1 = "UPDATE customers SET balance='$remaing_bal' WHERE id ='$cust_id' LIMIT 1";
        mysqli_query($con, $sql1);
        $user = [
            'account' => $debit_acc,
            'toAccount' => $credit_acc,
           // 'pwd' => '',
            'amount' => $amount,
            'desc' => $trans_dec,
            'balance' => $remaing_bal,
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
