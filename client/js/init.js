/* Copyright 2015 Vyew.com
   This script is responsible of loading all the scripts
*/
var worker;
init = function(jscripts){

  //Overriding console.log to use for recent activity
  console.log = function(message,bcolor,fcolor) {
    if(!bcolor) bcolor = "#0f0";
    if(!fcolor) fcolor = "#000";
    var elem = $('<div style="background-color:' + bcolor +
                 ';width:100%;color:' + fcolor +
                 ';height:auto;border-bottom:1px dotted #000;">' + message +
                 '</div>').fadeOut(400, function(){
                      $(this).fadeIn(400);
                  });
    $('#divDebug').prepend(elem);
  };
  console.error = console.debug = console.info =  console.log;

  var RELPATH="js/";

  var jscripts = [{"n":"framework.js","t":"text/javascript"},
                  {"n":"core/paper-full.js","t":"text/javascript"},
                  {"n":"handler.js","t":"text/paperscript","customattr":{"attname":"canvas","attvalue":"canvas"}},
                  {"n":"utility.js","t":"text/javascript"}
                ];
  for(var i=jscripts.length - 1;i>=0;i--){

      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.type = jscripts[i].t;

      if(jscripts[i].customattr != undefined){
        script.setAttribute(jscripts[i].customattr.attname, jscripts[i].customattr.attvalue);
      }

      head.appendChild(script);

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = whatsloaded(jscripts[i]," ready state changed");
      script.onload = whatsloaded(jscripts[i]," loaded");

      script.src = RELPATH + jscripts[i].n;

  }

  function whatsloaded(obj,from){
    console.log(obj.n + from);
  }
}();
