# Infovis Star Plot Fifa 19
Progetto per il corso di visualizzazione delle informazione.

## Star Plot Players

In questa vista si possono confrontare diversi giocatori 2 alla volta in base a 6 skill differenti. 
Se due giocatori hanno il ruolo di portiere (es. Buffon e Mirante) gli indici dello starplot cambiano in base alle skill riguardanti il portiere.
Sotto la legenda appare un link che porta alla vista Star Plot Team dove vengono confrontati i due team corrispondenti hai 2 giocatori che si stava visualizzando.

## Star Plot Teams

In questa vista si possono confrontare diversi team 2 alla volta in base a 6 skill differenti. 
Sotto la legenda appaiono due link, uno per la prima squadra e uno per la seconda squadra, che porta alla vista Star Plot Top 11 dove viene visualizzata la top 11 del team corrispondente.

## Star Plot Top 11

In questa vista si possono visualizzare come ogni giocatore della top 11 di una squadra influisce sulla forza della squadra.
Sotto la legenda appare un link, se vengono selezionati 2 giocatori, che porta alla vista Star Plot Players in cui vengono confrontati i due giocatori selezionati.

## Barre di Ricerca

Nella ricerca di un giocatore, se vengono trovati più giocatori oppure non viene trovato nessun giocatore appare una lista di suggerimenti di giocatori.
Nelle viste Star Plot Teams e Star Plot Top 11 è presente una barra per decidere che formazione si vuole utilizzare per la visualizzazione del team.

## Skill

Il confronto tra due giocatori o due squadre viene effettuato attraverso la comparazione di 6 skill. 
</br>
Queste 6 skill per i giocatori di movimento e per i team sono: 
  <li> Pace </li>  
  <li> Passing </li>
  <li> Defending </li>
  <li> Shooting </li>
  <li> Dribbling </li>
  <li> Physical </li>

</br>
Invece per i portieri abbiamo queste altre 6 skill: 
  <li> Diving </li>  
  <li> Handling </li>
  <li> Positioning </li>
  <li> Reflexes </li>
  <li> Reactions </li>
  <li> Kicking </li>

</br>
I calcoli di queste skill sono stati fatti attraverso formule che utilizza fifa prese da questo link: https://www.fifauteam.com/player-ratings-guide-fifa-19/
</br>

Per quanto riguarda i Team sono state seguite delle formule per decidere quanto un giocatore contribuisce nel calcolo della forza totale della squadra. I giocatori sono stati suddivisi in base alla loro posizione (Portiere, Difensore, Centrocampista, Attaccante). 
In base a questa posizione il giocatore contribuirà ad ogni skill seguendo queste regole:
  <li> Pace: Attaccante 60%, Centrocampista 20%, Difensore 20%, Portiere 0% </li>  
  <li> Passing </li>
  <li> Defending </li>
  <li> Shooting </li>
  <li> Dribbling </li>
  <li> Physical </li>
## Contributors
- [Jerin George Mathew](https://github.com/jgeorgemathew)
- [Luca Pasquini](https://github.com/lucapas)
