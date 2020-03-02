/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function(){

    /* start typed element */
    //http://stackoverflow.com/questions/24874797/select-div-title-text-and-make-array-with-jquery
    var subElementArray = $.map($('.sub-element'), function(el) { return $(el).text(); });    
    $(".element").typed({
        strings: subElementArray,
        typeSpeed: 30,
        contentType: 'html',
        showCursor: false,
        loop: true,
        loopCount: true,
    });
    /* end typed element */

    /* Smooth scroll and Scroll spy (https://github.com/ChrisWojcik/single-page-nav)    
    ---------------------------------------------------------------------------------*/ 
    // $('.templatemo-nav').singlePageNav({
    //     offset: $(".templatemo-nav").height(),
    //     filter: ':not(.external)',
    //     updateHash: false
    // });

    /* start navigation top js */
    // $(window).scroll(function(){
    //     if($(this).scrollTop()>58){
    //         $(".templatemo-nav").addClass("sticky");
    //     }
    //     else{
    //         $(".templatemo-nav").removeClass("sticky");
    //     }
    // });
    
    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
    /* end navigation top js */

    $('body').bind('touchstart', function() {});

    /* wow
    -----------------*/
    new WOW().init();
    $("#logout-button").click(function(){      
        $.post("/logout",{email:localStorage.getItem("email"),password:localStorage.getItem("password")},function(data,status){
            if(data==="success"){
                localStorage.setItem("email","");
                localStorage.setItem("password","");
                window.location.href="/login";      
            }
        })
    })
});

/* start preloader */
$(window).load(function(){
    $.post("/getEnquiryData",{email:localStorage.getItem("email"),password:localStorage.getItem("password")},function(data,status){
        if(data.login){
            let html="<table class='table'><thead><tr><th>Name</th><th>Email</th><th>Message</th></tr></thead><tbody>";
            for(let i in data.data){
                html+="<tr><td>"+data.data[i].name+"</td><td>"+data.data[i].email+"</td><td>"+data.data[i].message+"</td></tr>";
            }
           html+="</tbody></table>";
           $("#table").html(html);
        }
        else{
            window.location="/login";
        }
    })
});
/* end preloader */