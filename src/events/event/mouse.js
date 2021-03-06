/**
 * presents the mouse events class
 *
 * NOTE: this class generally is for an internal usage, it builds a new clean
 *       unextended mouse event.
 *       Use the Event general constructor, if you need a usual extened event.
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
Event.Mouse = new Class(Event.Base, {
  
  extend: {
    NAMES: $w('click middleclick rightclick dblclick mousedown mouseup mouseover mouseout mousemove'),
    
    Methods: {
      isLeftClick: function() {
        return this.which == 1;
      },

      isRightClick : function() {
        return this.which == 3;
      }
    },
    
    /**
     * proceses the event extending as if it's a mouse event
     *
     * @param Event new event
     * @return Event extended event
     */
    ext: function(event) {
      $ext(event, this.Methods, true);
            
      return event;
    }
  },
  
  // default mouse events related options
  Options: {
    pointerX: 0,
    pointerY: 0,
    button:   0
  },

// protecteds
  build: function(options) {
    var event = Browser.IE ? this.$super(options) : document.createEvent("MouseEvent");
    this[Browser.IE ? 'initIE' : 'initW3C'](event, options);
    return event;
  },
  
  options: function(name, options) {
    options = this.$super(name, options);
    options.button = Event.BUTTONS[options.name == 'rightclick' ? 'RIGHT' : options.name == 'middleclick' ? 'MIDDLE' : 'LEFT'];
    options.name   = Event.realName(options.name);
    
    return options;
  },
  
// private
  initIE: function(event, options) {
    event.clientX = options.pointerX;
    event.clientY = options.pointerY;
    event.button  = options.button;
  },
  
  initW3C: function(event, options) {
    event.initMouseEvent(options.name, options.bubbles, options.cancelable, document.defaultView,
      name == 'dblclick' ? 2 : 1, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, options.element
    );
  }
});

try {
  // boosting up the native events by preextending the prototype if available
  $ext(Event.parent.prototype, Event.Mouse.Methods, true);
} catch(e) {};
