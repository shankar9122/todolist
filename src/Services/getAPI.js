let baseUrl ='https://reqres.in/api/'

function loadingShow(hidden) {
    let loading = document.getElementById('loading');
    loading.style.display = hidden;
  }
export const getAPI = (type) => {
    loadingShow('block')
    return fetch(baseUrl + type, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((Response) => {
        loadingShow('none')
        return Response.json()
    }).catch((err) => {
        loadingShow('none')
        throw err;
    });
}