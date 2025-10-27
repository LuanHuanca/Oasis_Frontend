import { createStore } from 'vuex';

interface CartItem {
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
}
interface State {
  correoTemp: string;
  loggedIn: boolean;
  user: any;
  rol: any;
  id: any;
  randomCode: string;
  selectedCity: string;
  cartItems: CartItem[];
  admin:boolean;
  correo: string; // Agregar el campo correo
  sidebarPermisos: string[];
  // Overrides frontend por adminId: si existe se usan en la UI en vez de lo que venga del backend
  sidebarOverrides: { [adminId: string]: Array<{ idPermiso: number; permiso: string }> };
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
    correo: '', // Inicializar el campo correo
    correoTemp: '',
    // Permisos que usa la sidebar en el frontend (se puede poblar desde la API o localmente)
    sidebarPermisos: [] as string[],
    // Overrides frontend por adminId (inicialmente vacío)
    sidebarOverrides: {},
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
    setCorreoTemp(state, correo) {
      state.correoTemp = correo;
    },
    setCorreo(state, correo) {
      state.correo = correo;
    },
    setSidebarPermisos(state, permisos: string[]) {
      state.sidebarPermisos = permisos;
    },
    addSidebarPermisos(state, permisos: string[]) {
      const set = new Set(state.sidebarPermisos || []);
      permisos.forEach(p => set.add(p));
      state.sidebarPermisos = Array.from(set);
    },
    setSidebarOverride(state, payload: { adminId: string | number; permisos: Array<{ idPermiso: number; permiso: string }> }) {
      if (!state.sidebarOverrides) state.sidebarOverrides = {};
      state.sidebarOverrides[String(payload.adminId)] = payload.permisos;
    },
    clearSidebarOverride(state, adminId: string | number) {
      if (state.sidebarOverrides) delete state.sidebarOverrides[String(adminId)];
    },

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
