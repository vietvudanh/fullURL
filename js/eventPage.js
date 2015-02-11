// prevent default backspace
var rx = /INPUT|SELECT|TEXTAREA/i;
$(document).bind("keydown keypress", function(e){
    if( e.which == 8 || e.which == 13 || e.which == 27){ // 8 == backspace
        if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
            e.preventDefault();
        }
    }
});

// current active
var isActive = false;
var isShiftDown = false;

// handle keypress event
$(document).keypress(function(event){

    //  current unactive
    if(event.which == 47 && !isActive){
        addDiv();
        return;
    }

    // normal calse
    if(isActive){
        var tmp = $('#full-url-input').text();
        var str = null;
        if(isShiftDown){
            str = String.fromCharCode(event.which);
        }
        else{
            str = String.fromCharCode(event.which).toLowerCase();
        }
        $('#full-url-input').text(tmp + str);
        return;
    }
});

// handler for keydown evetn
$(document).keydown(function(event){
    
    // press esc
    if(event.which == 27 && isActive){
        removeDiv();
        return;
    }

    if(event.which == 8){
        var tmp = $('#full-url-input').text();
        $('#full-url-input').text(tmp.substring(0, tmp.length - 1));
        return;
    }

    // enter
    if(isActive && event.which == 13){
        // open new tab
        var str = $('#full-url').text();
        console.log(str);
        if(validUrl(str)){
            window.open(str,'_blank');  
        }
        else{
            window.open('http://google.com/search?q='+$('#full-url-input').text(), '_blank');
        }
        removeDiv();
    }
});

// add div at bot for enter URL
function addDiv(){
    isActive = true;
    var $div = $("<div>")
        .attr("class", "full-url")
        .append("<p id='full-url-http'>http://</p>")
        .append("<p id='full-url-input'></p>")
        
    $(document.body).append($div);
}

// remove div at bot for enter URL
function removeDiv(){
    isActive = false;
    $(".full-url").remove();
}

// check valid URL
function validUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}