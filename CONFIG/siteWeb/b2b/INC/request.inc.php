<?php
if ( count( get_included_files() ) == 1) die( '--access denied--' );

function display($txt){
    global $toSend;
    if(isset($toSend)){
        $toSend['display'] = $txt;
    }

}

function debug($txt){
    global $toSend;
    if(isset($toSend)){
        $toSend['debug'] = $txt;
    }

}

function toSend($txt, $action = 'aPropos'){
    global $toSend;
    if ($action == 'error') {
        if (isset($toSend)) {
            $toSend['error'] = $txt;
        }
    } else if($action == 'formTP05') {
        if (isset($toSend)) {
            $toSend['formTP05'] = $txt;
        }
    }  else if(isset($toSend)){
        $toSend[$action] = $txt;
    }
}



function error($txt){
    global $toSend;
    if(isset($toSend)){
        $toSend['error'] = $txt;
    }
}

function chargeTemplate($name = 'yololo'){
    $name = 'INC/template.'.$name.'.inc.php';
    return file_exists($name) ? implode('', file($name)) : false;
}

function gereRequete($rq){
    global $toSend;
    switch ($rq) {
        case 'contact' :
        case 'actu' :
        case 'acceuil' :
        case 'aPropos' :
            $res = chargeTemplate($rq);
            if ($res) toSend($res, $rq);
            break;
        case 'co' :
        case 'so' :
        case 'ex' :
        case 'pu' :
            $res = mySqlCo($rq);
            if ($res) toSend($res, $rq);
            break;
    }
}
function mySqlCo($rq){
    $env = "";
    $rep= "";
    try
    {
        $dbName = 'b2b';
        $host = '54.37.65.61';
        $utilisateur = 'root';
        $motDePasse = 'ephecpower';
        $port='3306';
        $dns = 'mysql:host='.$host .';dbname='.$dbName.';port='.$port.';charset=utf8';
        $connection = new PDO($dns, $utilisateur, $motDePasse );
    }
    catch(Exception $e)
    {
        die('Erreur : '.$e->getMessage());
    }
    $reponse = $connection->prepare("SELECT nom, prix, img, lib FROM produits where lib='".$rq."'");
    $reponse -> execute();
    $result = $reponse->fetchAll();
    return $result;
    /*
    while ($donnees = $reponse->fetchAll())
    {
        $rep = $donnees['img'];
        $rep += "<section class='rep'>";
        $rep += "<img src=/IMG/".$donnees['img']." alt=".$donnees['nom']."height=42 width=42><br>";
        $rep +=  $donnees['nom']." <br>";
        $rep += "Prix : ".$donnees['prix']." €";
        $rep += "</section>";

    }


    return $rep;
    $reponse->closeCursor();
    */
}

