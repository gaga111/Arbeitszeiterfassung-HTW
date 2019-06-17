# Arbeitszeiterfassung


# WebServer
http://141.56.131.34

# Datenbank
http://141.56.131.34/phpmyadmin/
 User:wi2019
 PW:se2wi2019

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0-rc.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Test Tabellen Anleitung 
WebsServer :
http://141.56.131.34/
insertTime.php liegt hier :
http://141.56.131.34/src/
Terminal öffnen
VM starten : 
ssh 141.56.131.34 -l userlocal
PW:Ft_AZ!7x
Cd /var/www/html/src
Da liegt insertTime.php
Datei editieren : 
sudo vi insertTime.php
Nach der Änderung bitte ausführen !!! :
systemctl reload apache2


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
