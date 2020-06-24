jQuery.fn.reverse = [].reverse;

class StandardMTField {
  constructor(boxKey,boxDisplayName,placeholder,dataType) {
    this.elementId=boxKey;
    this.elementName=boxKey;
    this.boxKey=boxKey;
    this.boxDisplayName=boxDisplayName;
    this.placeholder=placeholder;
    this.dataType=dataType;
  };
  getElementId() {
    return elementId;
  }
  getElementName() {
    return elementName;
  }
  getBoxKey() {
    return boxKey;
  }
  getBoxDisplayName() {
    return boxDisplayName;
  }
  getPlaceholder() {
    return placeholder;
  }
  getDataType() {
    return dataType;
  }
  getHTMLDisplay() {
    return '<label for="' + this.boxKey + '">' +this.boxDisplayName + '</label>' +
    '<input type="text" id="' + this.boxKey + '" name="' +this.boxKey + '" placeholder="' + this.placeholder + '.." required>'
  }
  postProcess() {

  }
};
class EnumMTField extends StandardMTField {
  setOptions(options) {
    this.options = options;
  }
  getOptions() {
    return this.options;
  }
  getHTMLDisplay() {
    var html =  '<label for="' + this.boxKey + '">' +this.boxDisplayName + '</label>' +
    '<select class="form-control"  style="height:35px" id="' + this.boxKey + '">';
    $.each( this.options, function( id, key ) {
      html+='<option value="' + key.key + '">' + key.key + '</option>';
    });
    html+='</select>';
    return html;
  }
}
class DateField extends StandardMTField {
  postProcess() {
    console.log("post processing");
    $( "#" + this.elementId ).datepicker({ "dateFormat": "yy-mm-dd" });
  }
  getHTMLDisplay() {
    return '<label for="' + this.boxKey + '">' +this.boxDisplayName + '</label>' +
    '<input type="text" class="datepicker" id="' + this.elementId + '"/>';

  }

}
function createMTField(field) {
  console.log(field.type);
  if(field.type=='string' ) {
    return new StandardMTField(field.key,field.displayName,"Enter text..","String");
  }
  else if(field.type=='float' ) {
    return new StandardMTField(field.key,field.displayName,"Enter number..","Number");
  }
  if(field.type=='date' ) {
    return new DateField(field.key,field.displayName,"Enter text..","Date");
  }
  else if(field.type=='enum') {
    console.log("here 0");
    var eField = new EnumMTField(field.key,field.displayName,"","Enum");
    console.log("here 1" + field.options);
    eField.setOptions(field.options);
    console.log("here 2");
    return eField;
  }
}
