/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function(){
    $('[data-toggle="popover"]').popover();   

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
    $('.templatemo-nav').singlePageNav({
        offset: $(".templatemo-nav").height(),
        filter: ':not(.external)',
        updateHash: false
    });

    /* start navigation top js */
    $(window).scroll(function(){
        if($(this).scrollTop()>58){
            $(".templatemo-nav").addClass("sticky");
        }
        else{
            $(".templatemo-nav").removeClass("sticky");
        }
    });
    
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

    $("#login-button").click(function(){
        window.location="/login";
    });
});

/* start preloader */
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
    $.post("/getOffer",function(data,status){
        if(data[0].status){
            $("#modal-header-content").text(data[0].header);
            $("#modal-body-content").text(data[0].content);
            $('#myModal').modal()
        }
    }) 
});
/* end preloader */

function submitForm(){
    event.preventDefault();
    console.log("Form Submitted");
    let name=document.getElementById("fullname").value;
    let email=document.getElementById("email").value;
    let message=document.getElementById("message").value;
    $.post("/submit",{name:name,email:email,message:message},function(data,status){
        if(data==="success"){
            
        }
    })
    document.getElementById("fullname").value="";
    document.getElementById("email").value="";
    document.getElementById("message").value="";
}