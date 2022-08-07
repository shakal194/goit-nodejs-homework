const { Command } = require("commander");
const contacts = require("./contacts.js");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.log(allContacts);
        break;

      case "get":
        const getContactById = await contacts.getContactById(id);
        if (!getContactById) {
          throw new Error(`Contact with id: ${id} not found`);
        }
        console.log(getContactById);
        break;

      case "add":
        const addContact = await contacts.addContact(name, email, phone);
        console.log(addContact);
        break;

      case "remove":
        const removeContact = await contacts.removeContact(id);
        console.log(removeContact);
        if (!removeContact) {
          throw new Error(`Contact with id: ${id} not found`);
        }
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error(error);
  }
};

const start = async (argv) => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};
start(argv);
