/**
 * ============================================================
 *  LOGOS.CONFIG.JS — Configuración centralizada de partidos
 * ============================================================
 *
 *  CÓMO EDITAR:
 *  ─────────────────────────────────────────────────────────
 *  1. Coloca los archivos de logo en esta misma carpeta /logos/
 *     Formatos recomendados: SVG (ideal) o PNG/WebP (< 15 KB)
 *
 *  2. Edita solo este archivo para cambiar:
 *     - ¿Cuál partido es el "cliente" del sistema (cliente)?
 *     - El nombre, color y logo de cada partido
 *     - El orden de las columnas del gráfico (key: pN)
 *
 *  3. Si el partido dueño del sistema cambia (ej: mañana el
 *     cliente es P2 en vez de P1), solo cambia:
 *       clienteKey: 'p2'
 *     Y toda la lógica de "Partido Principal" se adapta sola.
 *
 *  NOTA: Las rutas de logo son RELATIVAS al archivo HTML.
 *  Desde dashboard.html → logos/p1_renovacion.svg
 *  Desde mini_app/index.html → ../logos/p1_renovacion.svg
 * ============================================================
 */

const LOGO_CFG = {

    // ── PARTIDO CLIENTE DEL SISTEMA ──────────────────────────
    // Cambia este valor si el adquiridor del sistema cambia.
    // El dashboard usará este partido como referencia principal
    // en rankings, zona de votos y estadísticas destacadas.
    clienteKey: 'p1',

    // ── LOGO DEL DASHBOARD (cabecera superior) ───────────────
    dashboardLogo: {
        archivo: 'logos/dashboard_logo.svg',   // logo de la organización
        texto:   'Centro de Comando Electoral', // fallback si no carga
        emoji:   '🗳️',                          // fallback emoji
    },

    // ── LOGO DE LA MINI-APP (cabecera Telegram) ──────────────
    miniappLogo: {
        archivo: 'logos/miniapp_logo.svg',
        texto:   'Bot Electoral',
        emoji:   '🗳️',
    },

    // ── PARTIDOS ─────────────────────────────────────────────
    // key:   debe coincidir con las columnas votos_pN en Supabase
    // logo:  ruta relativa al logo (SVG o PNG)
    //        → dejar en '' si aún no tienes el archivo
    // ini:   letra/emoji fallback si no hay logo
    partidos: [
        {
            key:  'p1',
            nom:  'Renovación Popular',
            logo: 'logos/p1_renovacion.webp', // ✅ optimizado (1.7 KB)
            ini:  'R',
            c1:   '#0ea5e9',
            c2:   '#0284c7',
        },
        {
            key:  'p2',
            nom:  'Fuerza Popular',
            logo: 'logos/p2_fuerza.webp',      // ✅ optimizado (2.1 KB)
            ini:  'F',
            c1:   '#f97316',
            c2:   '#ea580c',
        },
        {
            key:  'p3',
            nom:  'Ahora Nación',
            logo: 'logos/p3_ahora.webp',       // ✅ optimizado (1.6 KB)
            ini:  'A',
            c1:   '#ef4444',
            c2:   '#b91c1c',
        },
        {
            key:  'p4',
            nom:  'Podemos Perú',
            logo: 'logos/p4_podemos.webp',     // ✅ optimizado (2.3 KB)
            ini:  'P',
            c1:   '#a855f7',
            c2:   '#7e22ce',
        },
        {
            key:  'p5',
            nom:  'Alianza P. el Progreso',
            logo: 'logos/p5_alianza.webp',     // ✅ optimizado (2.0 KB)
            ini:  'A',
            c1:   '#3b82f6',
            c2:   '#1d4ed8',
        },
        {
            key:  'p6',
            nom:  'P. Buen Gobierno',
            logo: 'logos/p6_buen_gobierno.webp',// ⏳ pendiente (fallback: B)
            ini:  'B',
            c1:   '#eab308',
            c2:   '#a16207',
        },
        {
            key:  'p7',
            nom:  'País para Todos',
            logo: 'logos/p7_pais.webp',        // ✅ optimizado (1.9 KB)
            ini:  'P',
            c1:   '#14b8a6',
            c2:   '#0d9488',
        },
    ],
};

// ── HELPER: devuelve config del partido cliente ───────────────
LOGO_CFG.getCliente = function() {
    return this.partidos.find(p => p.key === this.clienteKey) || this.partidos[0];
};

// ── HELPER: imagen con fallback al emoji/inicial ──────────────
// Retorna HTML <img> si hay logo, o un span de texto si no.
LOGO_CFG.logoHTML = function(partido, size = 28) {
    if (partido.logo) {
        return `<img src="${partido.logo}" 
                     width="${size}" height="${size}" 
                     style="border-radius:50%;border:2px solid rgba(255,255,255,.3);object-fit:contain;background:rgba(0,0,0,.25)"
                     onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
                     alt="${partido.nom}">
                <span style="display:none;width:${size}px;height:${size}px;border-radius:50%;
                      border:2px solid rgba(255,255,255,.3);align-items:center;justify-content:center;
                      font-size:${Math.round(size*0.46)}px;font-weight:900;color:#fff;
                      background:rgba(0,0,0,.25)">${partido.ini}</span>`;
    }
    return `<span style="width:${size}px;height:${size}px;border-radius:50%;
            border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;
            justify-content:center;font-size:${Math.round(size*0.46)}px;font-weight:900;
            color:#fff;background:rgba(0,0,0,.25)">${partido.ini}</span>`;
};
