<?php
require 'connect.php';
//error_reporting(E_ERROR);
$filename = "transaction";
$file_ending = "xls";

$flag = false;
$users = [];
$id = $_GET['id'];
echo $sql = "SELECT credit_account,amount,closing_bal,trans_date FROM transaction WHERE cust_id = '$id' order by trans_id desc";
$setRec = mysqli_query($con, $sql);
$columnHeader = '';
$columnHeader = "credit_account" . "\t" . "amount" . "\t" . "closing_bal" . "\t" . "trans_date" . "\t";
$setData = '';
while ($rec = mysqli_fetch_row($setRec)) {
    $rowData = '';
    foreach ($rec as $value) {
        $value = '"' . $value . '"' . "\t";
        $rowData .= $value;
    }
    $setData .= trim($rowData) . "\n";
}
header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=User_Detail.xls");
header("Pragma: no-cache");
header("Expires: 0");

echo ucwords($columnHeader) . "\n" . $setData . "\n";
print_r($setData);
echo json_encode($setData);
/*if($result = mysqli_query($con, $sql))
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
}*/
?>
