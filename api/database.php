<?php

    include "credentials.php";

    class Database{

        public $con;
    
        public function getConnection()
       {
            $this->con = null;
        
            try{
                $this->con = mysqli_connect($host,$username,$password,$db_name) or die("No ha podido realizarse la conexión.".mysqli_connect_error());
            } catch(Exception $e){
                echo "Connection error: ".$e->getMessage();
            };

            return $this->con;
       } 

       public function closeConnection()
        {
            if($this->con != null)
                mysqli_close($this->con);
        }  
    } 

?>
