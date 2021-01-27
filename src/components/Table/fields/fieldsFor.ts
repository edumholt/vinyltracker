import { Field } from './types';

/**
 * Returns a Field representing a property in the overall hierarchy of the TModel
 *
 * @export
 * @template TModel Type of Data Structure for the Field Names to be generated
 * @template TField The generic Field to traverse
 * @param {Field<TModel, unknown>} [parent={ _fieldName: '' }] The optional parent
 * @returns {Field<TModel, TField>} a Field for the specified TModel
 */
export function fieldsFor<TModel, TField = TModel>(
  parent: Field<TModel, unknown> = { _fieldName: '' }
): Field<TModel, TField> {
  return new Proxy(parent, {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    get(target: any, key: any) {
      if (key === '_fieldName') {
        return parent._fieldName;
      }

      /*
        Recursively builds up a period-separated (.) field name. Given the following interface:

        interface Person {
          name: string;
          address: {
            street: string;
          };
          friends: [{
            name: string;
          }];
        }

        fieldsFor<Person>().name._fieldName => 'name'
        fieldsFor<Person>().address.street._fieldName => 'address.street'
        fieldsFor<Person>().friends[0].name._fieldName => 'friends.0.name'
      */
      return fieldsFor({
        _fieldName: [parent._fieldName, key].filter(name => !!name).join('.')
      });
    }
  });
}
