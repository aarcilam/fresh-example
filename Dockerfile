# Usa una imagen base de Deno
FROM denoland/deno:2.0.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de configuración y las dependencias
COPY . .

# Declarar un volumen para la base de datos SQLite
VOLUME ["/app/db"]

# Permite el acceso a la red y lectura/escritura de archivos
RUN deno cache main.ts

# Expone el puerto de la aplicación
EXPOSE 8000

# Comando para ejecutar la aplicación
CMD ["run", "-A", "main.ts"]
