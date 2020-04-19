function duff(fn,arry){

    let ite = Math.ceil(arry.length / 8),
        startAt = arry.length % 8,
        i = 0;
    do{

        switch (startAt) {
            case 0 : fn(arry[i++]);
            case 7 : fn(arry[i++]);
            case 6 : fn(arry[i++]);
            case 5 : fn(arry[i++]);
            case 4 : fn(arry[i++]);
            case 3 : fn(arry[i++]);
            case 2 : fn(arry[i++]);
            case 1 : fn(arry[i++]);
        }

        startAt = 0;

    }while(--ite);

}
function duff_pro(fn,arry){

    let i = arry.length % 8,
        l = 0;

    while(i--){

        fn(arry[l++]);

    }

    i = Math.floor(arry.length / 8);

    while(i--){
        fn(arry[l++]);
        fn(arry[l++]);
        fn(arry[l++]);
        fn(arry[l++]);
        fn(arry[l++]);
        fn(arry[l++]);
        fn(arry[l++]);
        fn(arry[l++]);
    }

}
function con(num){
    console.log(num);
}

var ar = new Array(10000);

// console.time("duff_pro");
// duff_pro(con,ar);
// console.timeEnd("duff_pro");

// console.time("duff");
// duff(con,ar);
// console.timeEnd("duff");

function testTime(num){
    let start = Date.now();
    console.time("execTime");
    function a(){
        console.timeEnd("execTime");
        console.log(Date.now() - start);
    }
    setTimeout(a,num);
}