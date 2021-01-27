/**
 * Actual (period-separated) name of TField from its location within type TModel
 */
export type FieldName = {
  _fieldName: string;
};

/**
 * Generic type representing a property of TField from within an object of type TModel
 */
export type Field<TModel, TField> = FieldName &
  {
    [TKey in keyof TField]-?: Field<TModel, TField[TKey]>;
  };
