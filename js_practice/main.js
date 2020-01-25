$(function(){
    let count=0;
   // alert("in default func");
   $("#pb").on("click", function (event) {
       $("#count").get(0).innerText = ++count;
       $.ajax({
           url: "index.html"
       }).done((data) => {
           console.log(data);
       })
   });
});

function async(val) {
    let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                listenKey(val);
                resolve(true);
            }, val);
    });

    p.then(() => {
        console.log("after delay");
    });
    console.log("on main thread");
}

function listenKey(val) {
    console.log("within listen with count: " + (val/1000));
}