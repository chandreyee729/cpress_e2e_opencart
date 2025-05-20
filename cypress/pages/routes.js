const routes = 
  {
    home_url: '/',
    login_url: '/index.php?route=account/login',
    register_url: '/index.php?route=account/register',
    homepage_url: '/index.php?route=common/home',
    cart_url: '/index.php?route=checkout/cart',
    add_to_cart_url: '/index.php?route=checkout/cart/add', 
    checkout_url: '/index.php?route=checkout/checkout',
    account_url: '/index.php?route=account/account',
    account_created_url: '/index.php?route=account/success',
    cart_info: '**/index.php?route=common/cart/info',
    remove_from_cart_url:'/index.php?route=checkout/cart/remove',
    wishlist_info: '/index.php?route=account/wishlist',
    remove_from_wishlist_url: '/index.php?route=account/wishlist&remove'   
  };



  export default routes;
