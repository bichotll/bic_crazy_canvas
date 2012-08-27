// remember to change every instance of "bic_crazy_canvas" to the name of your plugin!
;(function($) {
 
    // here we go!
    $.bic_crazy_canvas = function(element, options) {
 
        // plugin's default options
        // this is private property and is  accessible only from inside the plugin
        var defaults = {
 
            element_insert: 'body',
            element_pisarra: $('<canvas id="pisarra" style="position: absolute; width: 100%; height: 100%"  >YES, IE SUCKS</canvas>'),
            guix: null,
 
            // if your plugin is event-driven, you may provide
            // callback capabilities for its events.
            // execute these functions before or after events of your
            // plugin, so that users may customize those particular
            // events without changing the plugin's code
            onFoo: function() {}
 
        }
 
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

            plugin.print_line();

            // code goes here
            alert('test');
 
        }
 
        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // element.data('bic_crazy_canvas').publicMethod(arg1, arg2, ... argn)
        // from outside the plugin, where "element"
        // is the element the plugin is attached to;

        plugin.insert_pisarra = function(){
            $(defaults.element_insert).prepend(defaults.element_pisarra);
        }

        plugin.asignar_guix = function(){
            defaults.guix = $('#pisarra')[0].getContext('2d');
        }

        plugin.print_line = function(){
            plugin.asignar_guix();

            defaults.guix.moveTo(0,0);
            defaults.guix.lineTo(300,150);
            defaults.guix.stroke();

            defaults.guix.lineWidth = 20;
            defaults.guix.beginPath();
            defaults.guix.moveTo(5, 50);
            defaults.guix.bezierCurveTo(30, 30, 130, 530, 200, 100);
            defaults.guix.stroke();
        }
 
        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)
 
        // a private method. for demonstration purposes only - remove it!
        var foo_private_method = function() {
 
            // code goes here
 
        }
 
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