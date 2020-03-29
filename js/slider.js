function mast1(){
 var gr = document.getElementsByTagName('img');
 if(i < 0)
    {
      z = 0-i;
      i = z%(gr.length-1);
    }
  if(i>0)
    { 
      i = i%(gr.length-1);
    }
  
  var iz = gr[i].getAttribute('src');
  document.getElementById('nn').setAttribute('src',iz);
  var iy = gr[i].getAttribute('alt');
  document.getElementById('ny').innerHTML = iy;
  console.log(i);
  return i;
}

function mast2(){
  var gr = document.getElementsByTagName('img');
  if(i < 0)
    {
      z = 0-i;
      i = z%(gr.length-1);
    }
  if(i>0)
    { 
      i = i%(gr.length-1);
    }
  
  console.log(i);
  var iz = gr[i].getAttribute('src');
  document.getElementById('nn').setAttribute('src',iz);
  var iy = gr[i].getAttribute('alt');
  document.getElementById('ny').innerHTML = iy;
  return i;
}