# Arbeitszeiterfassung
Das Projekt wurde mit  [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0-rc.4. erstellt.
Tools:
AngularJS
Sprachen: TS,php
DB: myphpadmin
Server: Apache

# Implementierungsschritte 
1. Apache auf VM installieren : 
 *Konsole öffnen 
 *ssh 141.56.131.34 -l userlocal
  PW:Ft_AZ!7x
2. MySql und anschließend myphpadmin installieren (mehr dazu : https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)

3. myphpadmin User angelegt : 
      User:wi2019
      PW:se2wi2019



# WebServer
http://141.56.131.34

# Datenbank
http://141.56.131.34/phpmyadmin/
 User:wi2019
 PW:se2wi2019
 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Test Tabellen Anleitung 
WebsServer :
http://141.56.131.34/
*insertTime.php liegt hier :
http://141.56.131.34/src/
*Terminal öffnen
*VM starten : 
ssh 141.56.131.34 -l userlocal,
PW:Ft_AZ!7x
*Cd /var/www/html/src
*Da liegt insertTime.php
*Datei editieren : 
*sudo vi insertTime.php
*Nach der Änderung bitte ausführen !!! :
*systemctl reload apache2

