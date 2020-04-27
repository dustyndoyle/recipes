import {pool as db} from '../queries';

const getUsers = (req, res) => {
    db.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if( err ) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = ( req, res ) => {
    const id = parseInt(req.params.id);

    db.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
        if( err ) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};

const createUser = (req, res) => {
    const { username, email } = req.body;

    db.query('INSERT INTO users (username, email) VALUES ($1,$2)', [username, email], (err, result) => {
        console.log( result );
        if( err ) {
            throw err;
        }
        res.status(201).send(`User added with ID: ${result.insertId}`);
    });
};

const updateuser = (req, res) => {
    const id = parseInt(req.params.id);
    const {username, email} = req.body;

    db.query('UPDATE users SET username = $1, email = $2 WHERE id = $3', [username, email, id], (err, result) => {
        if(err) {
            throw err;
        }
        res.status(200).send(`User modified with ID: ${id}`);
    });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
        if( err ) {
            throw err;
        }
        res.status(200).send(`User deleted with ID: ${id}`);
    });
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateuser,
    deleteUser
};