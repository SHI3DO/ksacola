var username = "KSA Student";
var Ses_img = "{{url_for('static', filename = 'storage/user_image/Deven.jpg')}}";

function scrollDown(){
    var wtf    = $('.wchat-chat-body');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
    $(".scroll-down").css({'visibility':'hidden'});
}

function chatWith(chatuser,toid,img,status) {

    if ($("#pane-intro").css('visibility') == 'visible')
    {
        $("#pane-intro").css({'visibility':'hidden'});
        $(".chat-right-aside").css({'visibility':'visible'});
    }

    createChatBox(chatuser,toid,img,status);

    scrollDown();

    $('.right .top').attr("data-user",chatuser)
        .attr("data-image",img);
}

function createChatBox(chatboxtitle,toid,img,status,minimizeChatBox) {
    var chatFormTpl =
        '<div class="block-wchat" id="chatForm_' + chatboxtitle + '">' +
        '<div id="typing_on"></div>' +
        '<div tabindex="-1" class="input-container">' +
        '<div tabindex="-1" class="input-emoji">' +
        '<div class="input-placeholder" style="visibility: visible;display:none;">Type a message</div>' +
        '<textarea class="input chatboxtextarea" id="chatboxtextarea" name="chattxt" onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + chatboxtitle + '\',\'' + toid + '\',\'' + img + '\');" contenteditable spellcheck="true" style="resize:none;height:20px" placeholder="Type a message"></textarea>' +
        '</div>' +
        '</div>' +
        '<button onclick="javascript:return clickTosendMessage(\'' + chatboxtitle + '\',\'' + toid + '\',\'' + img + '\');" class="btn-icon icon-send fa fa-paper-plane-o font-24 send-container"></button>' +
        '</div>';


    if ($("#chatbox_"+ chatboxtitle).length > 0) {

        $("#chatFrom").html(chatFormTpl);

        $(".chatboxtextarea").focus();
        return;
    }


    $(" <div />").attr("id", "chatbox_" + chatboxtitle)
        .addClass("chat chatboxcontent active-chat")
        .attr("data-chat", "person_" + toid)
        .attr("client", chatboxtitle)
        .html('<span class="hidecontent"></span>')
        .appendTo($("#resultchat"));
        if (minimizeChatBox != 1) {
            $("#chatFrom").html(chatFormTpl);
        }
}

function checkChatBoxInputKey(event,chatboxtextarea,chatboxtitle,toid,img,send) {

    $(".input-placeholder").css({'visibility':'hidden'});

    if((event.keyCode == 13 && event.shiftKey == 0) || (send == 1))  {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g,"");

        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(".input-placeholder").css({'visibility':'visible'});
        $(".chatboxtextarea").css('height','20px');
        if (message != '') {
            message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
            message = message.replace(/\n/g, "<br />");
            var $con = message;
            var $words = $con.split(' ');
            for (i in $words) {
                if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
                else if ($words[i].indexOf('www') == 0 ) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
            }
            message = $words.join(' ');
            message = emojione.shortnameToImage(message); // Set imotions


            $("#chatbox_"+ chatboxtitle).append('<div class="col-xs-12 p-b-10 odd">' +
            '<div class="chat-body">' +
            '<div class="chat-text">' +
            '<h4>'+username+'</h4>' +
            '<p>'+message+'</p>' +
            '</div>' +
            '</div>' +
            '</div>');

            $(".target-emoji").css({'display':'none'});
            $('.wchat-filler').css({'height':0+'px'});



            async function request() {
                const response = await fetch('https://ksacola-api.vercel.app/content/' + message,
                {
                    method: 'GET',
                });

                var data = await response.json();
                console.log(data.val)

            $("#chatbox_"+ chatboxtitle).append('<div class="col-xs-12 p-b-10' +
            '<div class="chat-image  profile-picture max-profile-picture">' +
            '<div class="chat-body">' +
            '<div class="chat-text">' +
            '<h4>'+'크사콜라'+'</h4>' +
            '<p>'+data.val+'</p>' +
            '</div>' +
            '</div>' +
            '</div>');

            $(".target-emoji").css({'display':'none'});
            $('.wchat-filler').css({'height':0+'px'});
                console.log("added")
            }

            request();
            scrollDown();

        }
        scrollDown();



        return false;
    }

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 60;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);

        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height',adjustedHeight+8 +'px');
    } else {
        $(chatboxtextarea).css('overflow','auto');
    }

}

function clickTosendMessage(chatboxtitle,toid,img) {

    message = $(".chatboxtextarea").val();

    message = message.replace(/^\s+|\s+$/g,"");

    $(".chatboxtextarea").val('');
    $(".chatboxtextarea").focus();
    $(".input-placeholder").css({'visibility':'visible'});
    $(".chatboxtextarea").css('height','20px');
    if (message != '') {

        message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
        message = message.replace(/\n/g, "<br />");
        var $con = message;
        var $words = $con.split(' ');
        for (i in $words) {
            if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
            else if ($words[i].indexOf('www') == 0 ) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
        }
        message = $words.join(' ');
        message = emojione.shortnameToImage(message);  // Set imotions

        $("#chatbox_"+chatboxtitle).append('<div class="col-xs-12 p-b-10 odd">' +
        '<div class="chat-body">' +
        '<div class="chat-text">' +
        '<h4>'+username+'</h4>' +
        '<p>'+message+'</p>' +
        '</div>' +
        '</div>' +
        '</div>');

        $(".target-emoji").css({'display':'none'});
        $('.wchat-filler').css({'height':0+'px'});
        scrollDown();
    }



    var adjustedHeight = $(".chatboxtextarea").clientHeight;
    var maxHeight = 40;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max($(".chatboxtextarea").scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > $(".chatboxtextarea").clientHeight)
            $($(".chatboxtextarea")).css('height',adjustedHeight+8 +'px');
    } else {
        $($(".chatboxtextarea")).css('overflow','auto');
    }
    return false;
}