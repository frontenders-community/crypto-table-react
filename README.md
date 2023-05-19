# Frontenders Community

## Challenge #13 - Crypto Data Table

Questa challenge implementa una pagina di un'ipotetica dashboard per l'amministrazione delle criptovalute.
Il focus principale è quello di lavorare con dati tabellari e implementare delle funzionalità base di una tabella:

- visualizzazione di dati;
- paginazione (spostamento tra le pagine, visualizzazione della pagina corrente, modifica di elementi per pagina);
- possibilità di ordinare dati per colonna in modo crescente / decrescente.

Per i dati delle criptovalute abbiamo utilizzato [API di coderanking](https://developers.coinranking.com/api/documentation).
Per accedere all'API avete bisogno di una chiave, quindi dovete creare l'account gratuito. 
Mentre testate la vostra app potrebbe capitare che le chiamate API vengono bloccate perchè raggiungete il limite di richieste. Ma non vi preoccupate, basterà aspettare un'attimo e sarà possibile di inviare di nuovo le richieste.

Per il design abbiamo preso ispirazione da [questo layout](https://dribbble.com/shots/4957976-Nodes-Dark-mode/attachments/10693224?mode=media) di Georgy Pashkov.

### API Endpoints

- */coins* - potete trovare la lista di query params [qui](https://developers.coinranking.com/api/documentation/coins)

### Tecnologie

E' consigliato svolgere la challenge con un framework (React, Vue o altro). Per l'implementazione dei grafici è stata utilizzata la libreria chart.js.

### Preview

https://github.com/frontenders-community/crypto-table-react/assets/56634652/8493ce25-a1ec-46cb-a890-360060dcb494

