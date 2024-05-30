/* *
 *
 *  Data Grid class
 *
 *  (c) 2020-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import DataGridColumn from './DataGridColumn';
import DataGridRow from './DataGridRow';


/* *
 *
 *  Class
 *
 * */

/**
 * Represents a cell in the data grid.
 */
class DataGridCell {

    /* *
    *
    *  Properties
    *
    * */

    /**
     * The HTML element of the cell.
     */
    public htmlElement: HTMLTableCellElement;

    /**
     * The column of the cell.
     */
    public column: DataGridColumn;

    /**
     * The row of the cell.
     */
    public row: DataGridRow;


    /* *
    *
    *  Constructor
    *
    * */

    /**
     * Constructs a cell in the data grid.
     *
     * @param column The column of the cell.
     * @param row The row of the cell.
     */
    constructor(column: DataGridColumn, row: DataGridRow) {
        this.htmlElement = document.createElement('td');

        this.column = column;
        this.column.registerCell(this);

        this.row = row;
        this.row.registerCell(this);

        this.htmlElement.addEventListener(
            'mouseenter', this.onMouseEnter.bind(this)
        );
        this.htmlElement.addEventListener(
            'mouseout', this.onMouseOut.bind(this)
        );
    }


    /* *
    *
    *  Methods
    *
    * */

    /**
     * Renders the cell.
     */
    public render(): void {
        if (!this.column.data) {
            return;
        }

        const cellData = this.column.data[this.row.index];

        this.htmlElement.innerText = '' + cellData;
        this.row.htmlElement.appendChild(this.htmlElement);
    }

    /**
     * Reflows the cell dimensions.
     */
    public reflow(): void {
        this.htmlElement.style.width =
            this.htmlElement.style.maxWidth = this.column.getWidth() + 'px';
    }

    private onMouseEnter(): void {
        this.row.setHover(true);
        this.column.setHover(true);
    }

    private onMouseOut(): void {
        this.row.setHover(false);
        this.column.setHover(false);
    }

    /* *
    *
    *  Static Methods
    *
    * */

}


/* *
 *
 *  Class Namespace
 *
 * */

namespace DataGridCell {

}


/* *
 *
 *  Default Export
 *
 * */

export default DataGridCell;
