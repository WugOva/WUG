typings install dt~jquery --global --save

# Pozadovane vlastnosti - prvni cast

## Ukoly - priprava aplikace
* vytvoreni projektu 
    - adresarova struktura
    - inicializace **npm init**    
* stazeni zavislosti
    - jquery **npm i jquery --save-dev**
    - underscore **npm i underscore --save-dev**
    - babel **npm i babel-cli  --save-dev**
    - babel loaders **npm i babel-loader babel-core --save-dev**
    - ES6 preset **npm i babel-preset-es2015 --save-dev**    
    - webpack **npm i webpack --save-dev**
    - systemjs **npm i systemjs --save-dev**

## TODO list

* nacteni seznamu filmu, omezeni na 6 zaznamu 
**http://localhost:1213/movies/**
* agregace film s popisem
**napr. http://localhost:1213/movies/1**
* propojeni view s modelem + nacteni obrazku pro jednotlive filmy
**http://localhost:1213/image/1**

## Prakticky

* vytvoreni zakladni struktury
    - vytvoreni **main.js** pro rizeni aplikace
    - vytvoreni movie service modulu pro cteni **seznamu filmu** a **detailu k filmum**
    - vytvoreni **tails controlleru** pro vytvoreni separace mezi moduly

- prace s daty    
    - vytvoren insance **movie service** pro nacteni dat
    - nacteni seznamu filmu (pouze 6 zaznamu)
    - agregace seznamu filmu s jejich detailem

- propojeni modelu s view
    - nacteni view z template script v html
    - propojeni view s modelem pomoci underscore => html 
    - rendrovani html do placeholder divu

# Pozadovane vlastnosti - druha cast

- interakce s UI - registrace udalosti
    - pro zobrazeni detailu filmu (implicitne schovany)
    - po kliku na detail UI se zmeni na **content editor**
        - zobrazeni textarea pro editovani
        - zobrazeni tlacitek pro zruseni editace, ulozeni

- uprava detailu
    - registrace udalosti po kliku na save tlacitko
    - odeslani dat na server (alert v pripade chyby)
    - uprava detailu pro read only odastavec
    - uzavreni content editoru

    