//Gerar código de texto compartilhado da sessão 
$(document).ready(function(){
    var codigo = Math.random().toString(36).substr(2, 9);
    $("#textoColaborativo").attr("value",codigo);
});

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
        $("#dadosCriarSessao").show("slow");
    });
    $("#cancelar").click(function(e) {
        $("#confirmar, #cancelar").hide("slow");
        $("#areaProblema").show("slow");
        $("#dadosCriarSessao").hide("slow");

        $(".section_gap").attr("class","section_gap_top");

        $("#idProblema").attr("value","");
        $(".Problema td:nth-child(1)").html("");
        $(".Problema td:nth-child(2)").html("");
        $(".Problema td:nth-child(3)").html("");
    });
});

//////////////////////VALIDAÇÃO HORA INICIO E FINAL
$("#hora_inicio").change(function() {
    var horaInicioAtual = new Date($("#hora_inicio").val());
    var minHoraFinal = new Date(horaInicioAtual);
    minHoraFinal.setHours(horaInicioAtual.getHours() + 1);
    
    minHoraFinal = getFormatDate(minHoraFinal);

    $("#hora_final").attr("min",minHoraFinal);
});

//////////// PERMITE APENAS QUE A SESSÃO SEJA REALIZADA PARA UMA DATA FUTURA
$(document).ready(function(){
    
    var tempoInicio = new Date();
    var tempoFinal = new Date(tempoInicio);
    tempoFinal.setHours(tempoInicio.getHours() + 1);
    
    tempoInicio = getFormatDate(tempoInicio);
    tempoFinal = getFormatDate(tempoFinal);

    $("#hora_inicio").attr("min",tempoInicio);
    $("#hora_final").attr("min",tempoFinal);
});

////////////////////////// GERAR PALAVRA COM 3 LETRAS E 2 NÚMEROS
$(".pointer").click(function(e) {
    var palavra = "", letrasConfirmadas=0, numerosConfirmados=0;
    var aleatorio = Math.round(Math.random() * (2 - 1) + 1);
    var alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numeros = "0123456789";

    for( i=0; i < 5; i++) {

        if(letrasConfirmadas == 3) {
            aleatorio = 2;
        } else if (numerosConfirmados == 2) {
            aleatorio = 1;
        } else {
            aleatorio = Math.round(Math.random() * (2 - 1) + 1);
        }

        switch (aleatorio) {
            case 1: letraMaiuscula = alfabeto.charAt(Math.round(Math.random() * (26 - 0) + 0));
                    palavra += letraMaiuscula;
                    letrasConfirmadas++;
                    break;

            case 2:	letraMinuscula = numeros.charAt(Math.round(Math.random() * (10 - 0) + 0));
                    palavra += letraMinuscula;
                    numerosConfirmados++;
                    break;
        }
    }
    $("#nomeSessao").attr("value",palavra);
});

function getFormatDate(agora) {
    
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
    
    var tempo = ano+"-"+mes+"-"+data+"T"+horas+":"+minutos;
    
    return tempo;
}