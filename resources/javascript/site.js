document.addEventListener("DOMContentLoaded", function() {

    window.onscroll = function() {
        var nav = document.getElementById('main-nav');

        if(window.pageYOffset > 100)
            nav.classList.add('active');
        else
            nav.classList.remove('active');
    };
});