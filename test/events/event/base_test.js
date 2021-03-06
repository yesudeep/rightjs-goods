/**
 * Event.Base unit tests
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-ilc-om>
 */
var EventBaseTest = TestCase.create({
  name: 'EventBaseTest',
  
  testExt: function() {
    var mock_event = {mock: 'event'};
    
    this.assertSame(mock_event, Event.ext(mock_event));
    
    this.assertNotNull(mock_event.stop, "should have 'stop' method");
    this.assertNotNull(mock_event.preventDefault, "should have 'preventDefault' method");
    this.assertNotNull(mock_event.stopPropagation, "should have 'stopPropagation' method");
  }
});