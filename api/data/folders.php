<?php


    class folders{
    
        private $name;

        function __constructor($name){
            $this->name=$name;
        }  

        function __set($var, $value){
            $this->$var=$value;
        } 

        function __get($var){
            return $this->$var;
        } 
    
    } 


?>