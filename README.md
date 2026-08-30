# AutoSerwis PWA

Aplikacja Progressive Web App do śledzenia przeglądów i serwisów samochodowych.

## Szybki start

### 1. Wygeneruj ikony

```bash
node generate-icons.js
```

Opcjonalnie przekonwertuj na PNG:
```bash
npm install sharp
node convert-to-png.js
```

### 2. Uruchom lokalny serwer

PWA wymaga serwera HTTP (nie działa z `file://`). Wybierz jedną z opcji:

**Opcja A - Python:**
```bash
python -m http.server 8080
```

**Opcja B - Node.js (http-server):**
```bash
npx http-server -p 8080
```

**Opcja C - VS Code Live Server:**
- Zainstaluj rozszerzenie "Live Server"
- Kliknij prawym na `index.html` → "Open with Live Server"

### 3. Otwórz w przeglądarce

```
http://localhost:8080
```

## Instalacja na telefonie (Android)

1. Otwórz aplikację w Chrome na telefonie
2. Poczekaj 3 sekundy - pojawi się banner "Zainstaluj aplikację"
3. Kliknij **Instaluj**
4. Aplikacja pojawi się na ekranie głównym

**Alternatywnie:**
- Menu Chrome (⋮) → "Dodaj do ekranu głównego" / "Zainstaluj aplikację"

## Hosting (aby działało na telefonie)

Aby aplikacja działała na telefonie, musisz ją hostować. Opcje:

### GitHub Pages (darmowe)
1. Utwórz repozytorium na GitHub
2. Wrzuć pliki do repozytorium
3. Settings → Pages → Deploy from branch
4. Adres: `https://twoja-nazwa.github.io/autoserwis-pwa/`

### Netlify (darmowe)
1. Wejdź na https://app.netlify.com/drop
2. Przeciągnij folder `autoserwis-pwa`
3. Gotowe! Dostaniesz link typu `https://random-name.netlify.app`

### Vercel (darmowe)
```bash
npx vercel
```

## Funkcje PWA

- ✅ Działa offline (po pierwszym otwarciu)
- ✅ Instalowalna na ekranie głównym
- ✅ Pełnoekranowa (bez paska adresu)
- ✅ Automatyczne wykrywanie trybu offline
- ✅ Dane zapisywane lokalnie (localStorage)

## Struktura projektu

```
autoserwis-pwa/
├── index.html          # Główna aplikacja
├── manifest.json       # Konfiguracja PWA
├── sw.js              # Service Worker (offline)
├── icons/             # Ikony aplikacji
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
├── generate-icons.js   # Generator ikon SVG
├── convert-to-png.js   # Konwerter SVG → PNG
└── README.md
```

## Następne kroki (opcjonalne)

Jeśli chcesz plik APK do zainstalowania bez hostingu:
1. Użyj **Capacitor** - wrapper natywny
2. Lub **PWABuilder** (https://www.pwabuilder.com) - generuje APK z PWA

Powodzenia! 🚗
