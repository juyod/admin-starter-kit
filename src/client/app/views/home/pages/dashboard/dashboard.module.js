/**
 *  @author guocailee
 *  @Date   2016-06-29
 */
import './dashboard.scss'
import dashboardHtml from 'ngtemplate!html!./dashboard.html'

function routeConfig ($stateProvider) {
  'ngInject'
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: dashboardHtml,
      title: '首页',
      sidebarMeta: {
        icon: 'fa fa-home',
        order: 0
      }
    })
}

export default angular.module('zk.pages.dashboard', [])
  .config(routeConfig).name
