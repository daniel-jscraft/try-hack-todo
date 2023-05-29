import React, { useState } from 'react';
import Constants from '../../etc/Constants';

function StatusFilter({onStatusFilterChange, statusFilter}) {
  return (
        <>
            <input
                type="radio"
                name="statusFilter"
                value={Constants.statusFilterAll}
                id="all"
                checked={statusFilter === Constants.statusFilterAll}
                onChange={() => onStatusFilterChange(Constants.statusFilterAll)}
            />
            <label htmlFor="regular">Show all</label>

            <input
                type="radio"
                name="statusFilter"
                value={Constants.statusFilterCompleted}
                id="completed"
                checked={statusFilter === Constants.statusFilterCompleted}
                onChange={() => onStatusFilterChange(Constants.statusFilterCompleted)}
            />
            <label htmlFor="completed">Completed only</label>

            <input
                type="radio"
                name="statusFilter"
                value={Constants.statusFilterUncompleted}
                id="uncompleted"
                checked={statusFilter === Constants.statusFilterUncompleted}
                onChange={() => onStatusFilterChange(Constants.statusFilterUncompleted)}
            />
            <label htmlFor="uncompleted">Uncompleted only</label>
        </>
    );
}

export default StatusFilter;
