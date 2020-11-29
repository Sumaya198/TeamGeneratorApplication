const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//checks if it exists if it doesnt then it creates it
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

function getTeam() {
  const addEmployee = () => {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Would you like to add a team member or generate current team",
          name: "newEmployeePrompt",
          choices: ["Add Member", "Generate Team"],
        },
      ])
      .then(async (answer) => {
        if (answer.newEmployeePrompt === "Add Member") {
          await inquirer
            .prompt([
              {
                type: "list",
                message: "What member you want to add",
                name: "employeeRole",
                choices: ["Manager", "Engineer", "Intern"],
              },
            ])
            .then(async (answer) => {
              if (answer.employeeRole === "Manager") {
                await inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "managerName",
                      message: "What is the Manager's name?",
                    },
                    {
                      type: "input",
                      name: "managerId",
                      message: "What is the Manager's ID number?",
                    },
                    {
                      type: "input",
                      name: "managerEmail",
                      message: "What is the Manager's email address?",
                    },
                    {
                      type: "input",
                      name: "managerOfficeNumber",
                      message: "What is the Manager's office number?",
                    },
                  ])
                  .then((answer) => {
                    const manager = new Manager(
                      answer.managerName,
                      answer.managerId,
                      answer.managerEmail,
                      answer.managerOfficeNumber
                    );
                    teamMembers.push(manager);
                    addEmployee();
                  });
              } else if (answer.employeeRole === "Engineer") {
                await inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "engineerName",
                      message: "What is the Engineer's name?",
                    },
                    {
                      type: "input",
                      name: "engineerId",
                      message: "What is the Engineer's ID?",
                    },
                    {
                      type: "input",
                      name: "engineerEmail",
                      message: "What is the Engineer's email address?",
                    },
                    {
                      type: "input",
                      name: "engineerGitHub",
                      message: "What is the Engineer's GitHub username?",
                    },
                  ])
                  .then((answer) => {
                    const engineer = new Engineer(
                      answer.engineerName,
                      answer.engineerId,
                      answer.engineerEmail,
                      answer.engineerGitHub
                    );
                    teamMembers.push(engineer);
                    addEmployee();
                  });
              } else if (answer.employeeRole === "Intern") {
                await inquirer
                  .prompt([
                    {
                      type: "input",
                      name: "internName",
                      message: "what is the Inntern's name?",
                    },
                    {
                      type: "input",
                      name: "internId",
                      message: "what is the Intern's ID?",
                    },
                    {
                      type: "input",
                      name: "internEmail",
                      message: "what is the Intern's email address?",
                    },
                    {
                      type: "input",
                      name: "internSchool",
                      message: "what is the Intern's school?",
                    },
                  ])
                  .then((answer) => {
                    const intern = new Intern(
                      answer.internName,
                      answer.internId,
                      answer.internEmail,
                      answer.internSchool
                    );
                    teamMembers.push(intern);
                    addEmployee();
                  });
              }
            });
        } else if (answer.newEmployeePrompt === "Generate Team") {
          await generateTeam();
        }
      });
  };

  addEmployee();

  const generateTeam = () => {
      ///if the folder doesnt already exist the mkdir method is used to make the folder
      //asynchronous multiple people doing the same job, synchronous doesn't split the work and does it one after the other. With files use sync
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
 ///write the file synchronously 
    fs.writeFileSync(outputPath, render(teamMembers), (err) => {
      if (err) {
        console.log(err);
        getFileName();
      }
    });
  };
}
getTeam()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``
