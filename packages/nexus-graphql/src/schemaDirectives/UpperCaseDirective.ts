import { SchemaDirectiveVisitor } from 'graphql-tools';
import {
  GraphQLField,
  defaultFieldResolver,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLScalarType,
} from 'graphql';

/**
 * Ensure a string-valued field is converted to upper-case
 */
export default class UpperCaseDirective extends SchemaDirectiveVisitor {
  public visitSchema(schema: GraphQLSchema) {
    console.log('visit schema', schema);
  }

  public visitScalar(scalar: GraphQLScalarType) {
    console.log('visit scalar', scalar);
  }

  public visitObject(type: GraphQLObjectType<any, any>) {
    console.log('visit object', type);
  }

  public visitFieldDefinition(field: GraphQLField<any, any>) {
    console.log('visit field def', field);
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}
