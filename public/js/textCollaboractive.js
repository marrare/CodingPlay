// IIFE keeps our variables private
// and gets executed immediately!
(function () {
  // make doc editable and focus
  var doc = document.getElementById('doc');
  doc.contentEditable = true;
  doc.focus();
    
  var sendAll = document.getElementById('sendAll');
  var membersBlock = document.getElementById('membersBlock');
  var membersBlockSend = document.getElementById('membersBlockSend');
    
  var btnChat = document.getElementById('btnChat');
  var msgChat = document.getElementById('msgChat');
  var msgChatSent = document.getElementById('msgChatSent');
    
  var enviarResposta = document.getElementById('enviarResposta');

  // if this is a new doc, generate a unique identifier
  // append it as a query param
  var id = getUrlParameter('id');
  if (!id) {
    location.search = location.search
      ? '&id=' + getUniqueId() : 'id=' + getUniqueId();
    return;
  }

  
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
          nome: nomeUsuario,
          acesso: agora,
          tipo: tipoUsuario,
          participante: participante
        }
      }
    });
    channel = pusher.subscribe(id);
    channel.bind('client-text-edit', function(html) {
      // save the current position
      var currentCursorPosition = getCaretCharacterOffsetWithin(doc);
      doc.innerHTML = html;
      // set the previous cursor position
      setCaretPosition(doc, currentCursorPosition);
    });
    channel.bind('client-members-edit', function(html) {
        $("#membersBlock").html(html);
      
    });
    channel.bind('client-members_alert', function(func) {
        console.log(func);
        if(func.func == 1) {
            confirmarResposta();
        } else if(func.func == 2) {
            alertRetomarSessao();
        } else if(func.func == 3) {
            finalizandoSessao();
        }
      
    });   
    channel.bind('client-mensagem-send', function(msgReceveid, idUsuario) {
        var user = channel.members.get(idUsuario.user_id);
        sendMessage(msgReceveid.msg,msgReceveid.tipoUsuario,user);
    });
    channel.bind('pusher:subscription_succeeded', function(members) {
        
      members.each(function(member) {
        addMember(member);
      });
        
      resolve(channel);
    })
      
    channel.bind('pusher:member_added', function(member) {
      addMember(member);
      var idUserAntigo = oldUser(channel.members.count,channel.members);
      if(idUserAntigo == CodigoUser) {
          channel.trigger('client-members-edit', membersBlock.innerHTML);
          channel.trigger('client-text-edit', doc.innerHTML);
      }
    });
    channel.bind('pusher:member_removed', function(member) {
      removeMember(member);
    });
  }).then(function (channel) {
    function triggerChange (e) {
      channel.trigger('client-text-edit', e.target.innerHTML);
    }
    function triggerEnviarResposta () {
      channel.trigger('client-members_alert', {func : 1});
    }
    function triggerChangeMembers () {
      channel.trigger('client-members-edit', $("#membersBlockSend").val());
    
      var dataInicio = new Date();
      dataInicio = getTimeAndDate(dataInicio);
        
      window.location = "/sessao/start?idSessao="+idSessao+"&participante=0&id="+id+"&horaInicio="+dataInicio;
    }
    function triggerMensageSend () {
        if($("#msgChatSent").val() != "") {
            channel.trigger('client-mensagem-send', {msg : $("#msgChatSent").val(), tipoUsuario : $("#tipoUserChat").val()});
        }
    }
    
    doc.addEventListener('input', triggerChange);
    if(tipoUsuario == "professor") {
        sendAll.addEventListener('click', triggerChangeMembers);
    }
    btnChat.addEventListener('click', triggerMensageSend);
    msgChat.addEventListener('keypress',function(e) {
        if(e.which == 13) {
            if($("#msgChatSent").val() != "") {
                channel.trigger('client-mensagem-send', {msg : $("#msgChatSent").val(), tipoUsuario : $("#tipoUserChat").val()});
            }
        }
    });
      
    enviarResposta.addEventListener('click', triggerEnviarResposta);
  })

  // a unique random key generator
  function getUniqueId () {
    return 'presence-' + Math.random().toString(36).substr(2, 9);
  }

  // function to get a query param's value
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

  function setCaretPosition(el, pos) {
    // Loop through all child nodes
    for (var node of el.childNodes) {
      if (node.nodeType == 3) { // we have a text node
        if (node.length >= pos) {
            // finally add our range
            var range = document.createRange(),
                sel = window.getSelection();
            range.setStart(node,pos);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            return -1; // we are done
        } else {
          pos -= node.length;
        }
      } else {
        pos = setCaretPosition(node,pos);
        if (pos == -1) {
            return -1; // no need to finish the for loop
        }
      }
    }
    return pos; // needed because of recursion stuff
  }
  function addMember(member){
    if(member.info.participante == '1' && member.info.tipo == 'aluno') {
        var node = document.createElement("li");
        var textnode = document.createTextNode(member.info.name);
        node.setAttribute("id",member.id);
        node.appendChild(textnode);
        var tipoFuncao = document.createElement("h3");
        node.appendChild(tipoFuncao);
        document.getElementById('members').appendChild(node);
    } else if(member.info.participante == '0' || member.info.participante == '1' && member.info.tipo == 'professor') {
        var node = document.createElement("li");
        var textnode = document.createTextNode(member.info.name);
        node.setAttribute("id",member.id);
        node.appendChild(textnode);
        document.getElementById('observador').appendChild(node);
    }
    
       
  } 

  function removeMember (member) {
    var node = document.getElementById(member.id);
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
  }
  function oldUser(countMembers,membersOnline) {
    var acessoOld= new Date(membersOnline.me.info.acesso);
    var idUser = membersOnline.me.id;
      
    membersOnline.each(function(member) {
        var membroAcesso = new Date(member.info.acesso);
        
        if(membroAcesso < acessoOld) {
            idUser = member.id;
            acessoOld = new Date(member.info.acesso);
        }
    });

    return idUser;
  }
  function sendMessage(msg,tipoUsuario,user) {
      var text = "";
      
      if(tipoUsuario == "piloto") {
          text = "<li class='message piloto_msg'>";
      } else if(tipoUsuario == "copiloto") {
          text = "<li class='message copiloto_msg'>";
      }
      text += "<div class='chat-body clearfix'>";
      text += "<strong class='primary-font'>";
      text += user.info.name;
      text += "</strong><p>";
      text += msg;
      text += "</p></div></li>";
        
      
      $("#chat").prepend(text);
  }   

          
        
      

})();