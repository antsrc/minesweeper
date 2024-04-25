const filas = 16;
const columnas = 16;
const minas = 40;

const espacioTablero = document.getElementById("espacioTablero");

let tablero = [];

let boton = document.getElementById("reinicio");
boton.addEventListener("click", reiniciar);

function reiniciar() {
  inicializaTablero();
  reproduceTablero();
}

function inicializaTablero() {
  for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (j = 0; j < columnas; j++) {
      tablero[i][j] = {
        mina: false,
        marcada: false,
        descubierta: false,
        valor: null,
      };
    }
  }

  let cont = 0;
  while (cont < minas) {
    let fila = Math.floor(Math.random() * filas);
    let columna = Math.floor(Math.random() * columnas);
    if (!tablero[fila][columna].mina) {
      tablero[fila][columna].mina = true;
      cont++;
    }
  }

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[0].length; j++) {
      if (!tablero[i][j].mina) {
        let sum = 0;
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            if (
              i + x >= 0 &&
              i + x < filas &&
              j + y >= 0 &&
              j + y < columnas &&
              (x !== 0 || y !== 0)
            ) {
              if (tablero[i + x][j + y].mina) {
                sum++;
              }
            }
          }
        }
        if (sum > 0) {
          tablero[i][j].valor = sum;
        }
      }
    }
  }
}

function reproduceTablero() {
  espacioTablero.innerHTML = "";

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let casilla = document.createElement("div");
      casilla.className = "casilla";

      if (tablero[i][j].marcada === true) {
        casilla.classList.add("marcada");
      } else if (tablero[i][j].descubierta) {
        casilla.classList.add("descubierta");
        if (tablero[i][j].mina) {
          casilla.classList.add("mina");
        } else if (tablero[i][j].valor > 0) {
          casilla.textContent = tablero[i][j].valor;
          switch (tablero[i][j].valor) {
            case 1:
              casilla.classList.add("uno");
              break;
            case 2:
              casilla.classList.add("dos");
              break;
            case 3:
              casilla.classList.add("tres");
              break;
            case 4:
              casilla.classList.add("cuatro");
              break;
            case 5:
              casilla.classList.add("cinco");
              break;
            case 6:
              casilla.classList.add("seis");
              break;
            case 7:
              casilla.classList.add("siete");
              break;
            case 8:
              casilla.classList.add("ocho");
              break;
          }
        }
      }

      casilla.addEventListener("click", () => revelaCasilla(i, j));
      casilla.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        marcaCasilla(i, j);
      });

      espacioTablero.appendChild(casilla);
    }

    espacioTablero.appendChild(document.createElement("br"));
  }

  reproduceMensaje();
}

function reproduceMensaje() {
  let mensaje = document.getElementById("mensaje");
  mensaje.innerHTML = "";
  let numDescubiertas = document.querySelectorAll(".descubierta").length;
  let texto1 = document.createElement("p");
  let texto2 = document.createElement("p");
  texto1.innerText = "Has descubierto " + numDescubiertas + " casillas";
  texto2.innerText =
    "Te quedan " +
    (filas * columnas - numDescubiertas) +
    " casillas por descubrir";
  mensaje.appendChild(texto1);
  mensaje.appendChild(texto2);
}

function revelaCasilla(i, j) {
  if (tablero[i][j].descubierta === false && tablero[i][j].marcada === false) {
    tablero[i][j].descubierta = true;

    if (tablero[i][j].mina) {
      tablero[i][j].explotada = true;
      resuelveTablero();
      return;
    } else if (tablero[i][j].valor === null) {
      revelaEnCadena(i, j);
    }
  }

  reproduceTablero();
}

function revelaEnCadena(i, j) {
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      if (
        i + x >= 0 &&
        i + x < filas &&
        j + y >= 0 &&
        j + y < columnas &&
        (x !== 0 || y !== 0)
      ) {
        if (tablero[i + x][j + y].descubierta === false) {
          if (!tablero[i + x][j + y].mina) {
            tablero[i + x][j + y].descubierta = true;
            if (tablero[i + x][j + y].valor === null) {
              revelaEnCadena(i + x, j + y);
            }
          }
        }
      }
    }
  }
}

function marcaCasilla(i, j) {
  if (!tablero[i][j].descubierta)
    tablero[i][j].marcada = !tablero[i][j].marcada;

  reproduceTablero();
}

function resuelveTablero() {
  espacioTablero.innerHTML = "";

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      let casilla = document.createElement("div");
      casilla.className = "casilla";
      if (tablero[i][j].marcada === true) {
        casilla.classList.add("marcada");
      } else if (tablero[i][j].mina) {
        casilla.classList.add("mina");
        casilla.classList.add("descubierta");
        if (tablero[i][j].explotada) {
          casilla.classList.add("explotada");
        }
      } else if (tablero[i][j].descubierta) {
        casilla.classList.add("descubierta");
        if (tablero[i][j].valor > 0) {
          casilla.textContent = tablero[i][j].valor;
          switch (tablero[i][j].valor) {
            case 1:
              casilla.classList.add("uno");
              break;
            case 2:
              casilla.classList.add("dos");
              break;
            case 3:
              casilla.classList.add("tres");
              break;
            case 4:
              casilla.classList.add("cuatro");
              break;
            case 5:
              casilla.classList.add("cinco");
              break;
            case 6:
              casilla.classList.add("seis");
              break;
            case 7:
              casilla.classList.add("siete");
              break;
            case 8:
              casilla.classList.add("ocho");
              break;
          }
        }
      }
      espacioTablero.appendChild(casilla);
    }

    espacioTablero.appendChild(document.createElement("br"));
  }
}

reiniciar();
