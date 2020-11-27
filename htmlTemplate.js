//we are using paths
const path = require("path");
console.log(path)
const fs = require("fs");


//The path.resolve() method resolves a sequence of paths or path segments into an absolute path
//path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'
//this will take me to the templates folder
const template_dir = path.resolve(__dirname, "templates");
//console.log("directory is:", template_dir);


const render = employees => {
    const html = [];

    html.push(employees
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => renderManager(manager))
        );

    html.push(employees
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => renderManager(engineer))
        );

    html.push(employees
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => renderManager(intern))
         );

         return renderMain(html.join(""));
};

const renderManager = manager => {
    let template = fs.readFileSync(path.resolve(template_dir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
  };
  
  const renderEngineer = engineer => {
    let template = fs.readFileSync(path.resolve(template_dir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
  };
  
  const renderIntern = intern => {
    let template = fs.readFileSync(path.resolve(template_dir, "intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
  };
  
  const renderMain = html => {
    const template = fs.readFileSync(path.resolve(template_dir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
  };
  
  const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
  };
  
  module.exports = render;



