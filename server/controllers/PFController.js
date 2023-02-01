const axios = require('axios');


/* 
VERY IMPORTANT!!!!!!!!

write the following command in terminal to refresh access token every 60 minutes

    curl -d "grant_type=client_credentials&client_id=ca2PVuJwPHgGvvi7WVSz2IZQJkZTGY76T7pW9jdGGeZedjORE9&client_secret=eanIjnnc2YQRzLFl5r9XE7UN3qUqw1ti6vbTJTkc" https://api.petfinder.com/v2/oauth2/token

PASTE THE "access_token" value from the returned object into the API_AccessToken variable below

*/

const testReqBody = {'type':'dog', 'gender':'male', 'color':'black', 'zipcode': 11379}

// PASTE THE access_token from terminal response here:
const API_AccessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJjYTJQVnVKd1BIZ0d2dmk3V1ZTejJJWlFKa1pUR1k3NlQ3cFc5amRHR2VaZWRqT1JFOSIsImp0aSI6IjExYzIwNjBmMGU0ZGUxNjQ2YTU0NDc4MjQ1NDY5NGE1NzlmMDZmMmMyMjNmNTg2NmRiYmFlYzE2MjIzZmZlMGM1NDY1N2IyZGExZmI5YjAwIiwiaWF0IjoxNjc1MjE0NzI1LCJuYmYiOjE2NzUyMTQ3MjUsImV4cCI6MTY3NTIxODMyNSwic3ViIjoiIiwic2NvcGVzIjpbXX0.ZmPMpImr6lV1pFH5uIQvFdi5lsLDLWINiYd9adpjPL5-ugUkFvOQdVg-ls3INdRbye-U5IQTtFj5614RWsbZlBj97Awam4E-YloAkhPF9wK_eYwuzDuc8v_h2QPRYNLD149PQ8X1hY-kMbNls7DCquzrLSALy_PRdguwglhPG_-TKoXOfjLI1PX6zbZzzVhMM23EIVO55GcNmKMpV4OhKFC3PagD8mRWY_t8a_CjAYvBLrlFlbD2OQrGDj6EHoIVEnCUMNWPVi5P-DtV4XjRHz3HTgqhJ1WKJYH-y6CB-D1nAqvTWnp8Oxh7e1HGIs0lsz4dR6yvP9OxZZwq2qtcSg'
const PFController = {};


PFController.getPets = async(req, res, next) => {
    console.log('inside of getPets')
    const {type, gender, color, zipcode } = req.body;

    try {
        const result = await axios.get(
            `https://api.petfinder.com/v2/animals?type=${type}&gender=${gender}&color=${color}&location=${zipcode}&distance=100&limit=100`, {
                headers: {
                    'Authorization' : `Bearer ${API_AccessToken}`
                }
            }
        )
        // console.log('API request result is: ', result.data.animals);

        // parse the results.data.animals array for the top 6 animals with photos and save to res.locals.pets and return to server to send response back to client
        const {animals} = result.data;
        // console.log('FULL ANIMALS LIST IS: ', animals)
        // filter out this list by photo array has elements
        const selectedAnimals = [];
        let animalsIndex = 0;
        while (selectedAnimals.length < 6 && animalsIndex < animals.length) {
            // console.log('ANIMALSINDEX IS ', animalsIndex, 'ANIMAL ARRAY LENGTH IS: ', animals.length);
            let currentAnimal = animals[animalsIndex];
            if (currentAnimal.primary_photo_cropped !== {} && currentAnimal.primary_photo_cropped !== null && currentAnimal.description && currentAnimal.status === 'adoptable') {
                const {id, name, type, gender, size, description, url, contact } = currentAnimal;
                const breed = currentAnimal.breeds.primary;
                const primaryPhoto = currentAnimal.primary_photo_cropped.full;
                const photos = currentAnimal.photos;
                console.log("CURRENT ANIMAL IS: ", currentAnimal)
                const selectedAnimal = {id, name, type, gender, size, description, breed, primaryPhoto, photos, url, contact};
                selectedAnimals.push(selectedAnimal);
            }
            animalsIndex += 1;
        }
        // console.log('selected animal list is: ', selectedAnimals)
        res.locals.pets = selectedAnimals;
        return next();
    }
    catch (error) {
        return next(error);
    }
}

PFController.getPet = async(req, res, next) => {
    console.log('inside of getPet')
    const {id} = req.body;

    try {
        const result = await axios.get(
            `https://api.petfinder.com/v2/animals?${id}`, {
                headers: {
                    'Authorization' : `Bearer ${API_AccessToken}`
                }
            }
        )
        const selectedAnimal = result.animal
        const {id, name, type, gender, size, description, url, contact } = selectedAnimal;
        const breed = selectedAnimal.breeds.primary;
        const primaryPhoto = selectedAnimal.primary_photo_cropped.full;
        const photos = selectedAnimal.photos;
        res.locals.pet = {id, name, type, gender, size, description, url, contact, breed, primaryPhoto, photos}
        return next();
    }
    catch (error) {
        return next(error);
    }
}

module.exports = PFController;

