//per poter eseguire questo codice bisogna seguire il primo metodo spiegato in questo sito per firefox: http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/
dataset_url="dataFifa2019.csv";
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


// function which update a link for comparing players' respective clubs
function updateLinkForTeamComparison(firstTeamName, secondTeamName){
  let teamComparisonURL = "StarPlotTeam.html".concat("?firstTeam=" + encodeURIComponent(firstTeamName) + "&secondTeam=" + encodeURIComponent(secondTeamName))
  d3.select(".confronta-squadre")
    .attr("href", teamComparisonURL)
}


//creazione dello starplot con input i 2 player da confrontare
function createStarlPlot(startPlayer1,startPlayer2){

  var posizione1=calcoloPosizione(startPlayer1,false);
  var posizione2=calcoloPosizione(startPlayer2,false);
  if(posizione1=="Portiere" && posizione2=="Portiere"){
    var attribute=["Diving","Handling","Positioning", "Reflexes", "Reactions", "Kicking"];
    var legendOptions = [];
    legendOptions.push(startPlayer1["Name"] + " - "+ posizione1 + " (" + startPlayer1["Club"] + ")");
    var player1=[];
    console.log(startPlayer1);
    console.log(startPlayer2);
    player1.push({axis:"Diving",value: startPlayer1["GKDiving"] });
    player1.push({axis:"Handling",value: startPlayer1["GKHandling"] });
    player1.push({axis:"Positioning",value: startPlayer1["GKPositioning"]});
    player1.push({axis:"Reflexes",value: startPlayer1["GKReflexes"] });
    player1.push({axis:"Reactions",value: startPlayer1["Reactions"] });
    player1.push({axis:"Kicking",value: startPlayer1["GKKicking"] });

    legendOptions.push(startPlayer2["Name"]+ " - "+ posizione2 + " (" + startPlayer2["Club"] + ")");

    StarPlot.legenda(legendOptions,cfgLegend,"Players:");
    var player2=[];
    player2.push({axis:"Diving",value: startPlayer2["GKDiving"] });
    player2.push({axis:"Handling",value: startPlayer2["GKHandling"] });
    player2.push({axis:"Positioning",value: startPlayer2["GKPositioning"]});
    player2.push({axis:"Reflexes",value: startPlayer2["GKReflexes"] });
    player2.push({axis:"Reactions",value: startPlayer2["Reactions"] });
    player2.push({axis:"Kicking",value: startPlayer2["GKKicking"] });

    StarPlot.starPlot(cfgStarPlot,player1,player2,attribute,legendOptions,cfgLegend);
  }
  else{
    var attribute=["Pace","Passing","Defending", "Shooting", "Dribbling", "Physical"];
    var legendOptions = [];
    legendOptions.push(startPlayer1["Name"] + " - "+ posizione1 + " (" + startPlayer1["Club"] + ")");
    var player1=[];
    console.log(startPlayer1);
    console.log(startPlayer2);
    player1.push({axis:"Pace",value:pace(startPlayer1["SprintSpeed"],startPlayer1["Acceleration"])});
    player1.push({axis:"Passing",value:passing(startPlayer1["ShortPassing"],startPlayer1["Crossing"],startPlayer1["Vision"],startPlayer1["LongPassing"],startPlayer1["Curve"],startPlayer1["FKAccuracy"])});
    player1.push({axis:"Defending",value:defending(startPlayer1["StandingTackle"],startPlayer1["Marking"],startPlayer1["Interceptions"],startPlayer1["HeadingAccuracy"],startPlayer1["SlidingTackle"])});
    player1.push({axis:"Shooting",value:shooting(startPlayer1["Finishing"],startPlayer1["LongShots"],startPlayer1["ShotPower"],startPlayer1["Volleys"],startPlayer1["Positioning"],startPlayer1["Penalties"])});
    player1.push({axis:"Dribbling",value:dribbling(startPlayer1["Dribbling"],startPlayer1["BallControl"],startPlayer1["Agility"],startPlayer1["Balance"])});
    player1.push({axis:"Physical",value:physical(startPlayer1["Strength"],startPlayer1["Stamina"],startPlayer1["Aggression"],startPlayer1["Jumping"])});

    legendOptions.push(startPlayer2["Name"]+ " - "+ posizione2 + " (" + startPlayer2["Club"] + ")");

    StarPlot.legenda(legendOptions,cfgLegend,"Players:");
    var player2=[];
    player2.push({axis:"Pace",value:pace(startPlayer2["SprintSpeed"],startPlayer2["Acceleration"])});
    player2.push({axis:"Passing",value:passing(startPlayer2["ShortPassing"],startPlayer2["Crossing"],startPlayer2["Vision"],startPlayer2["LongPassing"],startPlayer2["Curve"],startPlayer2["FKAccuracy"])});
    player2.push({axis:"Defending",value:defending(startPlayer2["StandingTackle"],startPlayer2["Marking"],startPlayer2["Interceptions"],startPlayer2["HeadingAccuracy"],startPlayer2["SlidingTackle"])});
    player2.push({axis:"Shooting",value:shooting(startPlayer2["Finishing"],startPlayer2["LongShots"],startPlayer2["ShotPower"],startPlayer2["Volleys"],startPlayer2["Positioning"],startPlayer2["Penalties"])});
    player2.push({axis:"Dribbling",value:dribbling(startPlayer2["Dribbling"],startPlayer2["BallControl"],startPlayer2["Agility"],startPlayer2["Balance"])});
    player2.push({axis:"Physical",value:physical(startPlayer2["Strength"],startPlayer2["Stamina"],startPlayer2["Aggression"],startPlayer2["Jumping"])});

    StarPlot.starPlot(cfgStarPlot,player1,player2,attribute,legendOptions,cfgLegend,"Players:");
  }
}

//crezione del primo starplot di partenza
d3.csv(dataset_url, function(data) {

  let urlParams = new URLSearchParams(window.location.search);
  let firstPlayerName = urlParams.get('firstPlayer');
  let secondPlayerName = urlParams.get('secondPlayer');

  // first case: reaching this page through the navbar
  if(firstPlayerName == null && secondPlayerName == null){
    createStarlPlot(data[0],data[1]);
    let firstPlayerTeamName = data[0]["Club"];
    let secondPlayerTeamName = data[1]["Club"];
    updateLinkForTeamComparison(firstPlayerTeamName, secondPlayerTeamName);
  }

  // compare players given in the query params
  else {
    let listOfPlayers1 = searchPlayer(data, firstPlayerName.toUpperCase());
    let listOfPlayer1 = listOfPlayers1[0];
    let listOfPlayerStarPlot1 = listOfPlayers1[1];

    let listOfPlayers2 = searchPlayer(data, secondPlayerName.toUpperCase());
    let listOfPlayer2 = listOfPlayers2[0];
    let listOfPlayerStarPlot2 = listOfPlayers2[1];

    let player1 = listOfPlayerStarPlot1[0];
    let player2 = listOfPlayerStarPlot2[0];

    createStarlPlot(player1, player2);

    let firstPlayerTeamName = player1["Club"];
    let secondPlayerTeamName = player2["Club"];

    updateLinkForTeamComparison(firstPlayerTeamName, secondPlayerTeamName);

  }

});

/*funzione che ricerca un giocatore,
ritornano 2 liste perche la prima ritorna solo i nomi, la secondo invece l'oggetto completo
*/
function searchPlayer(data,val){
  var listOfPlayer1=[];
  var listOfPlayerStarPlot1=[];
  data.every(function(player, i){
    if(player["Name"].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().match(val)){
      listOfPlayer1.push(player["Name"]);
      listOfPlayerStarPlot1.push(player);
      if (listOfPlayer1.length>=10){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  });

  return [listOfPlayer1,listOfPlayerStarPlot1]
}

//funzione che parte quando si clicca sulla ricerca
function handleClick(event){

  //cerco i giocatori nel dataset
  d3.csv(dataset_url, function(data) {
    d3.selectAll("svg").remove();

    var listOfPlayers1=searchPlayer(data,document.getElementById("myVal1").value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    var listOfPlayer1=listOfPlayers1[0];
    var listOfPlayerStarPlot1=listOfPlayers1[1];

    var listOfPlayers2=searchPlayer(data,document.getElementById("myVal2").value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase());
    var listOfPlayer2=listOfPlayers2[0];
    var listOfPlayerStarPlot2=listOfPlayers2[1];


//creo la lista dei suggerimenti
    d3.selectAll(".listOfPlayer").remove();
    var player1=null;
    var player2=null;
    if(listOfPlayer1.length>1){
      player1=listOfPlayerStarPlot1[0];
      listOfPlayers(listOfPlayer1,800,"Forse cercavi per player1 ");
    }
    if(listOfPlayer2.length>1){
      player2=listOfPlayerStarPlot2[0];
      listOfPlayers(listOfPlayer2,1010,"Forse cercavi per player2 ");
    }
    if(listOfPlayer1.length==1){
      player1=listOfPlayerStarPlot1[0];
    }
    if(listOfPlayer2.length==1){
      player2=listOfPlayerStarPlot2[0];
    }
    if(listOfPlayer1.length<=0){
      player1=data[0];
      listOfPlayerNew1=searchPlayer(data,document.getElementById("myVal1").value.toUpperCase().charAt(0));
      listOfPlayers(listOfPlayerNew1[0],cfgListSuggerimenti.left,"Player1 non trovato, forse cercavi:");
    }
    if(listOfPlayer2.length<=0){
      player2=data[1];
      listOfPlayerNew2=searchPlayer(data,document.getElementById("myVal2").value.toUpperCase().charAt(0))
      listOfPlayers(listOfPlayerNew2[0],(cfgListSuggerimenti.left+cfgListSuggerimenti.width+10),"Player2 non trovato, forse cercavi:");
    }

    //infine creo lo starplot
    createStarlPlot(player1,player2);

    // update the link which refers to the team comparison page
    let firstPlayerTeamName = player1["Club"];
    let secondPlayerTeamName = player2["Club"];

    updateLinkForTeamComparison(firstPlayerTeamName, secondPlayerTeamName);

    /*d3.selectAll("svg").remove();
    var attribute=["difesa","centrocampista","attaccante"];
    var player1=[];
    //delete player['age'];

    player1.push({axis:"attaccante",value:85});
    player1.push({axis:"difensore",value:85});
    player1.push({axis:"centrocampista",value:85});

    //delete player['age'];
    var player2=[];
    player2.push({axis:"attaccante",value:60});
    player2.push({axis:"difensore",value:document.getElementById("myVal1").value});
    player2.push({axis:"centrocampista",value:60});

    StarPlot.fun(cfg,player1,player2,attribute);*/
  });
  //console.log(document.getElementById("myVal1").value);
  return false;
};
