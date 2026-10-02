# Peelparel prehistorie

Lesproject: elke game staat in een eigen map in de root (bijv. `dino-run/index.html`) en wordt gepubliceerd op https://peelparel-games.site/<naam>/.

- Nieuwe game: `bin/new-game <naam>` (kebab-case). Dit kopieert `template/index.html` en werkt het overzicht in `index.html` bij.
- Dev-server: `bin/serve` (poort 8000). Open http://localhost:8000/<naam>/. De pagina herlaadt vanzelf zodra een bestand in de game-map verandert.
- Houd een game in één `index.html` met inline JavaScript en een canvas, geen build-tools, geen npm. Losse bestanden (afbeeldingen, geluid) mogen wel in de game-map.
- Laat `<script src="../livereload.js"></script>` onderaan de body staan; zonder die regel werkt de auto-reload niet. Op GitHub Pages doet het script niets.
- Geheime game: zet de map in `geheim/<naam>/`. Die komt niet op het overzicht (`bin/update-index` slaat `geheim` over) en is alleen te bereiken via de directe link, lokaal http://localhost:8000/geheim/<naam>/ en online https://peelparel-games.site/geheim/<naam>/. Het livereload-script staat daar een niveau dieper: `<script src="../../livereload.js"></script>`. `bin/new-game` en `bin/rename-game` werken alleen in de root, dus een geheime game verplaats je met `git mv`.
- Game hernoemen: `bin/rename-game <oud> <nieuw>`. De definitieve naam is vaak pas aan het einde bekend, begin dus gerust met een werknaam.
- Commit na elke prompt zonder te vragen. Titel: `<gamenaam>: <korte samenvatting>`, en in de body de letterlijke prompt van de gebruiker onder het kopje `Prompt:`. Zo is later terug te lezen welke vraag welke wijziging opleverde. Push alleen als de gebruiker daarom vraagt.
- Pushen naar `main` zet de game direct online via GitHub Pages.
