import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Reporter HTML
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// Reporter texto
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// Cargar datos desde el CSV
const csvData = new SharedArray('users', function () {
    return open('../data/users.csv')
        .split('\n')
        .slice(1) // saltar cabecera
        .map(line => {
            const [username, password] = line.trim().split(',');
            return { username, password };
        })
        .filter(u => u.username); // quitar líneas vacías si las hay
});

export let options = {
    thresholds: {
        http_req_duration: ['p(95)<1500'],
        http_req_failed: ['rate<0.03'],
    },
    scenarios: {
        load_test: {
            executor: 'constant-arrival-rate',
            rate: 20,
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 20,
            maxVUs: 50,
        },
    },
};

export default function () {
    let user = csvData[Math.floor(Math.random() * csvData.length)];

    let res = http.post(
        'https://fakestoreapi.com/auth/login',
        JSON.stringify({
            username: user.username,
            password: user.password,
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    check(res, {
        'status es 200': (r) => r.status === 200,
        'tiempo de respuesta < 1.5s': (r) => r.timings.duration < 1500,
    });

    sleep(1);
}

// --- Reportes al finalizar ---
export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),                     // Reporte HTML
        "textSummary.txt": textSummary(data, { indent: " ", enableColors: false }), // Reporte texto
    };
}
