<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bibliothèques à Installer pour le Projet</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #333;
        }
        pre {
            background: #f4f4f4;
            padding: 1em;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        code {
            background: #f4f4f4;
            padding: 0.2em;
            border-radius: 3px;
        }
        .section {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <h1>Bibliothèques à Installer pour le Projet</h1>
    <p>Voici les bibliothèques et outils nécessaires pour faire fonctionner ce projet, à la fois pour l'intégration côté <strong>Odoo</strong>, et pour l'<strong>intégration WebRTC</strong> avec <strong>FreePBX</strong>.</p>
    <div class="section">
        <h2>1. Dépendances pour Odoo (Backend)</h2>
        <h3>Python (Odoo)</h3>
        <p>Assurez-vous que vous avez installé toutes les dépendances nécessaires pour Odoo. Dans le répertoire du projet Odoo, créez un fichier <code>requirements.txt</code> (si ce n'est pas déjà fait) avec les dépendances suivantes :</p>
        <h4><code>requirements.txt</code> pour Odoo :</h4>
        <pre><code>odoo
psycopg2
pytz
requests
lxml
jinja2
Werkzeug</code></pre>
        <p><strong>Instructions d’installation</strong> :</p>
        <ol>
            <li>Installez les dépendances avec <code>pip</code> :</li>
            <pre><code>pip install -r requirements.txt</code></pre>
        </ol>
    </div>
    <div class="section">
        <h2>2. Dépendances pour la partie Frontend (WebRTC)</h2>
        <h3>JsSIP (WebRTC JavaScript Library)</h3>
        <p><strong>JsSIP</strong> est une bibliothèque JavaScript permettant de créer des clients SIP qui utilisent WebRTC. Elle est utilisée pour gérer les appels SIP côté client via un navigateur.</p>
        <h3>Installation de JsSIP :</h3>
        <ol>
            <li>Téléchargez la bibliothèque <strong>JsSIP</strong> :
                <ul>
                    <li><strong>Option 1</strong> : Téléchargez directement depuis <a href="https://github.com/versatica/JsSIP">le dépôt GitHub JsSIP</a>.</li>
                    <li><strong>Option 2</strong> : Utilisez un CDN pour inclure la bibliothèque dans votre projet.</li>
                </ul>
            </li>
            <pre><code>&lt;script src="https://cdn.jsdelivr.net/npm/jssip@3.1.2/dist/JsSIP.js"&gt;&lt;/script&gt;</code></pre>
            <li>Ajout à votre projet :
                <ul>
                    <li>Placez le fichier <code>JsSIP.js</code> dans le répertoire <code>static/src/js/</code> de votre module Odoo, ou utilisez le CDN si vous préférez.</li>
                </ul>
            </li>
            <li>Intégration dans le Module Odoo :
                <pre><code>'assets': {
    'web.assets_frontend': [
        'synda_webrtc_sip_client/static/src/js/JsSIP.js',
        'synda_webrtc_sip_client/static/src/js/webrtc_client.js'
    ],
}</code></pre>
            </li>
        </ol>
    </div>
    <div class="section">
        <h2>3. Dépendances pour FreePBX (Backend)</h2>
        <p>FreePBX utilise Asterisk comme serveur SIP. Pour activer WebRTC, il n'y a pas de dépendances spécifiques à installer pour FreePBX, mais vous devez configurer correctement <strong>WebRTC</strong> dans Asterisk et FreePBX.</p>
        <h3>Étapes à Suivre :</h3>
        <ol>
            <li>Assurez-vous que WebRTC est activé dans FreePBX :
                <ul>
                    <li>Dans FreePBX, allez dans <em>Settings &gt; Asterisk SIP Settings</em> et activez le support WebRTC.</li>
                    <li>Activez TLS (Transport Layer Security) et assurez-vous que le port WebSocket (par défaut 5061) est ouvert.</li>
                </ul>
            </li>
            <li>Configurer les Extensions SIP dans FreePBX pour permettre les connexions WebRTC.</li>
        </ol>
        <h4>Codecs à Activer :</h4>
        <ul>
            <li><strong>OPUS</strong> : Un codec audio adapté à WebRTC.</li>
            <li><strong>G722</strong> : Codec audio de haute qualité, souvent utilisé avec WebRTC.</li>
        </ul>
    </div>
    <div class="section">
        <h2>4. Autres Dépendances Potentielles</h3>
        <h3>1. WebSocket (pour la communication WebRTC)</h3>
        <p>Le serveur FreePBX doit être configuré pour utiliser WebSockets pour les connexions WebRTC. Cela ne nécessite pas de dépendance supplémentaire, mais vous devez vous assurer que le port WebSocket est ouvert et correctement configuré dans FreePBX.</p>
        <h3>2. WebRTC Debugging Tools</h3>
        <p>Lorsque vous travaillez avec WebRTC, il est très utile d'utiliser les outils de développement du navigateur pour déboguer les appels et la connexion. Ces outils vous permettent de :</p>
        <ul>
            <li>Vérifier les erreurs JavaScript.</li>
            <li>Suivre les connexions WebRTC et SIP.</li>
            <li>Surveiller les requêtes WebSocket.</li>
        </ul>
        <h4>Outils recommandés :</h4>
        <ul>
            <li><strong>Chrome DevTools</strong> : Utilisez l'onglet <em>Network</em> et <em>Console</em> pour déboguer.</li>
            <li><strong>Wireshark</strong> : Utilisez-le pour analyser le trafic SIP et WebRTC.</li>
            <li><strong>Asterisk CLI</strong> : Si nécessaire, consultez les logs Asterisk pour vérifier la configuration SIP.</li>
        </ul>
    </div>
    <div class="section">
        <h2>Résumé des Bibliothèques à Installer</h2>
        <ul>
            <li><strong>Backend Odoo (Python)</strong> : 
                <ul>
                    <li><code>odoo</code></li>
                    <li><code>psycopg2</code> (pour la connexion à PostgreSQL)</li>
                    <li><code>pytz</code>, <code>requests</code>, <code>lxml</code>, <code>jinja2</code>, <code>Werkzeug</code></li>
                </ul>
            </li>
            <li><strong>Frontend (JavaScript)</strong> : 
                <ul>
                    <li><strong>JsSIP</strong> : Bibliothèque pour la gestion de SIP/WebRTC.</li>
                    <li><strong>Bootstrap</strong> (facultatif pour l'UI) : Peut être utilisé pour améliorer l'interface.</li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="section">
        <h2>5. Démarrage du Projet</h2>
        <h3>Étapes pour Démarrer :</h3>
        <ol>
            <li>Configurer FreePBX :
                <ul>
                    <li>Activez WebRTC et configurez les extensions SIP.</li>
                </ul>
            </li>
            <li>Installer les dépendances Odoo :
                <ul>
                    <li>Créez un environnement virtuel Python.</li>
                    <li>Installez les dépendances avec <code>pip install -r requirements.txt</code>.</li>
                </ul>
            </li>
            <li>Lancer Odoo :
                <ul>
                    <li>Démarrez Odoo avec la commande suivante :
                        <pre><code>./odoo-bin -c odoo.conf</code></pre>
                    </li>
                    <li>Accédez à l'interface Odoo via <code>http://localhost:8069</code> ou l'adresse de votre serveur.</li>
                </ul>
            </li>
            <li>Configurer et tester WebRTC :
                <ul>
                    <li>O[_{{{CITATION{{{_1{](https://github.com/NicoLarson/exercice_php/tree/751d31e78d5fbfe9852f5be20c6ce41a955051d7/readme.md)[_{{{CITATION{{{_2{](https://github.com/js202005082300/Aide-m-moires/tree/c85c562d508c68fa086972462338ed773a25c8ac/JavaScript%2Fcours%2F002_hello_world%2Fnote.md)
                                    <ul>
                    <li>Ouvrez la page où le client WebRTC est intégré et testez l'enregistrement SIP et la fonction d'appel.</li>
                </ul>
            </li>
        </ol>
    </div>
</body>
</html>
