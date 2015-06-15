var gb;
var vyew = (function(){
  var _vyew;
  function init(k){
    //Key to be used with every request
    var lock = k;

    return{
      toolset: defaultset.toolset,
      draw: function(Path, e, p){
        switch (this.toolset.currenttool) {
          default:
          case "circle":
                          {
                            p = new Path.Circle({
                              	center: e.downPoint,
                              	radius: e.downPoint.subtract(e.point).length,
                                fillColor: this.toolset.fillcolor,
                                strokeColor: this.toolset.strokecolor,
                                strokeWidth: this.toolset.strokewidth
                            });
                          }
                          break;
          case "rectangle":
                          {
                            p = new Path.Rectangle({
                                from: e.downPoint,
                                to: e.point,
                                fillColor: this.toolset.fillcolor,
                                strokeColor: this.toolset.strokecolor,
                                strokeWidth: this.toolset.strokewidth
                            });
                          }
                          break;
          case "triangle":
                          {
                            p = new Path.RegularPolygon({
                                center: e.downPoint,
                                sides: 3,
                                radius: e.downPoint.subtract(e.point).length,
                                fillColor: this.toolset.fillcolor,
                                strokeColor: this.toolset.strokecolor,
                                strokeWidth: this.toolset.strokewidth
                            });
                          }
                          break;
          case "line": //Straight line
                          {
                            p = new Path.Line({
                                from: e.downPoint,
                                to: e.point,
                                strokeColor: this.toolset.strokecolor,
                                strokeWidth: this.toolset.strokewidth
                            });
                          }
                          break;
          case "path":  //
                          {
                            if(!p){
                              p = new Path();
                              p.strokeColor = this.toolset.strokecolor;
                              p.strokeWidth = this.toolset.strokewidth;
                            }
                            p.add(e.point);
                            p.smooth();
                          }
                          break;

        }

        if(this.toolset.currenttool != "path"){
          p.removeOnDrag();
          p = null;
        }

        return p;
      },
      inserttext: function(p,e){
        var text = new p.PointText(e.downPoint);
            text.content = "hello g";
            text.style = {
                fontFamily: 'Courier New',
                fontWeight: 'bold',
                fontSize: 20,
                fillColor: this.toolset.fillcolor,
                justification: 'center'
        };
      },
      transition: function(e,p){
        p.position = p.position.add(e.delta);
      },
      transform: function(e,s,p,obj){
        s.point = s.point.add(e.delta);
    		p.smooth();
      },
      paintformat: function(obj){
        obj.fillColor = this.toolset.fillcolor;
        obj.strokeWidth = this.toolset.strokewidth;
        obj.strokeColor = this.toolset.strokecolor;
      },
      deleteobject: function(obj){
        obj.remove();
      }
    }
  };
  return{
    getInstance: function(key){
      if(!_vyew){
        _vyew = init(key);
        console.log("Activated with key " + key);
      }else{
        console.log("Already activated. Returning...");
      }
      return _vyew;
    }
  }
})(console.log("Room is Ready! Waiting for key and activation...","#f00","#fff"));
worker = vyew.getInstance("AHHHJX66766776XXX7878787XHHAHGHGHGGHW");
