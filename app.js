let active_link = 0;
console.log($(".link").index(active_link));

$(".link").each(function(index) {
    $(this).on('click', function(e) {
        if (active_link != index) {

            $(".link").eq(active_link).removeClass('active');
            $(this).addClass('active');
            $('section').eq(active_link).removeClass('active');

            setTimeout(() => {
                active_link = index;
                $('section').eq(index).addClass('active')
                console.log($("section").eq(index));
            }, 100);
        }
    })
});

/* Every time the window is scrolled ... */
$(window).scroll(function() {

    /* Check the location of each desired element */
    $('.hideme').each(function(i) {

        var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 5;
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it in */
        if (bottom_of_window > bottom_of_object) {

            $(this).animate({ 'opacity': '1' }, 500);

        }

    });

});