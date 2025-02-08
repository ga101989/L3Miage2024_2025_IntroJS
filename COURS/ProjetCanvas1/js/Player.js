import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";   

export default class Player extends ObjectGraphique {
    constructor(x, y) {
        super(x, y, 100, 100);
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.couleur = "pink";
        this.angle = 0;
    }

    draw(ctx) {
        // Ici on dessine un monstre
        ctx.save();

        // on déplace le systeme de coordonnées pour placer
        // le monstre en x, y.Tous les ordres de dessin
        // dans cette fonction seront par rapport à ce repère
        // translaté
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // on recentre le monstre. Par défaut le centre de rotation est dans le coin en haut à gauche
        // du rectangle, on décale de la demi largeur et de la demi hauteur pour 
        // que le centre de rotation soit au centre du rectangle.
        // Les coordonnées x, y du monstre sont donc au centre du rectangle....
        ctx.translate(-this.w / 2, -this.h / 2);
        //this.ctx.scale(0.5, 0.5);

        // tete du monstre
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, this.w, this.h);

        //cicatrice sur la tete
        ctx.translate(10, -10);

        //rotate
        ctx.rotate(0.3);
        ctx.fillStyle = "green";
        ctx.fillRect(30, 10, 40, 2);
        ctx.fillRect(35, 7, 2, 7);
        ctx.fillRect(40, 7, 2, 7);
        ctx.fillRect(45, 7, 2, 7);
        ctx.fillRect(50, 7, 2, 7);
        ctx.fillRect(55, 7, 2, 7);
        ctx.fillRect(60, 7, 2, 7);
        ctx.fillRect(65, 7, 2, 7);
        ctx.rotate(-0.3);
        ctx.translate(-10, 10);
        

        // yeux
        drawCircleImmediat(ctx, 30, 40, 10, "beige");
        drawCircleImmediat(ctx, 70, 40, 10, "beige");
        drawCircleImmediat(ctx, 30, 40, 5, "red");
        drawCircleImmediat(ctx, 70, 40, 5, "red");


        // bouche
        ctx.fillStyle = "red";
        ctx.fillRect(30, 70, 40, 10);
        ctx.fillStyle = "white";
        ctx.fillRect(30, 70, 40, 5);
        //sang qui coule
        ctx.fillStyle = "red";
        ctx.fillRect(30, 70, 2, 23);
        ctx.fillRect(68, 70, 2, 20);

        //drawCircleImmediat(ctx, 20, 20, 10, "red");
        //drawCircleImmediat(ctx, 60, 20, 10, "red");

        // Les bras
        //ctx.translate(-50, 50);
        //ctx.translate(-30, 40);
       // ctx.fillStyle = "grey";
       // ctx.fillRect(-25, 0, 75, 15);
       // drawCircleImmediat(ctx,-32, 5, 15, "red");
       // drawCircleImmediat(ctx, -30, 5, 15, "black");
       // ctx.translate(30, -30);

        // Les jambes
        ctx.translate(-50, 100);
        ctx.fillStyle = "black";
        ctx.fillRect(35, 20, 40, 15);
        ctx.translate(0, 0);
        ctx.fillStyle = "grey";
        ctx.fillRect(50, 0, 20, 20);
        ctx.translate(50, -100);


        //jambe droite
        ctx.translate(50, 100);
        ctx.fillStyle = "black";
        ctx.fillRect(25, 20, 40, 15);
        ctx.translate(0, 0);
        ctx.fillStyle = "grey";
        ctx.fillRect(30, 0, 20, 20);
        ctx.translate(-50, -100);

        // Une crète
        ctx.fillStyle = "black";
        ctx.fillRect(0, -20, 100, 20);
        ctx.fillRect(40, -40, 20, 30);

        // Les oreilles
        ctx.fillStyle = "grey";
        ctx.fillRect(-5, 10, 5, 20);
        ctx.fillRect(100, 10, 5, 20);

        // restore
        ctx.restore();

        // super.draw() dessine une croix à la position x, y
        // pour debug
        super.draw(ctx);
    }


    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}