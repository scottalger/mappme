angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash == "#_=_") window.location.hash = "";

    //Then init the app
    angular.bootstrap(document, ['mean']);


    var doc_height = $(document).height();
    var doc_width = $(document).width();

    setTimeout(function(){

    	var chat_height = 200;
    	var chat_width = doc_width;
    	var chat_form_height = 40;
    	var chat_form_width = chat_width;
    	var chat_board_height = chat_height - chat_form_height;
    	

    	var map_height = doc_height - chat_height - 41;

    	$(".angular-google-map-container").height(map_height);

    	$(".tli-chat").height(chat_height);
    	$(".tli-chat-form").height(chat_form_height);
    	$(".tli-chat-form").width(chat_form_width);
    	$(".tli-chat-form input").width(chat_form_width - 13);
    	$(".tli-chat-form input").height(chat_form_height - 8);
    	$(".tli-chat-board").height(chat_board_height);

    },3000);

});