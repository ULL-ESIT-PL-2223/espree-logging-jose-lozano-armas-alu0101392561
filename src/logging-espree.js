import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

/**
 * Función que recibe el fichero y tras traducirlo lo vota a la salida
 * @param {*} inputFile Fichero de entrada
 * @param {*} outputFile Fichero de salida
 * @returns El programa del fichero de entrada traducido
 */
export async function transpile(inputFile, outputFile) {
  let input = await fs.readFile(inputFile, 'utf-8'); /// Leemos el fichero y le ponemos formato utf-8
  let output = addLogging(input); /// Guardamos el código traducido
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
  await fs.writeFile(outputFile, output);
}

/**
 * Función que parsea el árbol
 * @param {*} code Código a traducir
 * @return El código traducido
 */
export function addLogging(code) {
  var ast = espree.parse(code, {ecmaVersion: 12, loc: true});
  estraverse.traverse(ast, { /// Con traverse nos metemos en el árbol y buscamos que tipo de node es
    enter: function(node, parent) {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'ArrowFunctionExpression' ||
          node.type === 'FunctionExpression') {
            addBeforeCode(node);
          }
      }
    });
  return escodegen.generate(ast); /// Generamos el ast usando escodegen
}

/**
 * @desc Función que recibe un código y lo módifica acorde al árbol de espree
 * @param {*} node Mensaje a inprimir
 */
function addBeforeCode(node) {
  const name = node.id ? node.id.name : '<anonymous function>'; // Se guarda si se tiene id o es una función anónima
  let paramNames = ""; // Variable que irá guardando los nombres de los parámetros (array)
  if (node.params.length) { 
    paramNames = "${" + node.params.map(param => param.name).join("}, ${") + "}"; /// Generamos un array con los nombres de los parámetros
  }
  const lineN = node.loc.start.line;
  const beforeCode = "console.log('Entering " + name + "(" + paramNames + ") at line " + lineN + "');"
  const beforeNodes = espree.parse(beforeCode, { ecmaVersion: 12}).body;
  node.body.body = beforeNodes.concat(node.body.body); /// Actualizamos el nuevo body del árbol
}
