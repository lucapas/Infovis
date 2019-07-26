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

//crea le 6 skill nel formato per lo starplot, penso che questa funzione è usata solo in manipolazioneDatiPlayer
//prende in input l'oggetto giocatore preso dal db e in output restituisce una lista con 6 elementi
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

//lo starplot ha una sintassi particolare, visto che però per fare certe funzioni mi era più comodo un altro formato allora ho creato questa funzione per generare il formato che serve per lo starplot
//prende in input un dizionario di 6 elementi {skill:valoreSkill} e in output abbiamo una lista come la funzione sopra
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

//creo le 6 skill che mi sono comodo per fare certe funzioni
//in input un oggetto giocatore preso dal db e in output un dizionario {skill:valoreSkill}
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

//skill generate per il portiare con semplificazioni scelte da me. come sopra
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

/*è la formula per individuare quanto un giocatore influenza le skill di una squadra e questo valore lo sommo per tutti i giocatori per ogni skill
input:
  squadra: lista di giocatori dove un giocatore è un dizionario con 6 skill, il nome del giocatore, e il ruolo. {chiave,valore}
  formazione: è un dizionario con 4 elementi che indicano il numero dei giocatori della formazione titolare divisi in attacco,centrocampo,difesa e portiere es: 3341  tradotto in 433
  numGiocatoriPerPosizione: è un dizionario identico a formazione ma mi indica il numero dei giocatori che una squadra ha in ogni ruolo
output:
  club: un dizionario con 6 skill {chiave:valore} dove ogni skill è la somma di una percentuale delle skill di ogni giocatori
  giocatori: una lista di giocatori dove un giocatore è un dizionario {chiave:valore} composto da le 6 skill, il nome, il club, se è titolare o no, la posizione
*/
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
    var posizione=player["PositionRule"];
    if(formazione[posizione]>0){
      var titolare=true;
      formazione[posizione]-=1
    }else{
      var titolare=false;
    }

    attribute.forEach(function(d,i){
      if(titolare){
        club[d]+=player[d]*percentualeTitolari[posizione]*cfgPonderazioneSkill[d][posizione];
        player[d]=player[d]*percentualeTitolari[posizione]*cfgPonderazioneSkill[d][posizione];
        player["Contribuzione"]="titolare";
      }else{
        club[d]+=player[d]*percentualeRiserve[posizione]*cfgPonderazioneSkill[d][posizione];
        player[d]=player[d]*percentualeRiserve[posizione]*cfgPonderazioneSkill[d][posizione];
        player["Contribuzione"]="riserva";
      }
    });
    giocatori.push(player);
  });
  console.log(giocatori);
  return [club,giocatori];
}

/*mi trova la posizione di un giocatore in termini se è un attaccante, centrocampista, difensore o Portiere
input:
  player: un oggetto giocatore
  morePosition: è un booleano che indica true se nell'attributo Position si trovano piu posizioni preferite false se c'è solo 1 posizione.
*/
function calcoloPosizione(player,morePosition){
  var posizioni_attacco=['LS','ST','RS','LW','LF','CF','RF','RW','LM','RM']
  var posizioni_centrocampo=['LAM','CAM','RAM','LCM','CM','RCM','CDM','LDM','RDM']
  var posizioni_difesa=['LWB','RWB','LB','LCB','CB','RCB','RB']
  var posizioni_portiere=['GK']
  var posizione_campo=["Attaccante","Centrocampista","Difensore","Portiere"]
  var posizioni=[posizioni_attacco,posizioni_centrocampo,posizioni_difesa,posizioni_portiere]
  var i;
  if(player["Position"]=="GK "){
    player["PositionRule"]="Portiere";
    return "Portiere";
  }
  if(morePosition){
    var nameArr = player["Position"].split(" ");
    nameArr.pop();
    var max=0;
    var posMax='';
    nameArr.forEach(function(d,i){
      if(player[d]>max){
        max=player[d];
        posMax=d;
      }
    });
    var position=posMax;
  }else{
    var position=player["Position"];
  }
  for (i = 0; i < posizioni.length; i++) {
    var j;
    for (j = 0; j < posizioni[i].length; j++) {
      if(position==posizioni[i][j]){
        player["PositionRule"]=posizione_campo[i];
        return posizione_campo[i];
      }
    }
  }
}

/*funzione che ricerca un giocatore
in input abbiamo il db e il valore messo in input
in output la lista dei giocatori trovati
*/
function searchPlayer(data,val){
  var listOfPlayer1=[];
  data.every(function(player, i){
    if(player["Club"].toUpperCase().match(val)){
      var clubInlistOfPlayer=true;
      listOfPlayer1.every(function(d,i){
        if(d==player["Club"]){
          clubInlistOfPlayer=false;
          return false;
        }else{
          return true;
        }
      });
      if(clubInlistOfPlayer){
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

/*funzione che crea la lista dei giocatori suggeriti per la ricerca che viene stampata in output
in input:
  listOfPlayer cioè la lista dei giocatori (massimo 10)
  left serve per dare la distanza da una lista ad un altra
  testo: è il testo che compare sopra la lista
*/
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

/*funzione che tra tutti i team trovati me ne restituisce solo 1 in base a come è stato scritto il testo
se ho trovato più team mi restituisce il primo trovato e mi stampa una lista degli altri team trovati
se non ho trovato team mi restitusce il primo team trovato in base alla prima lettera inserita
input:
  database
  squadra: l'input inserito dall'utente
  dist: mi serve per la distanza da una lista ad un altra
output:
  il nome del giocatore che finirà nello starplot
*/
function search(data,squadra,dist){
  var listOfPlayer1=searchPlayer(data,squadra);
//creo la lista dei suggerimenti
  var player1=null;
  if(listOfPlayer1.length>1){
    player1=listOfPlayer1[0];
    listOfPlayers(listOfPlayer1,cfgListSuggerimenti.left+dist,"Forse cercavi per Club1 ");
  }
  if(listOfPlayer1.length==1){
    player1=listOfPlayer1[0];
  }
  if(listOfPlayer1.length<=0){
    listOfPlayerNew1=searchPlayer(data,squadra.charAt(0));
    player1=listOfPlayerNew1[0];
    listOfPlayers(listOfPlayerNew1,cfgListSuggerimenti.left+dist,"Club1 non trovato, forse cercavi:");
  }
  return player1;
}
