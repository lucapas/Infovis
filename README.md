# Starplots Fifa 2019
Progetto per il corso di [Visualizzazione delle Informazioni](http://www.dia.uniroma3.it/~infovis/). Implementazione di una interfaccia grafica composta da 3 viste per comparare le statistiche [FIFA 2019](https://it.wikipedia.org/wiki/FIFA_19) di giocatori e squadre. Le tre viste realizzate sono:

- Starplot per confrontare due giocatori (di seguito indicato come *Starplot players*);
- Starplot per confrontare due squadre (di seguito indicato come *Starplot teams*);
- Starplot che mostra il contributo individuale dei vari giocatori alla squadra (di seguito indicato come *Starplot Top 11*);.

Segue una breve descrizione delle tre viste.

## Viste

#### Starplot per confrontare due giocatori

Con questa vista è possibile confrontare due giocatori sulla base di 6 skill differenti. 
(se i due giocatori in questione sono portieri, e.g. Buffon e Mirante, le skill che vengono mostrate nello starplot saranno specifiche per i portieri, e.g *Diving*, *Handling*).
Sotto la legenda è presente un link che punta alla vista che confronta le squadre dei due giocatori mostrati nella vista corrente.


#### Starplot per il confronto di due squadre

Con questa vista è possibile confrontare due squadre sulla base di 6 skill differenti.
Sotto la legenda sono presenti due link (uno per ciascuna squadra nella vista corrente), i quali rimandano alla vista che consente di vedere il contributo dei singoli giocatori alle statistiche complessive della squadra in cui giocano.


#### Starplot che mostra i contribuiti individuali dei giocatori alla squadra

In questa vista è possibile visualizzare come i singoli giocatori contribuiscono alle statistiche (skill) della squadra in cui giocano. Sempre in questa vista, selezionando due giocatori dalla legenda, verrà mostrato un link che punta alla vista che consente di poter confrontare i giocatori selezionati.


## Barre di Ricerca

Nelle tre viste sono presenti delle barre di ricerca per inserire i giocatori (o i team) che si intendono confrontare. 
Nella ricerca di un giocatore, se vengono trovati più giocatori oppure non viene trovato nessun giocatore appare una lista di suggerimenti di giocatori.
Nelle viste Star Plot Teams e Star Plot Top 11 è presente una barra per decidere che formazione si vuole utilizzare per la visualizzazione del team.

### Skill

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
</br>

Per quanto riguarda i Team sono state seguite delle formule per decidere quanto un giocatore contribuisce nel calcolo della forza totale della squadra. I giocatori sono stati suddivisi in base al loro ruolo (Portiere, Difensore, Centrocampista, Attaccante). 
In base a questo ruolo il giocatore contribuirà ad ogni skill seguendo queste regole:
  <li> Pace: Attaccante 60%, Centrocampista 20%, Difensore 20%, Portiere 0% </li>  
  <li> Passing: Attaccante 10%, Centrocampista 80%, Difensore 10%, Portiere 0% </li>
  <li> Defending: Attaccante 1%, Centrocampista 14%, Difensore 60%, Portiere 25% </li>
  <li> Shooting: Attaccante 75%, Centrocampista 20%, Difensore 5%, Portiere 0% </li>
  <li> Dribbling: Attaccante 70%, Centrocampista 20%, Difensore 10%, Portiere 0% </li>
  <li> Physical: Attaccante 20%, Centrocampista 20%, Difensore 60%, Portiere 0% </li>
  
  
### Componenti del team
- [Jerin George Mathew](https://github.com/jgeorgemathew)
- [Luca Pasquini](https://github.com/lucapas)
