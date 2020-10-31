


const API = {
    endpoint: 'https://gateway.marvel.com/v1/public/characters',
    publicKey: '7709388b98595ae2f784318525aa2096',
    privateKey: '3b983a1310e1d25343458a4e4b3e3ab771a66b67',
    hash: '4c4a16c1274bc8be08b555db7555dde4', // il faudrait calculer hash à partir d'un ts qui change à chaque fois
    ts: '1'
}


async function getAllCharactersAPI(offset, success) {

    const url =
        `${API.endpoint}?apikey=${API.publicKey}&ts=${API.ts}&hash=${API.hash}&limit=40&offset=${offset}`;
    // console.log(`url = ${url}`)

    const response = await fetch(url)
    // console.log(`response = ${response}`)
    // console.log(`response.ok = ${response.ok}`)
    // console.log(`response.status = ${response.status}`)
    const json = await response.json()
    return json


    /*
    .then(response => response.text())
    .then(result => console.log(result))
    */
    /*
         .then(res => res.json())
         .then((resObj) => {
             try {
                 if (resObj.code === 200) {
                     return success(resObj);
                 } else {
                     throw new Error(`Marvel API bad response. Status code ${resObj.code}.`);
                 }
             } catch (err) {
                 console.error(err);
                 return {
                     data: {}
                 };
             }
         }) */
    //.catch(error => console.log('error', error));

}



export {
    getAllCharactersAPI
};
