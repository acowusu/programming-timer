import './style.css'
import 'bootstrap/scss/bootstrap.scss'

let start = Date.now()
let id;
document.querySelector('#btn-container').addEventListener('click', function (event) {
  if (event.target.type === 'button') {
    if (event.target.id === "b-1") {
      id = window.requestAnimationFrame(time)

    } else {
      let selector = '#r-' + (--event.target.id.split('-')[1] )
      console.log(selector)
       
      document.querySelector(selector).textContent = (Date.now()-start)/(60*1000)
    }
    console.log('button clicked', event.target.textContent)
    console.log(event.target)

    if (event.target.nextElementSibling && event.target.nextElementSibling.type ==="button") {
      event.target.nextElementSibling.classList.remove('disabled')
      event.target.classList.add('disabled')
      
      start = Date.now()



    } else {
      console.log('id is' ,id)
      window.cancelAnimationFrame(id)
    }
     
  }
})
function time() {
  document.querySelector('#master').textContent = formatTime(Date.now()-start)
  id = window.requestAnimationFrame(time)
}
function formatTime(ms) {
  let hours = (ms/(1000*60*60)>>0)
  let mins = (ms/(1000*60)>>0) -hours*60
  let secs = (ms / (1000) >> 0)  -hours*60*60 -mins*60
  let milis = (ms % (1000))
  hours = hours===0 ? '' :hours+ ':'
  return hours  + mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0') + '.'+ milis.toString().padEnd(3, '0')[0]
}
// window.requestAnimationFrame(time)
document.querySelector('#btn-copy').addEventListener('click', function () {
  let res = ""
  for (let i = 1; i <= 4; i++){
    res+= `	${document.querySelector('#r-'+i).textContent}`
  }
  res = "AC	1"+res
  copyToClipboard(res)
})
function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
  } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // make the textarea out of viewport
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
      });
  }
}