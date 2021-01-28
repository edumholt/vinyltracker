import React from 'react';

import { Field, fieldsFor } from './fields';
import { TableProps, TableColumnProps } from './useTable.types';
import { SimpleTable } from './SimpleTable';

/**
 * A Hook capable of generating a Table/Grid component for displaying data within a tabular format
 *
 * @export
 * @template T
 * @param {Array<T>} data - Data to display on the Table/Grid
 * @returns An object containing both the Table and Column components, along with the list of 'fields' available within the generic data
 */
export function useTable<T>(
  data: Array<T> | undefined
): {
  Table: React.FC<TableProps<T>>;
  Column: React.FC<TableColumnProps<T>>;
  fields: Field<T, T>;
} {
  const Table: React.FC<TableProps<T>> = props => {
    const columns: Array<TableColumnProps<T>> = React.Children.map(
      props.children,
      (c: React.ReactElement<TableColumnProps<T>>) => c?.props || undefined
    );

    return (
      <div style={{ width: props.width || 'auto', height: props.height || 'auto' }}>
        <SimpleTable data={data} table={props} columns={columns} />
      </div>
    );
  };

  /**
   * Table Column Component
   * @summary - This is really just a placeholder. It does not render anything on its own
   *  in this implementation, but rather the Props are used within the various Table
   *  Display modes to help define the actual columns to be displayed
   */
  const Column: React.FC<TableColumnProps<T>> = () => {
    return <></>;
  };

  return {
    Table,
    Column,
    fields: fieldsFor<T>()
  };
}
