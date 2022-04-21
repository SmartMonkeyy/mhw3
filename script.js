/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const matches = {
    charismatic: 0,
    competitive: 1,
    caring: 2,
    cheerful: 3,
    optimistic: 4,
    compassionate: 5,
    shy: 6,
    freedom: 7,
    calm: 8
};

//MAIN
const answersDiv = document.querySelectorAll(".choice-grid div");
const rewind = document.querySelector(".button");
const form = document.querySelector("form");

var finalDecisionId1;
var finalDecisionChoise1;

var finalDecisionId2;
var finalDecisionChoise2;

var finalDecisionId3;
var finalDecisionChoise3;

var resultChoice;

const cliend_id = 'ee6ee1614f3c4d7498ec9a9e2a5b0068'
const client_secret = 'dc7fdf9a30d6475680a56a64d9a8d86f'

form.addEventListener("submit", search);

for (let i = 0; i < answersDiv.length; i++){
    answersDiv[i].addEventListener("click", selectDiv, {capture: true});
}

rewind.addEventListener("click", rewindAll, {capture: true});
//END MAIN


function selectDiv(event){
    const generalDiv = event.currentTarget;
    generalId = generalDiv.dataset.questionId;
    generalChoice = generalDiv.dataset.choiceId;

    /*first question*/
    const divlist1 = document.querySelectorAll("div[data-question-id='one']");
    const check1 = document.querySelectorAll("div[data-question-id='one'] > img.checkbox");

    /*second question*/
    const divlist2 = document.querySelectorAll("div[data-question-id='two']");
    const check2 = document.querySelectorAll("div[data-question-id='two'] > img.checkbox");

    /*third question*/
    const divlist3 = document.querySelectorAll("div[data-question-id='three']");
    const check3 = document.querySelectorAll("div[data-question-id='three'] > img.checkbox");

    if (generalId === "one"){

        for(let CID in matches){

            if(matches[generalChoice] === matches[CID]){
                check1[matches[generalChoice]].src = "images/checked.png";
                divlist1[matches[CID]].style.setProperty('--div-color', '#cfe3ff');
                divlist1[matches[CID]].classList.remove("opa");
            }else{
                check1[matches[CID]].src="images/unchecked.png";
                divlist1[matches[CID]].style.setProperty('--div-color', '#f4f4f4');
                divlist1[matches[CID]].classList.add("opa");
            }

        }

        finalDecisionId1 = generalId;
        finalDecisionChoise1 = generalChoice;
    }

    if (generalId === "two"){
        
        for(let CID in matches){

            if(matches[generalChoice] === matches[CID]){
                check2[matches[generalChoice]].src = "images/checked.png";
                divlist2[matches[CID]].style.setProperty('--div-color', '#cfe3ff');
                divlist2[matches[CID]].classList.remove("opa");
            }else{
                check2[matches[CID]].src="images/unchecked.png";
                divlist2[matches[CID]].style.setProperty('--div-color', '#f4f4f4');
                divlist2[matches[CID]].classList.add("opa");
            }

        }

        finalDecisionId2 = generalId;
        finalDecisionChoise2 = generalChoice;
    }

    if (generalId === "three"){

        for(let CID in matches){

            if(matches[generalChoice] === matches[CID]){
                check3[matches[generalChoice]].src = "images/checked.png";
                divlist3[matches[CID]].style.setProperty('--div-color', '#cfe3ff');
                divlist3[matches[CID]].classList.remove("opa");
            }else{
                check3[matches[CID]].src="images/unchecked.png";
                divlist3[matches[CID]].style.setProperty('--div-color', '#f4f4f4');
                divlist3[matches[CID]].classList.add("opa");
            }

        }
        
        finalDecisionId3 = generalId;
        finalDecisionChoise3 = generalChoice;
    }


    if(finalDecisionChoise1 !== undefined && finalDecisionChoise2 !== undefined && finalDecisionChoise3 !== undefined){
        for (let i = 0; i < answersDiv.length; i++){
            answersDiv[i].removeEventListener("click", selectDiv, {capture: true});
        }

        if(finalDecisionChoise1 !== finalDecisionChoise2){

            if(finalDecisionChoise1 !== finalDecisionChoise3){

                if(finalDecisionChoise2 !== finalDecisionChoise3){

                    resultChoice = finalDecisionChoise1;

                }else{
                    resultChoice = finalDecisionChoise2;
                }

            }else{
                resultChoice = finalDecisionChoise3;
            }

        }else{
            resultChoice = finalDecisionChoise1;
        }

        const results = document.querySelector("#results");
        
        const h1 = results.querySelector("h1");
        const p = results.querySelector("p");

        var tmp = document.createTextNode(RESULTS_MAP[resultChoice].title);
        h1.appendChild(tmp);
        tmp = document.createTextNode(RESULTS_MAP[resultChoice].contents);
        p.appendChild(tmp);

        results.classList.remove("hidden");

        fetch("https://accounts.spotify.com/api/token",{
            method: "post",
            body: 'grant_type=client_credentials',
            headers:{
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ btoa(cliend_id + ':' + client_secret)
                }
            }
        ).then(onResponse).then(onTokenJson);
    }
}

function rewindAll(event){

    finalDecisionId1 = undefined;
    finalDecisionChoise1 = undefined;

    finalDecisionId2 = undefined;
    finalDecisionChoise2 = undefined;

    finalDecisionId3 = undefined;
    finalDecisionChoise3 = undefined;

    const checkTotal = document.querySelectorAll(".checkbox");
    
    for (let i = 0; i < answersDiv.length; i++){
        answersDiv[i].addEventListener("click", selectDiv, {capture: true});

        if(checkTotal[i].src.includes("images/checked.png")){
            checkTotal[i].src = "images/unchecked.png";
            answersDiv[i].style.setProperty('--div-color', '#f4f4f4');
        }
        if(checkTotal[i].src.includes("images/unchecked.png")){
            answersDiv[i].classList.remove("opa");
        }
    }

    const results = document.querySelector("#results");
        
    const h1 = results.querySelector("h1");
    const p = results.querySelector("p");

    results.classList.add("hidden");
    h1.innerHTML="";
    p.innerHTML="";

    const playlist = document.querySelector("#playlist");
    const playlistDiv = document.querySelector("#container");
    
    const h3 = playlistDiv.querySelector("h3");
    const h5 = playlistDiv.querySelector("h5");
    const pPlaylist = playlistDiv.querySelector("p");

    playlist.classList.add("hidden");
    h3.innerHTML="";
    h5.innerHTML="";
    pPlaylist.innerHTML="";

}

function search(event){
    event.preventDefault();
    url = "https://api.quotable.io/random"; //https://github.com/lukePeavey/quotables
    fetch(url).then(onResponse).then(outPut);
}

function onResponse(response) {
    return response.json();
}

function outPut(json){
    author_quote = document.createTextNode("'"+ json.content + "'");
    author_name = document.createTextNode(json.author);

    const form = document.querySelector("#formquote");
    const text = form.querySelector("p");
    const author = form.querySelector("h4");

    text.innerHTML="";
    author.innerHTML="";

    text.appendChild(author_quote);
    author.appendChild(author_name);
}

function onTokenJson(json){
    let token = json.access_token;

    fetch("https://api.spotify.com/v1/search?type=playlist&q=" + resultChoice, {
            headers:{
                'Authorization': 'Bearer ' + token,
            }
        }
    ).then(onResponse).then(onAlbum);
}

function onAlbum(json){
    do{
        var rand = Math.floor(Math.random() * 20)
        var CHECKEMPTY;

        if(json.playlists.items[rand].name === "" || json.playlists.items[rand].description === ""){
            CHECKEMPTY = 1;
        }else{
            CHECKEMPTY = 0;
        }
    }while(CHECKEMPTY != 0);
    
    const playlist = document.querySelector("#playlist");
    const playlistDiv = document.querySelector("#container");
    
    const img = playlistDiv.querySelector("img");
    const h3 = playlistDiv.querySelector("h3");
    const h5 = playlistDiv.querySelector("h5");
    const p = playlistDiv.querySelector("p");
    const a = playlistDiv.querySelector("a");

    img.src = json.playlists.items[rand].images[0].url;

    var tmp = document.createTextNode(json.playlists.items[rand].name);
    h3.appendChild(tmp);

    var tmp = document.createTextNode(json.playlists.items[rand].description);
    h5.appendChild(tmp);

    var tmp = document.createTextNode("Tracks: " + json.playlists.items[rand].tracks.total);
    p.appendChild(tmp);

    a.href = json.playlists.items[rand].external_urls.spotify;

    playlist.classList.remove("hidden");
}
