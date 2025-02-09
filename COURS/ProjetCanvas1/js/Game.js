import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import Sortie from "./Sortie.js";
import ObjetSouris from "./ObjetSouris.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";
export default class Game {
    objetsGraphiques = [];

    levelIndex = 0;

    levels = [
        { 
            playerStart: { x: 100, y: 100 },
            obstacles: [
                { x: 200, y: 200, w: 600, h: 20, color: "orange" },
                { x: 300, y: 220, w: 20, h: 350, color: "red" },
                { x: 550, y: 500, w: 20, h: 300, color: "yellow" }
            ],
            sortie: { x: 700, y: 500, w: 50, h: 50, color: "green" }
        },
        { 
            playerStart: { x: 100, y: 100 }, 
            obstacles: [
                { x: 200, y: 50, w: 20, h: 400, color: "purple" },
                { x: 400, y: 450, w: 20, h: 400, color: "purple" },
                { x: 600, y: 200, w: 20, h: 400, color: "brown" }
            ],
            sortie: { x: 750, y: 400, w: 50, h: 50, color: "green" }
        },
        { 
            playerStart: { x: 100, y: 100 }, 
            obstacles: [
                { x: 300, y: 0, w: 40, h: 600, color: "red" },
                { x: 480, y: 500, w: 200, h: 100, color: "blue" }
            ],
            sortie: { x: 700, y: 100, w: 50, h: 50, color: "green" }
        },
        { 
            playerStart: { x: 100, y: 100 }, //a refaire
            obstacles: [
                { x: 100, y: 450, w: 150, h: 20, color: "cyan" },
                { x: 250, y: 250, w: 20, h: 150, color: "blue" },
                { x: 400, y: 400, w: 100, h: 20, color: "magenta" },
                { x: 550, y: 150, w: 20, h: 200, color: "black" },
                { x: 650, y: 300, w: 120, h: 20, color: "brown" }
            ],
            sortie: { x: 750, y: 550, w: 50, h: 50, color: "green" }
        },
        { 
            playerStart: { x: 100, y: 100 },  //a refaire
            obstacles: [
                { x: 250, y: 250, w: 600, h: 100, color: "purple" },
                { x: 0, y: 250, w: 120, h: 30, color: "brown" }
            ],
            sortie: { x: 750, y: 400, w: 50, h: 50, color: "green" }
        },
        {
            playerStart: { x: 100, y: 100 }, 
            obstacles: [
                { x: 150, y: 0, w: 20, h: 500, color: "gray" },
                { x: 300, y: 200, w: 20, h: 500, color: "black" },
                { x: 450, y: 100, w: 20, h: 500, color: "red" },
                { x: 600, y: 0, w: 20, h: 500, color: "blue" }
            ],
            sortie: { x: 700, y: 50, w: 50, h: 50, color: "green" }
        },
        { 
            playerStart: { x: 100, y: 100 },  
            obstacles: [
                //le W
                { x: 200, y: 300, w: 20, h: 100, color: "green" },
                { x: 250, y: 300, w: 20, h: 100, color: "green" },
                { x: 300, y: 300, w: 20, h: 100, color: "green" },
                { x: 200, y: 400, w: 120, h: 20, color: "green" },
                //Le I
                { x: 350, y: 300, w: 20, h: 120, color: "green" },
                //le N
                { x: 400, y: 300, w: 20, h: 120, color: "green" },
                { x: 420, y: 340, w: 20, h: 40, color: "green" },
                { x: 440, y: 360, w: 20, h: 40, color: "green" },
                { x: 460, y: 300, w: 20, h: 120, color: "green" },
            ],
            //sortie: { x: 330, y: 230, w: 50, h: 50, color: "green" }
            sortie: { x: 330, y: 230, w: 50, h: 50, color: "green" }
        }
        
    ];

    constructor(canvas) {
        this.canvas = canvas;
        // etat du clavier
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
    }

    async init(canvas) {
        this.ctx = this.canvas.getContext("2d");

        // Charger le premier niveau
        this.loadLevel(this.levelIndex);
        /*
        this.player = new Player(100, 100);
        this.objetsGraphiques.push(this.player);

        // Un objert qui suite la souris, juste pour tester
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "orange");
        this.objetsGraphiques.push(this.objetSouris);


        // On cree deux obstacles
        let obstacle1 = new Obstacle(300, 0, 40, 600, "red");
        this.objetsGraphiques.push(obstacle1);
        let obstacle2 = new Obstacle(500, 500, 100, 100, "blue");
        this.objetsGraphiques.push(obstacle2);

        // On ajoute la sortie
        // TODO
        //let sortie = new Obstacle(700, 100, 50, 50, "green");
        let sortie = new Sortie(700, 100, 50, 50, "green");
        this.objetsGraphiques.push(sortie);
        // On initialise les écouteurs de touches, souris, etc.

        */
        initListeners(this.inputStates, this.canvas);

        console.log("Game initialisé");
    }

    loadLevel(levelIndex) {
        this.objetsGraphiques = [];

        let level = this.levels[levelIndex];

        // Créer le joueur
        this.player = new Player(level.playerStart.x, level.playerStart.y);
        this.objetsGraphiques.push(this.player);

        // Objets qui suivent la souris (optionnel)
        this.objetSouris = new ObjetSouris(200, 200, 25, 25, "orange");
        this.objetsGraphiques.push(this.objetSouris);

        // Ajouter les obstacles
        level.obstacles.forEach(obs => {
            let obstacle = new Obstacle(obs.x, obs.y, obs.w, obs.h, obs.color);
            this.objetsGraphiques.push(obstacle);
        });

        // Ajouter la sortie
        let sortie = new Sortie(level.sortie.x, level.sortie.y, level.sortie.w, level.sortie.h, level.sortie.color);
        this.objetsGraphiques.push(sortie);
    }


    start() {
        console.log("Game démarré");

        // On démarre une animation à 60 images par seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        // 1 - on efface le canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 2 - on dessine les objets à animer dans le jeu
        // ici on dessine le monstre
        this.drawAllObjects();

        // 3 - On regarde l'état du clavier, manette, souris et on met à jour
        // l'état des objets du jeu en conséquence
        this.update();

        // 4 - on demande au navigateur d'appeler la fonction mainAnimationLoop
        // à nouveau dans 1/60 de seconde
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {
        // Appelée par mainAnimationLoop
        // donc tous les 1/60 de seconde
        
        // Déplacement du joueur. 
        this.movePlayer();

        // on met à jouer la position de objetSouris avec la position de la souris
        // Pour un objet qui "suit" la souris mais avec un temps de retard, voir l'exemple
        // du projet "charQuiTire" dans le dossier COURS
        this.objetSouris.x = this.inputStates.mouseX;
        this.objetSouris.y = this.inputStates.mouseY;

        // On regarde si le joueur a atteint la sortie
        // TODO

    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;
        
        if(this.inputStates.ArrowRight) {
            this.player.vitesseX = 2;
        } 
        if(this.inputStates.ArrowLeft) {
            this.player.vitesseX = -2;
        } 

        if(this.inputStates.ArrowUp) {
            this.player.vitesseY = -2;
        } 

        if(this.inputStates.ArrowDown) {
            this.player.vitesseY = 2;
        } 

        this.player.move();

        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        // Teste collision avec les bords du canvas
        this.testCollisionPlayerBordsEcran();

        // Teste collision avec les obstacles
        this.testCollisionPlayerObstacles();

        // Teste collision avec la sortie
        this.testCollisionPlayerSortie();
       
    }

    testCollisionPlayerBordsEcran() {
        // Raoppel : le x, y du joueur est en son centre, pas dans le coin en haut à gauche!
        if(this.player.x - this.player.w/2 < 0) {
            // On stoppe le joueur
            this.player.vitesseX = 0;
            // on le remet au point de contaxct
            this.player.x = this.player.w/2;
        }
        if(this.player.x + this.player.w/2 > this.canvas.width) {
            this.player.vitesseX = 0;
            // on le remet au point de contact
            this.player.x = this.canvas.width - this.player.w/2;
        }

        if(this.player.y - this.player.h/2 < 0) {
            this.player.y = this.player.h/2;
            this.player.vitesseY = 0;

        }
       
        if(this.player.y + this.player.h/2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h/2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Obstacle) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision

                    // ICI TEST BASIQUE QUI ARRETE LE JOUEUR EN CAS DE COLLIION.
                    // SI ON VOULAIT FAIRE MIEUX, ON POURRAIT PAR EXEMPLE REGARDER OU EST LE JOUEUR
                    // PAR RAPPORT A L'obstacle courant : il est à droite si son x est plus grand que le x de l'obstacle + la largeur de l'obstacle
                    // il est à gauche si son x + sa largeur est plus petit que le x de l'obstacle
                    // etc.
                    // Dans ce cas on pourrait savoir comment le joueur est entré en collision avec l'obstacle et réagir en conséquence
                    // par exemple en le repoussant dans la direction opposée à celle de l'obstacle...
                    // Là par défaut on le renvoie en x=10 y=10 et on l'arrête
                    console.log("Collision avec obstacle");
                    this.player.x = 10;
                    this.player.y = 10;
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                }
            }
        });
    }

    testCollisionPlayerSortie() {
        this.objetsGraphiques.forEach(obj => {
            if(obj instanceof Sortie) {
                if(rectsOverlap(this.player.x-this.player.w/2, this.player.y - this.player.h/2, this.player.w, this.player.h, obj.x, obj.y, obj.w, obj.h)) {
                    // collision avec la sortie
                    console.log("Collision avec la sortie");
                    // PASSER AU NIVEAU SUIVANT
                    
                    this.levelIndex++;

                    if (this.levelIndex < this.levels.length) {
                        this.loadLevel(this.levelIndex); // Charger le niveau suivant
                    } else {
                        console.log("FINI !!!");
                    }

                }
            }
        });
    }



}