
document.addEventListener('DOMContentLoaded', function(){
  const faq = document.getElementById('faq');
  const general = document.getElementById('general');
  const grants = document.getElementById('grants');
  const naming = document.getElementById('naming');
  const faucet = document.getElementById('faucet');
  const footer = document.getElementById('footer');

  const gLink = document.getElementById('general-link');
  const grantsLink = document.getElementById('grants-link');
  const nLink = document.getElementById('naming-link');
  const fLink = document.getElementById('faucet-link');

  const qLinks = document.getElementsByTagName('h3');
  Array.prototype.forEach.call(qLinks, function(item){
    item.nextElementSibling.classList.add('hide');
    item.addEventListener('click', function(e) {
      if (item.children[0].classList.contains('hide')) {
        item.children[0].classList.remove('hide');
        item.children[1].classList.add('hide');
        item.nextElementSibling.classList.add('hide');
      } else {
        item.children[0].classList.add('hide')
        item.children[1].classList.remove('hide')
        item.nextElementSibling.classList.remove('hide');
      }
    });
  })

  const clearActive = function() {
      fLink.classList.remove('active');
      nLink.classList.remove('active');
      grantsLink.classList.remove('active');
      gLink.classList.remove('active');
  }

  document.getElementById('navigation').addEventListener('click', function(e) {
    if(e.target.tagName === "A") {
      clearActive();
      e.target.classList.add('active');
    }
  })

  document.addEventListener('scroll', function(){
    const fixedLocation = faq.getBoundingClientRect().top;
    const gLocation = general.getBoundingClientRect().top;
    const grantsLocation = grants.getBoundingClientRect().top;
    const nLocation = naming.getBoundingClientRect().top;
    const fLocation = faucet.getBoundingClientRect().top;
    const footerLocation = footer.getBoundingClientRect().top;

    if (fixedLocation <= 0) {
      faq.classList.remove('absolute');
      faq.classList.add('fixed');
    } else {
      faq.classList.remove('absolute');
      faq.classList.remove('fixed');
    }

    clearActive();
    if (fLocation <= 10){
      fLink.classList.add('active');
    } else if (nLocation <= 10){
      nLink.classList.add('active');
    } else if (grantsLocation <= 10){
      grantsLink.classList.add('active');
    } else {
      gLink.classList.add('active');
    }
  })
})
