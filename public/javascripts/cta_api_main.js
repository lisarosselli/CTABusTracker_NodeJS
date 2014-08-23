

$(function(){
 	document.getElementById("gettime").onclick = queryApi;
  document.getElementById("getroutes").onclick = queryApi;
  document.getElementById("getvehicles").onclick = queryApi;
  document.getElementById("getdirections").onclick = queryApi;
  document.getElementById("getstops").onclick = queryApi;

});

function queryApi( event ) {
    var paramObj = [];
    var p = document.getElementById("userParams").value;

    //e = event;
    console.log("this="+this);
    console.log("event.target="+event.target);
    console.log("queryApi for "+this.id);

    if (p) {  
      console.log(p);
      paramObj.push(p);
    }

    console.log(paramObj);

    var parameters = { 
                        apicall: this.id,
                        urlParams: paramObj
                      };

    console.log(parameters);

    $.get('/cta_api', parameters, function(data) {
        var response = xmlToJSON.parseString(data);
        console.log(response);
        $('#results').html(data);
    });
}