Proyecto de Pruebas de Carga con K6

Este proyecto realiza pruebas de carga sobre el endpoint de autenticación de FakeStoreAPI:
https://fakestoreapi.com/auth/login

Las credenciales de usuarios se parametrizan desde un archivo CSV (data/users.csv).

---------------------------------------------------
1. Prerrequisitos
---------------------------------------------------
- Sistema operativo: Windows 10 / Linux / MacOS
- JDK versión 8, 11 o 17 (debe estar configurado en la variable de entorno)
- K6 versión 0.46.0 o superior (descargar desde https://k6.io/docs/getting-started/installation/)
- Editor de texto o IDE: Visual Studio Code, IntelliJ IDEA u otro de tu preferencia

---------------------------------------------------
2. Comandos de instalación
---------------------------------------------------
En Windows
Instalar k6 version k6-v0.52.0-amd64

Verificar instalación:
    k6 version

---------------------------------------------------
3. Estructura del proyecto
---------------------------------------------------
K6/
├── data/
│   └── users.csv            (archivo con credenciales)
├── scripts/
│   └── login_test.js        (script principal de prueba)
├── reports/
│   ├── summary.html         (reporte en formato HTML)
│   └── textSummary.txt      (reporte en formato texto)
├── readme.txt
└── conclusiones.txt

---------------------------------------------------
4. Instrucciones para ejecutar los test
---------------------------------------------------
1. Ubicarse en la carpeta del script:
    cd K6/scripts

2. Ejecutar la prueba de carga:
    k6 run login_test.js

3. Al finalizar se generarán automáticamente los reportes:
    - reports/summary.html  → reporte visual con gráficos
    - reports/textSummary.txt → reporte en texto plano

---------------------------------------------------
5. Validaciones implementadas
---------------------------------------------------
- Tiempo de respuesta máximo permitido: 1.5 segundos (p95).
- Tasa de error aceptable: < 3%.
- Carga mínima: 20 transacciones por segundo (TPS).

---------------------------------------------------
6. Información adicional
---------------------------------------------------
- La prueba usa un ejecutor de llegada constante (constant-arrival-rate).
- Los usuarios se leen de data/users.csv y se seleccionan de manera aleatoria.
- El script genera reportes automáticos en HTML y en texto plano.
