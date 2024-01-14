console.log('Hexadecimal Converter started');

const vscode = require('vscode');
const TreeDataProvider = require('./tree');
const TabItem = require('./tab');

let TreeView; // Declare the Tree View variable

function activate(context) {
    console.log('Activated Hexadecimal Converter');
    createTreeView(context); 
}

function createTreeView(context) {
    console.log('Starting view creation...');
    console.log('\tCreating Data Provider...');
    const iTreeDataProvider = new TreeDataProvider();
    console.log('\tFinished');
    console.log('\tCreating View...');
    TreeView = vscode.window.createTreeView('HexConverterTreeView', { treeDataProvider: iTreeDataProvider });
    console.log('\tFinished');
    console.log('Finished');

    context.subscriptions.push(vscode.commands.registerCommand('hexadecimal-converter.showTreeView', () => {
        console.log("Show Tree View Command Activated");
        const selected = TreeView.selection[0];
        if (selected instanceof TabItem) {
            selected.createWebView();
        }
    }));
}

module.exports = {
    activate,
    deactivate() {}
};
