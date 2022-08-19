// ######################################
// project code steps =>

// ######################################
// 1 }}} Editing HTML & CSS files
// ######################################

// ######################################
// 2 }}} Making the server file & run a local server in the terminal using node.js & going to its ip to test app  
// ######################################

// ######################################
// 3 }}} Making the app.js file
// ######################################

// 1 ] Defining Global Variables

var myServer = 'http://127.0.0.1:3000';
var postURL = myServer + '/add';
var getURL = myServer + '/all';

const Btn = document.querySelector('#generate');
const entryTitle = document.getElementById("entryTitle");
const genError = document.getElementById("genError");
const moReEn = document.getElementById("mostRecentEntry");
const dateDiv = document.querySelector("#date");
const cityDiv = document.querySelector("#city");
const tempDiv = document.querySelector("#temp");
const contentDiv = document.querySelector("#content");

var Erroring = false;

// 2 ] Retrieving data from openweathermap.com API server

async function retrieveOWM_APIData() {

  let userNewZip = document.querySelector("#zip").value;

  let myAPIKey = '2aaee9adf7e95006bd7ae766a495f17b' + '&units=imperial';

  let APIBaseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + userNewZip + '&appid=' + myAPIKey;
  // https://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
  // console.log(`${APIBaseURL}`);

  const APIRes = await fetch(APIBaseURL);

  try {
    const APIData = await APIRes.json();
    if (APIRes.ok) {
      Erroring = false;
    } else {
      console.log('There is an error in fetching OWM API data');
    };

    if ((APIData.cod >= 200) && (APIData.cod < 300)) {
      // If status of processing APIData  in the range 200-299 
      return APIData;
    } else {
      // Returning error in UI page
      setTimeout(() => {
        entryTitle.innerHTML = ``;
        genError.innerHTML = `Invalid input or may city not found, please input a valid zipCode like 94040,us or try another city zipCode`;
        console.log(`Invalid input or may city not found, please input a valid input like 94040,us or try another city zipCode`);
      }, 500)
      setTimeout(() => { genError.innerHTML = ''; entryTitle.innerHTML = ` Try again. It may take at most 5 seconds`; }, 4000)
      Erroring = true;
      return Erroring;
    }
  } catch (error) {
    console.log(error);
  }
};

// 3 ] Handelling the retrieved data 

async function HandelingData(APIData) {

  // Creating new date & catch user-feeling input if exist

  if (Erroring) { return; };

  let dayDate = new Date();
  let newDate = ` ${dayDate.getDate()} / ${dayDate.getMonth() + 1} / ${dayDate.getFullYear()} `;

  let feelingsOfUser = document.getElementById('feelings').value;
  let clientFeeling = feelingsOfUser ? `your feeling is ${feelingsOfUser}` : 'Hope you feel good !';

  if (APIData) {

    // console.log(APIData);

    let temp = Math.round(APIData.main.temp);
    let city = APIData.name;

    // data that will be sent to the server 

    let finalData = {
      newDate,
      city,
      temp,
      clientFeeling
    };

    // we can execute next commented lines if we wanted to update page locally with no need to server  

    // date.innerHTML = `Date is ${finalData.newDate}`;
    // cityDiv.innerHTML = `City is ${finalData.city}`;
    // tempDiv.innerHTML = `Temp is ${finalData.temp} degrees`;
    // contentDiv.innerHTML = `${finalData.clientFeeling}`;
    // async function processingData() {retrieveOWM_APIData().then((APIData) => HandelingData(APIData));}
    // Btn.addEventListener('click', processingData);

    // we can stop here if we wanted to update page locally with no need to server but if we need to have local server
    // that others can access remotely so we must not execute previous commented lines & go on .

    return finalData;

  }
}

// 4 ] Sending data to my local server 

async function postDataToMyServer(postURL, finalData = {}) {
  if (Erroring) { return; };

  const APIRes = await fetch(postURL, {
    method: "POST",
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  });

  try {
    if (APIRes.ok) { // if fetching response status is betweeen 199-300
      return;
    } else {
      Erroring = true;
      return Erroring;
    }
  } catch (error) {
    console.log(error);
  };
};

// 5 ] Retrieving data from my local server & updating UI uing it 

async function updatingUIFromMyServer(getURL) {
  if (Erroring) { return; };

  const APIReq = await fetch(getURL);

  try {
    let allData = await APIReq.json();
    console.log(allData);
    setTimeout(_ => {
      entryTitle.innerHTML = ``;
      genError.innerHTML = ``;
      moReEn.innerHTML = `Most Recent Entry`;
      dateDiv.innerHTML = `Date is ${allData.newDate}`;
      cityDiv.innerHTML = `City is ${allData.city}`;
      tempDiv.innerHTML = `Temp is ${allData.temp} degrees`;
      contentDiv.innerHTML = `${allData.clientFeeling}`;

    }, 0)
  } catch (error) {
    console.log(error);
  }
};

function resetEntry() {
  entryTitle.innerHTML = `It may take at most 5 seconds`;
  genError.innerHTML = ``;
  moReEn.innerHTML = ``;
  dateDiv.innerHTML = ``;
  cityDiv.innerHTML = ``;
  tempDiv.innerHTML = ``;
  contentDiv.innerHTML = ``;
};

async function processingData() {
  setTimeout(() => { resetEntry(); console.log('In progress'); Erroring = false; return Erroring }, 0);
  retrieveOWM_APIData().then((APIData) => HandelingData(APIData)).then((finalData) => postDataToMyServer(postURL, finalData));
  setTimeout(updatingUIFromMyServer, 1000, getURL); // If we didn't make it as async & did make it as sync it may be executed first before previous 2 lines 
}

// Event listener to run the code & add data to existing HTML DOM element
Btn.addEventListener('click', processingData)

// If you find any problem with web app please stop all chrome extensions & also open terminal in admin mode 




