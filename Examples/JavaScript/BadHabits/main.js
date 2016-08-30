(function($, document) {
    'use strict';    
    
    var MyAmazingApp = function () {
        var self = this;
        self.onReady = init;
        
        self.renderExternalTmpl = function(item, onDone) {
            var file = '../js/' + item.name + '.html';
            $.when($.get(file))
            .done(function(tmplData) {
                $.templates({ tmpl: tmplData });
                $(item.selector).append($.render.tmpl(item.data));
                
                if (typeof onDone === 'function') {
                    onDone();
                }
            });    
        }

        function init() {
            new document.myAmazingApp.UsersController();                        
        }
        
        
        return self;
    };
    
    document.myAmazingApp = new MyAmazingApp();
    $(document.myAmazingApp.onReady);
     
    
})(jQuery, document);

