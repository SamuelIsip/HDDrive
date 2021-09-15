<?php


    class folders{
    
        private $name;
        private $size;
        private $date;

        function __constructor($name,$size,$date){
            $this->name=$name;
            $this->size=$size;
            $this->date=$date;
        }  

        function __set($var, $value){
            $this->$var=$value;
        } 

        function __get($var){
            return $this->$var;
        } 
    
    } 


?>