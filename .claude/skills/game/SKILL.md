---
name: game
description: Maak een nieuwe browser-game aan in de lesrepo peelparel-prehistorie, start de dev-server met auto-reload en open de game in de browser. Gebruik bij "/game", "nieuwe game", "maak een game voor de les", of als er in de klas een spel gebouwd gaat worden.
user-invocable: true
args: "[naam]"
---

# Nieuwe game voor de les

Alle games staan in deze repo, elk in een eigen map met één `index.html`. Het overzicht van alle games staat online op https://peelparel-games.site/ en wordt automatisch bijgewerkt door `bin/new-game`.

## Stap 1: Naam bepalen

Kies samen met de gebruiker een korte naam in kebab-case (kleine letters, cijfers, koppeltekens), bijvoorbeeld `dino-run` of `mammoet-jacht`. Als er een argument is meegegeven, gebruik dat. Controleer dat de map nog niet bestaat.

## Stap 2: Game aanmaken

```bash
cd "$(git rev-parse --show-toplevel)"
bin/new-game <naam>
```

Dit kopieert `template/index.html` (een canvas met een lege game-loop) naar `<naam>/index.html` en zet de game in het overzicht in `index.html`. Een nieuwe game begint als een leeg canvas: voeg niets toe wat de gebruiker niet gevraagd heeft, geen voorbeeldscène, geen opmaak rond het canvas. Elke stap komt uit een prompt in de les.

## Stap 3: Dev-server starten en browser openen

Kijk of de server al draait, start hem anders in de achtergrond, en open de game:

```bash
cd "$(git rev-parse --show-toplevel)"
curl -s -o /dev/null http://localhost:8000/ || (nohup bin/serve >/dev/null 2>&1 &)
sleep 1
xdg-open http://localhost:8000/<naam>/
```

Controleer dat er echt een browservenster verschijnt (bijvoorbeeld met `hyprctl clients | grep -i chrom`). Als `xdg-open` zonder foutmelding niets opent, start de browser dan handmatig in de terminal (`chromium http://localhost:8000/<naam>/`) zodat de echte foutmelding zichtbaar wordt, en los die op.

De pagina herlaadt zichzelf zodra een bestand in de game-map verandert. Elke wijziging die je opslaat is dus meteen zichtbaar, er hoeft niets handmatig ververst te worden.

## Stap 4: Bouwen

Werk daarna in `<naam>/index.html`. Regels:

- Alles in één `index.html` met inline JavaScript en het `<canvas>`, geen frameworks, geen build-tools, geen npm. Afbeeldingen of geluiden mogen als losse bestanden in de game-map.
- Laat `<script src="../livereload.js"></script>` onderaan de body staan, anders werkt de auto-reload niet.
- Houd de code leesbaar voor leerlingen: korte functies, Nederlandse variabelenamen mag, kleine stappen per wijziging zodat ze het effect direct in de browser zien.

## Stap 4b: Na elke prompt committen

Commit na elke prompt van de gebruiker, zonder te vragen. De commits zijn een logboek van de les: later is terug te lezen welke vraag welke wijziging opleverde. Push alleen als de gebruiker daarom vraagt (stap 6).

Het commitbericht bestaat uit een korte titel met de gamenaam, en daaronder de letterlijke prompt van de gebruiker:

```bash
cd "$(git rev-parse --show-toplevel)"
git add -A && git commit -F - <<'PROMPT'
<naam>: <korte samenvatting van de wijziging>

Prompt:
<de prompt van de gebruiker, woordelijk, niet ingekort of herschreven>
PROMPT
```

Bevat de prompt zelf een regel met alleen `PROMPT`, gebruik dan een ander eindwoord voor de heredoc.

## Stap 5: Hernoemen

De uiteindelijke naam weet je vaak pas aan het einde. Begin gerust met een werknaam en hernoem later:

```bash
cd "$(git rev-parse --show-toplevel)"
bin/rename-game <oude-naam> <nieuwe-naam>
```

Dit verplaatst de map met `git mv`, past de `<title>` aan en werkt het overzicht bij. Open daarna http://localhost:8000/<nieuwe-naam>/ in de browser en commit de hernoeming volgens stap 4b.

## Stap 6: Online zetten

Als de gebruiker de game wil delen: push naar `main`. GitHub Pages publiceert binnen een minuut op https://peelparel-games.site/<naam>/ en het overzicht op de root toont de nieuwe game.

```bash
cd "$(git rev-parse --show-toplevel)"
git push
```
