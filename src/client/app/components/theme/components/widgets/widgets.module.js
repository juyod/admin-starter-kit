/**
 *  @author guocailee
 *  @Date   2016-06-29
 */
import './widgets.scss'
import zkWidgets from './widgets.directive'
export default angular.module('zk.theme.components.widgets', [])
  .directive('zkWidgets', zkWidgets).name
