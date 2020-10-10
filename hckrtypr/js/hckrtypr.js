import { code } from './fakecode.js';

let deny_count = 0;
let grant_count = 0;

function granted() {
    $(".modal").addClass("visible");
    $("#access").addClass("granted");
    $("#access").removeClass("denied");
    $("#access").text("Access Granted");
}

function denied() {
    $(".modal").addClass("visible");
    $("#access").removeClass("granted");
    $("#access").addClass("denied");
    $("#access").text("Access Denied");
}

$(function () {
    $("body").keydown(function (ev) {
        let c = $("#console").get(0);
        c.focus();
        let k = ev.which;
        console.log(k);
        switch(k) {
            case 112: // F1 key
                ev.preventDefault();
                alert("Press Ctrl 3 Times -> Access Denied\nPress Alt 3 Times -> Access Granted");
                return;
            case 116: // F5 key
                return;
            case 17: // Ctrl key
                ev.preventDefault();
                deny_count ++;
                grant_count = 0;
                if(deny_count >= 3) {
                    deny_count = 0;
                    denied();
                }
                return;
            case 18: // Alt key
                ev.preventDefault();
                grant_count ++;
                deny_count = 0;
                if(grant_count >= 3) {
                    grant_count = 0;
                    granted();
                }
                return;
            case 8: // Backspace key
                return;
        }
        if(k >= 32 && k <= 126) ev.preventDefault();
        c.value = code.substring(0, c.value.length + 4);
        c.scrollTop = c.scrollHeight;
    });
});
