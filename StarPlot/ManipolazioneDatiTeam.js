//per poter eseguire questo codice bisogna seguire il primo metodo spiegato in questo sito per firefox: http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/
dataset_url="dataFifa2019.csv";
dataset_url_match="ClassificaSeriaA2019.csv";
//sono le configurazioni dello star plot
var cfgStarPlot = {
 w: 300,
 h: 300,
 TranslateX: 0,
 TranslateY: 0,
 maxValue: 100,
 radians: 2 * Math.PI,
 levels: 10, //numero di cerchi
 ToRight: 5, //distanza a destra dell'unità sui cerchi
 ToRight: -1, //distanza sotto dell'unità sui cerchi
 labelFactor: 1.25, //distanza del nome dell'asse
 color: d3.scaleOrdinal(d3.schemeCategory10),
 opacityArea: 0.5, //opacità dei poligoni
};

//sono le configurazione della legenda
var cfgLegend = {
 w: 300,
 h: 70,
 top: 100,//traslazione della legenda rispetto l'asse y
 left: 10,//traslazione della legenda rispetto l'asse x
 width: 200,// grandezza del div e non della legenda
 color: d3.scaleOrdinal(d3.schemeCategory10),
 legendInvert:true
};

//sono le configurazioni della lista dei suggerimenti
var cfgListSuggerimenti = {
  top: 400,//traslazione della lista rispetto l'asse y
  left: 800,//traslazione della lista rispetto l'asse x
  width: 200,// grandezza della lista
};


//creazione dello starplot con inputi i 2 player da confrontare
function createStarlPlot(data,nameClub1,nameClub2,formazione1,formazione2){
  players=listOfPlayerIntoStarPlot(data,nameClub1,nameClub2);

  var club1=sixSkillGenerateForEachPlayer(players[0],formazione1,players[2]);
  var club2=sixSkillGenerateForEachPlayer(players[1],formazione2,players[3]);
  var legendOptions = [];
  legendOptions.push(nameClub1);
  legendOptions.push(nameClub2);
  var attribute=["Pace","Passing","Defending", "Shooting", "Dribbling", "Physical"];
  StarPlot.legenda(legendOptions,cfgLegend);
  StarPlot.starPlot(cfgStarPlot,creaSintassiPerStarPlot(club1[0]),creaSintassiPerStarPlot(club2[0]),attribute,legendOptions,cfgLegend);
}


function updateLinkForTop11Comparison(firstTeamName, secondTeamName){
  let top11URLPrefix = "StarPlotMorePlayer.html?team=";

  d3.select(".confronta-top-11-1")
    .attr("href", top11URLPrefix.concat(encodeURIComponent(firstTeamName)))

  d3.select(".confronta-top-11-2")
    .attr("href", top11URLPrefix.concat(encodeURIComponent(secondTeamName)));
}


//crezione del primo starplot di partenza
d3.csv(dataset_url, function(data) {
    let urlParams = new URLSearchParams(window.location.search);
    let firstClubName = urlParams.get('firstTeam');
    let secondClubName = urlParams.get('secondTeam');
    var formazione1={Attaccante:3, Centrocampista:3, Difensore:4, Portiere:1};
    var formazione2={Attaccante:3, Centrocampista:3, Difensore:4, Portiere:1};

    // first case: reaching this page through the navbar
    if(firstClubName == null && secondClubName == null){
      createStarlPlot(data, data[0]["Club"], data[1]["Club"], formazione1, formazione2);
      updateLinkForTop11Comparison(data[0]["Club"], data[1]["Club"]);
    }

    // second case: reaching this page through the team comparing link in StarPlotPlayers.html
    else {
      createStarlPlot(data, firstClubName, secondClubName, formazione1, formazione2);
      updateLinkForTop11Comparison(firstClubName, secondClubName);
    }
});

/*mi cerca tutti i giocatori di un club
input:
  i 2 db
  team1 e team1: il nome delle 2 squadre
output:
  playersClub1 e playersClub2: lista dei giocatori dei club
  numeroDiGiocatoriClub1 e numeroDiGiocatoriClub2: dizionario con 4 elementi che indicano il numero dei giocatori per ogni posizione
*/
function listOfPlayerIntoStarPlot(data, team1, team2){
  var playersClub1=[];
  var playersClub2=[];
  var numeroDiGiocatoriClub1={Attaccante: 0, Centrocampista:0, Difensore:0, Portiere:0}
  var numeroDiGiocatoriClub2={Attaccante: 0, Centrocampista:0, Difensore:0, Portiere:0}
  data.forEach(function(d,i){
    if(d["Club"]==team1){
      posizione=calcoloPosizione(d,false);
      playersClub1.push(d);
      numeroDiGiocatoriClub1[posizione]+=1
    }
    if(d["Club"]==team2){
      posizione=calcoloPosizione(d,false);
      playersClub2.push(d);
      numeroDiGiocatoriClub2[posizione]+=1
    }
  });
  return [playersClub1,playersClub2,numeroDiGiocatoriClub1,numeroDiGiocatoriClub2]
}



//funzione che parte quando si clicca sulla ricerca
function handleClick(event){

  //cerco i giocatori nel dataset
  d3.csv(dataset_url, function(data) {
    squadra1=document.getElementById("myVal1").value.toUpperCase();
    squadra2=document.getElementById("myVal2").value.toUpperCase();
    d3.selectAll("svg").remove();
    d3.selectAll(".listOfPlayer").remove();
    var formazione=document.getElementById("formation1").value.split("");

    var formazione1={Attaccante:parseInt(formazione[3]), Centrocampista:parseInt(formazione[2]), Difensore:parseInt(formazione[1]), Portiere:parseInt(formazione[0])};

    var formazione2=document.getElementById("formation2").value.split("");

    var formazione_2={Attaccante:parseInt(formazione2[3]), Centrocampista:parseInt(formazione2[2]), Difensore:parseInt(formazione2[1]), Portiere:parseInt(formazione2[0])};

    //infine creo lo starplot
    createStarlPlot(data,search(data,squadra1,0),search(data,squadra2,cfgListSuggerimenti.width+10),formazione1,formazione_2);

  });
  return false;
};
