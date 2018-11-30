if( window.IMAGINARY === undefined ) {
  window.IMAGINARY = {};
}

window.IMAGINARY.CindyViewer = (function(){

  /**
   * Gets the query string
   * @return {object} map of query string parameters
   */
  function getQueryString() {
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function(s) { return decodeURIComponent(s.replace(pl, ' ')); };
    var query = window.location.search.substring(1);

    var urlParams = {};
    var match = search.exec(query);
    while (match) {
      urlParams[decode(match[1])] = decode(match[2]);
      match = search.exec(query);
    }

    return urlParams;
  }

  // List of created viewers to handle the window resize
  var viewers = [];
  // Timeout for throttled resize
  var resizeTimeout;
  function throttledResize() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        onResize();
        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  /**
   * Window resize handler
   *
   * It rescales all viewers created through this library
   */
  function onResize() {
    for(var i = 0; i !== viewers.length; i += 1) {
      scaleFrame(viewers[i].wrapper, viewers[i].iframe);
    }
  }

  window.addEventListener('resize', throttledResize);

  /**
   * Scales a fixed size iframe so it fits the parent. Centered horizontally.
   *
   * @param wrapper {DOMElement} The parent DOM element
   * @param iframe {IFrame} The iframe DOM element to resize
   */
  function scaleFrame(wrapper, iframe) {
    var scaleFactor = Math.min(
      wrapper.offsetHeight / iframe.offsetHeight,
      wrapper.offsetWidth / iframe.offsetWidth
    );
    var xOffset =  (wrapper.offsetWidth - iframe.offsetWidth * scaleFactor) / 2;
    iframe.style.transform = 'translate(' + xOffset + 'px, 0) scale(' + scaleFactor + ')';
  }

  function appendQS(url, params) {
    var qsSub = Object.keys(params).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    });

    if (url.indexOf('?') === -1) {
      return url + '?' + qsSub;
    } else {
      return url + '&' + qsSub;
    }
  }

  /**
   * Creates a Cindy app viewer
   *
   * @param parent {DOMElement} The parent DOM element
   * @param src {string} Url of the cindy app html
   * @param appWidth {number} Fixed width of the app (default: 1560)
   * @param appHeight {number} Fixed height of the app (default: 1170)
   * @param lang {string} Language code
   */
  function create(parent, src, appWidth, appHeight, lang) {

    if(appWidth === undefined || appWidth === null) {
      appWidth = 1560;
    }

    if(appHeight === undefined || appHeight === null) {
      appHeight = 1170;
    }

    var qs = getQueryString();
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', appendQS(src, {
      lang: qs['lang'] !== undefined ? qs['lang'] : lang
    }));
    iframe.setAttribute('width', appWidth);
    iframe.setAttribute('height', appHeight);
    iframe.style.border = 'none';
    iframe.style.margin = '0 auto';
    iframe.style.padding = 0;
    iframe.style.transformOrigin = 'top left';

    parent.style.overflow = 'hidden';
    parent.appendChild(iframe);

    viewers.push({wrapper: parent, iframe: iframe});
    scaleFrame(parent, iframe);

    document.addEventListener('DOMContentLoaded', function () {
      scaleFrame(parent, iframe);
    });
  }

  // Init viewers using [data-cindy-src] attributes
  document.addEventListener('DOMContentLoaded', function () {
    var parents = document.querySelectorAll('[data-cindy-src]');
    for (var i = 0; i != parents.length ; i++ ) {
      var appWidth = parents[i].getAttribute('data-cindy-appwidth');
      var appHeight = parents[i].getAttribute('data-cindy-appheight');
      var lang = parents[i].getAttribute('data-cindy-lang');
      create(parents[i],
        parents[i].getAttribute('data-cindy-src'),
        appWidth ? appWidth : null,
        appHeight ? appHeight : null,
        lang ? lang : null
      );
    }
  });

  return {
    create: create
  };
})();