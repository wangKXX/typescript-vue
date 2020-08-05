import { MutationTree, ActionTree } from "vuex";

interface States {
  menuItems: object[],
}

const states: States = {
  menuItems: [],
};


const Mutations: MutationTree<any> = {
  SET_MENU_ITEMS(state: any, pyload: any): void {
    state.menuItems = pyload;
  },
};

const Actions: ActionTree<States, any> = {
  _fetch_menu_items({ commit, rootState }, params: any) {
    console.log(123);
  },
};
