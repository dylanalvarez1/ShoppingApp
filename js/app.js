'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('items', 'items.html', true),
            new Route('cart', 'cart.html'),            
            new Route('profile', 'profile.html')
        ]);
    }
    init();
}());
