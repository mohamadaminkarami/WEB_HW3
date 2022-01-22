// eslint-disable-next-line import/no-extraneous-dependencies
import inquirer from "inquirer";
import { User } from "../database/models";

const questions = [
  { type: "input", name: "username", message: "Enter your username" },
  {
    type: "input",
    name: "password",
    message: "Enter your password",
  },
];

async function createSuperuser(answers) {
  const user = await User.findOne({ where: { username: answers.username } });
  if (user) {
    console.log("username already exists");
  } else {
    await User.create({ username: answers.username, password: answers.password, isSuseruser: true });
  }
}

const answers = await inquirer.prompt(questions);
await createSuperuser(answers);
process.exit(0);
