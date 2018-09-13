function generateProduct(){
    $.getJSON('../data/products.json', function(products){
        $('#product-list').html(products.map(x=>'<li><a href="#" class="d-flex align-items-center"><div class="brand-img"><img src="'+ x.url+'"/></div><div class="brand-text">'+ x.name+'</div></a></li>').join('\n'))
    })
}
function getDonuts(){
    $.getJSON('../data/donuts.json', function(donuts){
        var donutsScroll = donuts.map((x, i)=>'<div class="swiper-pagination-switch" style="background-image: url('+ x.url +')" data-id="'+ i +'" ></div>')
        donutsScroll.shift()
        $('.custom-scroll').html(donutsScroll.join(''))
        $('.custom-scroll .swiper-pagination-switch').on('click', function(){
            var owl = $('.owl-carousel');
            owl.owlCarousel();
            owl.trigger("to.owl.carousel", this.dataset.id);
        })

        var donutsMain = donuts.map(x=> '<div class="swiper-slide"><img src="'+ x.url+'"/><div class="boxtext"><div class="product-name">'+x.name+'</div><p>'+x.desc+'</p></div></div>')
        $('.swipper-container').html('<div class="owl-carousel">'+donutsMain.join(''))
        $('.owl-carousel').owlCarousel({
            margin:10,
            items: 1,
        })
    })
}
function controlCountry(){
    $('#select-country button').on('click', function(e){
        $(this).closest('#select-country').toggleClass('active')
        e.stopPropagation()
    })
}
function controlGlobal(){
    $(window).on('click', function(e){
        var $target = $(e.target)
        var $parent = $target.closest('.country-menu')
        if(!$parent.length){
            $('#select-country').removeClass('active')
        }
    })
}
generateProduct()
getDonuts()
controlCountry()
controlGlobal()