
// ######################################################
// ######################################################

// {Manipulating the DOM of a landing-page using JS only} exercise.

// ######################################################
// ######################################################

// **** first of all adding <script src=""></script> node to html-file code 

// **** making an internal-css style-node 

let interCSS = document.createElement("style");
interCSS.setAttribute("type", "text/css");

document.head.appendChild(interCSS);


interCSS.innerHTML = `

html { scroll-behavior: smooth;} 
header nav ul {float:left!important;} 

@media (max-width:770px) {

    main header h1 { margin-top:30vh;}
    header nav {display:flex;}
        
    .navbar__menu     {display:flex; flex-flow: row wrap; justify-content: center;  align-items: center; width:100%;}
    .navbar__menu ul  {display:flex; flex-flow: column wrap; justify-content: center;  align-items: stretch; align-text:center!important; width:100vw;}
    .navbar__menu li  {display:inheret; text-align:center!important; width:100%;}

    #navBtnDv           {background-color: black; color:white; order:-1; width: fit-content; height:100% ; border:black solid thick ; padding:0.3%; border-radius:50%;   position : relative;  margin:10px; }
    #navBtn             { color:inherit; font-size:60%; float:right;font-weight:900; text-align: center ; vertical-align: middle ; padding: 0 0 60% 0 ; line-height:70%;}

    .navbar__menu .menu__link:hover {background-color:transparent; color: #000;transition: ease 0.3s all;}
}
`;

// **** defining some global variables that used several times in the code 

let listArrray = [];

let NavUL = document.querySelectorAll("ul")[0];

let navBar = document.querySelectorAll("header nav");

let navBarUl = document.querySelectorAll("header nav ul");

var sctArr = document.querySelectorAll("section");
// let sctnPar = document.querySelectorAll("section div p");

// var sctTgArr = document.querySelectorAll("nav ul a");
// let notActTg = document.querySelectorAll("nav ul a:not(.active-tag)");
// let btn = document.createElement("div");
// let btnDiv = document.createElement("div");
// let ftr = document.querySelector('footer');
// let timer = setTimeout(() => }{}, 2000);
// let interCSS = document.createElement("style");
// let navBtnDv = document.createElement("div");
// let navBtn = document.createElement("div");




// **** adding more sections 

let sctnPar = document.querySelectorAll("section div p");

let nSctn = 2; // no. of sections to be added

for (let i = 1; i <= nSctn; i++) {
    sctArr[sctArr.length - 1].insertAdjacentHTML("afterend", `<section id="section${sctArr.length + 1}" data-nav="Section ${sctArr.length + 1}">
        <div class="landing__container">
            <h2>Section ${sctArr.length + 1}</h2>
            ${sctnPar[0].outerHTML} 
            ${sctnPar[1].outerHTML}
            </div>
            </section>`);
    sctArr = document.querySelectorAll("section");
}

// **** Building the navbar menu & linking each item to its section then adding "menu__link" class to each nav item to get styles applied on it

for (let sctn of sctArr) {
    listArrray[0] = document.createElement('li');
    listArrray[0].innerHTML = ` <a href="#${sctn.getAttribute("id")}" > ${sctn.getAttribute("data-nav")} </a> `;
    NavUL.appendChild(listArrray[0]);
}

for (let ele of document.querySelectorAll("header nav ul li a")) {
    ele.classList.add("menu__link");
}

// **** Adding "active" & "active-tag" classes &  their styles to acive section "section that is near top of viewport" & its tag

let sctTgArr = document.querySelectorAll("nav ul a");

var addClass = function (i) {
    sctArr[i].classList.add("active");
    // adding 'active-tag' class to nav-tag of section with class "active" 
    sctTgArr[i].classList.add("active-tag");
    // highlighting tag of 'active-tag' class section when near top of viewport 
    document.querySelector(`nav a.active-tag`).style.cssText = "background:rgb(0,20,90);color:#fff;"
    for (let j = 0; j < sctArr.length; j++) {
        if (j !== i) {
            sctArr[j].classList.remove("active");
            sctTgArr[j].classList.remove("active-tag");

            let notActTg = document.querySelectorAll("nav ul a:not(.active-tag)");
            for (let x = 0; x < notActTg.length; x++) {
                notActTg[x].style.cssText = "background-color:inhereted;";
            }

        }
    }
};

for (let i = 0; i < sctArr.length; i++) {
    window.addEventListener('scroll', () => { if ((sctArr[i].getBoundingClientRect().top < (window.innerHeight / 2.5)) && (sctArr[i].getBoundingClientRect().top > 0)) { addClass(i) } });
};

for (let i = 0; i < sctArr.length; i++) {
    sctTgArr[i].addEventListener('click', () => { addClass(i) });
};

// **** Displaying nav-bar when scrolling & hiding it after 2 seconds of no scrolling on screens with min-width of 770 px 

var timer = null;

var navDisplay = function () {
    if (timer !== null) {
        navBar[0].style.display = "flex";
        clearTimeout(timer);
    }
    timer = setTimeout(() => { navBar[0].style.display = "none"; }, 2000);
};

window.addEventListener('scroll', () => {
    if (window.innerWidth > 770) { navBarUl[0].style.display = "flex"; return navDisplay(); } else {
        navBarUl[0].style.display = "none"; navBar[0].style.cssText = "display: flex; justify-content:left;";
    }
}, false);


// **** Making a to-Top-Button & scroll to anchor ID using scrollTO event 

let btn = document.createElement("div");
let btnDiv = document.createElement("div");
let ftr = document.querySelector('footer');

btn.setAttribute("id", "btn");
btnDiv.setAttribute("id", "btnDiv");

btnDiv.appendChild(btn);
ftr.appendChild(btnDiv);

ftr.style.cssText = `display: flex;flex-wrap: no-wap; justify-content: space-between; align-items: center;`;
btn.style.cssText = `display:inline-block; position : relative ; top:-0.25em; width:0%; height:0% ; border: 0.5em solid; border-color:transparent transparent #333 transparent; `;
btnDiv.style.cssText = `display:inline-block; position : relative ; border-radius: 50%; padding:0.5em; margin:1em; background-color: white; border: solid 0.2em #fff;  `;

let styleOnHover = function () {
    btn.style.cssText = `display:inline-block; position : relative ; top:-0.25em; width:0%; height:0% ; border: 0.5em solid; border-color:transparent transparent white transparent; `;
    btnDiv.style.cssText = `display:inline-block; position : relative ; border-radius: 50%; padding:0.5em; margin:1em;  background-color: #333; border: solid 0.2em white; cursor:pointer;`;

}

let styleOnOut = function () {
    btn.style.cssText = `display:inline-block; position : relative ; top:-0.25em; width:0%; height:0% ; border: 0.5em solid; border-color:transparent transparent  #333 transparent; `;
    btnDiv.style.cssText = `display:inline-block; position : relative ; border-radius: 50%; padding:0.5em; margin:1em;  background-color: white; border: solid 0.2em #fff; `;

};

document.querySelector("#btn").addEventListener("mouseover", styleOnHover);
document.querySelector("#btn").addEventListener("mouseout", styleOnOut);
document.querySelector("#btn").addEventListener("click", () => { window.scrollTo({ top: 0, left: 50, behavior: 'smooth' }); });


// **** building NavMenuButton on screens with max-width of 770 px 

// 1) building my button

let navBtn = document.createElement("div");
navBtn.setAttribute("id", "navBtn");
navBtn.innerHTML = `<b>__<br>__<b>`;
let navBtnDv = document.createElement("div");
navBtnDv.setAttribute("id", "navBtnDv");
navBtnDv.appendChild(navBtn);
navBar[0].appendChild(navBtnDv);

// 2) internal styling for this part 


// @media (max-width:770px) {
//     main header h1 { margin-top:30vh;}
//     header nav {display:flex;}
//     .navbar__menu     {display:flex; flex-flow: row wrap; justify-content: center;  align-items: center; width:100%;}
//     .navbar__menu ul  {display:flex; flex-flow: column wrap; justify-content: center;  align-items: stretch; align-text:center!important; width:100vw;}
//     .navbar__menu li  {display:inheret; text-align:center!important; width:100%;}
//     #navBtnDv           {background-color: black; color:white; order:-1; width: fit-content; height:100% ; border:black solid thick ; padding:0.3%; border-radius:50%;   position : relative;  margin:10px; }
//     #navBtn             { color:inherit; font-size:60%; float:right;font-weight:900; text-align: center ; vertical-align: middle ; padding: 0 0 60% 0 ; line-height:70%;}
//     .navbar__menu .menu__link:hover {background-color:transparent; color: #000;transition: ease 0.3s all;}


// 3) event on the nav-Button 

navBtnDv.addEventListener( "click" , () => {
    if (navBarUl[0].style.display !== `none`) { navBarUl[0].style.display = `none`; navBar[0].style.justifyContent = `left`; } else {
        navBarUl[0].style.display = `flex`; navBar[0].style.justifyContent = `center`;
    }
});

// **** displaying Html code after manipulating DOM
// console.log(`${document.head.outerHTML}\n\n\n${document.body.outerHTML}`);


// ########################################
// ########################################
// ############ end of the code ###########
// ########################################
// ########################################


// I made my best to follow these instructions as possible

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
 * 
 * End Global Variables
 * 
 * Start Helper Functions
 * 
 * 
 * End Helper Functions
 * 
 * Begin Main Functions
 * 
 * 
 * End Main Functions
 * 
 * Begin Events
 * 
*/