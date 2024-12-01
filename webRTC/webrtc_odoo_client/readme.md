Pour exécuter votre projet d'intégration WebRTC SIP dans Odoo, suivez ces étapes :

### 1. Assurez-vous d'avoir les prérequis
- Une instance d'Odoo installée et configurée.
- Un serveur FreePBX ou Asterisk opérationnel pour gérer les connexions SIP/WebRTC.
- Les bibliothèques nécessaires pour la gestion SIP/WebRTC comme JsSIP.
- Certificat SSL pour le serveur WebSocket sécurisé (WSS).

### 2. Installer le module Odoo
1. **Téléchargez et placez le module dans le répertoire des addons d'Odoo :**
   - Copiez le répertoire `webrtc_odoo_client` dans le répertoire `addons` d'Odoo.

2. **Mettre à jour la liste des modules :**
   - Connectez-vous à l'interface d'administration d'Odoo.
   - Allez dans **Apps** (Applications) et cliquez sur **Update Apps List** (Mettre à jour la liste des applications).

3. **Installez le module :**
   - Recherchez `WebRTC SIP Integration` dans la liste des applications et cliquez sur **Install** (Installer).

### 3. Configurer Odoo et FreePBX
1. **Configurer les paramètres SIP dans Odoo :**
   - Allez dans **Settings** (Paramètres) → **Technical** (Technique) → **Parameters** (Paramètres) → **System Parameters** (Paramètres du système).
   - Ajoutez les paramètres suivants :
     - `webrtc.sip_domain` : Le domaine SIP (par exemple, `your_domain.com`).
     - `webrtc.ws_url` : L'URL WebSocket sécurisée (par exemple, `wss://your_domain:8089/ws`).

2. **Configurer FreePBX/Asterisk pour gérer les connexions WebSocket :**
   - Suivez les instructions fournies précédemment pour activer et configurer les connexions WebSocket sécurisées.

### 4. Exécuter le projet
1. **Démarrez votre serveur Odoo :**
   ```bash
   ./odoo-bin -c /path/to/your/odoo.conf
   ```

2. **Utilisez l'interface utilisateur WebRTC dans Odoo :**
   - Connectez-vous à Odoo en tant qu'utilisateur et allez dans la section WebRTC.
   - Utilisez les fonctionnalités de gestion des appels pour passer des appels SIP via WebRTC.

### 5. Tests et validation
1. **Tester les appels :**
   - Initiez des appels depuis l'interface utilisateur WebRTC d'Odoo pour vérifier que les connexions SIP fonctionnent correctement.
   - Assurez-vous que les appels sont enregistrés dans l'historique des appels et que les statuts SIP sont mis à jour correctement.

2. **Debugging :**
   - Consultez les journaux Odoo et FreePBX/Asterisk pour détecter et résoudre les problèmes éventuels.
