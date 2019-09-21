// run function
$(function() {
    // activate smooth scrolls
    $("html").css({"scroll-behavior" : "smooth"});

    // home button click listener
    $(".home").click(function () {
        $("#0").focus();
        if($("#navSupport").hasClass("show")) $(".navbar-toggler").trigger("click");
    });

    // close nav links drawer
    $(".nav-link").click(function () {
        if($("#navSupport").hasClass("show")) $(".navbar-toggler").trigger("click");
    });

    // testing function for keypress
    $("body").keydown(function (ev) {
        let k = ev.which;
        console.log(k + " pressed");
        let c = $("#counter").get(0);
        if(k === 39) c.innerText = eval(c.innerText + " + 1");
        else if (k === 37) c.innerText = eval(c.innerText + " - 1");
    });
});

