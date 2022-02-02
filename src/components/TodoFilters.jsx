import React from 'react'
import PropTypes from 'prop-types'

TodoFilters.propTypes = {
    todosFiltered: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,

};

function TodoFilters(props) {
    return (
        <div>
            <div onClick={() => {
                props.setFilter('all');
            }} className="button filter-button " className={`button filter-button ${(props.filter === 'all') ? 'filter-button-active' : ''}`}>All</div>
            <div onClick={() => {
                props.setFilter('active');
            }} className="button filter-button " className={`button filter-button ${(props.filter === 'active') ? 'filter-button-active' : ''}`}>Active</div>
            <div onClick={() => {
                props.setFilter('completed');
            }} className="button filter-button " className={`button filter-button ${(props.filter === 'completed') ? 'filter-button-active' : ''}`}>Completed</div>
        </div>)
};

export default TodoFilters;