<?php
if(isset($_GET['rq'])){
    require_once('INC/request.inc.php');
    $toSend=[];
    gereRequete($_GET['rq']);
    die(json_encode($toSend));
}

require_once('INC/layout.html.inc.php');


