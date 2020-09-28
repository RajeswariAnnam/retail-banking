<?php
require 'connect.php';
//error_reporting(E_ERROR);

$users = [];
$id = $_GET['id'];
$sql = "SELECT * FROM transaction WHERE cust_id = '$id' order by trans_id desc";

if($result = mysqli_query($con, $sql))
{
    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $users[$cr]['id']   =   $row['trans_id'];
        $users[$cr]['toAccount']   =   $row['credit_account'];
        $users[$cr]['amount']   =   $row['amount'];
        $users[$cr]['closing_bal']   =   $row['closing_bal'];
        $users[$cr]['Date']   =   $row['trans_date'];
        $cr++;
    }

    echo json_encode($users);
}
else
{
    http_response_code(404);
}
?>
