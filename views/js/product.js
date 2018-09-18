function getProducts(){
    var queries = getQuery()
    $.getJSON('../data/'+queries.tab+'.json', function(products){
        var productsScroll = products.map((x, i)=>'<div class="swiper-pagination-switch" style="background-image: url('+ x.url +')" data-id="'+ i +'" ></div>')
        productsScroll.shift()
        $('.custom-scroll').html(productsScroll.join(''))
        $('.custom-scroll .swiper-pagination-switch').on('click', function(){
            var owl = $('.owl-carousel');
            owl.owlCarousel();
            owl.trigger("to.owl.carousel", this.dataset.id);
        })

        var productsMain = products.map(x=> '<div class="swiper-slide"><img src="'+ x.url+'"/><div class="boxtext"><div class="product-name">'+x.name+'</div><p>'+x.desc+'</p></div></div>')
        $('.swipper-container').html('<div class="owl-carousel">'+productsMain.join(''))
        $('.owl-carousel').owlCarousel({
            margin:10,
            items: 1,
        })
    })
}
getProducts()