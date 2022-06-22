// Information to reach API
const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jja=';

// Selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// Formats response to look presentable on webpage
const renderResponse = (res) => {
    // Handles if res is falsey
    if(!res){
      console.log(res.status);
    }
    // In case res comes back as a blank array
    if(!res.length){
      responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
      return;
    }
  
    // Creates an empty array to contain the HTML strings
    let wordList = [];
    // Loops through the response and caps off at 10
    for(let i = 0; i < Math.min(res.length, 10); i++){
      // creating a list of words
      wordList.push(`<li>${res[i].word}</li>`);
    }
    // Joins the array of HTML strings into one string
    wordList = wordList.join("");
  
    // Manipulates responseField to render the modified response
    responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
    return
  }
  
  // Renders response before it is modified
  const renderRawResponse = (res) => {
    // Takes the first 10 words from res
    let trimmedResponse = res.slice(0, 10);
    // Manipulates responseField to render the unformatted response
    responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
  }
  
  // Renders the JSON that was returned when the Promise from fetch resolves.
  const renderJsonResponse = (res) => {
    // Creates an empty object to store the JSON in key-value pairs
    let rawJson = {};
    for(let key in res){
      rawJson[key] = res[key];
    }
    // Converts JSON into a string and adding line breaks to make it easier to read
    rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n");
    // Manipulates responseField to show the returned JSON.
    responseField.innerHTML = `<pre>${rawJson}</pre>`;
  }

// Asynchronous function
// Code goes here
const getSuggestions = async () => {
  const wordQuery = inputField.value;
  const endpoint = url+queryParams+wordQuery;
  try {
    const response = await fetch(endpoint, {cache: 'no-cache'});
    if (response.ok) {
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
    }
  } catch(error) {
      console.log(error);
  }
}


// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild)
  }
  getSuggestions();
}

submit.addEventListener('click', displaySuggestions);