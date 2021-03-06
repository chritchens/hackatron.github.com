(function($){
  var el;
  var settings = {};

  var methods = {
    init: function(options) {
      el = this;

      settings = {
        token: false,
        query_param: 'q'
      };

      if (options) {
        $.extend(settings, options);
      }

      if (!settings.token || settings.query_param == '') {
        return this;
      }

      $.getJSON(
        'http://tapirgo.com/api/1/search.json?token=' + settings.token + '&query=' + paramValue(settings.query_param) + '&callback=?', function(data){
          if (settings['complete']) { settings.complete(paramValue(settings.query_param), data) }
          if (data.length > 0) {
            $.each(data, function(key, val) {
              el.append('<div class="result"><p><a href="' + val.link + '">' + val.title + '</a></p></div>');
            });
          } else {
            el.append('<div class="no-result"><p>No results, try a different query.</p></div>');
          }
        }
      );

      return this;
    },
    paramValue: function(query_param) {
      el = this;

      if (paramValue(query_param)) {
        el.val(paramValue(query_param));
      }

      return this;
    }
  };

  // Extract the param value from the URL.
  function paramValue(query_param) {
    var results = new RegExp('[\\?&]' + query_param + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : false;
  }

  $.fn.tapir = function(method) {
    if (methods[method]) {
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tapir');
    }
  };

})( jQuery );