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
        event.preventDefault();
        $.post("/logout",{email:localStorage.getItem("email"),password:localStorage.getItem("password")},function(data,status){
            if(data==="success"){
                window.location="/login";      
            }
        })
    })
    $("#offer-button").click(function(){

        event.preventDefault();
        $("#enquiry-button").removeClass("current");
        $("#offer-button").addClass("current");
        $("#table").hide();
        $("#offer").show();
        $.post("/getOffer",function(data,status){
            document.getElementById("header").value=data[0].header;
            document.getElementById("content").value=data[0].content;
            document.getElementById("switch").checked=data[0].status;
            
        }) ;
    });
    $("#enquiry-button").click(function(){
        event.preventDefault();
        $("#offer-button").removeClass("current");
        $("#enquiry-button").addClass("current");
        $("#offer").hide();
        $("#table").show();
    });
    $("#offerFormButton").click(function(){
        event.preventDefault();
        console.log("Form Submitted");
        let header=document.getElementById("header").value;
        let content=document.getElementById("content").value;
        let status=null;
        if(document.getElementById("switch").checked){
            status=true;
        }
        else{
            status=false;
        }
        let data=new FormData();
        data.append("header",header);
        data.append("content",content);
        data.append("status",status);
        $.post("/updateOffer",{header:header,content:content,status:status},function(data,start){
            if(data==="success"){
                alert("Updated");
            }
        });
    });
    $("#offerImage").click(function(){
        event.preventDefault();
        console.log("Form Submitted");
        let file=document.getElementById("file");
        let data=new FormData();
        data.append("file",file.files[0]);
        $.ajax({type:"POST",url:"/updateOfferImage",processData:false,contentType:false,data:data,success:function(data){
            if(data==="success"){
                alert("Updated");
            }
        }})
    });
    $("#viewImage").click(function(event){
        event.preventDefault();
        date = new Date();
        document.getElementById("modalImage").src="/image/offer-image?"+date.getTime();
        $('#myModal').modal()
    });
});

/* start preloader */
$(window).load(function(){
    $.post("/getEnquiryData",{email:localStorage.getItem("email"),password:localStorage.getItem("password")},function(data,status){
        let html="<table id='enquiryTable' class='table table-dark'><thead><tr><th>Name</th><th>Email</th><th>Message</th></tr></thead><tbody>";
        for(let i in data.data){
            html+="<tr><td>"+data.data[i].name+"</td><td>"+data.data[i].email+"</td><td>"+data.data[i].message+"</td></tr>";
        }
        html+="</tbody></table>";
        $("#table").html(html);
    })
});

/* end preloader */