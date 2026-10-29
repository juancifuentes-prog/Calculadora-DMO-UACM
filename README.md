# Calculadora de DMO baja — Cifuentes Lab

Aplicación estática para GitHub Pages; no requiere Python ni servidor al ejecutarse.

## Publicación
1. Crear un repositorio nuevo en GitHub (por ejemplo, `calculadora-dmo`).
2. Subir **index.html**, **styles.css**, **script.js** y **model.json** a la raíz de la rama `main`.
3. Ir a **Settings → Pages → Build and deployment**, seleccionar **Deploy from a branch**, **main** y **/(root)**, y guardar.
4. Abrir la URL indicada en Pages (normalmente `https://USUARIO.github.io/calculadora-dmo/`).

## Procedencia del modelo
Parámetros exportados de `modelo_DMO_cuello_femoral.joblib` de este análisis. Pipeline: imputación mediana, escalado StandardScaler, regresión logística L2 (C=0.2). Predictores: `EDAD`, `PESO, kg`, `MASA MUSCULO`. Desenlace: T-score de cuello femoral < −1. Se implementa la fórmula logit con medias, escalas, coeficientes e intercepto originales. N=43 mujeres, rango de edad 40–71 años.

## Interpretación
La clasificación «DMO baja» incluye osteopenia y osteoporosis por cuello femoral; no separa ambos diagnósticos. Es un prototipo exploratorio, no es un dispositivo médico ni sustituye DXA. El umbral 50% no está validado clínicamente. No incluye corrección por estado menopáusico.

## Privacidad
Las entradas se calculan directamente en JavaScript en el navegador y no se envían a servidores. GitHub Pages aloja archivos públicos del sitio, incluyendo los parámetros del modelo; no subas la base de pacientes al repositorio.
