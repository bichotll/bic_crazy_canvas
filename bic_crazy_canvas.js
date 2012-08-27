// remember to change every instance of "bic_crazy_canvas" to the name of your plugin!
;(function($) {
 
    // here we go!
    $.bic_crazy_canvas = function(element, options) {
 
        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {
 
            element_insert: 'body',
            element_pisarra: $('<canvas id="pisarra" style="position: fixed; float:left"  >YES, IE SUCKS</canvas>'),
            guix: null,
 
            // if your plugin is event-driven, you may provide
            // callback capabilities for its events.
            // execute these functions before or after events of your
            // plugin, so that users may customize those particular
            // events without changing the plugin's code
            onFoo: function() {}
 
        }

        //mides pisarra
        var pisarra_X, pisarra_Y;
 
        // to avoid confusions, use "plugin" to reference the current
        // instance of the object
        var plugin = this;
 
        // this will hold the merged default, and user-provided options
        // plugin's properties will be available through this object like:
        // plugin.settings.propertyName from inside the plugin or
        // element.data('bic_crazy_canvas').settings.propertyName from outside
        // the plugin, where "element" is the element the plugin is
        // attached to;
        plugin.settings = {}
 
        // reference to the jQuery version of DOM element the plugin is attached to
        var $element = $(element),
             element = element;    // reference to the actual DOM element
 
        // the "constructor" method that gets called when the object is created
        plugin.init = function() {
 
            // the plugin's final properties are the merged default
            // and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options)


            plugin.insert_pisarra();

            //plugin.print_line_click();

            //test event click pisarra
            $('body').click( function(){
                plugin.print_line_click();
                plugin.guardar_canvas();
            } );

            //KO...
            //event resize finestra
            $('body').resize( function(){
                alert('moviment');
            } );

            //KO
            //a la sortida guardem el canvas
            /*$( window ).bind( 'beforeunload', function() {
               plugin.guardar_canvas();
            } );*/
 
        }
 
        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('bic_crazy_canvas').publicMethod(arg1, arg2, ... argn)
        // from outside the plugin, where "element"
        // is the element the plugin is attached to;

        plugin.insert_pisarra = function(){
            $(defaults.element_insert).prepend(defaults.element_pisarra);

            defaults.guix = $('#pisarra')[0].getContext('2d');

            plugin.asignar_mides_pisarra();

            if ( sessionStorage.getItem("pisarra") != '' ){
                //asignem dataurl a un objecte imatge
                var img = new Image;
                img.src = sessionStorage.getItem("pisarra");
                

                defaults.guix.beginPath();
                defaults.guix.drawImage(img,0,0);
                defaults.guix.stroke();

                alert(sessionStorage.getItem('pisarra'));
            }
        }

        plugin.guardar_canvas = function(){
            sessionStorage.setItem("pisarra", $('#pisarra')[0].toDataURL());
        }

        plugin.asignar_mides_pisarra = function(){
            //via http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
            if( typeof( window.innerWidth ) == 'number' ) {
                //Non-IE
                pisarra_X = window.innerWidth;
                pisarra_Y = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                //IE 6+ in 'standards compliant mode'
                pisarra_X = document.documentElement.clientWidth;
                pisarra_Y = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                //IE 4 compatible
                pisarra_X = document.body.clientWidth;
                pisarra_Y = document.body.clientHeight;
            }

            //asignem
            $('#pisarra').attr('height', pisarra_Y + 'px');
            $('#pisarra').css('height', pisarra_Y + 'px');
            $('#pisarra').attr('width', pisarra_X + 'px');
            $('#pisarra').css('width', pisarra_X + 'px');
        }

        plugin.print_line_click = function(){

            var color = '#'+Math.floor(Math.random()*16777215).toString(16);
            var pos_A = Math.random()*pisarra_X;
            var pos_B = Math.random()*pisarra_Y;
            var pos_C = Math.random()*pisarra_X;
            var pos_D = Math.random()*pisarra_Y;

            //calcular punta
            var punta = parseInt(Math.random()*4);
            if ( punta == 0 ){
                var pos_A = 0;
                var pos_B = 0;
                var pos_C = Math.random()*pisarra_X;
                var pos_D = Math.random()*pisarra_Y;
            } else if ( punta == 1 ){
                var pos_A = pisarra_X;
                var pos_B = pisarra_Y;
                var pos_C = Math.random()*pisarra_X;
                var pos_D = Math.random()*pisarra_Y;
            } else if ( punta == 2 ){
                var pos_A = 0;
                var pos_B = pisarra_Y;
                var pos_C = Math.random()*pisarra_X;
                var pos_D = Math.random()*pisarra_Y;
            } else if (punta == 3){
                var pos_A = pisarra_X;
                var pos_B = 0;
                var pos_C = Math.random()*pisarra_X;
                var pos_D = Math.random()*pisarra_Y;
            }

            defaults.guix.beginPath();
            defaults.guix.moveTo(pos_A,pos_B);
            defaults.guix.lineTo(pos_C,pos_D);
            defaults.guix.strokeStyle = color;
            defaults.guix.stroke();
        }
 
        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

 
        // fire up the plugin!
        // call the "constructor" method
        plugin.init();
 
    }
 
    // add the plugin to the jQuery.fn object
    $.fn.bic_crazy_canvas = function(options) {
 
        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {
 
            // if plugin has not already been attached to the element
            if (undefined == $(this).data('bic_crazy_canvas')) {
 
                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new $.bic_crazy_canvas(this, options);
 
                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('bic_crazy_canvas').publicMethod(arg1, arg2, ... argn) or
                // element.data('bic_crazy_canvas').settings.propertyName
                $(this).data('bic_crazy_canvas', plugin);
 
            }
 
        });
 
    }
 
})(jQuery);