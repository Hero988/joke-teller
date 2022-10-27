// Getting the HTML elements
const button = document.getElementById('submit');
// take out Audio(t.responseText).play() and adding audioElement.src = t.response and adding audioElement.Play() in its place
const audioElement  = document.getElementById('audio');
const selectedJoke = document.getElementById('jokeType');
const submitButton = document.getElementById('submit');

// Disable/Enable Button
function toggleButton() {
    // this is saying if button disabled is true on the left we will set it to false e.t.c 
    button.disabled = !button.disabled
}

// Passing our Joke from getJokes function to VoiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke)
        // using the API (taken from voice.js)
        VoiceRSS.speech({
            // input the API key here
            key: '97cb0d736bee4bc388498901b57d01b1',
            // Sorce
            src: `${joke}`,
            // Lnguage 
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// Get Jokes From Joke API (diagram to explain: https://drive.google.com/file/d/12AYMIVokAFYhNnf3wyQPlsfpJrq4t9yN/view)
async function getJokes () {
    // joke variable
    let joke = '';
    // get the value of the selected joke type
    let typeOfJoke = selectedJoke.value;
    // gets the apiURL 
    const apiUrl = `https://v2.jokeapi.dev/joke/${typeOfJoke}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
    // doing a try catch block to try the code and if that does not work we catch the error
    try { 
        // getting the response from the apiURL
        const response = await fetch (apiUrl);
        // converting the data to Json format
        const data = await response.json();
        // if there is a setup i.e. if the joke is 2 parts
        if(data.setup) {
            // set the joke variable as the setup and delivery 
            joke = `${data.setup} ... ${data.delivery}`;
        // if there is one 1 joke
        } else {
            // set the joke varibale to the joke
            joke = data.joke;
        }
        // pass in the joke variable into the tellMe function
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // catch errors here
        console.log('whoops', error);
    }
}

// run the getJokes function everytime you click the submit button
submitButton.addEventListener('click', getJokes);
// run the toggleButton function when the audio file has eneded
audioElement.addEventListener('ended', toggleButton);