import  { SearchService } from './search_service.js';
import { RouterHistory } from './router-history.js';
import { ProductsView } from '../products/products-view.js';
import { ProductsModel } from '../products/products-model.js';
import { CartModel } from '../cart/cart-model.js';
import { CartView } from '../cart/cart-view.js';
import { AppController } from './app-controller.js';
import { LoginModel } from '../login/login-model.js';
import { LoginView } from '../login/login-view.js';
import { AboutModel } from '../about/about-model.js';
import { AboutView } from '../about/about-view.js';
import { NewsModel } from '../news/news-model.js';
import { NewsView } from '../news/news-view.js';



window.addEventListener('load', () => {
    const searchService = new SearchService();
    const routerHistory = new RouterHistory();
    const productsModel = new ProductsModel();
    const productsView = new ProductsView();
    const cartModel = new CartModel();
    const cartView = new CartView();
    const loginModel = new LoginModel();
    const loginView = new LoginView();
    const aboutModel = new AboutModel();
    const aboutView = new AboutView();
    const newsModel = new NewsModel();
    const newsView = new NewsView();





   const controller = new AppController(searchService, routerHistory, productsModel, productsView,
       cartModel, cartView, loginModel, loginView, aboutModel, aboutView, newsModel, newsView);
});
