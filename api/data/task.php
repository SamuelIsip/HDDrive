<?php


    class task{
    
        private $title;
        private $text;
        private $date;
        private $modified;

        function __constructor($title,$text,$date,$modified){
            $this->title=$title;
            $this->text=$text;
            $this->date=$date;
            $this->modified=$modified;
        }  

        function __set($var, $value){
            $this->$var=$value;
        } 

        function __get($var){
            return $this->$var;
        } 
    
    } 


?>