$(document).ready(function(){
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
        event.preventDefault();
        $(".menu a").attr("selected", false);
        $(this).attr('selected','selected');
        appelAjax(this);

    });

    function appelAjax(elem){
        $rq = $(elem).attr('href').split('.html')[0];
        $.get("index.php?rq=" + $rq, gereRetour);
    }

    function gereRetour(retour){
       var x ="";
       var cont= '';
       var action = "";
       retour = testeJson(retour);
       for(var key in retour){
           action = key;
       }
       switch(action){
           case 'display' :
               for(x in retour){
                   cont += retour[x];
               }
               $('#contenu').html(cont);
               break;
           case 'jsonError' :
               $text = "Error : <br>" + retour[action]["error"] + "<hr>"
                   + "Json : <br>" + retour[action]["json"];
               $('#jsonError').html($text).fadeIn(500);
               break;
           case 'makeTable' :
               $table=makeTable(retour[action]);
               $('#contenu').html($table).fadeIn(500);
               break;
           case 'error' :
               $('#gestion aside').fadeOut(0);
               for(x in retour){
                   cont += retour[x];
               }
               $('#' + action).html(cont);
               $('#' + action).fadeIn(500);
               break;
           default :
               console.log("Action inconnue :" + Object.keys(retour)[0]);
               for(x in retour){
                   console.log(retour[x]);
               }


       }
   }

    $cont = "<section id='gestion'>"
            + "<aside id='error'></aside>"
            + "<aside id='message'></aside>"
            + "<aside id='debug'></aside>"
            + "<aside id='jsonError'></aside>"
            + "<aside id='kint'></aside>"
            + "</section>"
    $('#global').after($cont);
    $('#gestion aside').css('display', 'none');

    $('#gestion aside').dblclick(function(){
        $('#gestion aside').fadeOut(500);
    });
});


function makeTable(tableau){
    var fonction = 'makeTableFrom' + tableau.__proto__.constructor['name'];
    var out = window[fonction](tableau);
    return out;
}

function makeTableFromObject(tableau){
    var firstElement = tableau[Object.keys(tableau)[0]];
    var elementType = firstElement.__proto__.constructor['name'];
    var fonction = 'makeThead' + elementType;
    var out = "<table class=myTab class=object>"
        + window[fonction](firstElement, elementType)
        + makeTbody(tableau, 'array');
    + "</table>";
    return out;

}


function makeTableFromArray(tableau){
    var firstElement = tableau[0];
    var elementType = firstElement.__proto__.constructor['name'];
    var fonction = 'makeThead' + elementType;
    var out = "<table class=myTab class=array>"
        + window[fonction](firstElement, elementType)
        + makeTbody(tableau, 'array');
    + "</table>";
    return out;
}

function makeTbody(tab, type='Array'){
    var out = '<tbody>'
        + Object.keys(tab).map(function(k){ return '\t<tr id=' + (type='Array' ? 'lig_': '') + k + '>\n\t\t<td>' + k + '</td>\n'
            + Object.keys(tab[k]).map(function(x) {return '\t\t<td>' + tab[k][x] + '</td>';}).join('\n')
            + '\t</tr>';
        }).join('\n');
    +'</tbody>';
    return out;
}

function makeTheadArray(el, type='Array'){
    var out = '<thead>\t<tr>\n\t\t<th>' + (type =='Array' ? 'index' : 'clé') + '</th>'
        + Object.keys(el).map(function(x) {return '\t\t<th>col_' + x + '</th>'}).join('\n')
        + '\t</tr>\n</thead>';
    return out;
}

function makeTheadObject(el, type='Array'){
    var out = '<thead>\t<tr>\n\t\t<th>' + (type == 'Array' ? 'index' : 'clé') + '</th>'
        + Object.keys(el).map(function(x) {return '\t\t<th>' + x + '</th>'}).join('\n')
        + '\t</tr>\n</thead>\n';
    return out;
}
function testeJson(json){
    var parsed;
    try {
        parsed = JSON.parse(json);
        /*
        parsed =    "C'est bien du JSON dont les clés sont : <hr>"
                    + Object.keys(parsed).join(" - ")
                    + "<hr>"
                    + json;
        */
    } catch(e){
        console.log('jsonerror :' + json);
    }
    return parsed;

}