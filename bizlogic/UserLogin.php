<?php
include 'DBConfig.php';
session_start();

$conn = OpenCon();

//gets the json object from the react native application and saves it to objects
$reactjson = file_get_contents('php://input');
$jsonobj = json_decode($reactjson,true);

$username = $jsonobj['username'];
$password = $jsonobj['password'];

$query  = "SELECT * FROM user WHERE unername = '$username'";
$result = mysqli_query($conn, $query);
if(mysqli_num_rows($result) == 1){
    while ($row = mysqli_fetch_assoc($result)) {
        if (password_verify($password, $row['password'])) {
            $_SESSION['id'] = $row['id'];
            $_SESSION['username'] = $row['fullname'];
            $msg = "User Login Successful";
            break;            
        }else{
                $msg = "Password is invalid";
        }
    }
}else{
    $msg = "No such User";
}

$jsonMessage = json_encode($msg);
//prints Json message 
echo $jsonMessage;

//closes database connection
CloseCon($conn);

?>