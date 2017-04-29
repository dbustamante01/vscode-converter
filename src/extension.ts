'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

//http://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
function a2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i ++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex.toString().toUpperCase());
  }
  return arr.join('');
}

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "converter" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.hex2ascii', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            console.log("there is no active editor opened");
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);

        editor.edit(function (builder) {
            builder.replace(selection, hex2a(text));
        });

    });
    context.subscriptions.push(disposable);
    let dispAscii2Hex=vscode.commands.registerCommand('extension.ascii2hex',()=>{
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            console.log("there is no active editor opened");
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);

        editor.edit(function (builder) {
            builder.replace(selection, a2hex(text));
        });
    });
    context.subscriptions.push(dispAscii2Hex);
}

// this method is called when your extension is deactivated
export function deactivate() {
}