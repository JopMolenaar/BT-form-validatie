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

Deze week ging ik verder aan de bouwstenen en heb ik veel bugs opgelost waaronder: vraag 3a.
Dit was een grote bug in mijn code nadat ik de functie had herschreven na mijn feedback moment. Er waren 5 radio buttons die niet altijd 2 vervolg secties laten zien. Bij een moest hij alleen het eerste vervolg laten zien en bij de derde alleen de tweede. Dit had ik opgelost door een attribute erop te zetten van data-ga-verder-met en data-ga-ook-verder-met. Maar PPK zei dat dat handiger kon en dat was door het te splitten met een comma in 1 dataset. Hiervoor moest ik wel mijn al werkende functie omschrijven wat veel tijd en andere logica koste dan het opeklappen van de radio buttons. Ook had ik later problemen met de validatie, het openklappen van de juiste secties aan de hand van de al geselecteerde opties die uit de local storage kwamen en nog wat meer. Dit heb ik toen allemaal moeten oplossen wat natuurlijk wel is gelukt. 

Ook heb ik mijn website op de IOS en MAC safari browser getest en daar bleek dat placeholder-shown het niet deed. Als ik dus een input field weer leeg maakte, zou het geen error of iets van validatie moeten laten zien. Dit deed het op Chrome, maar dus niet op Safari, terwijl placeholder-shown wel wordt ondersteunt. Ik ging op onder zoek uit en dacht bij mijzelf waarom het het niet zo werken en toen bedacht ik mij dat er mogelijk een spatie zou in moeten staan. Ik had namelijk `placeholder=""` op de input gezet, maar het is best logisch dat als je niks in een placeolder zet, hij ook niet te zien is. En ja hoor, `placeholder-shown` op Safari doet het wel als je `placeholder=" "` met dus een spatie op de input zet. Dit was wel grappig om te zien dat deze browsers dit dus allebei verschillend begrijpen en interpreteren. 

Ik heb deze weken al meerdere nieuwe input elementen en attributen geleerd zoals pattern en inputmode. Maar tijdens het feedback gesprek had iemand `accept` op zijn input met een `type="file"` gezet. Dit ben ik toen ingedoken en heb het toegepast op mijn handtekening input. Door `accept="image/*,.pdf"` op mijn input te hebben gezet kunnen mensen alle soorten images en pdf's uploaden. En door `image/*` kan je op sommige apparaten de camera openen en een foto maken van je handtekening. 

Ook heb ik deze week features met javascript gemaakt zoals localstorage, extra verkrijgers toevoegen, validation en javascript fallbacks verbeterd. Ook heb
ik besloten om de javascript alvast aan te zetten en niet te kijken of has het wel of niet doet want dat werkt beter samen met de andere javascript functies.
Ook heb ik veel meer content toegevoegd, heel vraag 3 en een deel van 4. En heb ik feedback gekregen van Jeremy. Hij zei: probeer het gene wat alles kapot kan maken op het zelfde niveau kwa moeilijkheid of lastiger the definieren, zo kan het minder snel kapot. Hij doelde hier vooral op `section:target {display: block;}` en `section {display: none;}`. als target het niet doet voor een of andere reden doet alleen de display none selector. Dis is wel een groot probleem want dan ziet de gebruiker niks. Door het zo: `section:not(:target) {display: none;}` op te schrijven, is het minder moeilijk om kapot te maken. 
Ook zei hij in het algemeen dat je telkens moet nadenken als frontend dev over alles wat je doet. Niet zomaar dingen doen omdat je dat altijd doet.
Ook had ik een specificity probleem met placeholder-shown. Na wat research heb ik `@supports not` gebruikt voor placeholder-shown i.p.v alleen `@supports`

### Week 4

Deze week was ik vooral bezig met het oplossen van bugs. Ik was namelijk alle laastste bouwstenen aan het maken en het te proberen implementeren in de code waardoor alles goed werkt met elkaar. Dit ging gepaard met veel testen. En door al dat testen zag ik dat sommige dingen niet werkte zoals ze moesten werken en door veel `console.log` te plaatsen en de pagina te inspecteren kwam ik erachter waarom. 
Ook had ik weer ander specificity probleem omdat de javascript classes de `:has()` niet overschreef terwijl dat wel de bedoeling was want javascript was uiteindelijk specifieker. Dit kon ik op lossen met @layer.

Als ik op deze weken terug kijk heb ik veel geleerd over browsers, browser compatibility, forms en form validation. Ik heb geprobeerd mijn functies zo te schrijven dat je ze makkelijk kan hergebruiken op meerdere plekken verder in het formulier maar tijdens dat ik aan het coderen was kwam ik vaak uitzonderingen tegen die net weer eventjes anders werkte. Het zou dus zo kunnen zijn dat sommige functies slimmer, korter en efficienter kunnen worden geschreven, maar dat is een taak voor in de toekomst. 