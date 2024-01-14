const vscode = require('vscode');
const TabItem = require('./tab');

class TreeDataProvider {
    getChildren(element) {
        if (!element) {
            return [
                new TabItem('Hex Converter', vscode.TreeItemCollapsibleState.Collapsed)
            ];
        }
        return element.webviewPanel ? [element] : [];
    }

    getTreeItem(element) {
        return element;
    }
}

module.exports = TreeDataProvider;
