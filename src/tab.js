const vscode = require('vscode');

class TabItem {
    constructor(label, collapsibleState) {
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.webviewPanel = null;
    }
    createWebView() {
        this.webviewPanel = vscode.window.createWebviewPanel(
            'hexadecimalConverter',
            'Hexadecimal Calculator',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );
        this.webviewPanel.webview.html = getWebViewContent();
        this.registerWebViewEvents();
    }

    registerWebViewEvents() {
        this.webviewPanel.onDidDispose(() => {
            this.webviewPanel = null;
        });

        this.webviewPanel.webview.onDidReceiveMessage(
            message => this.handleWebViewMessage(message)
        );
    }

    handleWebViewMessage(message) {
        vscode.window.showInformationMessage(`Received ${JSON.stringify(message)}`);
    }
}

function getWebViewContent() {
    const path = vscode.Uri.file(__dirname + '/calculator.html');
    const uri = path.with({ scheme: 'vscode-resource'});
    const fsPath = path.fsPath;
    return `<iframe src="${fsPath}" width="100%" height="100%"></iframe>`;
}

module.exports = TabItem;