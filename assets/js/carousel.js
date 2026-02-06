(function ($) {
    $(function () {

        function setupCarousel($container, isMain) {
            var $track = $container.find(isMain ? '.carousel-track' : '.inner-carousel-track');
            var $items = $container.find(isMain ? '.carousel-item' : '.inner-carousel-item');
            var $dotsContainer = $container.find('.carousel-dots');
            var currentIndex = 0;

            function getItemsToShow() {
                if (!isMain) return 1;
                if (window.innerWidth <= 480) return 1;
                if (window.innerWidth <= 736) return 1;
                return 2;
            }

            function generateDots() {
                if (!isMain || !$dotsContainer.length) return;

                $dotsContainer.empty();
                var itemsToShow = getItemsToShow();
                var maxIndex = Math.max(0, $items.length - itemsToShow);
                var numDots = maxIndex + 1; // Number of possible views

                for (var i = 0; i < numDots; i++) {
                    $dotsContainer.append('<span class="dot" data-index="' + i + '"></span>');
                }
            }

            function updateCarousel() {
                var itemsToShow = getItemsToShow();
                var itemWidth = $items.outerWidth(true);
                var maxIndex = Math.max(0, $items.length - itemsToShow);

                if (currentIndex > maxIndex) currentIndex = maxIndex;

                var translateX = -(currentIndex * itemWidth);
                $track.css('transform', 'translateX(' + translateX + 'px)');

                // Update height for inner carousel
                if (!isMain) {
                    var $currentItem = $items.eq(currentIndex);
                    var $img = $currentItem.find('img');

                    // Function to set height
                    var setHeight = function () {
                        var height = $currentItem.outerHeight();
                        if (height > 0) {
                            $container.css('height', height + 'px');
                        }
                    };

                    // If image is loaded, set height immediately
                    if ($img.length && $img[0].complete) {
                        setHeight();
                    } else if ($img.length) {
                        // Otherwise wait for load
                        $img.on('load', setHeight);
                    } else {
                        // Fallback if no image
                        setHeight();
                    }
                }

                var $dots = $dotsContainer.find('.dot');
                if ($dots.length && isMain) {
                    $dots.removeClass('active');
                    $dots.eq(currentIndex).addClass('active');
                }
            }

            generateDots();

            $container.find(isMain ? '.carousel-next' : '.inner-next').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var itemsToShow = getItemsToShow();
                var maxIndex = $items.length - itemsToShow;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateCarousel();
            });

            $container.find(isMain ? '.carousel-prev' : '.inner-prev').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var itemsToShow = getItemsToShow();
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = Math.max(0, $items.length - itemsToShow);
                }
                updateCarousel();
            });

            $dotsContainer.on('click', '.dot', function () {
                var index = $(this).data('index');
                currentIndex = index;
                updateCarousel();
            });

            $(window).on('resize', function () {
                generateDots();
                updateCarousel();
            });

            if (isMain) {
                var autoPlayInterval = setInterval(function () {
                    $container.find('.carousel-next').trigger('click');
                }, 5000);

                $container.hover(function () {
                    clearInterval(autoPlayInterval);
                }, function () {
                    autoPlayInterval = setInterval(function () {
                        $container.find('.carousel-next').trigger('click');
                    }, 5000);
                });
            }

            setTimeout(updateCarousel, 150);
        }

        $('.carousel-container').each(function () {
            setupCarousel($(this), true);
        });

        setTimeout(function () {
            $('.inner-carousel-container').each(function () {
                setupCarousel($(this), false);
            });
        }, 200);

    });
})(jQuery);
