(function( $ ){
  
  var methods = {
    init:init,
    check:check
  }
  
  function init(options){
    var self = $(this), _self = this;
    return self.each(function(){
      // Get the radio or checkbox
      var input = $(this); var _input = this;
      var input_type = input.attr("type"), input_id = input.attr("id");
      // Create replacement and add it to the DOM
      var replacement = $("<span class='"+input_type+"'></span>"), $replacement = replacement[0];
      input.after(replacement);
      // Insert input into replacement
      replacement.append(input);
      // Save values for handlers
      $replacement.input_name = input.attr("name"); $replacement.input = input;
      $replacement.input_type = input_type;
      // add events
      replacement.click(click_handler)
      replacement.hover(hover_handler, out_handler);
      // change class according to default state
      active_replacement_class(replacement,input.is(":checked"),input_type)
      // add label bindings
      var label = $("label[for="+input_id+"]");
      if(label.length != 0){
        label[0].trigger = replacement;
        label.click(label_handler)
      }
    })
  }
  
  function click_handler(){
    check_input.apply(this);
  }
  
  function check_input(checked){
    var self = $(this);
    // Retrieve input and find out if the input is checked
    var input = this.input, 
        is_radio = this.input_type == "radio";
    checked = checked == undefined ? !input.is(":checked") : checked;
    if(is_radio){
      // Uncheck any other radio
      checked_radios = $("[name="+this.input_name+"]:checked").not(input)
      if(checked_radios.length != 0)
        checked_radios.parent().removeClass("active_"+this.input_type)
    }
    if(!is_radio || (is_radio && checked)){ 
      //Do not perform check/uncheck actions if is a radio and is checked
      input.attr("checked",checked);
      active_replacement_class(self,checked,this.input_type)
    }
    // Trigger binded change handlers
    if(checked) input.triggerHandler("change")
    // Trigger binded click handlers
    input.triggerHandler("click")
  }
  
  function active_replacement_class(replacement,condition,input_type){
    replacement[condition ? "addClass" : "removeClass"]("active_"+input_type)
  }
  
  function hover_handler(){ $(this).addClass("hover_"+this.input_type) }
  function out_handler(){ $(this).removeClass("hover_"+this.input_type) }
  function label_handler(e){ 
    e.preventDefault();  
    this.trigger.trigger("click")
  }
  
  function check(checked){
    return $(this).each(function(){
      check_input.apply($(this).parent()[0],[checked])
    })
  }
  
  $.fn.checkboxes = function( method ) {
  
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );