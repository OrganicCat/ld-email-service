export const searchService = (name) => fetch(`https://trunkclub-ui-takehome.now.sh/search/${name}`, {
        method: 'GET',
        mode: 'cors'
    })
    .then(res => res.json())