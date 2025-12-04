
(function ($) {
    "use strict";

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        // Khởi tạo MixitUp (Bộ lọc sản phẩm)
        if ($('.featured__controls').length > 0) {
            var mixer = mixitup('.featured__filter', {
                selectors: {
                    target: '.mix'
                },
                animation: {
                    duration: 300
                }
            });
        }
    });

    /*------------------
        Menu Mobile
    --------------------*/
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show-humberger-menu");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_flow_hidden");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show-humberger-menu");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_flow_hidden");
    });

    /*------------------
        Hero Carousel (Banner/Slider)
    --------------------*/
    $(".hero__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_carrot-left'></span>", "<span class='arrow_carrot-right'></span>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });


    /*------------------
        Product Quantity
    --------------------*/
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        var newVal;
        if ($button.hasClass('inc')) {
            newVal = parseFloat(oldValue) + 1;
        } else {
            // Đảm bảo không nhỏ hơn 1
            if (oldValue > 1) {
                newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find('input').val(newVal);
    });

})(jQuery);
