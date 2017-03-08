(function() {
    "use strict";
    var scrollDelta = 5;
    var $window = $(window);
    var dom = {
        $nav: $("#navigation"),
        $mobileNav: $("#mobileNavigation"),
        $mobileNavTrigger: $("#mobileNavigationTrigger")
    };
    var $trigger = dom.$mobileNavTrigger;
    function onScroll($nav) {
        var state = {
            scroll: {
                timeoutId: null,
                lastScrollY: 0,
            }
        };
        return function (event) {
            var navHeight = $nav.height();
            if (state.scroll.timeoutId) {
                clearTimeout(state.scroll.timeoutId);
            }
            state.scroll.timeoutId = setTimeout(function() {
                var lastScrollY = state.scroll.lastScrollY;
                var currentScrollY = $window.scrollTop();
                if (currentScrollY > navHeight) {
                    if (!$nav.hasClass('inverse')) {
                        $nav.addClass('inverse');
                    }
                } else {
                    if ($nav.hasClass('inverse')) {
                        $nav.removeClass('inverse');
                    }
                }
                if (!$nav.hasClass('in')) {
                    if (Math.abs(currentScrollY - lastScrollY) >= scrollDelta) {
                        if (currentScrollY > lastScrollY && currentScrollY > navHeight) {
                            $nav.addClass('up').removeClass('down');
                        } else if (currentScrollY + $window.height() < document.documentElement.offsetHeight) {
                            $nav.addClass('down').removeClass('up');
                        }
                        state.scroll.lastScrollY = currentScrollY;
                    }
                }
            }, 50);

        }

    }
    $window.on('scroll', onScroll(dom.$nav).bind(this));
    $window.on('scroll', onScroll(dom.$mobileNav).bind(this));
    $trigger.click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        $trigger.toggleClass('in');
        dom.$mobileNav.toggleClass('in');
    });
})();