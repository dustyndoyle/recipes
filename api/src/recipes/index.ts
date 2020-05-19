import {pool as db} from '../queries';

const getRecipes = (req, res) => {
    db.query('SELECT * FROM recipes ORDER BY id ASC', (err, results) => {
        if( err ) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};

const getRecipeById = ( req, res ) => {
    const id = parseInt(req.params.id);

    db.query('SELECT recipes.id, recipes.name, recipes.description, recipes.user_id, recipe_data.ingredients, recipe_data.instructions FROM recipes INNER JOIN recipe_data ON recipes.id = recipe_data.recipe_id WHERE recipes.id = $1', [id], (err, results) => {
        if( err ) {
            throw err;
        }
        res.status(200).json(results.rows);
    });
};

const createRecipe = (req, res) => {
    const { recipe_name, recipe_description, recipe_ingredients, recipe_instructions } = req.body;

    db.query('WITH new_recipe AS ( INSERT INTO recipes (name, description, user_id) VALUES ($1,$2,$3) RETURNING id ) INSERT INTO recipe_data (recipe_id, ingredients, instructions) VALUES ((SELECT id FROM new_recipe), $4, $5) RETURNING *', [recipe_name, recipe_description, 1, JSON.stringify(recipe_ingredients), JSON.stringify(recipe_instructions)], ( err, result ) => {
        if( err ) {
            throw err;
        }
        res.status(201).json( result.rows[0] );
    });
};

const updateRecipe = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, description} = req.body;

    db.query('UPDATE recipes SET name = $1, description = $2 WHERE id = $3', [name, description, id], (err, result) => {
        if(err) {
            throw err;
        }
        res.status(200).send(`Recipe modified with ID: ${id}`);
    });
};

const deleteRecipe = (req, res) => {
    const id = parseInt(req.params.id);

    db.query('DELETE FROM recipes WHERE id = $1', [id], (err, result) => {
        if( err ) {
            throw err;
        }
        res.status(200).send(`Recipe deleted with ID: ${id}`);
    });
};


module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};