/**
 *  @author guocailee
 *  @Date   2016-06-29
 */
export default function () {
  var staticMenuItems = []

  this.addStaticItem = function () {
    staticMenuItems.push.apply(staticMenuItems, arguments)
  }

  this.$get = function ($state, layoutSizes) {
    'ngInject'
    return new _factory()

    function _factory () {
      var isMenuCollapsed = shouldMenuBeCollapsed()
      var sidebarEventTarget = null

      this.getMenuItems = function () {
        var states = defineMenuItemStates()
        var menuItems = states.filter(function (item) {
          return item.level === 0
        })

        menuItems.forEach(function (item) {
          var children = states.filter(function (child) {
            return child.level === 1 && child.name.indexOf(item.name) === 0
          })
          item.subMenu = children.length ? children : null
        })
        return menuItems.concat(staticMenuItems)
      }

      this.shouldMenuBeCollapsed = shouldMenuBeCollapsed
      this.canSidebarBeHidden = canSidebarBeHidden

      this.setMenuCollapsed = function (isCollapsed) {
        isMenuCollapsed = isCollapsed
      }
      this.setSidebarEventTarget = function (target) {
        sidebarEventTarget = target
      }

      this.getSidebarEventTarget = function (target) {
        return sidebarEventTarget
      }
      this.isMenuCollapsed = function () {
        return isMenuCollapsed
      }

      this.toggleMenuCollapsed = function () {
        isMenuCollapsed = !isMenuCollapsed
      }

      this.getAllStateRefsRecursive = function (item) {
        var result = []
        _iterateSubItems(item)
        return result

        function _iterateSubItems (currentItem) {
          currentItem.subMenu && currentItem.subMenu.forEach(function (subItem) {
            subItem.stateRef && result.push(subItem.stateRef)
            _iterateSubItems(subItem)
          })
        }
      }

      function defineMenuItemStates () {
        return $state.get()
          .filter(function (s) {
            return s.sidebarMeta
          })
          .map(function (s) {
            var meta = s.sidebarMeta
            return {
              name: s.name,
              title: s.title,
              level: (s.name.match(/\./g) || []).length,
              order: meta.order,
              icon: meta.icon,
              stateRef: s.name
            }
          })
          .sort(function (a, b) {
            return (a.level - b.level) * 100 + a.order - b.order
          })
      }

      function shouldMenuBeCollapsed () {
        return window.innerWidth <= layoutSizes.resWidthCollapseSidebar
      }

      function canSidebarBeHidden () {
        return window.innerWidth <= layoutSizes.resWidthHideSidebar
      }
    }
  }
}
