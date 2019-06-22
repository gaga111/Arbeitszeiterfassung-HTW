<?php  
 //insert.php  
 
$host = "localhost";
$connect =new mysqli($host,"wi2019","se2wi2019","htw")
	 or die("Fehler im System");
    
    
      $query = "INSERT INTO users(name,password,id,andere,adresse) VALUES ('bla', 'bla')";
      if(mysqli_query($connect, $query))  
      {  
           echo "Data Inserted...";  
      }  
      else  
      {  
           echo 'Error';  
      }  
   
 ?>  
