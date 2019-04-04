import PermissionDirective from './PermissionDirective';
import UpperCaseDirective from './UppercaseDirective';

const schemaDirectives = {
  hasPermission: PermissionDirective,
  upper: UpperCaseDirective,
};

export default schemaDirectives;
