<?php
   header('Content-type: application/json');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');


   $data = json_decode(file_get_contents("php://input"));
 

  $adServer = "141.56.20.50";
  $ldap = ldap_connect($adServer)  or die( "Keine Verbindung zu $ldaphost möglich" );

  $username = $data->name;
  $password = $data->pws;

  $ldaprdn = 'smb' . "\\" . $username ;
    

  ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
  ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);


  $bind = @ldap_bind($ldap, $ldaprdn, $password);

  if ($bind) {
   
    $respo = "erfolg";
    $json = json_encode($respo);
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
   
    @ldap_close($ldap);
  } else {
    $respo = "fail";
    $json = json_encode($respo);
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
