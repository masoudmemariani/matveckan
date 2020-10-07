import React, { useState } from 'react';
import MealDisplayer from '../components/MealDisplayer';


function MenuDisplayer (props) {

    const [indexOfOpenRecipe, setIndexOfOpenRecipe] = useState(null);

    const openRecipe = (recipe) => {
        setIndexOfOpenRecipe(recipe);
    }

    const closeRecipe = () => {
        setIndexOfOpenRecipe(null);
    }

    const reloadMenu = () => {
        props.reloadMenu();
        closeRecipe();
    }

    const menu = props.menu.map((meal, index) => 
            (
            <MealDisplayer 
                key={meal.index} 
                weekday={index + 1}
                meal={meal} 
                indexOfOpenRecipe={indexOfOpenRecipe}
                openRecipe={() => openRecipe(meal.index)}
                closeRecipe={() => closeRecipe()}/>
            )
        )

    const reloadButtonText = props.menu.length ? "Nytt menyförslag" : "Visa menyförslag";

        return (
        <div className="component-resizer">
            <div className="menu-displayer">
                <button className="menu-displayer-reload-button" onClick={reloadMenu}>{reloadButtonText}</button>
                    {menu}
            </div>
        </div>
        )
}

export default MenuDisplayer;