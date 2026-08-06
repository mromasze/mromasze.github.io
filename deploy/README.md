# Wdrożenie portfolio na serwerze Driperskiej Ligi

Portfolio jest wdrażane jako osobna statyczna strona. Nie wchodzi do Compose Driperskiej
Ligi i nie współdzieli z nią kontenerów, wolumenów ani portu `18080`.

Docelowy przepływ:

1. push do `main` buduje eksport Next.js (`out/`),
2. GitHub Actions wysyła archiwum przez SSH do `/opt/mromasze-portfolio/releases/<SHA>`,
3. symlink `/opt/mromasze-portfolio/current` jest przełączany atomowo,
4. hostowy nginx serwuje ten katalog dla `mromasze.dev`,
5. `mromasze.github.io` publikuje wyłącznie przekierowanie do `mromasze.dev`.

## 1. Cloudflare i DNS

W strefie `mromasze.dev` ustaw:

| Typ | Nazwa | Wartość | Proxy |
|---|---|---|---|
| `A` | `@` | `37.59.114.253` | Proxied |
| `CNAME` | `www` | `mromasze.dev` | Proxied |

Stan na dziś: `mromasze.dev` i `www.mromasze.dev` już rozwiązują się przez Cloudflare na
te same adresy proxy co `driperska.pl`, więc DNS jest gotowy. Ponieważ rekordy są
proxied, publiczne zapytanie DNS pokazuje adresy Cloudflare, a nie adres originu;
wartość `37.59.114.253` trzeba potwierdzić w panelu.

Uwaga: `https://mromasze.dev/` zwraca teraz stronę Driperskiej Ligi. Na serwerze nie ma
jeszcze vhosta dla tej domeny, a żaden blok `server` nie jest oznaczony jako
`default_server`, więc nginx obsługuje nieznany host pierwszym blokiem nasłuchującym na
443 — a `sites-enabled` ładuje się alfabetycznie, czyli `driperska.pl` przed
`np.mromasze.dev.conf`. Instalacja vhosta z kroku 2 to naprawia.

W strefie `mromasze.dev` działa już subdomena `np.mromasze.dev` (neural-pulse, proxy na
`127.0.0.1:8080`) z certyfikatem Certbota. Dla domeny głównej trzymamy się Cloudflare
Origin Certificate — tak jak `driperska.pl` — żeby nie dokładać kolejnego odnawianego
certyfikatu; Certbot pozostaje alternatywą, gdyby to było wygodniejsze.

W Cloudflare utwórz Origin Certificate obejmujący `mromasze.dev` oraz
`*.mromasze.dev`. Zapisz pliki na serwerze jako:

- `/etc/nginx/ssl/mromasze.dev/origin.pem`
- `/etc/nginx/ssl/mromasze.dev/origin.key`

Ustaw **SSL/TLS encryption mode** na **Full (strict)**. Nie używaj trybu Flexible.
Tryb przełącz dopiero po wgraniu certyfikatu originu i vhosta z kroku 2 — wcześniej
`mromasze.dev` trafia na certyfikat wystawiony dla `driperska.pl` i Full (strict)
odrzuciłby połączenie.

## 2. Jednorazowe przygotowanie serwera

Użytkownikiem wdrożeniowym jest `deploy` (uid 1001) — to on jest właścicielem
`/opt/driperska` i to w jego `~/.ssh/authorized_keys` leży klucz
`github-actions-driperska`. Konto `deploy` **nie ma** passwordless sudo, więc poniższe
polecenia wykonaj z konta administracyjnego `ubuntu` (uid 1000):

```bash
sudo install -d -o deploy -g www-data -m 0755 /opt/mromasze-portfolio
sudo install -d -o deploy -g www-data -m 0755 /opt/mromasze-portfolio/releases
sudo install -d -m 0700 /etc/nginx/ssl/mromasze.dev
```

Katalog `/etc/nginx/ssl/mromasze.dev` już istnieje; katalogów w `/opt` jeszcze nie ma.

Skopiuj Cloudflare Origin Certificate i klucz do opisanych wyżej ścieżek. Z komputera
administracyjnego skopiuj również przygotowany vhost:

```bash
scp deploy/nginx/mromasze.dev.conf DEPLOY_USER@37.59.114.253:/tmp/mromasze.dev.conf
```

Następnie na serwerze:

```bash
sudo chmod 0600 /etc/nginx/ssl/mromasze.dev/origin.key
sudo install -m 0644 /tmp/mromasze.dev.conf /etc/nginx/sites-available/mromasze.dev
sudo ln -s /etc/nginx/sites-available/mromasze.dev /etc/nginx/sites-enabled/mromasze.dev
sudo nginx -t
sudo systemctl reload nginx
```

Nie dodawaj portfolio do `/opt/driperska/docker-compose.yml`.

## 3. Klucz wdrożeniowy SSH

Zalecany jest osobny klucz Ed25519 dla tego repozytorium:

```bash
ssh-keygen -t ed25519 -f ./mromasze-portfolio-deploy -C github-actions-mromasze-portfolio
```

Dodaj zawartość pliku `.pub` do `/home/deploy/.ssh/authorized_keys` na serwerze. Ten
plik należy do `deploy`, więc dopisanie klucza nie wymaga sudo.
Prywatny klucz trafi do sekretu `DEPLOY_SSH_KEY`; nie zapisuj go w repozytorium.

Na serwerze odczytaj prawdziwy fingerprint klucza hosta:

```bash
sudo ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Na zaufanym komputerze pobierz wpis do `known_hosts` i porównaj fingerprint przed
zapisaniem sekretu:

```bash
ssh-keyscan -H 37.59.114.253
```

## 4. Ustawienia repozytorium GitHub

W `Settings → Environments` utwórz środowisko `production`. Ogranicz deployment branches
do `main` i opcjonalnie dodaj required reviewer. Dodaj do niego sekrety:

| Secret | Wartość |
|---|---|
| `DEPLOY_HOST` | `37.59.114.253` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PATH` | `/opt/mromasze-portfolio` |
| `DEPLOY_SSH_KEY` | cały prywatny klucz Ed25519 |
| `DEPLOY_KNOWN_HOSTS` | zweryfikowany wynik `ssh-keyscan -H 37.59.114.253` |

Sekrety Driperskiej Ligi nie są tu widoczne — sekrety nie są współdzielone między
repozytoriami, więc te same wartości trzeba dodać jeszcze raz w tym repozytorium.

Następnie wejdź w `Settings → Pages`:

1. w `Build and deployment → Source` wybierz **GitHub Actions**. Obecnie jest tam
   `Deploy from a branch` → `gh-pages`, czyli stary tryb `npm run deploy`,
2. pole **Custom domain** pozostaw puste; jeśli jest tam `mromasze.dev`, usuń je,
3. nie dodawaj pliku `CNAME` do repozytorium.

Środowisko `github-pages` już istnieje i ma dozwolone branche `main` oraz `gh-pages`,
więc nie wymaga zmian.

To rozdzielenie jest celowe: `mromasze.dev` wskazuje na VPS, natomiast domyślny adres
`https://mromasze.github.io` pozostaje na GitHub Pages i wykonuje przekierowanie.

W `Settings → Actions → General` pozostaw standardowe uprawnienia workflow
(`Read repository contents and packages permissions`); plik workflow nadaje jobowi Pages
dodatkowo tylko wymagane `pages: write` i `id-token: write`.

Po przełączeniu źródła Pages branch `gh-pages` przestaje cokolwiek publikować. Skrypty
`predeploy`/`deploy` w `package.json` oraz zależność `gh-pages` są od tego momentu
martwe i można je usunąć.

## 5. Pierwszy deploy i kontrola

Najpierw przygotuj katalog, certyfikat i nginx, potem ustaw DNS oraz sekrety GitHub.
Uruchom `Actions → Deploy portfolio → Run workflow` z brancha `main`.

Kontrola na serwerze:

```bash
readlink -f /opt/mromasze-portfolio/current
test -f /opt/mromasze-portfolio/current/index.html
curl -I -H 'Host: mromasze.dev' http://127.0.0.1/
sudo nginx -t
```

Kontrola publiczna:

```bash
curl -I https://mromasze.dev/
curl -I https://www.mromasze.dev/
curl -L https://mromasze.github.io/
```

Pierwszy adres powinien zwrócić stronę, `www` powinno przejść na domenę główną, a
GitHub Pages powinno doprowadzić do `https://mromasze.dev/`.

## 6. Rollback

Każdy deploy pozostawia poprzedni katalog w `releases`. Aby cofnąć stronę:

```bash
cd /opt/mromasze-portfolio
ln -sfn /opt/mromasze-portfolio/releases/POPRZEDNI_SHA current.next
mv -Tf current.next current
```

Po potwierdzeniu stabilności można okresowo usuwać stare katalogi `releases`, ale nie
należy usuwać katalogu wskazywanego przez `current`.
