# BP-Implementace

### Status
[![Build Status](https://travis-ci.org/Rockuo/BP-Implementace.png)](https://travis-ci.org/Rockuo/BP-Implementace)

**_Celý instalace se spuštěním ES5 testů je možné projít na adrese [https://travis-ci.org/Rockuo/BP-Implementace](https://travis-ci.org/Rockuo/BP-Implementace).**
**Kde je build prováděn při každém provedení PUSH do GITHUBU**

## Jak ozkoušet některé operace:
* příkaz: ` npm i --production`
* spuštění existujícího příkladu: `node {operace}.js`
* Například `node shuffle.js`

## Jak zkoušet ES6 verzi:
* příkaz: `npm i`
* žkoušet operace v souboru "run.js" (obsehuje předpřipravený příklad)
* "run.js" se spustí pomocí: `node es6runner.js`

## TESTY
* testy produkce: `npm test`
* testy ES6: `npm es6Test`

## Známý problém:
Na serveru EVA nelze poté co byl aktualizován balíček AVA províst pouze
npm install (pravděpodobně způsobeno kombinací balíčku AVA který má
momentálně rozbité verzování \[od konce dubna 2018\] a faktu, že na
serveru EVA je verze NPM nekompatibilní s verzí NODE \[node na evě je
 je 10 a npm na evě nepodporuje výce než 9\])

Možný způsob jak to obejít je pouštět pouze `npm i --production`, ale
 to neumožňuje spouštět testy, ani zkoušet ES6.

Další způsob jak to obejít je provést `npm i` na serveru merlin, kde
ale není podpora pro AVA a proto zbytek příkazů je třeba zpoučtět opět
 na serveru EVA, který ale už bude fungovat pro další věci.

**Nejlepší způsob jak obejít tento problém je provést sekvenci příkazů:**
1. `npm install ava`
2. `npm install`


## Jak upravovat:
Upravení této knihovny je možné úpravou souborů v adresáři "src/".

Po upravě je žádaná "kompilace" na ES5, jinak se změny neprojeví v ES5
testech a importech. Proto je nutné zavolat příkaz `npm run build` který
přegeneruje složku "dist/", případně `npm run testbuild`, který proved
e build a následně spustí ES5 testy.

