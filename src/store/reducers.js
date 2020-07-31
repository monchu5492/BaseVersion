import C from '../constants.js';

 // gameId, tournamentId, gameName, gameDescription, gameWildalmond

 export const gamesList = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_GAMES:
                    return {
                         games:[], error: null, loading:true
                    }
                case C.FETCH_GAMES_SUCCESS: // return list of games and make loading = false
                    return {
                        ...state,
                        games: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

 export const ownerList = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_OWNER_TOURNAMENTS:
                    return {
                         tournaments:[], error: null, loading:true
                    }
                case C.FETCH_OWNER_TOURNAMENTS_SUCCESS: // return list of tournaments and make loading = false
                    return {
                        ...state,
                        tournaments: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

 export const tournamentsList = (state = {}, action={ type: null }) => {
             switch (action.type) {
                 case C.FETCH_TOURNAMENTS:
                     return {
                          tournaments:[], error: null, loading:true
                     }
                 case C.FETCH_TOURNAMENTS_SUCCESS: // return list of tournaments and make loading = false
                     return {
                         ...state,
                         tournaments: action.payload, error:null, loading: false
                     }
                 default :
                     return state
             }
 }

// https://github.com/rajaraodv/react-redux-blog
// https://medium.com/@rajaraodv/a-guide-for-building-a-react-redux-crud-app-7fe0b8943d0f

export const almond = (state = {}, action={ type: null }) => {
    switch (action.type) {
        case C.CLIENT_PICK:
            return (state.id !== action.id) ? state :
            {
                ...state,
                rating: action.rating
            }
        default :
            return state
    }
}

 export const ownerReportsList = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_OWNER_REPORT:
                    return {
                         reports: [], error: null, loading:true
                    }
                case C.FETCH_OWNER_REPORT_SUCCESS: // return report and make loading = false
                    return {
                        ...state,
                        reports: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

export const score = (state = {}, action={ type: null }) => {
           switch (action.type) {
               case C.SHOW_SCORE:
                   return {
                   }
               default :
                   return state
           }
}

export const squares = (state = {}, action={ type: null }) => {
           switch (action.type) {
               case C.SHOW_SQUARES:
                   return {
                        id: action.id,
                        name: action.name,
                        division: action.division,
                        rank: action.rank,
                        url: action.url,
                        status: action.status
                   }
               default :
                   return state
           }
}

export const almonds = (state = {}, action={ type: null }) => {
           switch (action.type) {
               case C.SHOW_ALMONDS:
                   return {
                        id: action.id,
                        value: action.value,
                        img: action.img
                   }
               default :
                   return state
           }
}

export const player = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_PLAYERNAME:
                    return {
                         playername: [], error: null, loading:true
                    }
                case C.FETCH_PLAYERNAME_SUCCESS: // return time and make loading = false
                    return {
                        ...state,
                        playername: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

export const gameplayers = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_GAMEPLAYERS:
                    return {
                         playernames: [], error: null, loading:true
                    }
                case C.FETCH_GAMEPLAYERS_SUCCESS: // return gamePlayers and make loading = false
                    return {
                        ...state,
                        playernames: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

 export const servertime = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_TIME:
                    return {
                         time: '', error: null, loading:true
                    }
                case C.FETCH_TIME_SUCCESS: // return time and make loading = false
                    return {
                        ...state,
                        time: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

 export const expiretime = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_GAMEEXPIRE:
                    return {
                         expires: '', error: null, loading:true
                    }
                case C.FETCH_GAMEEXPIRE_SUCCESS: // return time and make loading = false
                    return {
                        expires: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}

 export const message = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_MESSAGE:
                    return {
                         text: '', error: null, loading:true
                    }
                case C.FETCH_MESSAGE_SUCCESS: // return message and make loading = false
                    return {
                        text: action.text, error:null, loading: true
                    }
                default :
                    return state
            }
}

 export const videosList = (state = {}, action={ type: null }) => {
            switch (action.type) {
                case C.FETCH_VIDEOS:
                    return {
                         videos:[], error: null, loading:true
                    }
                case C.FETCH_VIDEOS_SUCCESS: // return list of games and make loading = false
                    return {
                        ...state,
                        videos: action.payload, error:null, loading: false
                    }
                default :
                    return state
            }
}
