import PermissionDirective from './PermissionDirective';
import UpperCaseDirective from './UpperCaseDirective';

const schemaDirectives = {
  hasPermission: PermissionDirective,
  upper: UpperCaseDirective,
};

export default schemaDirectives;
