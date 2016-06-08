/*
*
* SEND MESSAGE
*
* */
var socket = io('http://test.gr:3000');
$(document).on("click","#chatSubmit",function(){
    if ($('#chatText').val()!="") {
        socket.emit('chat', $('#chatText').val());
        $('#chatText').val('');
        return false;
    }
});
$(document).on("keypress","#chatText",function(e,event) {
    if(e.which === 13) {
        if ($('#chatText').val() != "") {
            socket.emit('chat', $('#chatText').val());
            $('#chatText').val('');
            return false;
        }
    }
});
/*
*
*       CHAT RESPONSE
*
* */
socket.on('chat', function(data){
    var chatText= $('#chati').append('<div class="chatLine"><p class="triangle-isosceles right">'+data.text+'</p><div class="chatDatetime">'+data.created+'</div></div>').append();
});


/*
*
* SOCKET RETURN LOOP FROM SERVER
*
* */
socket.on('loop', function (data) {
    //console.log(data)
    var chatList = "";
    $.each(data.chatter,function(index,chati){
        chatList += '<div class="chatLine"><p class="chatBubble right">'+chati.text+'</p><div class="chatDatetime">'+chati.created+'</div></div>';
    });
    $('#chati').html(chatList);
    scrollBottom();
    //$('time').html('Last Update:' + data.time);
})
/*
*
* EVENT HANDLERS
*
* */
$(document).ready(function(){
    $(document).on("click",".chatMin, .chatTitle",function() {minimize();});
    $(document).on("click",".chatClose",function() {$('.chatBox').hide();});
})
/*
 action on minimize button (_)
 */
function minimize(){
    var chatBody = $(".chatBody");
    if(chatBody.css('bottom')=='0px'){
        chatBody.animate({ bottom: "-=266px"}, 80, function() { return  false; });
    }else if(chatBody.css('bottom')=='-266px'){
        chatBody.animate({ bottom: "+=266px"}, 80, function() { return false; });
    };
}
/*
 scroll to bottom after insert chat
 */
function scrollBottom(){
    if($('.chatLoop').length!=0){
        var height=$(".chatLoop")[0].scrollHeight;
        $(".chatLoop").scrollTop(height);
    }
}