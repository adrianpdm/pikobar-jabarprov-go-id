
export const state = () => ({
  items: null,
  metadata: null,
  isLoading: true
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setMetadata (state, item) {
    state.metadata = item
  },
  setIsLoading (state, item) {
    state.isLoading = item
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    commit('setIsLoading', true)
    const { data } = await this.$dashboardPikobarApi.get('v2/kasus/nasional')
    commit('setItems', data.data)
    commit('setMetadata', data.metadata)
    commit('setIsLoading', false)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  },
  metadataMap (state) {
    return state.metadata
  },
  isLoading (state) {
    return state.isLoading
  }
}
