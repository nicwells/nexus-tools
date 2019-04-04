import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLField, GraphQLObjectType } from 'graphql';

export default class HasPermissionDirective extends SchemaDirectiveVisitor {
  public visitObject(type: GraphQLObjectType<any, any>) {
    console.log('plop');
    // @ts-ignore
    type._requiredPermission = this.args.permission;
  }
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { permission } = this.args;
    console.log('do you have ', permission);
    field.resolve = () => true;
  }
}
