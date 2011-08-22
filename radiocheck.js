(function( $ ){
  function init(options){
    var self = $(this), _self = this;
    return self.each(function(){
      var input = $(this); var _input = this;
      var input_type = input.attr("type"), input_id = input.attr("id");
      var replacement = $("<span class='"+input_type+"'></span>"), $replacement = replacement[0];
      input.change(function(e){console.log(e)})
      input.after(replacement);
      replacement.append(input);
      $replacement.input_name = input.attr("name"); $replacement.input = input;
      $replacement.input_type = input_type;
      replacement.click(click_handler)
      replacement.hover(hover_handler, out_handler);
      active_replacement_class(replacement,input.is(":checked"),input_type)
      
      var label = $("label[for="+input_id+"]");
      if(label.length != 0){
        label[0].trigger = replacement;
        label.click(label_handler)
      }
    })
  }
  
  function click_handler(){
    var self = $(this);
    var input = this.input, check = !input.is(":checked");
    if(this.input_type == "radio"){
      checked_radios = $("[name="+this.input_name+"]:checked")
      checked_radios.parent().removeClass("active_"+this.input_type)
    }
    input.attr("checked",check);
    if(check) input.triggerHandler("change")
    input.triggerHandler("click")
    active_replacement_class(self,check,this.input_type)
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
  
  function update(){

  }
  
  $.fn.radiocheck = init;

})( jQuery );