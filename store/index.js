export const state = () =>({
    sessionToken: ''
})

export const mutations = {
    setToken(state,value){
        console.log('set_session_token', value)
        state.sessionToken = value
    }
}
export const getters = {
    getSessionToken(state){
        return state.sessionToken
    }
}
