/**
 * presents the keyboard events class
 *
 * NOTE: this class generally is for an internal usage, it builds a new clean
 *       unextended mouse event.
 *       Use the Event general constructor, if you need a usual extened event.
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Event.Keyboard = new Class(Event.Base, {
  
  extend: {
    NAMES: $w('keypress keydown keyup'),
    
    KEYS: {
      BACKSPACE:  8,
      TAB:        9,
      ENTER:     13,
      ESCAPE:    27,
      SPACE:     32,
      PAGE_UP:   33,
      PAGE_DOWN: 34,
      END:       35,
      HOME:      36,
      LEFT:      37,
      UP:        38,
      RIGHT:     39,
      DOWN:      40,
      INSERT:    45,
      DELETE:    46
    },
    
    /**
     * automatically generates the key checking methods like
     * isEscape()
     * isEnter()
     * etc
     */
    Methods: Object.walk(Object.clone(Event.KEYS), function(key, value) {
      return [('is_'+key.toLowerCase()).camelize(), function() { return (this.keyCode || this.charCode) == value; }];
    }),
    
    /**
     * processes the event extending as a keyboard event
     *
     * @param Event before extending
     * @return Event after extending
     */
    ext: function(event) {
      $ext(event, this.Methods, true);
      
      // TODO other extending stuff in here
      
      return event;
    }
  },
  
  // default keyboard related events options
  Options: {
    keyCode:  0,
    charCode: 0
  },
  
// protected
  build: function(options) {
    var event = null;
    
    if (Browser.IE) {
      event = this.$super(options);
      this.initIE(event, options)
    } else try {
      // Gecko, WebKit, Chrome
      event = document.createEvent('KeyboardEvent');
      this['init'+Browser.WebKit ? 'Webkit' : 'Gecko'](event, options);
    } catch(e) {
      // basically Opera
      event = document.createEvent('UIEvent');
      this.initDOM2(event, options);
    }
    
    return event;
  },
  
  initGecko: function(event, options) {
    event.initKeyEvent(options.name,
      options.bubbles, options.cancelable, document.defaultView,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
      options.keyCode, options.charCode
    );
  },
  
  initWebkit: function(event, options) {
    event.initKeyboardEvent(options.name,
      options.bubbles, options.cancelable, document.defaultView,
      null, 0, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey
    );
  },
  
  initDOM2: function(event, options) {
    event.initUIEvent(options.ame, options.bubbles, options.cancelable, document.defaultView, 1);

    event.keyCode   = options.keyCode;
    event.charCode  = options.charCode;
    event.altKey    = options.altKey;
    event.metaKey   = options.metaKey;
    event.ctrlKey   = options.ctrlKey;
    event.shiftKey  = options.shiftKey;
  },
  
  initIE: function(event, options) {
    event.keyCode  = options.keyCode;
    event.charCode = options.charCode;
  }
});