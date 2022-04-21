"use strict"

/* 
Recrea el ejercicio de hundir la flota (ejercicioBubbling)
CON LOS BONUS

Puedes reutilizar todo el código que quieras
La única condición es que solo puede haber UN eventListener

v2: la tabla se generará automáticamente en base a una variable.
Esa variable será el número de filas, celdas por fila y barcos (1 por fila)
*/


// Seleccionar elementos
const scoreSpan = document.querySelector("#score")
const livesSpan = document.querySelector("#lives")

const water = document.querySelector("table")




// Variables de control

let score;
let lives;
let numBoats;


//Función para iniciar el juego

function startGame(){

  //Definir num barcos
  /* numBoats = prompt("Introduce un nñúmero de dificultad"); */
  numBoats=5


  //Definir puntuación inicial
  score = 0;

  //Definir vidas iniciales
  lives = numBoats*2

  //Actualizar textos
  scoreSpan.textContent = score;
  livesSpan.textContent = lives;

  // Generar contenido tabla
generateContent(numBoats)


}


startGame()


//Función para generar el contenido de la abla
function generateContent(size){
  console.log(`generando tabla de ${size} x ${size} con ${size} barcos`)

  // Voy a hacerlo con createrElement, es recomendable usar fragment
  //También se podría hacer con innerHTML concatenando strings

  //Crear el fragment
  const fragment = document.createDocumentFragment()

  //Crear los tr
  for(let i = 0; i < size; i++){
    const tr = document.createElement("tr")

    // Escogemos el número de celda aleatoriamente
    const boatCell = chooseCell(size)


    //Crear los td

    for(let j = 0; j < size; j++){
      const td = document.createElement("td")

      //meter el barco si toca
      if(j === boatCell){
        td.innerHTML = "<p>⛵</p>"
      }


      //meter el td en el tr
      tr.append(td)
    }



    //Añadir los tr al fragment
    fragment.append(tr)
  }
  




  console.log(fragment)
  //Añadir el fragment a la tabla
  water.append(fragment)
}



//Funcion para elegir celda
function chooseCell(num){
  return Math.floor(Math.random() * num)
}


//Función para resetear
function reset(){

  water.innerHTML = ""

  startGame()
}


function clickBoat(){


  //sumar punto
  score++

  //actualizar texto puntuacion
  scoreSpan.textContent = score

  //comprobar fin
  if(score === numBoats){
    alert(`PUNTUACIÓN MÁXIMA
    Te han sobreado ${lives} vidas`)

    //reiniciar
    reset()
  }

}


function clickWater(){

  //restar vida
  lives--

  //actualizar texto
  livesSpan.textContent = lives

  //Comprobar fin
  if(lives <= 0){
    alert(`NO TE QUEDAN VIDAS
    Has conseguido ${score} puntos`)

    //reiniciar
    reset()
  }
}



function handleClick(e){

  if(e.target.matches("p")){
    const boat = e.target
    
    //Si NO le habiamos hecho click (no tiene opacidad)
    if(!boat.style.opacity){

      clickBoat(boat)
        //hacer barco visible
  boat.style.opacity = 1
    }
  } else{
    clickWater()
  }

}

water.addEventListener("click", handleClick)