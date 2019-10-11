$(function(){
    let count=0;
   alert("in default func");
   $("#pb").on("click", function (event) {
       $("#count").get(0).innerText = count++;
   });
});

// Todo: learn promises in JS
function async(val) {

}

function listenKey(val) {

}