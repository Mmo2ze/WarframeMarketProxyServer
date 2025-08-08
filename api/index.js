const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// ✅ Allow requests from your Angular frontend
app.use(cors({
    origin: ['http://localhost:4200','https://warframe-market-analysts-jox4.vercel.app'],
    credentials: true
}));

// ✅ Proxy endpoint
app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://api.warframe.market/v2',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '', // remove /api prefix
        },
        onError(err, req, res) {
            console.error('Proxy error:', err);
            res.status(500).send('Proxy error');
        },
    })
);

app.listen(3000, () => {
    console.log('✅ Proxy server running at http://localhost:3000');
});


