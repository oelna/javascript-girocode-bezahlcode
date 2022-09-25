# Girocode und Bezahlcode mit Javascript generieren

[Online-Demo](https://oelna.github.io/javascript-girocode-bezahlcode/)

Codes:

- [Girocode (EPC069-12)](https://de.wikipedia.org/wiki/EPC-QR-Code)
- [Bezahlcode](http://web.archive.org/web/20190628073102/http://www.bezahlcode.de/funktionsweise/)

Ein einfacher One-pager, mit dem sich die beiden Codes aus IBAN und BIC generieren lassen. Ohne Gewähr! Bezahlcode konnte ich nicht testen. Wenn jemand Verbesserungsvorschläge mit konkretem Code hat, gerne.

Benutzt den QR-Code Javascript-Code von [davidshimjs](https://github.com/davidshimjs/qrcodejs).

Wünsche für die Zukunft:

- Codes einfacher downloadbar machen, zB. indem das SVG als `<img>` eingebunden wird (Anmerkung: Es gibt jetzt einen Download-Button!)
- Bessere Validierung der Eingabe
- BIC automatisch aus der IBAN extrahieren?
- Schöneres Design
