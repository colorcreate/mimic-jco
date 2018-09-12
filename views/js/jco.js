function generateProduct(){
    $.getJSON('../data/products.json', function(products){
        $('#product-list').html(products.map(x=>'<li><a href="#" class="d-flex align-items-center"><div class="brand-img"><img src="'+ x.url+'"/></div><div class="brand-text">'+ x.name+'</div></a></li>').join('\n'))
    })
}
generateProduct()