/**
 * the Event unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var EventTest = TestCase.create({
  name: 'EventTest',
  
  testDefaultExtending: function() {
    var mock_event = {mock: 'event'};
    
    // should not apply the keyboard or mouse extensions by default
    this.assertNotCalled([
      [Event.Keyboard, 'ext'],
      [Event.Mouse, 'ext']
    ], function() {
      Event.ext({mock: 'event'});
    });
  },
  
  testMouseEventsExtending: function() {
    var mock_event = { mock: 'event', type: 'click' };
    
    this.assertCalled(
      Event.Mouse, 'ext', function() {
      this.assertSame(mock_event, Event.ext(mock_event));
    }, this);
    
    // should not call the mouse extentions on the keyboard events
    this.assertNotCalled(Event.Keyboard, 'ext', function() {
      Event.ext({ mock: 'event', type: 'click' });
    });
  },
  
  testKeyboardEventsExtending: function() {
    var mock_event = { mock: 'event', keyCode: Event.KEYS.ENTER };
    
    this.assertCalled([
      [Event.Keyboard, 'ext']
    ], function() {
      this.assertSame(mock_event, Event.ext(mock_event));
    }, this);
    
    // should not call the mouse extentions on the keyboard events
    this.assertNotCalled(Event.Mouse, 'ext', function() {
      Event.ext({ mock: 'event', keyCode: Event.KEYS.ENTER });
    });
  },
  
  testMouseEventInstance: function() {
    for (var i=0; i < Event.Mouse.NAMES.length; i++) {
      var event_name = Event.Mouse.NAMES[i];
      
      this.event = new Event(event_name);
      
      if (!this.util.Browser.Konqueror) {
        if (event_name == 'rightclick') {
          event_name = 'contextmenu';
        }
        if (this.util.Browser.IE)
          event_name = 'on'+event_name;
      }
      
      this.assertEqual(event_name, this.event.type);
    }
  },
  
  testKeyboardEventInstance: function() {
    for (var i=0; i < Event.Keyboard.NAMES.length; i++) {
      var event_name = Event.Keyboard.NAMES[i];
      this.event = new Event(event_name);
    }
  },
    
  testInstanceWithOptions: function() {
    var event = new Event('click', {
      altKey: true,
      ctrlKey: true,
      shiftKey: true
    });
    
    this.assert(event.altKey);
    this.assert(event.ctrlKey);
    this.assert(event.shiftKey);
  }
});