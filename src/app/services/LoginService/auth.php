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
   
    echo "erfolg";
   
    @ldap_close($ldap);
  } else {
    echo "fail";
  }


 ?> 
