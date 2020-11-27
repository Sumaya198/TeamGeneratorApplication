const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Output_dir = path.resolve(__dirname, "output");
const render = require("./htmlTemplate")


let teamMembers = [];

function getTeam(){
    const addEmployee = () => {
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to add a team member or generate current team",
                name: "newEmployeePrompt",
                choices: ["Add Member", "Generate Team"],
            }
        ])
        .then( async answer => {
            if (answer.newEmployeePrompt === "Add Member") {
                await inquirer.prompt([
                    {
                        type: "list",
                        message: "What member you want to add",
                        name: "employeeRole",
                        choices: ["Manager", "Engineer", "Intern"],
                    }
                ]).then( async answer => {
                    if (answer.employeeRole === "Manager") {
                    await inquirer.prompt([
                        {
                            type: "input",
                            name: "managerName",
                            message: "What is the Manager's name?"
                        },
                        {
                            type: "input",
                            name: "managerId",
                            message: "What is the Manager's ID number?"
                        },
                        {
                            type: "input",
                            name: "managerEmail",
                            message: "What is the Manager's email address?"
                        },
                        {
                            type: "input",
                            name: "managerOfficeNumber",
                            message: "What is the Manager's office number?"
                        },
                    ]).then(answer => {
                        const manager = new Manager(
                            answer.managerName,
                            answer.managerId,
                            answer.managerEmail,
                            answer.managerOfficeNumber,
                        );
                        teamMembers.push(manager);
                        addEmployee();
                    })
                }
                else if(answer.employeeRole === "Engineer"){
                    await inquirer.prompt([
                        {
                            type: "input",
                            name: "engineerName",
                            message: "What is the Engineer's name?"
                        },
                        {
                            type: "input",
                            name: "engineerId",
                            message: "What is the Engineer's ID?"
                        },
                        {
                            type: "input",
                            name: "engineerEmail",
                            message: "What is the Engineer's email address?"
                        },
                        {
                            type: "input",
                            name: "engineerGitHub",
                            message: "What is the Engineer's GitHub username?"
                        },
                    ]).then(answer => {
                        const engineer = new Engineer(
                            answer.engineerName,
                            answer.engineerId,
                            answer.engineerEmail,
                            answer.engineerGitHub,
                        );
                        teamMembers.push(engineer);
                        addEmployee();
                })
            }
            else if(answer.employeeRole === "Intern"){
                await inquirer.prompt([
                    {
                        type: "input",
                        name: "internName",
                        message: "what is the Inntern's name?"
                    },
                    {
                        type: "input",
                        name: "internId",
                        message: "what is the Intern's ID?"
                    },
                    {
                        type: "input",
                        name: "internEmail",
                        message: "what is the Intern's email address?"
                    },
                    {
                        type: "input",
                        name: "internSchool",
                        message: "what is the Intern's school?"
                    },
                ]).then(answer => {
                    const intern = new Intern (
                        answer.internName,
                        answer.internId,
                        answer.internEmail,
                        answer.internSchool,
                    );
                    teamMembers.push(intern);
                    addEmployee();
                })
            }
        })
    }else if (answer.newEmployeePrompt === "Generate Team"){
         await generateTeam();
    }
})
    }
    addEmployee();

};
const generateTeam = (fileName) => {
    const outputPath = path.join(Output_dir, fileName + ".html");
  
    if (!fs.existsSync(Output_dir)) {
      fs.mkdirSync(Output_dir);
    }
  
    fs.writeFileSync(outputPath, render(teamMembers), (err) => {
      if (err) {
        console.log(err);
        getFileName();
      }
    });
  };
  
getTeam();



