import * as escodegen from "escodegen";
import * as espree from "espree";
import * as estraverse from "estraverse";
import * as fs from "fs/promises";

export async function transpile(inputFile, outputFile) {
  // Fill in the code here
  const ast = p.parse(expression);
  let preamble = '#!/usr/bin/env node\n';
  //console.log(JSON.stringify(ast, null, 2))
  let output = preamble + escodegen.generate(ast);
  if (outputFile === undefined) {
    console.log(output);
    return;
  }
}

export function addLogging(code) {
  var ast = espree.parse(code);
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      if (node.type === 'FunctionDeclaration' ||
          node.type === 'FunctionExpression') {
            addBeforeCode(node);
          }
      }
    });
  return escodegen.generate(ast);
}

function addBeforeCode(node) {
  var name = node.id ? node.id.name : '<anonymous function>';
  var beforeCode = "console.log('Entering " + name + "()');";
  var beforeNodes = espree.parse(beforeCode).body;
  node.body.body = beforeNodes.concat(node.body.body);
}
