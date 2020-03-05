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
    $("#home-button").removeClass("current");
    $("#home-button").click(function(){
        window.location="/#top";
    });
    $("#about-button").click(function(){
        window.location="/#about";
    });
    $("#team-button").click(function(){
        window.location="/#team";
    });
    $("#service-button").click(function(){
        window.location="/#service";
    });
    $("#portfolio-button").click(function(){
        window.location="/#portfolio";
    });
    $("#contact-button").click(function(){
        window.location="/#contact";
    });
    $("#login-button").addClass("current");
    $("#login-button").click(function(){
        window.location="/login";
    })
});

/* start preloader */
$(window).load(function(){
    
});
/* end preloader */

function submitForm(){
    event.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    $.post("/loginFormSubmit",{email:email,password:password},function(data,status){
        if(data.status==="success"){
            if(data.login){
                window.location="/dashboard";
            }
            else{
                document.getElementById("email").value="";
                document.getElementById("password").value=""
                alert("Login Failed");
            }
        }
    })

}