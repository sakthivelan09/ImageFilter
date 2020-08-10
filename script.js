var fimage=null;
var gimage=null;
var rimage=null;
var rainimage=null;
var oimage=null;
var dd1=document.getElementById("d1");
var dd2=document.getElementById("d2");
function upload()
{
  
  var imageinput=document.getElementById("fileinput");
  fimage=new SimpleImage(imageinput);
  gimage=new SimpleImage(imageinput);
  rimage=new SimpleImage(imageinput);
  oimage=new SimpleImage(imageinput);
  rainimage=new SimpleImage(imageinput);
  fimage.drawTo(dd1);
}
function r(){
  var ctx = dd1.getContext("2d");
   var ctx2 = dd2.getContext("2d");
  ctx.clearRect(0,0,dd1.width, dd1.height);
  ctx2.clearRect(0,0,dd2.width, dd2.height);
   fimage=null;
    gimage=null;
    rimage=null;
    rainimage=null;
}
function greyscale(){
  
  if(check(gimage)!=null){
    greyscalefilter();
    gimage.drawTo(dd2);
  }
}
function red()
{
  if(check(rimage)!=null){
    redfilter();
    rimage.drawTo(dd2);
  }
}
 function rainbow(){
  if(check(rainimage)!=null){
    rainbowfilter();
    rainimage.drawTo(dd2);
  }
}
function rainbowfilter(){
  var height = rainimage.getHeight();
  for (var pixel of rainimage.values()) {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) {
      //red
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) {
      //orange
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) {
      //yellow
      if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) {
      //green
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7) {
      //blue
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7) {
      //indigo
      if (avg < 128) {
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else {
      //violet
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
  rainimage.drawTo(dd2);
}
  
function greyscalefilter(){
  for(var pix of gimage.values())
    {
      var avg=(pix.getRed()+pix.getBlue()+pix.getGreen())/3;
      pix.setRed(avg);
      pix.setGreen(avg);
      pix.setBlue(avg);
    }
  gimage.drawTo(dd2);
}
function redfilter()
{
  for(var pix of rimage.values())
    {
      var avg=(pix.getRed()+pix.getBlue()+pix.getGreen())/3;
      if(avg<128){
        pix.setRed(2*avg);
        pix.setBlue(0);
        pix.setGreen(0);
      }
      else{
        pix.setRed(255);
        pix.setGreen((2*avg)-255);
        pix.setBlue((2*avg)-255);
      }
    }
  rimage.drawTo(dd2);
}

function check(fimage){
  if(fimage==null){
    alert("No image uploaded.");
    return null;
  }
  else{return fimage;}
}
function blurimage(){
 if(check(fimage)!=null){
   var output = new SimpleImage(fimage.getWidth(), fimage.getHeight());
for (var pixel of fimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) {
        var other = getPixelNearby(fimage, x, y, 10);
        output.setPixel(x, y, other);
    }
    else {
        output.setPixel(x, y, pixel);
    }
}
   
 }
  output.drawTo(dd2);
}
function ensureInImage (coordinate, size) {
    // coordinate cannot be negative
    if (coordinate < 0) {
        return 0;
    }
    // coordinate must be in range [0 .. size-1]
    if (coordinate >= size) {
        return size - 1;
    }
    return coordinate;
}

function getPixelNearby (fimage, x, y, diameter) {
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, fimage.getWidth());
    var ny = ensureInImage(y + dy, fimage.getHeight());
    return fimage.getPixel(nx, ny);
}
function win(){
  oimagew=oimage.getWidth()-30;
  oimageh=oimage.getHeight()-30;
  for(var pix of oimage.values())
    {
      if(pix.getX()<=30 || pix.getX()>=oimagew)
        {
          pix.setRed(0);
          pix.setBlue(0);
          pix.setGreen(0);
        }
      if(pix.getY()<=30 || pix.getY()>=oimageh)
        {
          pix.setRed(0);
          pix.setBlue(0);
          pix.setGreen(0);
        }
      if(pix.getX()>=oimagew/2 && pix.getX()<=(oimagew/2)+30)
        {
          pix.setRed(0);
          pix.setBlue(0);
          pix.setGreen(0);
        }
      if(pix.getY()>=oimageh/2 && pix.getY()<=(oimageh/2)+30)
        {
          pix.setRed(0);
          pix.setBlue(0);
          pix.setGreen(0);
        }
      if(pix.getX()>=oimagew/4 && pix.getX()<=(oimagew/4)+30)
        {
          pix.setRed(0);
          pix.setBlue(0);
          pix.setGreen(0);
        }
      if(pix.getX()>=(3*oimagew)/4 && pix.getX()<=((3*oimagew)/4)+30)
        {
          pix.setRed(0);
          pix.setBlue(0);
          pix.setGreen(0);
        }
      
    }
  oimage.drawTo(dd2);
}