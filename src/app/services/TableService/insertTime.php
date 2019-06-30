
<?php
 
    header('Content-type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: X-Requested-With, content-type, access-control-allow-origin, access-control-allow-methods, access-control-allow-headers');
    
    $host = "localhost";
    $connect =new mysqli($host,"wi2019","se2wi2019","htw")
    or die("Fehler im System");
    
    $data = json_decode(file_get_contents("php://input"));
    if(count($data) > 0)
    {
        
      $start = mysqli_real_escape_string($connect, $data->start);
      $ende = mysqli_real_escape_string($connect, $data->ende);
      $untrbr = mysqli_real_escape_string($connect, $data->Unterbr);
      $snr = mysqli_real_escape_string($connect, $data->snr);
      $jahr = mysqli_real_escape_string($connect, $data->jahr);
      $mon = mysqli_real_escape_string($connect, $data->mon);
      $tag = mysqli_real_escape_string($connect, $data->tag);
      $ist = mysqli_real_escape_string($connect, $data->ist);
      $soll = mysqli_real_escape_string($connect, $data->soll);

        $query = "INSERT INTO Arbeitszeit(SNr,Jahr,Monat,Tag,Start,Ende,Ist,Soll,Unterbrechung) VALUES ('$snr', '$jahr','$mon','$tag','$start','$ende','$ist','$soll','$untrbr')";
        if(mysqli_query($connect, $query))
        {
            echo "Data Inserted...";
            echo $start,$ende,$untrbr, $ist;

        }
        else
        {
            echo 'DS existiert schon';
            $query2 = "UPDATE Arbeitszeit SET Start='$start', Ende='$ende', Ist='$ist' ,Unterbrechung='$untrbr'  WHERE( SNr='$snr'AND (Jahr='$jahr') AND (Monat='$mon') AND Tag='$tag')"; 
                if(mysqli_query($connect, $query2))
              {
                     echo "Data2 Inserted...";
                     echo $start,$ende, $untrbr,$ist;

                }
                else
                  {
                    echo 'Error';
                    

                   }

        }
    }
    
    
    ?>
