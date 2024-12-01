
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
   ```

### Étape 2 : Installer le Module Odoo
1. Placez le dossier `synda_webrtc_sip_client` dans le répertoire `addons` de votre installation Odoo.
2. Vérifiez que le fichier `__manifest__.py` inclut toutes les dépendances nécessaires.
3. Rechargez la liste des modules dans Odoo :
   - Allez dans *Apps > Mettre à jour la liste*.
   - Recherchez *WebRTC SIP Client* et installez le module.

### Étape 3 : Démarrer le Serveur
1. **Démarrer Odoo** :
   ```bash
   ./odoo-bin -c odoo.conf
   ```
   Accédez à `http://localhost:8069` ou l'adresse de votre serveur.
2. **Démarrer FreePBX** :
   ```bash
   fwconsole start
   ```

## 4. Utilisation

1. **Accéder à l’Interface WebRTC** :
   - Allez dans le menu d’Odoo où l'interface est intégrée.
   - Vous verrez :
     - Un bouton pour enregistrer l’utilisateur SIP.
     - Un champ pour initier un appel.
     - Une section pour transférer des appels.
     - Un tableau affichant l’historique des appels.
2. **Enregistrer un Utilisateur SIP** :
   - Cliquez sur le bouton *Register SIP*.
   - Vérifiez le statut dans *sip-status*. S’il affiche *Registered*, l’enregistrement a réussi.
3. **Faire un Appel** :
   - Entrez un numéro SIP valide dans *Enter target SIP address*.
   - Cliquez sur *Make Call*. Le statut de l’appel changera en fonction de son état.
4. **Transférer un Appel** :
   - Pendant un appel actif, entrez un numéro SIP dans *Enter transfer target SIP address*.
   - Cliquez sur *Transfer Call*. L’appel sera transféré au destinataire.
5. **Vérifier l’Historique des Appels** :
   - Consultez le tableau sous la section *Call History* pour voir les appels passés.

## 5. Débogage

### Problèmes d’Enregistrement SIP
- Vérifiez les logs FreePBX dans *Reports > Asterisk Logfiles*.
- Assurez-vous que les informations de connexion SIP (nom d’utilisateur et mot de passe) sont correctes.

### Problèmes de Connexion WebRTC
- Vérifiez que le port WebSocket (5061 par défaut) est ouvert.
- Testez avec les outils de développement du navigateur (Inspecter > Console) pour détecter les erreurs JavaScript.

### Problèmes de Démarrage du Module Odoo
- Assurez-vous que le module est bien activé dans Odoo.
- Vérifiez les permissions sur les fichiers et les répertoires.
