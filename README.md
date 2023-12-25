# Hol4 Mund0 (fronted)

Creado con Nextjs

[Visitar página](https://hol4mund0.vercel.app/)

### Instalación

```
git clone https://github.com/raulodev/hol4mund0-fronted.git
```

```
cd hol4mund0-fronted/
```

### Crear un archivo (.env) con las siguientes variables de entorno:

`GITHUB_ID` : ID de tu aplicación de GitHub obtener [aqui](https://github.com/settings/apps/)

`GITHUB_SECRET` : Secreto de tu aplicación de GitHub obtener [aqui](https://github.com/settings/apps/)

`TWITTER_CLIENT_ID` : Clave de consumo de tu aplicación de Twitter para obtener esta [visitar portal de desarrollador](https://developer.twitter.com/en/portal/dashboard)

`TWITTER_CLIENT_SECRET` : Clave de consumo secreta de tu aplicación de Twitter para obtener [visitar portal de desarrollador](https://developer.twitter.com/en/portal/dashboard)

`NEXTAUTH_URL` : Url del sitio web donde corre la aplicación (No es necesario en Vercel)

Ejemplo:

```
NEXTAUTH_URL=https://miblog.com
```

`NEXTAUTH_SECRET` : Clave secreta para NextAuthjs

Comando para generar el secreto:

```
openssl rand -base64 32
```

### Actualizar baseUrl del api

ir a `src/services/api-client.js` y cambiar el valor de `baseURL` por el host de tu api

### Levantar servidor

servidor de producción

```
npm run build
```

```
npm run start
```

Servidor de desarrollo

```
npm run dev
```
