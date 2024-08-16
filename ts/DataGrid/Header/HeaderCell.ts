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
 *  - Sebastian Bochan
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import Cell from '../Cell.js';
import Column from '../Column';
import Row from '../Row';
import DGUtils from '../Utils.js';
import Globals from '../Globals.js';
import Templating from '../../Core/Templating.js';
import ColumnSorting from './../Actions/ColumnSorting.js';

const { format } = Templating;
const { makeHTMLElement } = DGUtils;


/* *
 *
 *  Class
 *
 * */

/**
 * Represents a cell in the data grid header.
 */
class HeaderCell extends Cell {

    /* *
    *
    *  Properties
    *
    * */

    /**
     * The HTML element of the header cell content.
     */
    public headerContent?: HTMLElement;

    /* *
    *
    *  Constructor
    *
    * */

    /**
     * Constructs a cell in the data grid header.
     *
     * @param column
     * The column of the cell.
     *
     * @param row
     * The row of the cell.
     */
    constructor(column: Column, row: Row) {
        super(column, row);
        column.header = this;
    }

    /* *
    *
    *  Methods
    *
    * */

    /**
     * Init element.
     */
    public override init(): HTMLTableCellElement {
        const elem = document.createElement('th', {});
        elem.classList.add(Globals.classNames.headerCell);
        return elem;
    }

    /**
     * Render the cell container.
     */
    public override render(): void {
        const column = this.column;
        const isSingleColumn = this.row.viewport.getColumn(this.column.id);
        
        this.value = column.userOptions.headerFormat ? (
            format(column.userOptions.headerFormat, column)
        ) : column.id;

        // Render th elements
        this.row.htmlElement.appendChild(this.htmlElement);
        this.headerContent = makeHTMLElement('div', {
            className: Globals.classNames.headerCellContent
        }, this.htmlElement);

        makeHTMLElement('span', {
            innerText: this.value
        }, this.headerContent);

        // Set the accessibility attributes.
        this.htmlElement.setAttribute('scope', 'col');
        this.htmlElement.setAttribute('data-column-id', column.id);

        if (column.index === 0) {
            this.htmlElement.classList.add(Globals.classNames.columnFirst)
        }
 
        if (isSingleColumn) {
            // Add resizing
            this.column.viewport.columnsResizer?.renderColumnDragHandles(
                this.column,
                this
            );

            // Add API click event
            this.initColumnClickEvent();

            // Add sorting
            this.initColumnSorting();
        }
    }

    /**
     * Add click event to the header
     */
    private initColumnClickEvent(): void {
        const column = this.column;
        const vp = column.viewport;
        const dataGrid = vp.dataGrid;

        if (
            !this.htmlElement ||
            !dataGrid.options?.events?.header?.click
        ) {
            return;
        }

        const onHeaderClick = (): void => {
            dataGrid.options?.events?.header?.click?.call(
                column
            );
        };

        vp.header?.addHeaderEvent(
            this.htmlElement,
            onHeaderClick
        );

        this.headerContent?.addEventListener('click', onHeaderClick);
    }

    /**
     * Add sorting option to the column.
     */
    private initColumnSorting(): void {
        const { column } = this;

        column.sorting = new ColumnSorting(
            column,
            this.htmlElement
        );
    }
}


/* *
 *
 *  Class Namespace
 *
 * */

namespace HeaderCell {

}


/* *
 *
 *  Default Export
 *
 * */

export default HeaderCell;