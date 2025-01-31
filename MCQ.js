
//This adds an event listener that runs a function after the entire HTML document has been completely loaded and parsed.
//Ensures the code runs only after all DOM elements are ready.
document.addEventListener("DOMContentLoaded", function () {

  //Initiates a network request to fetch the contents of a file named "questions.txt"
//Returns a Promise that resolves with the response from the file
  fetch("questions.txt")
  //Converts the response to JSON format
//Assumes the "questions.txt" file contains a JSON array of question objects
      .then(response => response.json())
      //Receives the parsed JSON data
      //Contains the logic for handling the questions
      .then(data => {

        //Stores all the questions from the JSON file in the allQuestions variable
          let allQuestions = data;

          //Randomly shuffles the questions
          // Selects the first 10 questions from the shuffled array
          let selectedQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
          //Calls the displayQuiz function with the 10 randomly selected questions
          displayQuiz(selectedQuestions);
      })
      .catch(error => console.error("Error loading questions:", error));
});

//A function that renders the quiz questions to the webpage
function displayQuiz(questions) {

  //Finds the HTML element with the ID "quiz" where questions will be displayed
  const quizContainer = document.getElementById("quiz");
  //Clears any existing content in the quiz container
  quizContainer.innerHTML = "";
  

  //Iterates through each question
  // q represents the current question
  // index is the position of the current question
  questions.forEach((q, index) => {

    //Creates an HTML string for each question 
    // Includes the question number, question text, and radio button options
      let questionHTML = `<div class="question">
          <p>${index + 1}. ${q.question}</p>
          

         
          ${q.options.map(option =>  //Transforms each option into a radio button label
          // Joins the options together into a single string
              `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label><br>`
          ).join("")}
      </div>`;

      //Adds the generated HTML for each question to the quiz container
      quizContainer.innerHTML += questionHTML;
  });

  
}

//A function to calculate the user's quiz score
function calculateScore() {
  let score = 0;
  let questions = document.querySelectorAll(".question");

  //Fetches the questions again to match the original randomly selected set
  fetch("questions.txt")
      .then(response => response.json())
      .then(data => {
          let selectedQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 10);
          questions.forEach((q, index) => {

            //Finds the selected radio button for each question
              let selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
              //Checks if an answer was selected and if it matches the correct answer 
              // Increments the score if correct
              if (selectedAnswer && selectedAnswer.value === selectedQuestions[index].answer) {
                  score++;
              }
          });


          //Displays the final score to the user
          alert("Your score: " + score + "/10");
      });
}