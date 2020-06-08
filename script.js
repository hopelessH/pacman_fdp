/*
 * contrato: make <estructura> ---> <estructura>
 * porpuse: recibe un mundo y una estructura o atributo a cambiar en el mundo 
 * a la vez mantiene el universo
 */
function make(data, attribute) {
  return Object.assign({}, data, attribute);
}

var music_start = new Audio("sounds/pacman.mp3")
var waka = new Audio("sounds/Chomp.mp3");
var death = new Audio("sounds/Death.mp3")
var eat_fruit = new Audio("sounds/pacman_eatfruit.wav")
let pacmanL = null      // Pacman con la boca hacia la izquierda
let pacmanR = null      // Pacman con la boca hacia la derecha
let pacmanU = null      // Pacman con la boca hacia arriba
let pacmanD = null      // pacman con la boca hacia abajo
let pacmanC = null      // Pacman con la boca cerrada
let fantPink = null     // Fantasma Rosado
let fantOran = null     // Fantasma Naranja
let fantAzul = null     // Fantasma Azul
let fantRed = null      // Fantasma Rojo
let cereza = null;      // Cerezas
const WIDTH = 450;
const HEIGHT = 450;
const BSIZE = 21.5;
const MAPA = [
  
  //[0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,99 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], // 0
  [2, 4, 7, 3, 3, 3, 3, 3, 5, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], // 1
  [2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 10, 2, 2, 2, 3, 2], // 2
  [2, 3, 3, 3, 3, 3, 3, 3, 5, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], // 3
  [2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2], // 4
  [2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2], // 5
  [2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2], // 6
  [2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 2, 2], // 7
  [2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 3, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2], // 8
  [3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 12], // 9
  [2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2], // 10
  [2, 2, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 2, 2], // 11
  [2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2], // 12
  [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], // 13
  [2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2], // 14
  [2, 3, 9, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2], // 15
  [2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2], // 16
  [2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 2, 3, 3, 3, 3, 14, 2], // 17
  [2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2], // 18
  [2, 3, 6, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 3, 3, 3, 3, 3, 3, 2], // 19
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]  // 20
// 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20
]
/**
 * contrato:<forEach> <list>(<><num><num> --> ?)<index> -- > <?>
 * proposito: leer un mapa (lista de listas) y pintarlo en el canvas
 */
function forEach(list, fun, index = 0) {
  if (!isEmpty(list)) {
    fun(first(list), index)
    forEach(rest(list), fun, index + 1)
  }
}

/**
 * 
 */
function sketchProc(processing) {

  /**
   * 
   */
  processing.setup = function () {
    music_start.play()
    music_start.volume = 0.3
    processing.frameRate(5); // fps
    processing.size(WIDTH, HEIGHT);
    cereza = processing.loadImage("imag/cherry.png")
    fantAzul = processing.loadImage("imag/blue.png")
    fantPink = processing.loadImage("imag/pink.png")
    fantOran = processing.loadImage("imag/orange.png")
    fantRed = processing.loadImage("imag/red.png")
    pacmanL = processing.loadImage("imag/pacmanLEFT.png")
    pacmanR = processing.loadImage("imag/pacmanRIGTH.png")
    pacmanU = processing.loadImage("imag/pacmanUP.png")
    pacmanD = processing.loadImage("imag/pacmanDOWN.png")
    pacmanC = processing.loadImage("imag/pacmanC.png")
    processing.state = {
      time: 0,
      pacman: {
        x: 10,
        y: 9,
        d: "LEFT"
      },
      score: 0,
      cookies: [
        { x: 4, y: 5 },
        { x: 3, y: 5 },
      ],
      dir:
        { x: 0, y: 0 },
      fantasP:{
        x: 2,
        y: 1  
      },
      fantasO:{
        x: 2,
        y: 19
      },
      fantasA:{
        x: 8,
        y: 1
      },
      fantasR:{
        x: 19,
        y: 17
      },
      cereza1:{ // 4
        x: 1,
        y: 1
      },
      cereza2:{ // 9
        x: 2,
        y: 15
      },
      cereza3:{ // 10
        x: 15,
        y: 2
      },
      cereza4:{ // 11
        x: 13,
        y: 19
      },
      cereza5:{ // 12
        x: 20,
        y: 9
      },
      canCereza: 0
    }
    /*score:{
      x:0,
      y:0
    }*/
  }

  processing.drawGame = function (world) {
    processing.background(0, 0, 0)
    forEach(MAPA, (fila, i) => {
      forEach(fila, (block, j) => {
        //score
        /*if(block==99){
          processing.text("SCORE",10,30);
        }*/
        // paredes
        if (block == 2) {
          processing.fill(0, 0, 255); // color de las paredes
          processing.rect(j * BSIZE, i * BSIZE, BSIZE, BSIZE, 20); // forma de las paredes
        }
        // mini galletas
        if (block == 3 && world.time % 2 == 1) {
          processing.fill(54, 229, 196); // color de las mini galletas
          processing.ellipse(j * BSIZE + BSIZE / 2, i * BSIZE + BSIZE / 2, BSIZE / 3, BSIZE / 3); // forma de las mini galletas
        } else {
          if (block == 3 && world.time % 2 == 0) {
            processing.fill(255, 255, 255); // cambia el color de las mini galletas
            processing.ellipse(j * BSIZE + BSIZE / 2, i * BSIZE + BSIZE / 2, BSIZE / 3, BSIZE / 3);
            // forma de las minigalletas
          }
        }
        // pacman
        if (block == 1) {
          processing.fill(255, 255, 0); // color pacman
          if (world.time % 2 == 0) { // boca abierta
            if (world.pacman.d == "LEFT") { // boca abierta hacia la izquierda
              processing.image(pacmanL, (world.pacman.x - 0.4) * BSIZE + BSIZE / 2,
                (world.pacman.y - 0.5) * BSIZE + BSIZE / 2, BSIZE - 1, BSIZE - 1);
            }
            else if (world.pacman.d == "RIGHT") { // boca abierta hacia la derecha
              processing.image(pacmanR, (world.pacman.x - 0.4) * BSIZE + BSIZE / 2,
                (world.pacman.y - 0.5) * BSIZE + BSIZE / 2, BSIZE - 1, BSIZE - 1);
            }
            else if (world.pacman.d == "UP") { // boca abierta hacia arriba
              processing.image(pacmanU, (world.pacman.x - 0.4) * BSIZE + BSIZE / 2,
                (world.pacman.y - 0.5) * BSIZE + BSIZE / 2, BSIZE - 1, BSIZE - 1);
            }
            else if (world.pacman.d == "DOWN") { // boca abierta hacia abajo
              processing.image(pacmanD, (world.pacman.x - 0.4) * BSIZE + BSIZE / 2,
                (world.pacman.y - 0.5) * BSIZE + BSIZE / 2, BSIZE - 1, BSIZE - 1);
            }
          }
          else { // boca cerrado
            processing.image(pacmanC, (world.pacman.x - 0.4) * BSIZE + BSIZE / 2,
              (world.pacman.y - 0.5) * BSIZE + BSIZE / 2, BSIZE-1, BSIZE-1);
          }
        }
        // cerezas
        if( block == 4 ){
          if( world.time % 2 == 0 ){ // animacion de la cereza
            processing.image(cereza, ( world.cereza1.x + 0.1 )*BSIZE, ( world.cereza1.y - 0.2 )*BSIZE, BSIZE-2, BSIZE-2 ); // sube
          }else{
            processing.image( cereza, ( world.cereza1.x + 0.1 )*BSIZE, ( world.cereza1.y + 0.02 )*BSIZE, BSIZE-2, BSIZE-2 ); // baja
          }
        }
        if( block == 9 ){
          if( world.time % 2 == 0 ){ // animacion de la cereza
            processing.image(cereza, ( world.cereza2.x + 0.1 )*BSIZE, ( world.cereza2.y - 0.2 )*BSIZE, BSIZE-2, BSIZE-2 ); // sube
          }else{
            processing.image( cereza, ( world.cereza2.x + 0.1 )*BSIZE, ( world.cereza2.y + 0.02 )*BSIZE, BSIZE-2,  BSIZE-2 ); // baja
          }
        }
        if( block == 10 ){
          if( world.time % 2 == 0 ){ // animacion de la cereza
            processing.image(cereza,  ( world.cereza3.x + 0.1 )*BSIZE, ( world.cereza3.y - 0.2 )*BSIZE, BSIZE-2, BSIZE-2  ); // sube
          }else{
            processing.image(cereza, ( world.cereza3.x + 0.1 )*BSIZE, ( world.cereza3.y + 0.02 )*BSIZE, BSIZE-2, BSIZE-2 
            ); // baja
          }
        }
        if( block == 11 ){
          if( world.time % 2 == 0 ){ // animacion de la cereza
            processing.image( cereza, ( world.cereza4.x + 0.1 )*BSIZE, ( world.cereza4.y - 0.2 )*BSIZE, BSIZE-2, BSIZE-2 ); // sube
          }else{
            processing.image(cereza, ( world.cereza4.x + 0.1 )*BSIZE, ( world.cereza4.y + 0.02 )*BSIZE, BSIZE-2, BSIZE-2 ); // baja
          }
        }
        if( block == 12 ){
          if( world.time % 2 == 0 ){ // animacion de la cereza
            processing.image(cereza, ( world.cereza5.x + 0.1 )*BSIZE, ( world.cereza5.y - 0.2 )*BSIZE, BSIZE-2, BSIZE-2 ); // sube
          }else{
            processing.image(cereza, ( world.cereza5.x + 0.1 )*BSIZE, ( world.cereza5.y + 0.02 )*BSIZE, BSIZE-2,  BSIZE-2 ); // baja
          }
        }
        // fantasma azul
        if( block == 5 ){
          if( world.time % 2 == 0 ){ // animacion fatasma azul
            processing.image( fantAzul, (world.fantasA.x+0.1)*BSIZE, (world.fantasA.y+0.001)*BSIZE, BSIZE-2, BSIZE-2 ); // sube
          }else{
            processing.image( fantAzul, (world.fantasA.x+0.1)*BSIZE, (world.fantasA.y+0.1)*BSIZE, BSIZE-2, BSIZE-2 ); // baja
          }
        }
        // fantasma naranja
        if( block == 6 ){
          if( world.time % 2 == 0 ){ // animacion fatasma naranja
            processing.image(fantOran, (world.fantasO.x+0.1)*BSIZE, (world.fantasO.y+0.1)*BSIZE, BSIZE-5, BSIZE-6); // sube
          }else{
            processing.image(fantOran, (world.fantasO.x+0.1)*BSIZE, (world.fantasO.y+0.2)*BSIZE, BSIZE-5, BSIZE-6 ); // baja
          }
        }
        // fantasma rosado
        if( block == 7 ){
          if( world.time % 2 == 0 ){ // animacion fatasma rosado
            processing.image( fantPink, (world.fantasP.x+0.1)*BSIZE, (world.fantasP.y+0.01)*BSIZE, BSIZE-3, BSIZE-3 ); // sube
          }else{
            processing.image( fantPink, (world.fantasP.x+0.1)*BSIZE, (world.fantasP.y+0.2)*BSIZE, BSIZE-3, BSIZE-3 ); // baja
          }
        }
        if( block == 14 ){
          if( world.time % 2 == 0 ){ // animacion fatasma rojo
            processing.image( fantRed, (world.fantasR.x+0.1)*BSIZE, (world.fantasR.y+0.01)*BSIZE, BSIZE-3, BSIZE-3 ); // sube
          }else{
            processing.image( fantRed, (world.fantasR.x+0.1)*BSIZE, (world.fantasR.y+0.2)*BSIZE, BSIZE-3, BSIZE-3 ); // baja
          }
        }
        
        // animacion galletas grandes
        if (block == 8 && world.time % 2 == 1) {
          processing.fill(54, 229, 196); // color de las galletas G
          processing.ellipse(j * BSIZE + BSIZE / 2, i * BSIZE + BSIZE / 2, BSIZE / 3, BSIZE / 3); // forma de las galletas G
        } else {
          if (block == 8 && world.time % 2 == 0) {
            processing.fill(255, 255, 255); // cambia el color de las galletas G
            processing.ellipse(j * BSIZE + BSIZE / 2, i * BSIZE + BSIZE / 2, BSIZE / 1.7, BSIZE / 1.7); // forma de las galletas G
          }
        }
        if( world.pacman.x  ==  world.fantasO.x  && world.pacman.y == world.fantasO.y  ){
          death.play()
          death.volume = 0.3
          world.score = 0;
          world.time = 0;
          world.pacman.x = 10
          world.pacman.y = 9
          world.cereza1.x = 1
          world.cereza1.y = 1
          world.cereza2.x = 2
          world.cereza2.y = 15
          world.cereza3.x = 15
          world.cereza3.y = 2
          world.cereza4.x = 13
          world.cereza4.y = 19
          world.cereza5.x = 20
          world.cereza5.y = 9
          world.canCereza = 0
          world.dir.x = 0
          world.dir.y = 0
        }
        if( world.pacman.x  ==  world.fantasP.x  && world.pacman.y == world.fantasP.y  ){
          death.play()
          death.volume = 0.3
          world.score = 0;
          world.time = 0;
          world.pacman.x = 10
          world.pacman.y = 9
          world.cereza1.x = 1
          world.cereza1.y = 1
          world.cereza2.x = 2
          world.cereza2.y = 15
          world.cereza3.x = 15
          world.cereza3.y = 2
          world.cereza4.x = 13
          world.cereza4.y = 19
          world.cereza5.x = 20
          world.cereza5.y = 9
          world.canCereza = 0
          world.dir.x = 0
          world.dir.y = 0
        }
        if( world.pacman.x  ==  world.fantasA.x  && world.pacman.y == world.fantasA.y  ){
          death.play()
          death.volume = 0.3
          world.score = 0;
          world.time = 0;
          world.pacman.x = 10
          world.pacman.y = 9
          world.cereza1.x = 1
          world.cereza1.y = 1
          world.cereza2.x = 2
          world.cereza2.y = 15
          world.cereza3.x = 15
          world.cereza3.y = 2
          world.cereza4.x = 13
          world.cereza4.y = 19
          world.cereza5.x = 20
          world.cereza5.y = 9
          world.canCereza = 0
          world.dir.x = 0
          world.dir.y = 0
        }
        if( world.pacman.x  ==  world.fantasR.x  && world.pacman.y == world.fantasR.y  ){
          death.play()
          death.volume = 0.03
          world.score = 0;
          world.time = 0;
          world.pacman.x = 10
          world.pacman.y = 9
          world.cereza1.x = 1
          world.cereza1.y = 1
          world.cereza2.x = 2
          world.cereza2.y = 15
          world.cereza3.x = 15
          world.cereza3.y = 2
          world.cereza4.x = 13
          world.cereza4.y = 19
          world.cereza5.x = 20
          world.cereza5.y = 9
          world.canCereza = 0
          world.dir.x = 0
          world.dir.y = 0
        }
        if( world.pacman.x == world.cereza1.x && world.pacman.y == world.cereza1.y ){
          eat_fruit.play()
          eat_fruit.volume = 0.3
          world.canCereza += 1
          world.score += 3
          world.cereza1.x = 19
          world.cereza1.y = 21
        }
        if( world.pacman.x == world.cereza2.x && world.pacman.y == world.cereza2.y ){
          eat_fruit.play()
          eat_fruit.volume = 0.3
          world.canCereza += 1
          world.score += 3
          world.cereza2.x = 19
          world.cereza2.y = 21
        }
        if( world.pacman.x == world.cereza3.x && world.pacman.y == world.cereza3.y ){
          eat_fruit.play()
          eat_fruit.volume = 0.3
          world.canCereza += 1
          world.score += 3
          world.cereza3.x = 19
          world.cereza3.y = 21
        }
        if( world.pacman.x == world.cereza4.x && world.pacman.y == world.cereza4.y ){
          eat_fruit.play()
          eat_fruit.volume = 0.3
          world.canCereza += 1
          world.score += 3
          world.cereza4.x = 19
          world.cereza4.y = 21
        }
        if( world.pacman.x == world.cereza5.x && world.pacman.y == world.cereza5.y ){
          eat_fruit.play()
          eat_fruit.volume = 0.3
          world.canCereza += 1
          world.score += 3
          world.cereza5.x = 19
          world.cereza5.y = 21
        }
        //Inicio colisiones
        //Inicio colision con las esquinas
        if(world.pacman.x<1 && world.pacman.y!=9){
          world.pacman.x = 1
        }
        if(world.pacman.x<0 ){
          world.pacman.x = 20
        }
        if(world.pacman.y<1){
          world.pacman.y = 1
        }
        if(world.pacman.x>19 && world.pacman.y != 9){
          world.pacman.x=19
        }
        if(world.pacman.x>20){
          world.pacman.x = 0
        }
        if(world.pacman.y>19){
          world.pacman.y = 19
        }
        //Fin colision con las esquinas
        //Inicio colision con rectangulos 3x5
        //Inicio primer rectangulo
        if(world.pacman.y == 9 && world.pacman.x<=4){
          world.dir.y = 0
        }
        if(world.pacman.x == 5 && world.pacman.y <9 && world.pacman.y >= 6){
          world.dir.x = 0
        }
        if(world.pacman.y == 5 && world.pacman.x<5 && world.pacman.x>=2 ){
          world.dir.y = 0
        }
        if(world.pacman.x==1 && world.pacman.y>5 && world.pacman.y<=7){
          world.pacman.y = 5
        }
        //Fin primer rectangulo

        //Inicio segundo rectangulo
        if(world.pacman.x == 5 && world.pacman.y>=10 && world.pacman.y <= 12){
          world.dir.x = 0
        }
        if(world.pacman.y == 13 && world.pacman.x<=4 && world.pacman.x>=2){
          world.dir.y = 0
        }
        if(world.pacman.x==1 && world.pacman.y<13 && world.pacman.y>=11){
          world.pacman.y= 13
        }
        //Fin segundo rectangulo

        //Fin colision con rectangulos 3x5

        //Inicio colision con bloques 1ra seccion
        if(world.pacman.x==1 && world.pacman.y==4){
          world.dir.x=0
        }
        if(world.pacman.y==3 && world.pacman.x>=2 && world.pacman.x<=4){
          world.dir.y =0
        }
        if(world.pacman.x==1 && world.pacman.y==2){
          world.dir.x=0
        }
        if(world.pacman.y==1 && world.pacman.x>=3 && world.pacman.x<=4){
          world.dir.y=0
        }
        if(world.pacman.x==5 && world.pacman.y==2){
          world.dir.x=0
        }
        if(world.pacman.x==5 && world.pacman.y==4){
          world.dir.x=0
        }
        if(world.pacman.y==5 && world.pacman.x==6){
          world.pacman.x=5
        }
        if(world.pacman.x==5 && world.pacman.y==14){
          world.dir.x=0
        }
        if(world.pacman.x==1 && world.pacman.y==14){
          world.dir.x=0
        }
        if(world.pacman.y==15 && world.pacman.x>=2 && world.pacman.x<=4){
          world.dir.y=0
        }
        if(world.pacman.y==16 && world.pacman.x==1){
          world.dir.x=0
        }
        if(world.pacman.x==1 && world.pacman.y==18){
          world.dir.x=0
        }
        if(world.pacman.x==5 && world.pacman.y==16){
          world.dir.x=0
        }
        if(world.pacman.y==17 && world.pacman.x>=2 && world.pacman.x<=4){
          world.dir.y=0
        }
        if(world.pacman.y==19 && world.pacman.x>=3 && world.pacman.x<=8){
          world.dir.y=0
        }
        if(world.pacman.x==5 && world.pacman.y==18){
          world.pacman.y=17
        }
        if(world.pacman.y==17 && world.pacman.x==6){
          world.pacman.x=5
        }
        //Fin colision con bloques 1ra seccion

        //Inicio colision con bloques 2da seccion
        if(world.pacman.y==1 && world.pacman.x>=6 && world.pacman.x<=7 ){
          world.dir.y=0
        }
        if(world.pacman.x==6 && world.pacman.y==3){
          world.dir.y=0
        }
        if(world.pacman.x==7 && world.pacman.y==2){
          world.pacman.y=3
        }
        if(world.pacman.x==8 && world.pacman.y==3){
          world.dir.y=0
        }
        if(world.pacman.x==9 && world.pacman.y==2){
          world.dir.x=0
        }
        if(world.pacman.y==1 && world.pacman.x==10){
          world.pacman.x=9
        }
        if(world.pacman.x==7 && world.pacman.y==4){
          world.dir.x=0
        }
        if(world.pacman.x==10 && world.pacman.y==3){
          world.dir.y=0
        }
        if(world.pacman.x==9 && world.pacman.y==4 && world.dir.y==1){
          world.pacman.y=3
        }
        //Fin colision con bloques 2da seccion

        //Fin colisiones
      });
    });
  }
  /**
   * 
   */
  processing.onKeyEvent = function (world, keyCode) {
    switch (keyCode) {
      case processing.UP:
        waka.play()
        waka.volume = 0.2;
        return make(world, {
          dir: {
            y: -1,
            x: 0
          },
          pacman: {
            x: world.pacman.x,
            y: world.pacman.y,
            d: "UP"
          }
        });
        break;
      case processing.DOWN:
        waka.play()
        waka.volume = 0.2;
        return make(world, {
          dir: {
            y: 1,
            x: 0
          },
          pacman: {
            x: world.pacman.x,
            y: world.pacman.y,
            d: "DOWN"
          }
        });
        break;
      case processing.LEFT:
        waka.play()
        waka.volume = 0.2;
        return make(world, {
          dir: {
            y: 0,
            x: -1
          },
          pacman: {
            x: world.pacman.x,
            y: world.pacman.y,
            d: "LEFT"
          }
        });
        break;
      case processing.RIGHT:
        waka.play()
        waka.volume = 0.2;
        return make(world, {
          dir: {
            y: 0,
            x: 1
          },
          pacman: {
            x: world.pacman.x,
            y: world.pacman.y,
            d: "RIGHT"
          }
        });
        break;
      default:
        console.log(keyCode);
        return make(world, {});
    }
  }
  /**
   * Cambia la posición del objeto moviendolo 1 unidad a la derecha. 
   */
  processing.onTic = function (world) {
    console.log(world.pacman.x,world.pacman.y)
    return make(world, {
      time: world.time + 1,
      pacman: { x: world.pacman.x + world.dir.x, y: world.pacman.y + world.dir.y, d: world.pacman.d }
    });
  }

  processing.onMouseEvent = function (world, event) {
    return make(world, {});
  }

  // ******************** De aquí hacia abajo no debe cambiar nada. ********************

  // Esta es la función que pinta todo. Se ejecuta 60 veces por segundo. 
  // No cambie esta función. Su código debe ir en drawGame
  processing.draw = function () {
    processing.drawGame(processing.state);
    processing.state = processing.onTic(processing.state);
  };
  // Esta función se ejecuta cada vez que presionamos una tecla. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.keyPressed = function () {
    processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
  }
  // Esta función se ejecuta cada vez movemos el mouse. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.mouseMoved = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
  }

  // Estas funciones controlan los eventos del mouse. 
  // No cambie estas funciones. Su código debe ir en OnMouseEvent
  processing.mouseClicked = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseDragged = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mousePressed = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseReleased = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }
  // Fin de los eventos del mouse
}

var canvas = document.getElementById("canvas");
// Adjuntamos nuestro sketch al framework de processing
var processingInstance = new Processing(canvas, sketchProc);