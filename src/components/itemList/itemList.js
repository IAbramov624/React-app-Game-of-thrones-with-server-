import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from "../spinner";
import PropTypes from "prop-types";


function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
    }, []);

    function renderItems(arr) {
        return arr.map((item, i) => { //return возвращает в рендер, нет переменной

            const label = renderItem(item);
            const id = item.id;
            
            return ( //return возвращает в return arr.map, нет переменной
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner />
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>         
    );
}

export default ItemList;

