function init(){
    var queries = getQuery()
    if(!queries.length){
        controlView("index")
        return
    }
    if(queries.tab == "run" || queries.tab == "shop"){
        controlView("index")
        return
    }
    $('.nav-list li[data-nav="'+ queries.tab+'"]').addClass('active')
    controlView(queries.tab)
}
function generateProduct(){
    $.getJSON('../data/products.json', function(products){
        $('#product-list').html(products.map(x=>'<li data-nav="'+x.nav+'"><a href="#" class="d-flex align-items-center"><div class="brand-img"><img src="'+ x.url+'"/></div><div class="brand-text">'+ x.name+'</div></a></li>').join('\n'))
        controlNav()
        init()
    })
}
function controlNav(){
    $("#nav li a").on('click', function(e){
        $('.nav-list li').removeClass('active')
        $(this).parent().addClass('active')
        var nav = $(this).parent().attr('data-nav')
        if(nav != "run" && nav != "shop"){
            setQuery({
                tab: nav
            })
            controlView(nav)
            e.stopPropagation()
            e.preventDefault()
        }

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
function controlView(view){
    var template;
    if(['donuts', 'jcoffee', 'jclub', 'jpops', 'jcool', 'jcronut'].includes(view)) template = 'product'
    else template = view

    $.get('../views/'+template+'.html', function(html){
        $('#main').html(html)
    }).fail(function() {
        alert( "error" );
      })
}
function getQuery(){
    var query = new Object()
    if(!window.location.search) return query
    var search = window.location.search.substring(1).split('&')
    search.forEach(function(item){
        var x = item.split('=')
        query[x[0]] = x[1]
    })
    return query
}
function setQuery(queries){
    var origin = window.location.origin
    var path = window.location.pathname
    var query = new Array()
    if(!queries){
        window.history.replaceState( {} , 'jco', origin);
        return 
    }
    for(var item in queries){
        query.push(item+'='+queries[item])
    }
    window.history.replaceState( {} , 'jco', origin+path+'?'+query.join('&'));
}
generateProduct()
controlCountry()
controlGlobal()