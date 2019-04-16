function qtdUsersPorSessao(text_colaboractive,situacao,confirm) {

  
  channelCodigo = 'presence-' +text_colaboractive;
  const CodigoUser = "user-" + codigoPusher;
  const agora = new Date();

  return new Promise(function (resolve, reject) {
    // subscribe to the changes via Pusher
    var pusher = new Pusher('58026cd0bcc122dade8b', {
      cluster: 'us2',
      forceTLS: true,
      auth: {
        params: {
          userId: CodigoUser,
          nome: nomeUsuario
        }
      }
    });
    channel = pusher.subscribe(channelCodigo);
    channel.bind('pusher:subscription_succeeded', function(members) {
        
      if(situacao == 1){    
        updateMembersCount(channel.members);
      }
      resolve(channel);
    });
      
    channel.bind('pusher:member_added', function() {
      if(situacao == 1){
        updateMembersCount(channel.members);
      }
    });
    channel.bind('pusher:member_removed', function() {
      if(situacao == 1){
        updateMembersCount(channel.members);
      }
    });
  }).then(function (channel) {
    function triggerEnviarResposta () {
      channel.trigger('client-members_alert', {func : 3});
    }
      
    if(confirm == 1) {
        triggerEnviarResposta();
    }
  })
  
  
  function updateMembersCount(members) {
    var online = 0;

    members.each(function(member) {
        if(member.info.participante == '1' && member.info.tipo == 'aluno') {
            online++;
        }
    });
    document.getElementById(text_colaboractive).innerHTML = online;
  }

}