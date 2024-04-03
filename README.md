## Navigation dans le front end (Description à titre informatif, pas vraiment utile en soit pour le projet de POA)

Le front-end se trouve dans le dossier fr-administration-front de ce dépôt.

Pour le développement du Front-End, cela est fait avec Angular. 
Les langages utilisés TypeScript, HTML, et CSS afin de gérer les connexions, l’affichage de texte, l’affichage des boutons, et l’esthétique du site web. 

Le site est disponible à l’adresse suivante (une fois que le back-end et le front-end sont lancés) :
http://localhost:4200

Cette adresse amène directement sur la page de connexion :
http://localhost:4200/login
Il est ainsi possible de se connecter avec l’identifiant 1 et le mot de passe password.

Si la connexion est validée, on arrive sur la page suivante :
http://localhost:4200/users 
Une barre de navigation située en haut de la page permet d’effectuer les actions suivantes:
- utilisateurs
- associations, qui permet de créer une nouvelle association, ou de visualiser (disponible également depuis l’adresse http://localhost:4200/associations)
- déconnexion, si l’on clique dessus, cela nous ramène directement sur la page d’accueil (http://localhost:4200/login) 

Sur la fin de la barre de navigation, nous avons une icône permettant d’effectuer des recherches (disponible à l’adresse http://localhost:4200/search)
Sur ce lien, on peut retrouver à la fois la liste des utilisateurs et la liste des associations.

Nous pouvons également créer un nouvel utilisateur depuis le lien http://localhost:4200/signin.
Ce lien amène directement sur un formulaire qui demande le nom, le prénom et l'âge de la personne.
Une fois l'utilisateur créé, il est directement ajouté à la liste des utilisateurs.

Pour obtenir les informations sur un utilisateur, il faut se rendre à l'adresse suivante:
http://localhost:4200/user/id
avec id étant le numéro d'identifiant de l'utilisateur.

## Architecture

Pour l'architecture, on a les composants suivants :
- association, pour gérer les informations
- association-form, pour créer une association
- association-list, pour afficher la liste des associations
- guards, pour la sécurité de l'accès aux données
- login, pour la page d'accueil de connexion
- nav, pour la barre de navigation située en haut de notre page
- search, pour effectuer des recherches sur des utilisateurs ou des associations
- signin, pour créer un nouvel utilisateur
- user, pour accéder aux informations de l'utilisateur
- user-list, pour accéder à la liste des utilisateurs

Ici fr-administration est équivalent au backend.
