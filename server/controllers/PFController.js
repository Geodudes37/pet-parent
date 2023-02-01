const axios = require("axios");

/* 
VERY IMPORTANT!!!!!!!!

write the following command in terminal to refresh access token every 60 minutes

    curl -d "grant_type=client_credentials&client_id=ca2PVuJwPHgGvvi7WVSz2IZQJkZTGY76T7pW9jdGGeZedjORE9&client_secret=eanIjnnc2YQRzLFl5r9XE7UN3qUqw1ti6vbTJTkc" https://api.petfinder.com/v2/oauth2/token

PASTE THE "access_token" value from the returned object into the API_AccessToken variable below


curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJjYTJQVnVKd1BIZ0d2dmk3V1ZTejJJWlFKa1pUR1k3NlQ3cFc5amRHR2VaZWRqT1JFOSIsImp0aSI6IjcyN2MwMzViMzdlOWRkNmJlZTY1OGYzZTFjNjI3MzI2ODllOTAwMGQ3ZmExMDU1MGJkNjNmNThiNGE0YzBiZGE4MWM1Y2I0MWE2MjIwNmM2IiwiaWF0IjoxNjc1MjczNjc5LCJuYmYiOjE2NzUyNzM2NzksImV4cCI6MTY3NTI3NzI3OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.gyUonZs-KokjpveGDz-s3OPfwoksWS0sHpZqGfCyFgMB97M8DIE3VzVWm5FB_Tkieh06o51caNX_FIw-NHRPO4VTxhdbRwiraxIp32TtRf6dDij1GNVvfbD1HR99fjqKdSmmAoshNzyPc0OHPnP__Liqe6sLpWF4JzznsYz_nkyfPH15WqAS9cAEhKQ4FFEeX1AoYWKR35pneHj1aNy3kiarbYeLmF50Xs_u4FY3asnxKFCrQAvkUiQiCMR1Bi01DqJ1zN-4dFLUyV5NDB3omPaiaXlNYvmBQK-j79-BHQfp_UVq261fd6vGpPtOAsYaNCwThQOdeTI-LHAizxVWJA" GET https://api.petfinder.com/v2/animals?type=dog


*/

// const testReqBody = {'type':'dog', 'gender':'male', 'color':'black', 'zipcode': 11379}

// last updated 11:53am 2/1/2023
// PASTE THE access_token from terminal response here:
const API_AccessToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJjYTJQVnVKd1BIZ0d2dmk3V1ZTejJJWlFKa1pUR1k3NlQ3cFc5amRHR2VaZWRqT1JFOSIsImp0aSI6IjBhY2I1OGY0MDE3ZGUwZjIyZTZiZDM4NzE4NTljYzQwZWQyZjFmNzVjNGIwYjgzNzZlMjFiMjFjZWU5NmRjMGNlODkyNmY4M2UxZDJhNDRjIiwiaWF0IjoxNjc1Mjc4NzUwLCJuYmYiOjE2NzUyNzg3NTAsImV4cCI6MTY3NTI4MjM1MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.reYPu8t7CamDK3QgXLXOOEzmESglLPmwXrx3ublDqwrQXEiMoyECphfMwB113S9MldGkQmaEgo_Q1Tmk6c-oLx70_oOm9UPdwj4MLmxOFdRCYESX2HHfuI3HhinKvfXjWc4PDZmy6OMxsZ6qn_lvxgwXG1JqUnX8MjO6BDehSANZHnJZ8XN1my2CHVwQu7H-01-pRmPTIn5kAWOIOUlvk4OYPo3jMeRNcFRfWvg1fAt85cOIGQmA4YCye5qK5Mm5R2vYSBj0g18OZZyxt03EVSxlNUSm8i_ww1I6Vq-npezd6Q8FiUjMA-vxKAn-Pfzt_VfmnQJoOZ0DLAXsVPkaQA";
const PFController = {};

PFController.getPets = async (req, res, next) => {
  console.log("inside of getPets middleware");
  console.log("REQBODY IS ", req.body);
  const { type, gender, color, zipcode } = req.body;
  //   console.log("DATA RECEIVED FROM FRONTEND: ", type, gender, color, zipcode);
  const url = `https://api.petfinder.com/v2/animals?type=${type}&gender=${gender}&colors=${color}&location=${zipcode}&distance=100&limit=100`;
  console.log(url);

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_AccessToken}`,
      },
    });
    console.log("API request result is: ", result.data.animals);

    // parse the results.data.animals array for the top 6 animals with photos and save to res.locals.pets and return to server to send response back to client
    const { animals } = result.data;
    // console.log('FULL ANIMALS LIST IS: ', animals)
    // filter out this list by photo array has elements
    const selectedAnimals = [];
    let animalsIndex = 0;
    while (selectedAnimals.length < 6 && animalsIndex < animals.length) {
      // console.log('ANIMALSINDEX IS ', animalsIndex, 'ANIMAL ARRAY LENGTH IS: ', animals.length);
      let currentAnimal = animals[animalsIndex];
      if (
        currentAnimal.primary_photo_cropped !== {} &&
        currentAnimal.primary_photo_cropped !== null &&
        currentAnimal.description &&
        currentAnimal.status === "adoptable"
      ) {
        const { id, name, type, gender, size, description, url, contact } =
          currentAnimal;
        const breed = currentAnimal.breeds.primary;
        const primaryPhoto = currentAnimal.primary_photo_cropped.full;
        const photos = currentAnimal.photos;
        console.log("CURRENT ANIMAL IS: ", currentAnimal);
        const selectedAnimal = {
          id,
          name,
          type,
          gender,
          size,
          description,
          breed,
          primaryPhoto,
          photos,
          url,
          contact,
        };
        selectedAnimals.push(selectedAnimal);
      }
      animalsIndex += 1;
    }
    // console.log('selected animal list is: ', selectedAnimals)
    res.locals.pets = selectedAnimals;
    return next();
  } catch (error) {
    return next({
      log: ` error in PFController getPets: ${error}`,
      status: 400,
      message: { error: "Unable to access pet api" },
    });
  }
};

PFController.getPet = async (req, res, next) => {
  console.log("inside of getPet");
  const { id } = req.body;

  try {
    const result = await axios.get(
      `https://api.petfinder.com/v2/animals?${id}`,
      {
        headers: {
          Authorization: `Bearer ${API_AccessToken}`,
        },
      }
    );
    const selectedAnimal = result.animal;
    const { id, name, type, gender, size, description, url, contact } =
      selectedAnimal;
    const breed = selectedAnimal.breeds.primary;
    const primaryPhoto = selectedAnimal.primary_photo_cropped.full;
    const photos = selectedAnimal.photos;
    res.locals.pet = {
      id,
      name,
      type,
      gender,
      size,
      description,
      url,
      contact,
      breed,
      primaryPhoto,
      photos,
    };
    return next();
  } catch (error) {
    return next({
      log: ` error in PFController getPet: ${error}`,
      status: 400,
      message: { error: "Unable to access pet api" },
    });
  }
};

module.exports = PFController;
