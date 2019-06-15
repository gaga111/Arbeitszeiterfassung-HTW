<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Content-Type: application/json; charset=UTF-8");
    getUsers();
    function getUsers(){
        $host = "localhost";
        
        $conn =new mysqli($host,"wi2019","se2wi2019","htw")
        or die("Fehler im System");
        
        
        $result = mysqli_query($conn,"SELECT * FROM Mitarbeiter");
        if ( ! $result )
        {
            die('Ungültige Abfrage: ' . mysqli_error());
        }
        $users = array();
        while($rs = mysqli_fetch_assoc($result)) {
            
            $users[] = $rs;
            
        }
        
        $json = json_encode($users);
        if ($json === false) {
            // Avoid echo of empty string (which is invalid JSON), and
            // JSONify the error message instead:
            $json = json_encode(array("jsonError", json_last_error_msg()));
            if ($json === false) {
                // This should not happen, but we go all the way now:
                $json = '{"jsonError": "unknown"}';
            }
            // Set HTTP response status code to: 500 - Internal Server Error
            http_response_code(500);
        }
        echo $json;
        
    }
    ?>
