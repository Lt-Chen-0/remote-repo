window.expandFunc1 = function(el){
    el.style.backgroundSize = "96%";
}
window.expandFunc2 = function(el){
    el.style.backgroundSize = "96%";
}
window.expandFunc3 = function(el){
    el.style.backgroundSize = "96%";
}
window.reduceFunc1 = function(el){
    el.style.backgroundSize = "91%";
}
window.reduceFunc2 = function(el){
    el.style.backgroundSize = "91%";
}
window.reduceFunc3 = function(el){
    el.style.backgroundSize = "91%";
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++){
        var elementHeight = reveals[i].getBoundingClientRect().top;
        var windowHeight = document.documentElement.clientHeight;
        if (elementHeight < windowHeight / 1.5) {
            reveals[i].style.opacity = "1";
        }
        else {
            reveals[i].style.opacity = "0";
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

function revealDelay1() {
    var revealDelays1 = document.querySelectorAll(".revealDelay1");
    var elementHeight = revealDelays1[0].getBoundingClientRect().top;
    var windowHeight = document.documentElement.clientHeight;
    if (elementHeight < windowHeight / 1.5) {
        setTimeout(() => {  
            revealDelays1[0].style.opacity = "1";
        }, 800);
    }
    else {
        setTimeout(() => {  
            revealDelays1[0].style.opacity = "0";
        }, 500);
    }
}
window.addEventListener("scroll", revealDelay1);
revealDelay1();

function revealDelay2() {
    var revealDelays2 = document.querySelectorAll(".revealDelay2");
    var elementHeight = revealDelays2[0].getBoundingClientRect().top;
    var windowHeight = document.documentElement.clientHeight;
    if (elementHeight < windowHeight / 1.5) {
        setTimeout(() => {  
            revealDelays2[0].style.opacity = "1";
        }, 800);
    }
    else {
        setTimeout(() => {  
            revealDelays2[0].style.opacity = "0";
        }, 500);
    }
}
window.addEventListener("scroll", revealDelay2);
revealDelay2();


var shelter = document.getElementById("shelter-for-bg1");
function shelterFunc() {
    var shelter_scrtop = document.documentElement.scrollTop;
    var shelter_sumheight = shelter_scrtop + window.innerHeight;
    if (shelter_sumheight > 1180 && shelter_scrtop < 980) {
        shelter.style.top = (shelter_sumheight - 200) + "px";
    }
    else if (shelter_scrtop >= 980) {
        shelter.style.top = "1200px";
    }
}
window.addEventListener("scroll", shelterFunc);
shelterFunc();


var homepageContent1 = document.getElementById("homepage-content1");
var homepageContentimg1 = document.getElementById("homepage-content-img1");
var homepageContentimg2 = document.getElementById("homepage-content-img2");

var homepageContent2 = document.getElementById("homepage-content2");
var homepageContentimg3 = document.getElementById("homepage-content-img3");
var homepageContentimg4 = document.getElementById("homepage-content-img4");
var homepageContent3 = document.getElementById("homepage-content3");

var homepageContent11 = document.getElementById("homepage-content11");
var homepageContent12 = document.getElementById("homepage-content12");
var homepageContent13 = document.getElementById("homepage-content13");
var homepageContent14 = document.getElementById("homepage-content14");
var homepageContentimg8 = document.getElementById("homepage-content-img8");
var homepageContentimg9 = document.getElementById("homepage-content-img9");
var homepageContentimg10 = document.getElementById("homepage-content-img10");
var homepageContentimg11 = document.getElementById("homepage-content-img11");

var homepageContent17 = document.getElementById("homepage-content17");
var homepageContent18 = document.getElementById("homepage-content18");
var homepageContentimg13 = document.getElementById("homepage-content-img13");
var homepageContentimg14 = document.getElementById("homepage-content-img14");

var homepageContent20 = document.getElementById("homepage-content20");
var homepageContent21 = document.getElementById("homepage-content21");
var homepageContentimg15 = document.getElementById("homepage-content-img15");
var homepageContentimg16 = document.getElementById("homepage-content-img16");

function bindReveal(el1, el2) {
    if (el1.style.opacity == "1" && el2.style.opacity == "0") {
        el2.style.opacity = "1";
    }
    else if (el1.style.opacity == "0" && el2.style.opacity == "1") {
        el2.style.opacity = "0";
    }
}
function bind() {
    bindReveal(homepageContent1, homepageContentimg1);
    bindReveal(homepageContent1, homepageContentimg2);

    bindReveal(homepageContent2, homepageContentimg3);
    bindReveal(homepageContent2, homepageContentimg4);
    bindReveal(homepageContent2, homepageContent3);

    bindReveal(homepageContent11, homepageContentimg8);
    bindReveal(homepageContentimg9, homepageContent12);
    bindReveal(homepageContent13, homepageContentimg10);
    bindReveal(homepageContentimg11, homepageContent14);

    bindReveal(homepageContentimg13, homepageContent17);
    bindReveal(homepageContentimg14, homepageContent18);

    bindReveal(homepageContent20, homepageContentimg15);
    bindReveal(homepageContent21, homepageContentimg16);
}
window.addEventListener("scroll", bind);
bind();


var bottomIcon1 = document.getElementById("bottom-icon1");
function revealDelay3() {
    var revealDelays3 = document.querySelectorAll(".revealDelay3");
    var elementHeight = revealDelays3[0].getBoundingClientRect().top;
    var windowHeight = document.documentElement.clientHeight;
    if (elementHeight < windowHeight / 1.54) {
        setTimeout(() => {
            if (bottomIcon1.style.opacity == "0") return;
            revealDelays3[0].style.opacity = "1";
        }, 500);
    }
    else {
        revealDelays3[0].style.opacity = "0";
    }
}
window.addEventListener("scroll", revealDelay3);
revealDelay3();

function revealDelay4() {
    var revealDelays4 = document.querySelectorAll(".revealDelay4");
    var elementHeight = revealDelays4[0].getBoundingClientRect().top;
    var windowHeight = document.documentElement.clientHeight;
    if (elementHeight < windowHeight / 1.62) {
        setTimeout(() => {
            if (bottomIcon1.style.opacity == "0") return;
            revealDelays4[0].style.opacity = "1";
        }, 1000);
    }
    else {
        revealDelays4[0].style.opacity = "0";
    }
}
window.addEventListener("scroll", revealDelay4);
revealDelay4();

function revealDelay5() {
    var revealDelays5 = document.querySelectorAll(".revealDelay5");
    var elementHeight = revealDelays5[0].getBoundingClientRect().top;
    var windowHeight = document.documentElement.clientHeight;
    if (elementHeight < windowHeight / 1.67) {
        setTimeout(() => {
            if (bottomIcon1.style.opacity == "0") return;
            revealDelays5[0].style.opacity = "1";
        }, 1500);
    }
    else {
        revealDelays5[0].style.opacity = "0";
    }
}
window.addEventListener("scroll", revealDelay5);
revealDelay5();

function revealDelay6() {
    var revealDelays6 = document.querySelectorAll(".revealDelay6");
    var elementHeight = revealDelays6[0].getBoundingClientRect().top;
    var windowHeight = document.documentElement.clientHeight;
    if (elementHeight < windowHeight / 1.73) {
        setTimeout(() => {
            if (bottomIcon1.style.opacity == "0") return;
            revealDelays6[0].style.opacity = "1";
        }, 2000);
    }
    else {
        revealDelays6[0].style.opacity = "0";
    }
}
window.addEventListener("scroll", revealDelay6);
revealDelay6();