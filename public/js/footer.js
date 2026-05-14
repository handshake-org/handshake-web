document.addEventListener('DOMContentLoaded', function(){

const footer = document.getElementById('footer')
const footerHeader = document.getElementsByClassName('header')
const footerLinks = document.getElementsByClassName('links')
const footerCaretsUp = document.getElementsByClassName('footer-caret-up')
const footerCaretsDown = document.getElementsByClassName('footer-caret-down')
let lastFooterTarget = null

// functions

const setCaretOrientationToClosed = function(){
  for (index = 0; index < footerCaretsDown.length - 1; ++index) {
    footerCaretsDown[index].classList.remove('hide')
    footerCaretsUp[index].classList.add('hide')
  }
}

const open = function(target){

  if (target === lastFooterTarget) {
    target.children[1].classList.remove('hide')
    target.lastElementChild.children[0].classList.add('hide')
  } else if (lastFooterTarget !== null) {
    lastFooterTarget.children[1].classList.remove('hide')
  }

  const links = target.nextElementSibling

  if(links.classList.contains('open')) {
    return links.classList.remove('open')
  }

  Array.prototype.forEach.call(footerLinks, function(item){
    item.classList.remove('open')
  })

  setCaretOrientationToClosed()
  links.classList.add('open')
  target.children[1].classList.add('hide')
  target.lastElementChild.children[0].classList.remove('hide')
}

// event listeners

if (footer) {
  footer.addEventListener('click', function(e){

    const target = e.target

    if (target.classList.contains('header')) {
      open(target)
      lastFooterTarget = target
    } else if (target.parentElement.classList.contains('header')) {
      open(target.parentElement)
      lastFooterTarget = target.parentElement
    }

  })
}

})
