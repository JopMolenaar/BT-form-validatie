## Proces BT

### Week 1

Deze week begonnen wij met het vak BT. Eerst moesten wij een korte opdracht maken waar wij het web kapot gingen maken. Dit gingen we doen door bepaalde dingen uit te zetten zoals de Javascript en breedband internet. 

<!-- Nadenken over opdracht aanpak en bespreken vrijdag -->

### Week 2

Deze woensdag begon ik met het maken van de eerste bouw stenen. Ik had al een goed idee van hoe ik het ging aanpakken. Ik begon met de eerste pagina, daar zaten wel al een aantal bouwstenen in die ik later ook nodig had. Ik probeerde deze pagina zo goed mogelijk te laten werken. Ik begon met de html maar daar was ik al wel snel op uitgekeken, ik had een aantal patterns en titles en data-attributes toegevoegd op de inputs en de rest zou ik later wel doen. Daarna greep ik naar de css. Met de `:has()`, `:target`,`:not()`, `:placeholder-shown`, `:user-valid`, `:user-invalid`, `:valid`, `:invalid` selectors kon ik de hele flow tussen de sections, uitklapbare gedeeltes in de form en error states werkend krijgen. Ik had nu de form in delen opgedeelt zodat de gebruiker niet meteen alles te zien krijgt en alsnog met de volgende en vorige knopjes en de linkjes in de nav boven de form tussen de delen kan navigeren. En dat allemaal zonder javascript en weing repetatieve code.

Een aantal voorbeelden van de features die ik heb gemaakt met de selectors genoemd hierboven zijn:

> Als een label invalid is, geen focus heeft en niet leeg is, geef dan de error message uit de data attribute door
in de content van de after
en plaats hem boven de input, onder het label 
(door grid mogelijk gemaakt) 

```css
label:has(input:user-invalid:not(:focus):not(:placeholder-shown))::after {
    content: attr(data-error-message);
    width: fit-content;
    grid-row: 2/3;
    color: var(--color-error);
}
```

> En deze 6 regels zijn voor het tabben tussen de secties door:

```css
section{
    display: none;
}
section:target {
    display: block;
}
```

Het enige wat best repetatief is, zijn deze regels met `:has()` die de link boven de form een kleur geven aan de hand van de status in de section: (drie kleuren voor elke section)

```css
html:has(main form > section#eersteSection:not(:target) fieldset input:user-invalid:not(:placeholder-shown)) {
    & main nav a:nth-child(1) {
        background-color: var(--color-error);
    }
}
html:has(main form > section#tweedeSection:not(:target) fieldset input:user-invalid:not(:placeholder-shown)) {
    & main nav a:nth-child(2) {
        background-color: var(--color-error);
    }
}
```

Maar op sommige browsers werken `:has()` en `:placeholder-shown` niet, en basis Javascript wel. Op donderdag ben ik dus bezig gegaan met het schrijven van Javascript voor als `:has()` en `:placeholder-shown` niet werken. Om te kijken of ze worden gesupport heb ik een variabele in css angemaakt die ik kan uitlzen in de Javascript, en als de value 1 is voert hij de js functies uit. 

```css
    @supports selector(:has(*)) {
        --supports-selector-has: 1;
    }
```

```js
const rootStyles = getComputedStyle(document.documentElement);
const supportsSelectorHas =
    rootStyles.getPropertyValue("--supports-selector-has").trim() == "1";

console.log(
    "falback js function when :has() isn't supported runs = ",
    !supportsSelectorHas
); // boolean -> true if supported

if (!supportsSelectorHas) {
    displayFollowUpQuestion();
    colorLinkNav();
    displayErrorMessage();
    runFunctionWhenTargeted();
}
```

Je kunt er natuurlijk ook voor kiezen om de JavaScript altijd te laten werken boven de CSS, zodat de pagina nog steeds op dezelfde manier werkt als de CSS uitvalt, zonder bepaalde progressive enhancement-functies natuurlijk. Die donderdag heb ik namelijk ook progressive enhancement-functies gemaakt in JavaScript. Dat zijn namelijk:

- Een max datum instellen op bepaalde datum velden.
- Het resetten van geselecteerde radiobuttons die in een sectie zitten die weer wordt ingeklapt.
- Een required attribuut zetten op de inputs die in een sectie zitten dat wordt uitgeklapt, en eraf halen wanneer die worden ingeklapt. 
- Automatisch de dubbele inputs invullen van een input die veranderd.
- Het disabelen van inputs die niet meer nodig zijn als je bijvoorbeeld er 1 van de 3 hebt ingevuld.

Die vrijdag had ik mijn eerste voortgangsgesprek en de docent was erg enthousiast. Daarna moest ik drie uur wachten tot mijn volgende gesprek voor een ander vak, en ik heb veel mensen geholpen omdat ik veel vragen kreeg van anderen over hoe ik mijn functies had gebouwd en hoe ik dingen had aangepakt.

### Week 3

Deze week ging ik verder aan de bouwstenen
ik heb op browsers getest
features met js gemaakt zoals localstorage, extra verkrijgers toevoegen, het laten werken van de hide en show zonder lijst, wat een uitdaging was met 3a. want daar werkt het niet iets anders, namelijk met dubbelingen en hoe ik erover heen loopte liet het weer verdwijnen. En toen ik het had laten werken voor 3a, werkte het niet voor normale inputs. ben er zeker 8+ uur mee bezig geweest.
validation en js fallbacks verbeterd + besloten om het alvast an te zetten want dat werkt beter samen.
feedback gekregen 


<!-- /* feedback van jeremy: probeer het gene wat alles kapot kan maken op het zelfde niveau kwa 
moeilijkheid of lastiger the definieren, zo kan het minder snel kapot.

Ook zei hij dat je telkens moet nadenken als frontend dev over alles wat je doet. 
Niet zomaar dingen doen omdat je dat altijd doet. */ -->