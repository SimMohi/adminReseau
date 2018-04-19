$(document).ready(function(){
    $('#contenu').css('display', 'none');

    $.get("index.php?rq=acceuil", gereRetour);

    // premier du menu qui est focus
    $("#menu a:first").attr('selected','selected');

    // lors du passage dans la zone footer id crédit deviens visible
    $("footer").mouseover(function() {
        $('#credits').css('visibility', 'visible');
    });

    // lors de sortie de la zone footer id crédit disparait
    $("footer").mouseout(function() {
        $('#credits').css('visibility', 'hidden');
    });

    // liens dans la zone footer s'ouvre dans un nouvel onglet
    $("#credits a").click(function() {
        window.open($(this).attr("href"));
        return false;
    });

    //fonction d'appelAjax

    //lorsqu'on clic sur un des lien du menu on appel la fonction appelAjax
    $(".menu a").click(function(event){
        var th = this;
        event.preventDefault();
        $(".menu a").attr("selected", false);
        $(this).attr('selected','selected');
        $("#contenu").fadeOut( 500, function() {
            appelAjax(th);
        });

    });





    function appelAjax(elem){
        $rq = $(elem).attr('href').split('.html')[0];
        $.get("index.php?rq=" + $rq, gereRetour);
    }

    function gereRetour(retour) {
        var x = "";
        var cont = '';
        var action = "";
        retour = testeJson(retour);
        for (var action in retour) {
            switch (action) {
                case 'co':
                case 'so':
                case 'ex':
                case 'pu':
                    $('#contenu').html(makeList(retour)).fadeIn(500);
                    break;
                case 'contact' :
                case 'actu' :
                case 'acceuil' :
                case 'aPropos' :
                    $('#contenu').html(retour[action]).fadeIn(500);
                    break;

            }
        }
    }
});
function testeJson(json){
    var parsed;
    try {
        parsed = JSON.parse(json);
    } catch(e){
        parsed = {"jsonError": {'error': e, 'json': json}};
    }
    return parsed;

}
function makeList(array){
    var cont = "";
    for(var i =0; i < array[Object.keys(array)].length; i++){
        cont += "<section class=repDb>";
        cont += "<img class='imgDb' src='IMG/" + array[Object.keys(array)][i]["img"] + "' alt ='" + array[Object.keys(array)][i]["nom"] + "' height=102 width =102><br>";
        cont += array[Object.keys(array)][i]["nom"] + "<br>";
        cont += "Prix : " + array[Object.keys(array)][i]["prix"] + " €";
        cont += "</section>";
    }
    return cont;
}