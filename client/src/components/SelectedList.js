import React, {useContext} from 'react';
import {Context} from '../logic/DataProvider';
import ShoppingList from './ShoppingList'

function SelectedList() {

    return (
    <React.Fragment>

        <ShoppingList />
        {/* found list */}
    </React.Fragment>
  )
}

export default SelectedList