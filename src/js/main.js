const fetchData = async(dataLocation) => {
    try {
        const response = await fetch(dataLocation);
        const jsonData = await response.json();
        return jsonData;
    } catch(error) {
        console.log(error);
        alert('Error loading data, see console for details');
    }
}
const render = (obj) => {
    for(const key in obj) {
        let value = obj[key];
        console.log('key: ', key);
        console.log('value: ', value);
    }
}

function init(recipes) {
    // render(recipes);
    
}

const getData = fetchData('data/recipes.json'); // returns a promise
getData.then ( jsonData => init(jsonData));




