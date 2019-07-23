//per poter eseguire questo codice bisogna seguire il primo metodo spiegato in questo sito per firefox: http://testingfreak.com/how-to-fix-cross-origin-request-security-cors-error-in-firefox-chrome-and-ie/
dataset_url="dataFifa2019.csv";
dataset_url_match="match.csv";
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
 h: 100,
 top: 100,//traslazione della legenda rispetto l'asse y
 left: 10,//traslazione della legenda rispetto l'asse x
 width: 200,// grandezza del div e non della legenda
 color: d3.scaleOrdinal(d3.schemeCategory10),
};

//sono le configurazioni della lista dei suggerimenti
var cfgListSuggerimenti = {
  top: 400,//traslazione della lista rispetto l'asse y
  left: 800,//traslazione della lista rispetto l'asse x
  width: 200,// grandezza della lista
};

var cfgPonderazioneSkill = {
  Pace: {
    Attaccante:0.60,
    Centrocampista:0.20,
    Difensore:0.20,
    Portiere:0,
  },
  Passing: {
    Attaccante:0.10,
    Centrocampista:0.80,
    Difensore:0.10,
    Portiere:0,
  },
  Defending: {
    Attaccante:0.01,
    Centrocampista:0.14,
    Difensore:0.60,
    Portiere:0.25,
  },
  Shooting:{
    Attaccante:0.75,
    Centrocampista:0.20,
    Difensore:0.05,
    Portiere:0,
  },
  Dribbling:{
    Attaccante:0.70,
    Centrocampista:0.20,
    Difensore:0.10,
    Portiere:0,
  },
  Physical:{
    Attaccante:0.20,
    Centrocampista:0.20,
    Difensore:0.60,
    Portiere:0,
  }
};
//varie funzioni per il cluster dei dati
function pace(speed,acceleration){
  return speed*0.55+acceleration*0.45;
}
function passing(spass,cross,vision,lpass,curve,fkick){
  return spass*0.35+cross*0.20+vision*0.20+lpass*0.15+curve*0.05+fkick*0.05;
}
function defending(standTackle,marking,interceptions,headAccuracy,slideTackle){
  return standTackle*0.30+marking*0.30+interceptions*0.20+headAccuracy*0.10+slideTackle*0.10;
}
function shooting(finish,longShots,shotPwr,volleys,positioning,penality){
  return finish*0.45+longShots*0.20+shotPwr*0.20+volleys*0.05+positioning*0.05+penality*0.05;
}
function dribbling(drib,ballCntrl,agility,volleys){
  return drib*0.50+ballCntrl*0.30+agility*0.10+volleys*0.05;
}
function physical(stren,stamina,aggres,jump){
  return stren*0.50+stamina*0.25+aggres*0.20+jump*0.05;
}

function sixSkillGenerateForStarPlot(startPlayer1){
  var player1=[];
  player1.push({axis:"Pace",value:pace(startPlayer1["SprintSpeed"],startPlayer1["Acceleration"])});
  player1.push({axis:"Passing",value:passing(startPlayer1["ShortPassing"],startPlayer1["Crossing"],startPlayer1["Vision"],startPlayer1["LongPassing"],startPlayer1["Curve"],startPlayer1["FKAccuracy"])});
  player1.push({axis:"Defending",value:defending(startPlayer1["StandingTackle"],startPlayer1["Marking"],startPlayer1["Interceptions"],startPlayer1["HeadingAccuracy"],startPlayer1["SlidingTackle"])});
  player1.push({axis:"Shooting",value:shooting(startPlayer1["Finishing"],startPlayer1["LongShots"],startPlayer1["ShotPower"],startPlayer1["Volleys"],startPlayer1["Positioning"],startPlayer1["Penalties"])});
  player1.push({axis:"Dribbling",value:dribbling(startPlayer1["Dribbling"],startPlayer1["BallControl"],startPlayer1["Agility"],startPlayer1["Balance"])});
  player1.push({axis:"Physical",value:physical(startPlayer1["Strength"],startPlayer1["Stamina"],startPlayer1["Aggression"],startPlayer1["Jumping"])});
  return player1;
}

//creazione dello starplot con inputi i 2 player da confrontare
function createStarlPlot(data,nameClub1,nameClub2){
  players=listOfPlayerIntoStarPlot(data,nameClub1,nameClub2);
  var formazione1={Attaccante:3, Centrocampista:3, Difensore:4, Portiere:1};
  var formazione2={Attaccante:3, Centrocampista:3, Difensore:4, Portiere:1};
  var club1=sixSkillGenerateForEachPlayer(players[0],formazione1,players[2]);
  var club2=sixSkillGenerateForEachPlayer(players[1],formazione2,players[3]);
  console.log("club1");
  console.log(club1);
  console.log("club2");
  console.log(club2);
  var legendOptions = [];
  legendOptions.push(nameClub1);
  legendOptions.push(nameClub2);
  var attribute=["Pace","Passing","Defending", "Shooting", "Dribbling", "Physical"];
  StarPlot.legenda(legendOptions,cfgLegend);
  StarPlot.starPlot(cfgStarPlot,creaSintassiPerStarPlot(club1),creaSintassiPerStarPlot(club2),attribute);
}

//crezione del primo starplot di partenza
d3.csv(dataset_url, function(data) {
  createStarlPlot(data,data[0]["Club"],data[1]["Club"]);
});

function creaSintassiPerStarPlot(club){
  var player1=[];
  player1.push({axis:"Pace",value:club["Pace"]});
  player1.push({axis:"Passing",value:club["Passing"]});
  player1.push({axis:"Defending",value:club["Defending"]});
  player1.push({axis:"Shooting",value:club["Shooting"]});
  player1.push({axis:"Dribbling",value:club["Dribbling"]});
  player1.push({axis:"Physical",value:club["Physical"]});
  return player1;
}

function sixSkillGenerateForClub(startPlayer1){
  var player1={};
  player1["Pace"]=pace(startPlayer1["SprintSpeed"],startPlayer1["Acceleration"]);
  player1["Passing"]=passing(startPlayer1["ShortPassing"],startPlayer1["Crossing"],startPlayer1["Vision"],startPlayer1["LongPassing"],startPlayer1["Curve"],startPlayer1["FKAccuracy"]);
  player1["Defending"]=defending(startPlayer1["StandingTackle"],startPlayer1["Marking"],startPlayer1["Interceptions"],startPlayer1["HeadingAccuracy"],startPlayer1["SlidingTackle"]);
  player1["Shooting"]=shooting(startPlayer1["Finishing"],startPlayer1["LongShots"],startPlayer1["ShotPower"],startPlayer1["Volleys"],startPlayer1["Positioning"],startPlayer1["Penalties"]);
  player1["Dribbling"]=dribbling(startPlayer1["Dribbling"],startPlayer1["BallControl"],startPlayer1["Agility"],startPlayer1["Balance"]);
  player1["Physical"]=physical(startPlayer1["Strength"],startPlayer1["Stamina"],startPlayer1["Aggression"],startPlayer1["Jumping"]);
  return player1;
}

function sixSkillGenerateForClubPortiere(startPlayer1){
  var player1={};
  player1["Pace"]=0;
  player1["Passing"]=0;
  player1["Defending"]=startPlayer1["GKDiving"]*0.20+startPlayer1["GKHandling"]*0.15,startPlayer1["GKKicking"]*0.05,startPlayer1["GKPositioning"]*0.10,startPlayer1["GKReflexes"]*0.50;
  player1["Shooting"]=0;
  player1["Dribbling"]=0;
  player1["Physical"]=0;
  return player1;
}
function sixSkillGenerateForEachPlayer(squadra,formazione,numGiocatoriPerPosizione){
  var tit=0.90;
  var ris=0.10;
  percentualeTitolari={Attaccante: tit/formazione["Attaccante"],
                      Centrocampista: tit/formazione["Centrocampista"],
                      Difensore: tit/formazione["Difensore"],
                      Portiere: tit/formazione["Portiere"]};
  percentualeRiserve={Attaccante: ris/(numGiocatoriPerPosizione["Attaccante"]-formazione["Attaccante"]),
                      Centrocampista:ris/(numGiocatoriPerPosizione["Centrocampista"]-formazione["Centrocampista"]),
                      Difensore:ris/(numGiocatoriPerPosizione["Difensore"]-formazione["Difensore"]),
                      Portiere:ris/(numGiocatoriPerPosizione["Portiere"]-formazione["Portiere"])};
  var club={Pace:0,Passing:0,Defending:0,Shooting:0,Dribbling:0,Physical:0};
  var attribute=["Pace","Passing","Defending", "Shooting", "Dribbling", "Physical"];

  squadra.forEach(function(d,i){
    if(d["PositionRule"]=="Portiere"){
      var player=sixSkillGenerateForClubPortiere(d);
    }else{
      var player=sixSkillGenerateForClub(d);
    }
    player["Name"]=d["Name"];
    player["PositionRule"]=d["PositionRule"];
    var posizione=player["PositionRule"];
    if(formazione[posizione]>0){
      var titolare=true;
      formazione[posizione]-=1
    }else{
      var titolare=false;
    }
    attribute.forEach(function(d,i){
      if(titolare){
        club[d]+=player[d]*percentualeTitolari[posizione]*cfgPonderazioneSkill[d][posizione]
      }else{
        club[d]+=player[d]*percentualeRiserve[posizione]*cfgPonderazioneSkill[d][posizione]
      }
    });
  });
  return club;
}
function calcoloPosizione(player){
  var posizioni_attacco=['LS','ST','RS','LW','LF','CF','RF','RW']
  var posizioni_centrocampo=['LAM','CAM','RAM','LM','LCM','CM','RCM','RM']
  var posizioni_difesa=['LWB','LDM','CDM','RDM','RWB','LB','LCB','CB','RCB','RB']
  var posizioni_portiere=['GK']
  var posizione_campo=["Attaccante","Centrocampista","Difensore","Portiere"]
  var posizioni=[posizioni_attacco,posizioni_centrocampo,posizioni_difesa,posizioni_portiere]
  var i;
  for (i = 0; i < posizioni.length; i++) {
    var j;
    for (j = 0; j < posizioni[i].length; j++) {
      if(player["Position"]==posizioni[i][j]){
        player["PositionRule"]=posizione_campo[i];
        return posizione_campo[i];
      }
    }
  }
}

function listOfPlayerIntoStarPlot(data, team1, team2){
  var playersClub1=[];
  var playersClub2=[];
  var numeroDiGiocatoriClub1={Attaccante: 0, Centrocampista:0, Difensore:0, Portiere:0}
  var numeroDiGiocatoriClub2={Attaccante: 0, Centrocampista:0, Difensore:0, Portiere:0}
  data.forEach(function(d,i){
    if(d["Club"]==team1){
      posizione=calcoloPosizione(d);
      playersClub1.push(d);
      numeroDiGiocatoriClub1[posizione]+=1
    }
    if(d["Club"]==team2){
      posizione=calcoloPosizione(d);
      playersClub2.push(d);
      numeroDiGiocatoriClub2[posizione]+=1
    }
  });
  console.log(numeroDiGiocatoriClub1);
//calcolare le 6 skill per ogni player e poi mettere la somma di tutte le skill dentro squad1 e squad2
//ho creato anche le funzioni per la ponderazioni in base alle posizioni, tocca scegliere 11 giocatori principali che hanno una certa ponderazione alta e le riserve con ponderazione basta
  return [playersClub1,playersClub2,numeroDiGiocatoriClub1,numeroDiGiocatoriClub2]
}

//funzione che crea la lista dei giocatori suggeriti per la ricerca
function listOfPlayers(listOfPlayer, left, testo){
  var ul = d3.select('body')
    .append('div')
    .attr("class", "listOfPlayer")
    .attr("style", "position: absolute; top: "+cfgListSuggerimenti.top+"px; left: "+left+"px; width: "+cfgListSuggerimenti.width+"px;")
    .append('ul')
    .attr("class", "list-group")
    .text(testo);

  ul.selectAll('li')
  .data(listOfPlayer)
  .enter()
  .append('li')
  .attr("class", "list-group-item")
  .html(String);
}

//funzione che ricerca un giocatore
function searchPlayer(data,val){
  var listOfPlayer1=[];
  data.every(function(player, i){
    if(player["Club"].toUpperCase().match(val)){
      var clubInlistOfPlayer=true;
      console.log("club");
      console.log(player["Club"]);
      listOfPlayer1.every(function(d,i){
        if(d==player["Club"]){
          console.log("club2");
          console.log(player["Club"]);
          clubInlistOfPlayer=false;
          return false;
        }else{
          return true;
        }
      });
      if(clubInlistOfPlayer){
        console.log("club3");
        console.log(player["Club"]);
        listOfPlayer1.push(player["Club"]);
      }
      if (listOfPlayer1.length>=10){
        return false;
      }else{
        return true;
      }
    }else{
      return true;
    }
  });

  return listOfPlayer1
}

//funzione che parte quando si clicca sulla ricerca
function handleClick(event){

  //cerco i giocatori nel dataset
  d3.csv(dataset_url, function(data) {
    d3.selectAll("svg").remove();
    var listOfPlayer1=searchPlayer(data,document.getElementById("myVal1").value.toUpperCase());
    var listOfPlayer2=searchPlayer(data,document.getElementById("myVal2").value.toUpperCase());

//creo la lista dei suggerimenti
    d3.selectAll(".listOfPlayer").remove();
    var player1=null;
    var player2=null;
    if(listOfPlayer1.length>1){
      player1=listOfPlayer1[0];
      listOfPlayers(listOfPlayer1,800,"Forse cercavi per Club1 ");
    }
    if(listOfPlayer2.length>1){
      player2=listOfPlayer2[0];
      listOfPlayers(listOfPlayer2,1010,"Forse cercavi per Club1 ");
    }
    if(listOfPlayer1.length==1){
      player1=listOfPlayer1[0];
    }
    if(listOfPlayer2.length==1){
      player2=listOfPlayer2[0];
    }
    if(listOfPlayer1.length<=0){
      player1=data[0]["Club"];
      listOfPlayerNew1=searchPlayer(data,document.getElementById("myVal1").value.toUpperCase().charAt(0));
      listOfPlayers(listOfPlayerNew1,cfgListSuggerimenti.left,"Club1 non trovato, forse cercavi:");
    }
    if(listOfPlayer2.length<=0){
      player2=data[1]["Club"];
      listOfPlayerNew2=searchPlayer(data,document.getElementById("myVal2").value.toUpperCase().charAt(0))
      listOfPlayers(listOfPlayerNew2,(cfgListSuggerimenti.left+cfgListSuggerimenti.width+10),"Club2 non trovato, forse cercavi:");
    }

    //infine creo lo starplot
    createStarlPlot(data,player1,player2);
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
