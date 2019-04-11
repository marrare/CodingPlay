function qtdUsersPorSessao(text_colaboractive) {

  
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
        
      updateMembersCount(channel.members);
    
      resolve(channel);
    });
      
    channel.bind('pusher:member_added', function() {
      
      updateMembersCount(channel.members);
      
    });
    channel.bind('pusher:member_removed', function() {

      updateMembersCount(channel.members);
      
    });
  })

  function updateMembersCount(members) {
     var online = 0;
        
      members.each(function(member) {
        if(member.info.participante == '1') {
            online++;
        }
      });
    document.getElementById(text_colaboractive).innerHTML = online;
  }

}