$(document).ready(function(){
    $("#novaConta").validate({
        rules: {
        	matricula: {
                required: true
            },
            nome: {
            	required: true
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
                required: "Campo obrigatório"
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

