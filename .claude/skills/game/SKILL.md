---
name: game
description: Maak een nieuwe browser-game aan in de lesrepo peelparel-prehistorie, start de dev-server met auto-reload en open de game in de browser. Gebruik bij "/game", "nieuwe game", "maak een game voor de les", of als er in de klas een spel gebouwd gaat worden.
user-invocable: true
args: "[naam]"
---

# Nieuwe game voor de les

Alle games staan in deze repo, elk in een eigen map met één `index.html`. Het overzicht van alle games staat online op https://peelparel-games.site/ en wordt automatisch bijgewerkt door `bin/new-game`.

## Hoe je antwoordt

De kinderen die de game maken lezen mee. Schrijf daarom in gewone taal over het spel, niet over de code. Vertel wat er nu gebeurt als ze spelen en welke toets of klik daarbij hoort, en houd het bij een paar regels: ze willen spelen, niet lezen.

Laat uit je antwoord weg: functienamen, bestandsnamen, regelnummers, commit-hashes, kleurcodes, pixelmaten, namen van technieken en verslagen van wat je hebt getest. "De kat springt nu hoger als je de spatie langer vasthoudt" is goed. "Ik heb SPRONGKRACHT verhoogd naar 470 en EXTRA_SPRONGKRACHT toegevoegd in de update-lus" niet.

De code zelf mag wel gewoon technisch zijn, daar kijken ze niet naar. Alleen hoe je het uitlegt moet simpel.

Zeg het wel als er iets is wat ze moeten weten om verder te kunnen: een nieuwe toets, iets wat anders werkt dan ze verwachtten, of iets wat je niet gelukt is.

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
- Gebruik Nederlandse namen in de code en zet er korte comments bij, zodat je er later zelf nog uit komt. De code mag zo technisch worden als nodig is: de leerlingen kijken naar het spel, niet naar het bestand. Maak per prompt wel één duidelijke wijziging, zodat ze het effect in de browser direct zien.

## Stap 4a: Even controleren, niet uitgebreid testen

De klas zit te wachten om te spelen, dus houd het controleren bij een paar seconden. Een syntaxcheck op het script in de pagina is genoeg: dan weet je dat het spel niet op een zwart scherm blijft staan.

```bash
cd "$(git rev-parse --show-toplevel)"
python3 -c "import io,re; s=io.open('<naam>/index.html',encoding='utf-8').read(); io.open('/tmp/check.js','w').write(re.search(r'<script>(.*?)</script>',s,re.S).group(1))"
node --check /tmp/check.js
```

Verder testen zij het zelf: de game staat met livereload al open, dus elke wijziging is meteen te zien. Bouw geen testopstellingen om het spel na te spelen: geen bots die een level uitlopen, geen nagebouwde natuurkunde, geen headless browser, geen screenshots. Dat kost minuten en die heb je niet.

Verander je iets waardoor een level misschien niet meer te halen is (sprongafstanden, zwevende platformen, een nieuwe route), dan kun je dat beter gewoon vragen: "lukt het je om boven te komen?" Zij zien het in één poging, en ondertussen spelen ze.

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
