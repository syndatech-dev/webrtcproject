# WebRTC SIP Client pour Odoo via FreePBX

Ce projet permet l’intégration d’un client WebRTC SIP dans Odoo, en utilisant FreePBX comme serveur SIP backend. Le client WebRTC est conçu pour enregistrer des utilisateurs SIP, initier des appels, gérer le transfert d’appels, et afficher l’historique des appels.

## 1. Fonctionnalités
- **Enregistrement SIP WebRTC** : Permet aux utilisateurs de s’enregistrer via FreePBX.
- **Initiation d’Appels** : Les utilisateurs peuvent passer des appels SIP depuis Odoo.
- **Transfert d’Appels** : Transférez des appels actifs vers un autre numéro SIP.
- **Historique des Appels** : Affichage des appels passés, avec l’heure, le statut et les participants.
- **Interface Moderne** : Construite avec Bootstrap pour une meilleure expérience utilisateur.

## 2. Dépendances

### Sur le Serveur
- **FreePBX** (Version 15+ recommandé) :
  - WebRTC activé.
  - Extensions SIP correctement configurées.
  - Codecs `OPUS` et `G722` activés.
- **Odoo** (Version 14+ recommandé) : Serveur Odoo fonctionnel. Module personnalisé placé dans le répertoire `addons`.
- **Python** (pour Odoo) :
  - `odoo`
  - `psycopg2`
  - `pytz`
  - `requests`
  - `lxml`
  - `jinja2`
  - `Werkzeug`

### Frontend
- **JsSIP** : Bibliothèque JavaScript pour les appels WebRTC/SIP.
  - Téléchargé depuis [le dépôt GitHub JsSIP](https://github.com/versatica/JsSIP) ou via un CDN.
- **Bootstrap** : Framework CSS pour l'interface utilisateur.
  - Chargé via un CDN :
    ```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    ```

## 3. Installation

### Étape 1 : Configurer FreePBX
1. Activez WebRTC dans FreePBX :
   - Allez dans *Settings > Asterisk SIP Settings*.
   - Activez WebRTC et TLS.
   - Ajoutez un certificat SSL valide.
2. Configurez des extensions SIP dans FreePBX pour permettre les connexions WebRTC.
3. Copiez les fichiers de configuration : `sip.conf`, `pjsip.conf`, et `extensions.conf` vers le répertoire `/etc/asterisk/` et redémarrez Asterisk avec la commande suivante :
   ```bash
   fwconsole restart
