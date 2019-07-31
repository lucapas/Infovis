//per poter eseguire questo codice bisogna seguire il primo metodo spiegato in questo sito per firefox: http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/
dataset="dataFifa2019.csv";
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
 h: 250,
 top: 60,//traslazione della legenda rispetto l'asse y
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

    
function handleClickOnPlayer(){
  let playerNameAndClub = d3.select(this);
  console.log(this);

  if(playerNameAndClub.attr("fill") === "blue"){
    playerNameAndClub.attr("fill", "#737373");
    console.log(d3.select(".star"));
  }
  else{
    playerNameAndClub.attr("fill", "blue");
  }
}


//creazione dello starplot con input i 2 player da confrontare
function createStarlPlot(data,nameClub1){
  var formazione1={Attaccante:3, Centrocampista:3, Difensore:4, Portiere:1};
  var formazione_ripetuta={Attaccante:3, Centrocampista:3, Difensore:4, Portiere:1};
  players=listOfPlayerIntoStarPlotOneTeam(data,nameClub1,formazione1);
  var club1=sixSkillGenerateForEachPlayerOneTeam(orderPlayer(players),formazione_ripetuta);
  var legendOptions = insertPlayer(club1);

  var attribute=["Pace","Passing","Defending", "Shooting", "Dribbling", "Physical"];
  StarPlotMorePlayers.legenda(legendOptions,cfgLegend);
  StarPlotMorePlayers.starPlot(cfgStarPlot,creaSintassiPerStarPlotMorePlayers(club1,attribute),attribute,legendOptions,cfgLegend);
}

//crezione del primo starplot di partenza
d3.csv(dataset, function(data) {
  createStarlPlot(data,data[0]["Club"]);
});


/*mi cerca tutti i giocatori di un club
input:
  i 2 db
  team1 e team1: il nome delle 2 squadre
output:
  playersClub1 e playersClub2: lista dei giocatori dei club
  numeroDiGiocatoriClub1 e numeroDiGiocatoriClub2: dizionario con 4 elementi che indicano il numero dei giocatori per ogni posizione
*/
function listOfPlayerIntoStarPlotOneTeam(data, team1, formazione1){
  var playersClub1=[];
  data.forEach(function(d,i){
    if(d["Club"]==team1){
      posizione=calcoloPosizione(d,false);
      if(formazione1[posizione]>0){
        playersClub1.push(d);
        formazione1[posizione]-=1;
      }
    }
  });
  return playersClub1
}

function sixSkillGenerateForEachPlayerOneTeam(squadra,formazione){
  var club={Pace:0,Passing:0,Defending:0,Shooting:0,Dribbling:0,Physical:0};
  var attribute=["Pace","Passing","Defending", "Shooting", "Dribbling", "Physical"];
  var giocatori=[];
  squadra.forEach(function(d,i){
    if(d["PositionRule"]=="Portiere"){
      var player=sixSkillGenerateForClubPortiere(d);
    }else{
      var player=sixSkillGenerateForClub(d);
    }
    player["Name"]=d["Name"];
    player["PositionRule"]=d["PositionRule"];
    player["Club"]=d["Club"];
    player["Position"]=d["Position"];
    player["ContributoTeam"]={};
    var posizione=player["PositionRule"];
    attribute.forEach(function(d,i){
      club[d]+=player[d]*cfgPonderazioneSkill[d][posizione]/formazione[posizione];
      player[d]=player[d]*cfgPonderazioneSkill[d][posizione]/formazione[posizione];
      player["ContributoTeam"][d]=club[d];
    });
    giocatori.push(player);
  });
  console.log(giocatori);
  return giocatori;
}

function insertPlayer(club1){
  var legendOptions=[0,1,2,3,4,5,6,7,8,9,10];
  var portiere=0;
  var difensore=4;
  var centrocampista=7;
  var attaccante=10;
  club1.forEach(function(d,i){
    if(d["PositionRule"]=="Attaccante"){
      legendOptions[attaccante]=d["Name"]+" - "+d["PositionRule"];
      attaccante-=1;
    }
    if(d["PositionRule"]=="Centrocampista"){
      legendOptions[centrocampista]=d["Name"]+" - "+d["PositionRule"];
      centrocampista-=1;
    }
    if(d["PositionRule"]=="Difensore"){
      legendOptions[difensore]=d["Name"]+" - "+d["PositionRule"];
      difensore-=1;
    }
    if(d["PositionRule"]=="Portiere"){
      legendOptions[portiere]=d["Name"]+" - "+d["PositionRule"];
      portiere-=1;
    }
  });
  console.log(legendOptions)
  return legendOptions;
}

function orderPlayer(club1){
  var players=[0,1,2,3,4,5,6,7,8,9,10];
  var portiere=10;
  var difensore=9;
  var centrocampista=5;
  var attaccante=2;
  club1.forEach(function(d,i){
    if(d["PositionRule"]=="Attaccante"){
      players[attaccante]=d;
      attaccante-=1;
    }
    if(d["PositionRule"]=="Centrocampista"){
      players[centrocampista]=d;
      centrocampista-=1;
    }
    if(d["PositionRule"]=="Difensore"){
      players[difensore]=d;
      difensore-=1;
    }
    if(d["PositionRule"]=="Portiere"){
      players[portiere]=d;
      portiere-=1;
    }
  });
  console.log(players)
  return players;
}

function creaSintassiPerStarPlotMorePlayers(club,attribute){
  var players=[];
  club.forEach(function(d,i){
    var player1=[];
    attribute.forEach(function(a,j){
      player1.push({axis:a, value:d["ContributoTeam"][a], name:d["Name"]});
    });
    players.push(player1);
  });
  var i;
  var invert=[];
  for (i = players.length-1; i >= 0; i--) {
    invert.push(players[i]);
  }
  console.log(invert);
  return invert;
  return players;
}

//funzione che parte quando si clicca sulla ricerca
function handleClick(event){
d3.csv(dataset, function(data) {
  squadra1=document.getElementById("myVal1").value.toUpperCase();
  d3.selectAll("svg").remove();
  d3.selectAll(".listOfPlayer").remove();
  //creo lo starplot
  createStarlPlot(data,search(data,squadra1,100));
  });
  return false;
};
