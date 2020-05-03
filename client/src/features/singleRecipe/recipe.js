import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

export default class Recipe extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const recipeId = this.props.match.params.id;
        return (
            <div className="recipe-container">
                THIS RECIPE is { recipeId }
            </div>
        )
    }
}