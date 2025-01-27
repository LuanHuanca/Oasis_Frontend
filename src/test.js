const axios = require('axios');

// Configura las credenciales de autenticación para la API de Management de Auth0
const domain = 'dev-m86g11saqqjog6oc.us.auth0.com'; // Reemplaza 'TU_DOMINIO' con tu propio dominio de Auth0
const clientId = 'KLOz52uRTAlCZeWN97CMPGZI1Z0ykRJt'; // Reemplaza 'TU_CLIENT_ID' con el ID de tu cliente de Auth0
const clientSecret = '_M1JIaJu6aVxDnSXdTi5PfzowxUr2lBaPLveGEiVOABRTDk7i3dv9LlN0RQx6J6L'; // Reemplaza 'TU_CLIENT_SECRET' con el secreto de tu cliente de Auth0

// Función para registrar un nuevo usuario en Auth0
async function registerUser(email, password) {
    try {
        // Realiza una solicitud para obtener un token de acceso
        const tokenResponse = await axios.post(`https://${domain}/oauth/token`, {
            client_id: clientId,
            client_secret: clientSecret,
            audience: `https://${domain}/api/v2/`,
            grant_type: 'client_credentials',
        });

        // Extrae el token de acceso del cuerpo de la respuesta
        const accessToken = tokenResponse.data.access_token;

        // Realiza una solicitud para crear un nuevo usuario
        const createUserResponse = await axios.post(`https://${domain}/api/v2/users`, {
            email: email,
            password: password,
            connection: 'Username-Password-Authentication', // Cambia esto según el tipo de conexión que estés utilizando en Auth0
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // Devuelve la respuesta del servidor
        return createUserResponse.data;
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el proceso
        console.error('Error al registrar el usuario:', error.response.data);
        throw error;
    }
}

// Ejemplo de uso
registerUser('ejemplo@example.com', 'contraseña123')
    .then(user => {
        console.log('Usuario registrado con éxito:', user);
    })
    .catch(error => {
        console.error('Error al registrar el usuario:', error);
    });
