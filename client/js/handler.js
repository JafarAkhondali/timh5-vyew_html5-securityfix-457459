//Globals
var segment,path;
var movePath = false;
var hitOptions = {
    segments: true,
    stroke: false,
    fill: true,
    tolerance: 5
};
var clicked = null;
var opath = null;

//Binding context menu
// $('#canvas').on('contextmenu', function(event) {
//     event.preventDefault();
//     $('#divCMenu').css({
//         'top': event.pageY,
//         'left': event.pageX,
//         'display':'block'
//     });
// });


//Binding click events of toolset
$( '[ctype="tbutton"]' ).bind( "click", function() {
  worker.toolset.toolpersists = ($(this).attr('toolpersists') != undefined)? false : true;
  worker.toolset.currenttool = $(this).attr('for');
  console.log("Selected "+ worker.toolset.currenttool + " tool");
});

//Binding color tools
$( '[ctype="coloroption"]' ).bind( "click", function() {
  worker.toolset.fillcolor = $(this).css('background-color');
  console.log("Selected "+ worker.toolset.fillcolor + " as fill color");
});

//Binding stroke tools
$('[ctype="strokeoption"]').bind( "click", function() {
  worker.toolset.strokewidth = $(this).attr('ssize');
  worker.toolset.strokecolor = $(this).css('color');
  console.log("Selected "+ worker.toolset.strokewidth + " as stroke width and<br>selected "+ worker.toolset.strokecolor + " as stroke color");

});

//Binding recent activity button
$( "#btnclear" ).bind( "click", function() {
  $('#divDebug').html('');
});


function onMouseDrag(event) {
  clicked = false;
  if (segment) {
    var selecteditem = paper.project.getSelectedItems()[0];
    worker.transform(event, segment, path, selecteditem);
	}else if(path){
    worker.transition(event, path);
  }
  else{
    opath = worker.draw(Path, event, opath);
  }
}

function onMouseDown(event) {

  clicked = true;
  segment = path = null;

	var hitResult = project.hitTest(event.point, hitOptions);
	if (!hitResult)
		return;

	if (event.modifiers.shift) {
		if (hitResult.type == 'segment') {
			hitResult.segment.remove();
		};
		return;
	}

	if (hitResult) {
		path = hitResult.item;
		if (hitResult.type == 'segment') {
			segment = hitResult.segment;
		} else if (hitResult.type == 'stroke') {
			var location = hitResult.location;
			segment = path.insert(location.index + 1, event.point);
			path.smooth();
		}
	}

	movePath = hitResult.type == 'fill';

}

function onMouseMove(event) {
    clicked = null
    project.activeLayer.selected = false;
    if (event.item){
      event.item.selected = true;
    }
}

function onMouseUp(event) {
  if(clicked){
    var selecteditem = paper.project.getSelectedItems()[0];
    if(selecteditem){
        if(worker.toolset.currenttool == 'delete'){
          worker.deleteobject(selecteditem);
        }
        if(worker.toolset.currenttool == 'paintformat'){
          worker.paintformat(selecteditem);
        }
    }
    if(worker.toolset.currenttool == 'text'){
        worker.inserttext(paper,event);
    }
  }else{
    if(worker.toolset.currenttool == 'path'){
        opath = null;
    }
  }
}

function onKeyDown(event) {
  event.preventDefault();
}

function onKeyUp(event) {
  event.preventDefault();
  // if(event.key == "backspace"){
  //   if(paper.project.getSelectedItems()[0]){
  //     paper.project.getSelectedItems()[0].remove()
  //   }
  // }
}
