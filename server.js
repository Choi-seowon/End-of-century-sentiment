const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('클라이언트 연결됨');

    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if(client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`상대방: ${message}`);
            }
        });
    });
    ws.on('close', () => {
        console.log('클라이언트 연결 해제됨');
    });
});
server.listen(3000, () => {
    console.log('서버가 3000 포트에서 실행 중입니다.');
});