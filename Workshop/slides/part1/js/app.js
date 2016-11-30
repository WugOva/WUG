var $code = $('#code'),
    $view = $('#view'),
    prev;
           

function updateModel() {
    $("<script>" + $code.text() + "<" + "/script>") .appendTo('body');
    var vmInst = new vm();
    ko.cleanNode(document.body);
    ko.applyBindings(vmInst);
}            

function updateView() {
    $('#viewContent').html($view.text());
}

function watch($element) {
    var text = $element.text();
    if (text !== prev) {
        try {

            //updateView();
            updateModel();
        } catch(e) {
            console.log(e);
        }
    }
    prev = text;

    setTimeout(function() { watch($element); }, 200);
}

watch($code);
//watch($view);