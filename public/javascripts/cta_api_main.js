$(function(){
 	document.getElementById("gettime").onclick = queryApi;
  document.getElementById("getroutes").onclick = queryApi;
  document.getElementById("getvehicles").onclick = queryApi();
  document.getElementById("getdirections").onclick = queryApi();
  document.getElementById("getstops").onclick = queryApi;
});

var t = {color: "grey", gender: "female"};
// {rt: 36} 

function queryApi( event ) {

    e = event;
    console.log("this="+this);
    console.log("event.target="+event.target);
    console.log("queryApi for "+this.id);

    var parameters = { 
                        apicall: this.id,
                        urlParams: paramObj
                      };
    
    //var parameters = { apicall: this.id };
  

    $.get('/cta_api', parameters, function(data) {
        var response = xmlToJSON.parseString(data);
        console.log(response);
        $('#results').html(data);
    });
}