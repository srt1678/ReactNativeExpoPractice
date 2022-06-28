export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const GET_CITIES = 'GET_CITIES';

const API_URL = 'https://mocki.io/v1/bdd5a3ee-adc3-4862-8717-c8beb36d67f9';

export const getCities = () => {
    try{
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const json = await result.json();
            if(json){
                dispatch({
                    type: GET_CITIES,
                    payload: json
                })
            }else{
                console.log('Unable to fetch');
            }
        }
    }catch(error){
        console.log(error)
    }
}

export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name,
    })
}

export const setAge = age => dispatch => {
    dispatch({
        type: SET_USER_AGE,
        payload: age,
    })
}

export const increaseAge = age => dispatch => {
    dispatch({
        type: INCREASE_AGE,
        payload: age,
    })
}