(function ($) {
    $(function () {
        var $carousel = $('.carousel-container');
        if (!$carousel.length) return;

        var $track = $('.carousel-track');
        var $items = $('.carousel-item');
        var $dots = $('.dot');
        var currentIndex = 0;
        var itemsToShow = getItemsToShow();

        function getItemsToShow() {
            if (window.innerWidth <= 480) return 1;
            if (window.innerWidth <= 736) return 2;
            return 3;
        }

        function updateCarousel() {
            var itemWidth = $items.outerWidth(true);
            var maxIndex = Math.max(0, $items.length - getItemsToShow());

            if (currentIndex > maxIndex) currentIndex = maxIndex;

            var translateX = -(currentIndex * itemWidth);
            $track.css('transform', 'translateX(' + translateX + 'px)');

            // Update dots active state
            $dots.removeClass('active');
            var dotIndex = Math.floor(currentIndex / getItemsToShow());
            $dots.eq(dotIndex).addClass('active');
        }

        $('.carousel-next').on('click', function () {
            var maxIndex = $items.length - getItemsToShow();
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        });

        $('.carousel-prev').on('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, $items.length - getItemsToShow()); // Go to end
            }
            updateCarousel();
        });

        $('.dot').on('click', function () {
            var index = $(this).data('index');
            currentIndex = index * getItemsToShow();
            updateCarousel();
        });

        $(window).on('resize', function () {
            itemsToShow = getItemsToShow();
            updateCarousel();
        });

        // Auto-play (optional)
        var autoPlayInterval = setInterval(function () {
            $('.carousel-next').click();
        }, 5000);

        // Pause auto-play on hover
        $carousel.hover(function () {
            clearInterval(autoPlayInterval);
        }, function () {
            autoPlayInterval = setInterval(function () {
                $('.carousel-next').click();
            }, 5000);
        });

        // Initial update
        setTimeout(updateCarousel, 100);
    });
})(jQuery);
