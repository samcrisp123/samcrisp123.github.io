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
    '<select class="form-control"  style="height:35px" id="' + this.boxKey + '" required>';
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
    '<input type="text" class="datepicker" id="' + this.elementId + '" required/>';

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
    var eField = new EnumMTField(field.key,field.displayName,"","Enum");
    eField.setOptions(field.options);
    return eField;
  }
}

function getMetadataFieldsAsArray(token,templateKey,eid) {
  var fields=[];
  $.ajax({
    method: 'get',
    url: "https://api.box.com/2.0/metadata_templates/enterprise_" + eid + "/" + templateKey + "/schema",
    crossDomain: true,
    headers: {
      "Authorization": "Bearer " + token
    },
    cache: false,
    async: false,
    success: function(response) {
      $.each(response.fields, function(k, data) {
        if (data.hidden != 'false') {
          var cField = createMTField(data);
          fields.push(cField);
        }
      });
      fields.reverse();

    },
    error: function(err) {
      console.log(JSON.stringify(err));

    }
  });
    return fields;
}

function searchMe(accessToken,dataTable,columns,searchForm,fields) {
  dataTable.clear();
  var search = $("#searchText").val();
  var filters = "{";
  var delim="";
  //https://api.box.com/2.0/search?mdfilters=[{"templateKey":"entitlement", "scope":"enterprise", "filters":{"markedForReview": "Yes"}}]&fields=id,name,owned_by
  var mdfilters = 'mdfilters=[{%22templateKey%22:%22' + templateKey + '", %22scope%22:%22enterprise%22,%22filters%22:';
  $("#search input").each(function() {
    var inputId=$(this).attr("id");
    var inputVal=$(this).val();
    if(inputVal!='' && inputId!='searchText' && !inputId.startsWith("TTT")) {
      var keyV = "%22" + inputId+ "%22";
      var val;// =  "%22" + $(this).val()+ "%22";
      $.each(fields,function(k,f) {
        if(f.elementId==inputId ) {
          if(f.dataType=='String') {
            val = "%22" + inputVal+ "%22";
          }
          else if(f.dataType=='Number') {
            val = "{%22gt%22:" + inputVal + "";
            if($("#TTT"+f.elementId).val()!=null && $("#TTT"+f.elementId).val()!='') {
              val+=",%22lt%22:" + $("#TTT"+f.elementId).val() + "}";
            }
            else {
              val+="}";
            }
          }
          else if(f.dataType=='Date') {
            var dates = inputVal.split("#");
            var sD = dates[0];
            var eD = dates[1];
            val = "{%22gt%22:\"" + sD + "T00:00:00Z" + "\",%22lt%22:\"" + eD + "T00:00:00Z" + "\"}";
          }
        }
      });
      filters+=delim + keyV + ":"+val;
      delim=",";
    }
    });
    mdfilters+=filters + "}}]";
    var moreResults = true;
    var processed = 0;
    var limit = 30;
    var moreSearches = searchBox(limit,processed,mdfilters,templateKey,accessToken,true,dataTable);
    for(var k=1;k<=moreSearches;k++) {
      console.log("k:" + k + "::" + moreSearches);
      searchBox(limit,k*limit,mdfilters,templateKey,accessToken,false,dataTable);
    }
  }
   
function getInputFieldForCol(colObj) {
  console.log(colObj.type);
  if(colObj.type=='String') {
    return '<input class="mtvalues" type="text" id="' + colObj.data + '" placeholder="Input text.."/>';
  }
  else if(colObj.type=='Number') {
    return '<div><input class="mtvalues nrange" type="number" id="' + colObj.data + '" placeholder="Input number.."/>'+
    '<input class="mtvalues nrange" type="number" id="TTT' + colObj.data + '" placeholder="Input number.."/></div>';
  }
  else if(colObj.type=='Date') {
    return '<input class="mtvalues daterange" type="text" id="' + colObj.data + '" />';
  }
}
function searchBox(limit,processed,mdfilters,templateKey,accessToken,first,dataTable) {
  var retVal=0;
  $.ajax({
    method: 'get',
    url: "https://api.box.com/2.0/search?limit=" + limit + "&offset=" + processed + "&" + mdfilters + "&fields=id,name,metadata.enterprise." + templateKey,
    crossDomain: true,
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    cache: false,
    async: first?false:true,
    success: function(response) {
      var data = [];
      console.log("TC:" + response.total_count);
      if(first) {
        retVal = Math.ceil(response.total_count/limit);
        console.log("Ret:" +retVal);

      }
      $.each(response.entries,function(k,searchData) {
        var val="";
          val = "{\"boxId\":\"" + searchData.id + "\"";
          val+="," +"\"boxName\":\"" + searchData.name +"\"";
          $.each(columns,function(j,colData) {
            var key=colData.data;
            if(searchData.metadata) {
              if(eval("searchData.metadata.enterprise." + templateKey + "." + colData.data)) {
                var value = eval("searchData.metadata.enterprise." + templateKey + "." + colData.data);
                if(colData.type && colData.type=='Number') {
                  val+="," + "\"" + key + "\":" + value + "";
                }
                else if(key!='boxId' && key!='boxName'){
                  val+="," + "\"" + key + "\":\"" + value + "\"";
                }
              }
              else if(key!='boxId' && key!='boxName'){
                val+="," + "\"" + key + "\":\"\"";
              }
            }
          });
          val+="}";
        //console.log(val);
        data.push(JSON.parse(val.replace(/(\r\n|\n|\r)/gm,"")));
      });

      dataTable.rows.add(data);
      dataTable.draw();
    }});
    if(first) {
      return retVal;
    }
  }
