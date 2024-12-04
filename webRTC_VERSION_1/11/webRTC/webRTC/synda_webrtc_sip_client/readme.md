# WebRTC SIP Client pour Odoo avec FreePBX

Ce projet implémente un client SIP WebRTC dans Odoo pour enregistrer des extensions et passer des appels via FreePBX. Il utilise JsSIP, une bibliothèque JavaScript, pour la gestion de la communication SIP via WebRTC.

## Prérequis
- **Odoo 15+** (idéalement) installé sur votre serveur.
- **FreePBX** configuré avec support WebRTC et SIP.
- **Node.js** et **npm** pour les dépendances.
- Un serveur **Asterisk** ou **FreePBX** configuré avec un certificat SSL valide pour le support WebRTC.

## Étapes d'installation

### 1. Télécharger le projet
Clonez ou téléchargez le projet depuis votre dépôt Git :

```bash
git clone https://votre-repository.git
```

### 2. Ajouter le module à Odoo

Déplacez le dossier du module dans le répertoire `addons` de votre installation Odoo :

```bash
/opt/odoo/addons/synda_webrtc_sip_client/
```

Accédez à l'interface d'administration d'Odoo :
1. Allez dans **Applications > Mettre à jour la liste des modules**.
2. Installez le module **WebRTC SIP Client**.

## Configuration du serveur FreePBX

### 1. Configurer FreePBX pour WebRTC et SIP

- **Activer WebRTC dans FreePBX** :
  1. Allez dans **Settings > Asterisk SIP Settings > WebRTC**.
  2. Activez WebRTC et assurez-vous que le port WebSocket est ouvert (par exemple, `5061`).
  3. Activez TLS (Transport Layer Security) pour sécuriser les communications WebRTC.

### 2. Créer des extensions SIP pour WebRTC

1. Allez dans **Applications > Extensions**.
2. Créez des extensions pour vos utilisateurs WebRTC et activez l'option **Allow WebRTC**.

### 3. Configuration du serveur WebSocket

- FreePBX utilise **WebSockets** (`wss://`) pour la communication WebRTC.
- Assurez-vous que le port WebSocket est ouvert sur votre pare-feu (généralement `5061`).

## Configuration d'Odoo

### 1. Configuration des fichiers JavaScript et CSS

- Téléchargez et ajoutez le fichier `JsSIP.js` dans le répertoire `static/src/js/` de votre module Odoo.
- Si vous ne souhaitez pas télécharger JsSIP manuellement, vous pouvez l'inclure via un CDN dans le fichier `webrtc_sip_template.xml`.

### 2. Modifier le fichier `webrtc_client.js`

Dans `webrtc_client.js`, configurez les paramètres SIP (serveur, utilisateur, mot de passe) avec les informations de votre serveur FreePBX :

```javascript
this.sipServer = 'wss://your-asterisk-server.com:5061/ws'; // WebSocket URL de votre serveur FreePBX
this.sipUser = 'user';        // Votre utilisateur SIP
this.sipPassword = 'password'; // Votre mot de passe SIP
```

## Utilisation

### 1. Accéder à l'interface WebRTC dans Odoo

Une fois le module installé et configuré, accédez à l'interface WebRTC via l'interface d'Odoo :
1. Allez sur la page où l'interface WebRTC est intégrée (par exemple, via un menu ou une vue spécifique).

### 2. Enregistrer un client SIP

1. Cliquez sur le bouton **Register SIP** pour enregistrer votre client SIP avec le serveur FreePBX.
2. Le statut sera mis à jour pour indiquer si l'enregistrement a réussi ou échoué.

### 3. Passer un appel

1. Après l'enregistrement, cliquez sur **Make Call** pour initier un appel SIP.
2. Le statut de l'appel sera mis à jour pour indiquer si l'appel est actif ou terminé.

### 4. Terminer l'appel

- Cliquez sur **End Call** pour mettre fin à l'appel en cours.

## Dépannage

### Problèmes d'enregistrement SIP
- Assurez-vous que WebRTC est activé dans FreePBX.
- Vérifiez que les ports WebSocket sont ouverts et que le certificat SSL est valide.

### Problèmes d'appel
- Vérifiez que les codecs audio (par exemple, OPUS, G722) sont activés dans FreePBX.
- Consultez les journaux FreePBX pour détecter des erreurs dans les connexions SIP.

### Problèmes d'interface
- Si l'interface ne s'affiche pas correctement, vérifiez les erreurs dans la console du navigateur pour des problèmes avec JsSIP ou les fichiers JavaScript/CSS.


