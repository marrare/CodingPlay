//////////////////////////// EFEITOS DE SELECIONAR PROBLEMA
$(function(){
    $(".pointer").click(function(e) {
        e.preventDefault;
        var idProblema = $(this).closest('tr').find('td[data-nome]').data('nome');
        var problema = $(this).closest('tr').find('td[data-problema]').data('problema');
        var professor = $(this).closest('tr').find('td[data-professor]').data('professor');
        var dificuldade = $(this).closest('tr').find('td[data-dificuldade]').data('dificuldade');
        $("#idProblema").attr("value",idProblema);
        $("#problema").html(problema);
        $("#professor").html(professor);
        $("#dificuldade").html(dificuldade);

        $(".section_gap_top").attr("class","section_gap");

        $("#confirmar, #cancelar").show("slow");
        $("#areaProblema").hide("slow");
        $("#problemaSelecionado").show("slow");
    });
    $("#cancelar").click(function(e) {
        $("#confirmar, #cancelar").hide("slow");
        $("#areaProblema").show("slow");
        $("#problemaSelecionado").hide("slow");

        $(".section_gap").attr("class","section_gap_top");

        $("#idProblema").attr("value","");
        $(".Problema td:nth-child(1)").html("");
        $(".Problema td:nth-child(2)").html("");
        $(".Problema td:nth-child(3)").html("");
    });
});

//////////// PERMITE APENAS QUE A SESSÃO SEJA REALIZADA PARA UMA DATA FUTURA
$(document).ready(function(){
    
    var agora = new Date();
    var ano = agora.getFullYear();
    var mes = agora.getMonth()+1;
    var data = agora.getDate();
    var horas = agora.getHours();
    var horasFinal = horas+1;
    var minutos = agora.getMinutes();
    
    if(mes < 10) {
        mes = "0"+mes;
    }
    if(data < 10) {
        data = "0"+data;
    }
    if(horas < 10) {
        horas = "0"+horas;
    }
    if(horasFinal < 10) {
        horasFinal = "0"+horasFinal;
    }
    if(minutos < 10) {
        minutos = "0"+minutos;
    }
    
    var tempoInicio = ano+"-"+mes+"-"+data+"T"+horas+":"+minutos;
    var tempoFinal = ano+"-"+mes+"-"+data+"T"+horasFinal+":"+minutos;
    console.log(tempoFinal);

    $("#hora_inicio").attr("min",tempoInicio);
    $("#hora_final").attr("min",tempoFinal);
});

////////////////////////// GERAR PALAVRA COM 4 LETRAS E 4 NÚMEROS
$(".pointer").click(function(e) {
    var palavra = "", letras=0, numeros=0;
    var letraMaiuscula = Math.round(Math.random() * (90 - 65) + 65);
    var letraMinuscula = Math.round(Math.random() * (122 - 97) + 97);
    var numero = Math.round(Math.random() * (57 - 48) + 48);
    var aleatorio = Math.round(Math.random() * (3 - 1) + 1);

    for( i=0; i < 8; i++) {

        if(letras == 4) {
            aleatorio = 3;
        } else if (numeros == 4) {
            aleatorio = Math.round(Math.random() * (2 - 1) + 1);
        } else {
            aleatorio = Math.round(Math.random() * (3 - 1) + 1);
        }

        switch (aleatorio) {
            case 1: letraMaiuscula = Math.round(Math.random() * (90 - 65) + 65);
                    palavra += ("&#"+letraMaiuscula);
                    letras++;
                    break;

            case 2:	letraMinuscula = Math.round(Math.random() * (122 - 97) + 97);
                    palavra += ("&#"+letraMinuscula);
                    letras++;
                    break;

            case 3:	numero = Math.round(Math.random() * (57 - 48) + 48);
                    palavra += ("&#"+numero);
                    numeros++;
                    break;
        }
    }

    $("#codigoTemporario").html(palavra);
    palavra = $("#codigoTemporario").html();
    $("#nomeSessao").attr("value",palavra);
});