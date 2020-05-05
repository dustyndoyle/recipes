const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const recipes = require('./recipes');
const users = require('./users');
const port = 8080;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use( cors( corsOptions ) );
app.use( bodyParser.json() );
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get( '/', (req, res) => {
    res.json({ info: 'This is a standard recipe port' });
});

app.get( '/recipes', recipes.getRecipes );
app.get( '/recipes/:id', recipes.getRecipeById );
app.post( '/recipes', recipes.createRecipe );
app.put( '/recipes/:id', recipes.updateRecipe );
app.delete( '/recipes/:id', recipes.deleteRecipe );
app.get( '/users', users.getUsers );
app.get( '/users/:id', users.getUserById );
app.post( '/users', users.createUser );
app.put( '/users/:id', users.updateuser );
app.delete( '/users/:id', users.deleteUser );

app.listen( port, err => {

    if( err ) {
        return console.error( err );
    }

    return console.log( `App running on port ${port}`);
});