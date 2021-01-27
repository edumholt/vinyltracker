import { Field } from './fields';

/**
 * The values that a TableColumn 'alignment' prop can have
 * @export
 */
export type TableColumnAlignment = 'start' | 'end' | 'left' | 'center' | 'right' | 'justify' | 'match-parent';

/**
 * Column-specific Properties
 * @export
 * @interface TableColumnProps
 * @template T
 */
export interface TableColumnProps<T> {
  field?: Field<T, unknown>;
  title?: string;
  width?: string;
  alignment?: TableColumnAlignment;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueFormatter?: (value: any) => string | undefined;
  cellRenderer?: (row: T) => React.ReactElement | undefined;
}

/**
 * Table-specific Properties
 * @export
 * @interface TableProps
 * @template T
 */
export interface TableProps<T> {
  width?: string;
  height?: string;
  children: React.ReactElement<TableColumnProps<T>> | React.ReactElement<TableColumnProps<T>>[];
  onRowClick?: (data: T) => void;
  rowClassRules?: {
    [cssClassName: string]: (data: T) => boolean;
  };
}

/**
 * Properties for Table (Mode) Implementations (encompasses all of the properties that a Table would need to render its content)
 * @export
 * @interface TableDisplayModeProps
 * @template T
 */
export interface TableDisplayModeProps<T> {
  data: Array<T> | undefined;
  table: TableProps<T>;
  columns: Array<TableColumnProps<T>>;
}
