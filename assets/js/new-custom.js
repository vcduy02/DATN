 

$(document).ready(function () {
    // swiper cho menu

    if($(".menu-mobi").length > 0) {
        var swiper = new Swiper('.menu-mobi', {
            slidesPerView: 5, // Số lượng slide hiển thị trên một lượt
            grid: {
                rows: 2,
                fill: "row",
            },
            spaceBetween: 5, // Khoảng cách giữa các slide
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });
        // end
    }

 


});