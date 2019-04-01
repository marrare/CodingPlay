//Gerar código de texto compartilhado da sessão 
$(document).ready(function(){
    var codigo = Math.random().toString().substring(2);
    $("#idPusher").attr("value",codigo);
});

//Validação
$(document).ready(function(){
    $("#novaConta").validate({
        rules: {
        	matricula: {
                required: true
            },
            nome: {
            	required: true,
                minlength: 3
            },
            email: {
    			required: true,
    			email: true
    		},
    		senha: {
    			required: true
    		},
    		confirSenha: {
    			required: true,
                equalTo: "#senha"
    		}
            
        },
        messages: {
            matricula:{
				required:"Campo obrigatorio"
			},
        	nome: {
                required: "Campo obrigatório",
                minlength: "Mínimo de 3 caracteres"
            },
			email: {
				required: "Campo obrigatório",
				email: "Este endereço de email não é válido"
			},
			senha:{
    			required: "Campo obrigatorio"
    		},
    		confirSenha: {
    			required: "Campo obrigatorio",
                equalTo: "As senhas não coincidem"
    		}
        }
    });
}); 

