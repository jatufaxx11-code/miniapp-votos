"""
optimizar_logos.py
Redimensiona y convierte todos los logos PNG a WebP optimizado.
Maximo 120x120 px, calidad 82, fondo blanco si imagen RGBA.
"""
import sys, os, pathlib
# Forzar salida UTF-8 en Windows
sys.stdout.reconfigure(encoding='utf-8')

from PIL import Image

LOGOS_DIR = pathlib.Path(__file__).parent
MAX_SIZE  = (120, 120)
QUALITY   = 82

logos = sorted(LOGOS_DIR.glob("*.png"))
if not logos:
    print("No se encontraron archivos PNG.")
    sys.exit()

print(f"{'Archivo':<30} {'Original':>10} {'Optimizado':>10} {'Ahorro':>8}")
print("-" * 62)

for src in logos:
    try:
        img = Image.open(src)

        # Convertir a RGB (WebP sin transparencia, fondo blanco)
        if img.mode == "RGBA":
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode == "P":
            img = img.convert("RGBA")
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Redimensionar manteniendo aspecto
        img.thumbnail(MAX_SIZE, Image.LANCZOS)

        # Guardar WebP
        dst = src.with_suffix(".webp")
        img.save(dst, "WEBP", quality=QUALITY, method=6)

        orig_kb = src.stat().st_size / 1024
        opt_kb  = dst.stat().st_size / 1024
        ahorro  = (1 - opt_kb / orig_kb) * 100
        print(f"{src.name:<30} {orig_kb:>9.1f}K {opt_kb:>9.1f}K {ahorro:>7.0f}%")

    except Exception as e:
        print(f"ERROR en {src.name}: {e}")

print("-" * 62)
print("OK - Archivos .webp generados en logos/")
