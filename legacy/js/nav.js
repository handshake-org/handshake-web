  window.addEventListener('load', function(e){
    /*
     *  Nav Bar
    */
    // Disable no-js fixes
    const navBar = document.getElementById('navBar');
    if (navBar.classList) {
      navBar.classList.remove('no-js')
    }

    const sideNav = document.getElementById('burgernav');

    if( sideNav ) {
      const bars = document.getElementById('nav-toggle');
      const overlay = document.getElementById('overlay');

      function toggleNav(e){
        sideNav.classList.toggle('dropped');
        document.body.classList.toggle('active-nav');
      }

      sideNav.addEventListener('click', function(e){
        // if a tag has a #id for the href
        if( e.target.nodeName === 'A' && e.target.hash){ toggleNav(); }
      });


      bars && bars.addEventListener('click', toggleNav);
      overlay && overlay.addEventListener('click', toggleNav);
    }

    /*
     * Drop down
     *
     * Supports multiple dropdowns
    */
    const dropdownMenus = document.getElementsByClassName('dropdown');

    if( !dropdownMenus.length) { return }

    Array.prototype.forEach.call( dropdownMenus, function( item, index, arr ){
      // add event listeners to all dropdown elements
      item.addEventListener( 'mouseover', showDropDown );
      item.addEventListener( 'mouseleave', hideDropDown );
    });

    function showDropDown( e ){
      console.log("show")
      const target = e.target;
      const from = e.fromElement;
      // if dropdown link then dont show dropdown
      if( target.nodeName !== 'A' ||
         ( (from && from.classList) && from.classList.contains('dropdown-menu') ) ) { return }

      const dropdownMenu = target.nextElementSibling;
      dropdownMenu && dropdownMenu.classList.remove('hide');
    }

    function hideDropDown( e ){
      const dropdownMenu = e.target.lastElementChild;
      dropdownMenu.classList.add('hide');
    }
  });
