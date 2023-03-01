[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-f4981d0f882b2a3f0472912d15f9806d57e124e0fc890972558857b51b24a6f9.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=10276738)
# Práctica Espree logging

## Resumen de lo aprendido
Gracias a este práctica he podido aprender a usar espree, una librería que proporciona funciones que sirve de cara a la traducción de árboles. Usando métodos cómo por ejemplo traverse, el cual permite entrar en dicho árbol, o parse, que permite la propia traducción del mismo. Al mismo tiempo he aprendido otros conceptos nuevos cómo puede ser publicar un paquete a través de NPM. Aparte de repasar conceptos anteriores cómo testing, coverage, integración continua, etc...
...

## Indicar los valores de los argumentos

Se ha modificado el código de `logging-espree.js` para que el log también indique los valores de los argumentos que se pasaron a la función. 
Ejemplo:

```javascript
function foo(a, b) {
  var x = 'blah';
  var y = (function (z) {
    return z+3;
  })(2);
}
foo(1, 'wut', 3);
```

```javascript
function foo(a, b) {
    console.log(`Entering foo(${ a }, ${ b })`);
    var x = 'blah';
    var y = function (z) {
        console.log(`Entering <anonymous function>(${ z })`);
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);
```

## CLI con [Commander.js](https://www.npmjs.com/package/commander)

A continuación usaré este apartado para resaltar el hecho de haber utilizado commander. Con este herramienta la cual se ha generado usando el siguiente código:

```javascript
#!/usr/bin/env node

import { program } from "commander";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { version } = require("../package.json");
import { transpile } from "../src/logging-espree.js";

program
  .version(version)
  .argument("<filename>", 'file with the original code')
  .option("-o, --output <filename>", "file in which to write the output")
  .action((filename, options) => {
    transpile(filename, options.output);
  });
program.parse(process.argv);
```
Se puede llegar a activar algunas opciones para complementar al programa principal.

*Opción -h*
Esta opción sirve para ver que posibles acciones puede tomar el programa, tal y cómo se ve en la siguiente captura:
![captura_h](docs/captura_h_commander.png)

*Opción -V*
Esta opción se usa para devolver la versión del programa tal cómo se puede ver en la siguiente captura:
![captura_V](docs/captura_v_commander.png)

## Reto 1: Soportar funciones flecha

...

## Reto 2: Añadir el número de línea

...

## Tests and Covering

...