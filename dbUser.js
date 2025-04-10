const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        // In a production environment, you should properly configure SSL certificates.
        rejectUnauthorized: false
    }
});

async function getUsers() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM usuarios');
        return result.rows;
    } finally {
        client.release();
    }
}

async function verifyUser(username, password) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM usuarios WHERE nombre = $1 AND password = $2', [username, password]);
        return result.rows.length > 0;
    } catch {
        console.error('Verifica el usuario y la contraseña', error);
        return false;

    } finally {
        client.release();
    }
}
async function getMedicamentos() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM medicamentos');
        return result.rows;
    } finally {
        client.release();
    }
}

async function getDetMedicamento(id) {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM medicamentos WHERE id_medicamento = $1', [parseInt(id, 10)]);
        return result.rows[0]; // Devuelve el primer resultado encontrado (o null si no hay resultados)
    } catch (error) {
        console.error('Error al obtener el detalle del medicamento', error);
        throw error;
    } finally {
        client.release();
    }
}

async function addMedicamento(nombre, categoria, tipo, componente, uso) {
    const client = await pool.connect();
    try {
        console.log('Intentando insertar:', { nombre, categoria, tipo, componente, uso });
        
        // Verificar si algún valor es nulo o undefined
        if (!nombre || !categoria || !tipo || !componente || !uso) {
            throw new Error('Todos los campos son obligatorios');
        }

        const query = 'INSERT INTO medicamentos (nombre, categoria, tipo, componente, uso) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nombre, categoria, tipo, componente, uso];
        
        const result = await client.query(query, values);
        
        console.log('Resultado de la inserción:', result.rows[0]);
        
        return result.rows[0]; // Retorna la fila insertada
    } catch (error) {
        console.error('Error en addMedicamento:', error);
        throw error; // Re-lanza el error para manejarlo en el nivel superior
    } finally {
        client.release();
    }
}


async function getCategoria() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT DISTINCT categoria FROM medicamentos');
        return result.rows;
    } finally {
        client.release();
    }
}

async function getTipo() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT DISTINCT tipo FROM medicamentos');
        return result.rows;
    } finally {
        client.release();
    }
}

async function deleteMedicamento(id) {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM medicamentos WHERE id_medicamento = $1', [parseInt(id, 10)]);
        return result.rowCount > 0;
    } finally {
        client.release();
    }   
}

async function updateMedicamento(id, nombre, categoria, tipo, componente, uso) {
    const client = await pool.connect();
    try {
        const query = 'UPDATE medicamentos SET nombre = $1, categoria = $2, tipo = $3, componente = $4, uso = $5 WHERE id_medicamento = $6 RETURNING *';
        const values = [nombre, categoria, tipo, componente, uso, parseInt(id, 10)];
        const result = await client.query(query, values);
        
        if (result.rows.length > 0) {
            return result.rows[0]; // Devuelve el medicamento actualizado
        } else {
            return null; // Devuelve null si no se encontró el medicamento
        }
    } catch (error) {
        console.error('Error al actualizar el medicamento:', error);
        throw error;
    } finally {
        client.release();
    }
}
    

module.exports = {
    verifyUser,
    getMedicamentos,
    getUsers,
    getDetMedicamento,
    addMedicamento,
    getCategoria,
    getTipo,
    deleteMedicamento,
    updateMedicamento
};