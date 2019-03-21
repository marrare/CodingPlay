function acessoRapido() {
    Swal.fire({
  title: 'Forneça o código da sessão',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  showCancelButton: true,
  cancelButtonText: 'Cancelar',
  confirmButtonText: 'Buscar',
  showLoaderOnConfirm: true,
  preConfirm: (codigo) => {
      window.location = "/sessao/info?nome_sessao="+codigo;
  }
})
}