import React, { ReactElement } from 'react';
import { Shimmer } from '@fluentui/react';
import get from 'lodash/get';

import { TableDisplayModeProps, TableColumnProps } from './useTable.types';

import styles from './SimpleTable.module.css';

/**
 * A Simple HTML Table - Minimal functionality is supported
 *
 * @export
 * @template T
 * @param {TableDisplayModeProps<T>} props Table Mode Properties
 * @returns HTML Table
 */
export function SimpleTable<T>(props: TableDisplayModeProps<T>): ReactElement {
  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          {props.columns?.map((column: TableColumnProps<T>, columnIndex: number) => (
            <th key={columnIndex} style={{ width: column.width || 'auto', textAlign: column.alignment }}>
              {column.title?.trim() || column.field?._fieldName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {/* Display Shimmer Rows */}
        {!props.data && (
          <tr>
            {props.columns?.map((column: TableColumnProps<T>, columnIndex: number) => (
              <td key={columnIndex}>
                <Shimmer />
              </td>
            ))}
          </tr>
        )}

        {/* Output the Data into Rows and Columns */}
        {props.data?.map((data: T, rowIndex: number) => {
          const ruleClasses =
            props.table.rowClassRules &&
            Object.keys(props.table.rowClassRules).filter(
              rule => props.table.rowClassRules && props.table.rowClassRules[rule](data)
            );

          return (
            props.columns &&
            props.columns.length > 0 && (
              <tr
                key={rowIndex}
                onClick={() => props.table.onRowClick && props.table.onRowClick(data)}
                style={{ cursor: props.table.onRowClick && 'pointer' }}
                className={ruleClasses && ruleClasses.join(' ')}>
                {props.columns.map((column: TableColumnProps<T>, columnIndex: number) => {
                  let content: React.ReactNode = <></>;

                  // The Column's cellRenderer prop, if present, takes precedence
                  if (column.cellRenderer) {
                    content = <>{column.cellRenderer(data)}</>;
                  } else {
                    if (column.field && column.valueFormatter) {
                      content = <>{column.valueFormatter(get(data, column.field._fieldName))}</>;
                    }
                    if (column.field && !column.valueFormatter) {
                      content = <>{get(data, column.field._fieldName)?.toString()}</>;
                    }
                  }

                  return (
                    <td key={columnIndex} style={{ textAlign: column.alignment }}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            )
          );
        })}

        {/* Handle situations where no data records exist */}
        {props.data && props.data.length === 0 && (
          <tr>
            <td colSpan={props.columns.length} className={styles.empty}>
              No records to display...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
