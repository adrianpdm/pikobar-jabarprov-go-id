
export const state = () => ({
  items: null,
  isLoading: false
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setIsLoading (state, item) {
    state.isLoading = item
  }
}

export const actions = {
  async getItems ({ commit }, options = {
    params: {
      wilayah: 'kota'
    }
  }) {
    commit('setIsLoading', true)
    const { data } = await this.$dashboardPikobarApi.get('v2/kasus/mingguan', options)
    commit('setItems', data.data)
    commit('setIsLoading', false)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  },
  isLoading (state) {
    return state.isLoading
  }
}
