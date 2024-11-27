<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebRTC SIP Client pour Odoo via FreePBX - README</title>
</head>
<body>
    <div class="container">
        <h1>WebRTC SIP Client pour Odoo via FreePBX</h1>

        <div class="section">
            <p>
                Ce projet permet l’intégration d’un client WebRTC SIP dans Odoo, en utilisant FreePBX comme serveur SIP backend.
                Le client WebRTC est conçu pour enregistrer des utilisateurs SIP, initier des appels, gérer le transfert d’appels,
                et afficher l’historique des appels.
            </p>
        </div>

        <div class="section">
            <h2>1. Fonctionnalités</h2>
            <ul>
                <li><strong>Enregistrement SIP WebRTC</strong> : Permet aux utilisateurs de s’enregistrer via FreePBX.</li>
                <li><strong>Initiation d’Appels</strong> : Les utilisateurs peuvent passer des appels SIP depuis Odoo.</li>
                <li><strong>Transfert d’Appels</strong> : Transférez des appels actifs vers un autre numéro SIP.</li>
                <li><strong>Historique des Appels</strong> : Affichage des appels passés, avec l’heure, le statut et les participants.</li>
                <li><strong>Interface Moderne</strong> : Construite avec Bootstrap pour une meilleure expérience utilisateur.</li>
            </ul>
        </div>

        <div class="section">
            <h2>2. Dépendances</h2>

            <h3>Sur le Serveur</h3>
            <ul>
                <li><strong>FreePBX</strong> (Version 15+ recommandé) :
                    <ul>
                        <li>WebRTC activé.</li>
                        <li>Extensions SIP correctement configurées.</li>
                        <li>Codecs <code>OPUS</code> et <code>G722</code> activés.</li>
                    </ul>
                </li>
                <li><strong>Odoo</strong> (Version 14+ recommandé) : Serveur Odoo fonctionnel. Module personnalisé placé dans le répertoire <code>addons</code>.</li>
                <li><strong>Python</strong> (pour Odoo) :
                    <ul>
                        <li><code>odoo</code></li>
                        <li><code>psycopg2</code></li>
                        <li><code>pytz</code></li>
                        <li><code>requests</code></li>
                        <li><code>lxml</code></li>
                        <li><code>jinja2</code></li>
                        <li><code>Werkzeug</code></li>
                    </ul>
                </li>
            </ul>

            <h3>Frontend</h3>
            <ul>
                <li><strong>JsSIP</strong> : Bibliothèque JavaScript pour les appels WebRTC/SIP.
                    <ul>
                        <li>Téléchargé depuis <a href="https://github.com/versatica/JsSIP" target="_blank">le dépôt GitHub JsSIP</a> ou via un CDN.</li>
                    </ul>
                </li>
                <li><strong>Bootstrap</strong> : Framework CSS pour l'interface utilisateur.
                    <ul>
                        <li>Chargé via un CDN :
                            <pre><code>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"&gt;</code></pre>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="section">
            <h2>3. Installation</h2>

            <h3>Étape 1 : Configurer FreePBX</h3>
            <ol>
                <li>Activez WebRTC dans FreePBX :
                    <ul>
                        <li>Allez dans *Settings > Asterisk SIP Settings*.</li>
                        <li>Activez WebRTC et TLS.</li>
                        <li>Ajoutez un certificat SSL valide.</li>
                    </ul>
                </li>
                <li>Configurez des extensions SIP dans FreePBX pour permettre les connexions WebRTC.</li>
                <li>Copiez les fichiers de configuration : <code>sip.conf</code>, <code>pjsip.conf</code>, et <code>extensions.conf</code> vers le répertoire <code>/etc/asterisk/</code> et redémarrez Asterisk avec la commande suivante :
                    <pre><code>fwconsole restart</code></pre>
                </li>
            </ol>

            <h3>Étape 2 : Installer le Module Odoo</h3>
            <ol>
                <li>Placez le dossier <code>synda_webrtc_sip_client</code> dans le répertoire <code>addons</code> de votre installation Odoo.</li>
                <li>Vérifiez que le fichier <code>__manifest__.py</code> inclut toutes les dépendances nécessaires.</li>
                <li>Rechargez la liste des modules dans Odoo :
                    <ul>
                        <li>Allez dans *Apps > Mettre à jour la liste*.</li>
                        <li>Recherchez *WebRTC SIP Client* et installez le module.</li>
                    </ul>
                </li>
            </ol>

            <h3>Étape 3 : Démarrer le Serveur</h3>
            <ol>
                <li><strong>Démarrer Odoo</strong> :
                    <pre><code>./odoo-bin -c odoo.conf</code></pre>
                    Accédez à <code>http://localhost:8069</code> ou l'adresse de votre serveur.
                </li>
                <li><strong>Démarrer FreePBX</strong> :
                    <pre><code>fwconsole start</code></pre>
                </li>
            </ol>
        </div>

        <div class="section">
            <h2>4. Utilisation</h2>

            <ol>
                <li><strong>Accéder à l’Interface WebRTC</strong> :
                    <ul>
                        <li>Allez dans le menu d’Odoo où l'interface est intégrée.</li>
                        <li>Vous verrez :
                            <ul>
                                <li>Un bouton pour enregistrer l’utilisateur SIP.</li>
                                <li>Un champ pour initier un appel.</li>
                                <li>Une section pour transférer des appels.</li>
                                <li>Un tableau affichant l’historique des appels.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li><strong>Enregistrer un Utilisateur SIP</strong> :
                    <ul>
                        <li>Cliquez sur le bouton *Register SIP*.</li>
                        <li>Vérifiez le statut dans *sip-status*. S’il affiche *Registered*, l’enregistrement a réussi.</li>
                    </ul>
                </li>
                <li><strong>Faire un Appel</strong> :
                    <ul>
                        <li>Entrez un numéro SIP valide dans *Enter target SIP address*.</li>
                        <li>Cliquez sur *Make Call*. Le statut de l’appel changera en fonction de son état.</li>
                    </ul>
                </li>
                <li><strong>Transférer un Appel</strong> :
                    <ul>
                        <li>Pendant un appel actif, entrez un numéro SIP dans *Enter transfer target SIP address*.</li>
                        <li>Cliquez sur *Transfer Call*. L’appel sera transféré au destinataire.</li>
                    </ul>
                </li>
                <li><strong>Vérifier l’Historique des Appels</strong> :
                    <ul>
                        <li>Consultez le tableau sous la section *Call History* pour voir les appels passés.</li>
                    </ul>
                </li>
            </ol>
        </div>

        <div class="section">
            <h2>5. Débogage</h2>

            <h3>Problèmes d’Enregistrement SIP</h3>
            <ul>
                <li>Vérifiez les logs FreePBX dans *Reports > Asterisk Logfiles*.</li>
                <li>Assurez-vous que les informations de connexion SIP (nom d’utilisateur et mot de passe) sont correctes.</li>
            </ul>

            <h3>Problèmes de Connexion WebRTC</h3>
            <ul>
                <li>Vérifiez que le port WebSocket (5061 par défaut) est ouvert.</li>
                <li>Testez avec les outils de développement du navigateur (Inspecter > Console) pour détecter les erreurs JavaScript.</li>
            </ul>

            <h3>Problèmes de Démarrage du Module Odoo</h3>
            <ul>
                <li>Assurez-vous que le module est bien activé dans Odoo.</li>
                <li>Vérifiez les permissions sur les fichiers et les répertoires.</li>
            </ul>
        </div>

        <div class="section">
            <h2>6. Améliorations Futures</h2>
            <ul>
                <li>Ajouter des fonctionnalités comme :
                    <ul>
                        <li>Gestion des appels vidéo.</li>
                        <li>Intégration CRM avec journalisation des appels.</li>
                        <li>Notifications en temps réel pour les appels entrants.</li>
                    </ul>
                </li>
                <li>Polir l’interface utilisateur avec des animations et des améliorations visuelles.</li>
            </ul>
        </div>

        <div class="section">
            <p>Si vous avez des questions ou des problèmes, n'hésitez pas à demander de l'aide ! 🎉</p>
        </div>
    </div>
</body>
</html>
