//vite.config.js

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { exec } from 'child_process'
import http from 'node:http';
import net from 'net'; // ใช้สำหรับตรวจสอบการเชื่อมต่อพอร์ต (Port Checking)

// Disable agent for now to test if it stabilizes the ERR_EMPTY_RESPONSE
// const agent = new http.Agent({
//   keepAlive: true,
//   maxSockets: 10,
//   keepAliveMsecs: 1000,
// });

// ฟังก์ชันสำหรับตรวจสอบสถานะของพอร์ต (Online/Offline)
function checkPort(host, port, name) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);

    socket.on('connect', () => {
      console.log(`\x1b[32m✅ ${name} (${host}:${port}) ONLINE\x1b[0m`);
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      console.log(`\x1b[31m❌ ${name} (${host}:${port}) TIMEOUT\x1b[0m`);
      socket.destroy();
      resolve(false);
    });

    socket.on('error', () => {
      console.log(`\x1b[31m❌ ${name} (${host}:${port}) UNREACHABLE\x1b[0m`);
      resolve(false);
    });

    socket.connect(port, host);
  });
}

// ปลั๊กอินสำหรับตรวจสอบความพร้อมของ Backend ก่อนเริ่มรัน Server
const backendStatusCheck = (backendIp) => {
  return {
    name: 'backend-status-check',
    async configureServer() {
      console.log('\n🔍 Checking backend connectivity...\n');

      const results = await Promise.all([
        checkPort(backendIp, 8081, 'taxpayer-tracking'),
        checkPort(backendIp, 8080, 'visionapi'),
      ]);

      if (results.includes(false)) {
        console.log('\x1b[31m⚠ Some backends are unreachable.\x1b[0m\n');
      } else {
        console.log('\x1b[32m🎉 All backends are ready.\x1b[0m\n');
      }
    }
  };
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendIp = env.VITE_BACKEND_IP || '10.208.1.207';

  return {
    plugins: [
      react(),
      backendStatusCheck(backendIp)
    ],
    server: {
      host: true, // เปิดให้เข้าถึงผ่าน LAN IP ได้ (เช่น มือถือหรือเครื่องอื่นในวงแลน)
      port: 5173, // กำหนดพอร์ตสำหรับรัน Dev Server
      proxy: {
        // ส่วนการเชื่อมต่อกับ Vision API (พอร์ต 8080)
        '/visionapi': {
          target: `http://${backendIp}:8080`,
          changeOrigin: true,
          secure: false,
          timeout: 600000, // 10 minutes
          proxyTimeout: 600000,
          // agent: agent, // Commenting out agent for stability test
          configure: (proxy, _options) => {
            proxy.on('error', (err, req, res) => {
              console.error(`\x1b[31m[Proxy Error]\x1b[0m ${req.method} ${req.url} -> ${err.message} (Code: ${err.code})`);
              if (!res.headersSent) {
                res.writeHead(504, { 'Content-Type': 'text/plain' });
                res.end(`Gateway Timeout: Backend machine is not responding or connection was closed. (Error: ${err.message})`);
              }
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              proxyReq.setHeader('Connection', 'keep-alive');
              console.log(`\x1b[36m[Proxy Req]\x1b[0m ${req.method} ${req.url} -> http://${backendIp}:8080`);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              const statusColor = proxyRes.statusCode === 200 ? '\x1b[32m' : '\x1b[31m';
              console.log(`${statusColor}[Proxy Res]\x1b[0m ${proxyRes.statusCode} for ${req.url}`);

              // Log content length if available to detect "Empty Response" which might still return 200
              if (proxyRes.headers['content-length']) {
                // console.log(`[Proxy Res Info] Content-Length: ${proxyRes.headers['content-length']}`);
              }
            });
          },
        },
        // ส่วนการเชื่อมต่อกับระบบจัดการสิทธิ์และข้อมูลออฟฟิศ (Auth API พอร์ต 8081)
        '/authapi': {
          target: `http://${backendIp}:8081/taxpayer-tracking`,
          changeOrigin: true,
          secure: false,
          timeout: 60000,
          proxyTimeout: 60000,
          rewrite: (path) => path.replace(/^\/authapi/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, req, res) => {
              console.error(`\x1b[31m[Auth Proxy Error]\x1b[0m ${req.method} ${req.url} -> ${err.message}`);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              proxyReq.setHeader('Connection', 'keep-alive');
              // Mimic same-origin
              proxyReq.setHeader('Origin', `http://${backendIp}:8081`);
              proxyReq.setHeader('Referer', `http://${backendIp}:8081/taxpayer-tracking/`);

              console.log(`\x1b[35m[Auth Proxy Req]\x1b[0m ${req.method} ${req.url} -> http://${backendIp}:8081/taxpayer-tracking...`);
              // console.log('[Auth Proxy Headers]', proxyReq.getHeaders());
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              const statusColor = proxyRes.statusCode < 400 ? '\x1b[32m' : '\x1b[31m';
              console.log(`${statusColor}[Auth Proxy Res]\x1b[0m ${proxyRes.statusCode} for ${req.url}`);
            });
          },
        }
      }
    }
  };
});