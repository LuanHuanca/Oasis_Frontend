import { createStore } from 'vuex';

interface CartItem {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
}
interface State {
  loggedIn: boolean;
  user: any;
  rol: any;
  id: any;
  randomCode: string;
  selectedCity: string;
  cartItems: CartItem[];
  admin:boolean;
  correo: string; // Agregar el campo correo
}


const store = createStore<State>({
  state: {
    loggedIn: false,
    user: null,
    randomCode: '',
    rol: false,
    id: null,
    selectedCity:'all',
    cartItems: [],
    admin: false,
    correo: '' // Inicializar el campo correo
  },
  mutations: {
    setLoggedIn(state, value: boolean) {
      state.loggedIn = value;
    },
    setAdmin(state, value: boolean) {
      state.admin = value;
    },
    setUser(state, user: any) {
      state.user = user;
    },
    setRol(state, rol: any) {
      state.rol = rol;
    },
    setId(state, id: any) {
      state.id = id;
    },
    getUser(state) {
        return state.user;
    },
    getRol(state) {
        return state.rol;
    },
    getId(state) {
        return state.id;
    },
    setRandomCode(state, code: string) {
      state.randomCode = code;
    },
    setSelectedCity(state, city) {
      state.selectedCity = city;
    },
    //para el carrito
    addToCart(state, item: CartItem) {
      state.cartItems.push(item);
    },
    removeFromCart(state, index: number) {
      state.cartItems.splice(index, 1);
    },
    clearCart(state) {
      state.cartItems = [];
    },
    setCorreo(state, correo: string) { // Agregar la mutación para actualizar el correo
      state.correo = correo;
    }
  },
  actions: {
    updateSelectedCity({ commit }, city) {
      commit('setSelectedCity', city);
    },
    //para el carrito
    addToCart({ commit }, item: CartItem) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, index: number) {
      commit('removeFromCart', index);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
  },
  getters: {
    selectedCity: state => state.selectedCity,
    cartItems: state => state.cartItems,
  }
});

export default store;
