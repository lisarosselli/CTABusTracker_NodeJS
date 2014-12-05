requirejs.config({
  baseUrl: 'javascripts',
  paths: {
    jquery: 'jquery-2.1.0.min',
    Backbone: 'backbone-min'
  },
  shim: {
    'backbone-min': {
      deps: ['jquery', 'underscore-min'],
      exports: 'Backbone'
    }
  }
});

require(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCAD-IeK_FoKEM_5mmYq0DZf_p3dytgobA&sensor=true', 'jquery', 'underscore-min'], function() {
  require(['bootstrap.min', 'Backbone','async','logger','attractions','browser_app'], function() {
    console.log("All JS loaded.");
    initialize();
  });
});