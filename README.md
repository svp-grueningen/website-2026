# Website SVP Grüningen

Statische Website (Eleventy) mit Pages CMS als Bearbeitungsoberfläche. Kein Server, keine Datenbank.

## Wo ist was?

| Inhalt | Datei / Ordner | Im CMS unter |
|---|---|---|
| News & Medienmitteilungen | `src/news/*.md` | News & Medienmitteilungen |
| Termine | `src/termine/*.md` | Termine |
| Parolen | `src/parolen/*.md` | Parolen |
| Vorstand | `src/_data/vorstand.json` | Vorstand |
| Volksvertreter | `src/_data/volksvertreter.json` | Volksvertreter |
| Mandatsträger | `src/_data/mandatstraeger.json` | Mandatsträger |
| Kantonale News (Links) | `src/_data/kantonales.json` | Kantonale News |
| Parteiprogramm, Impressum, Datenschutz | `src/seiten/*.md` | Textseiten |
| Startseite, Kontaktdaten, Social Media | `src/_data/einstellungen.json` | Startseite & Kontaktdaten |
| Bilder aus dem CMS | `src/assets/uploads/` | (Upload im CMS) |
| Design | `src/assets/css/styles.css`, `src/_includes/` | – |

- Termine, deren Datum vorbei ist, verschwinden automatisch.
- Einträge mit «Veröffentlicht» = aus erscheinen nicht auf der Seite (Entwurf).

## Lokal ansehen (optional)

Voraussetzung: Node.js 22 installiert.

```
npm install
npm start
```

Dann im Browser http://localhost:8080 öffnen.

## Online bringen (einmalig)

1. **GitHub:** Konto anlegen, neues privates Repository `svp-grueningen-website` erstellen und diesen Ordner hochladen.
2. **Netlify:** Mit GitHub anmelden → «Add new site» → «Import from Git» → Repository wählen. Die Einstellungen stehen in `netlify.toml`, es muss nichts eingetragen werden.
3. **Formular:** In Netlify unter «Forms» die Benachrichtigung per E-Mail an info@svp-grueningen.ch einrichten.
4. **Pages CMS:** Auf https://app.pagescms.org mit GitHub anmelden und das Repository auswählen. Die Masken kommen aus `.pages.yml`. Weitere Vorstandsmitglieder können als Mitarbeitende eingeladen werden.
5. **Domain:** In Netlify die Domain svp-grueningen.ch hinzufügen und beim bisherigen Anbieter **nur** die Einträge für die Website (A/CNAME für `@` und `www`) anpassen. **Die MX-Einträge (E-Mail) nicht anfassen.**

## Vor dem Go-live erledigen

- [ ] Vorstand, Volksvertreter und Mandatsträger mit echten Namen (aktuell Platzhalter «Vorname Name»)
- [ ] Impressum: verantwortliche Person eintragen
- [ ] Datenschutzerklärung prüfen
- [ ] Die zwei News aus der alten Vorschau prüfen oder ersetzen
- [ ] Beispieltermin «Generalversammlung 2027 (BEISPIEL)» ersetzen
- [ ] Kantonale News: Links auf die konkreten Artikel setzen (zurzeit nur Startseite Bezirk Hinwil)
- [ ] Rechte am SVP-Logo und an den Fotos klären (Logo üblicherweise über die SVP Kanton Zürich)
