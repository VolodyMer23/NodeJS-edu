const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  console.table(data);
}

async function getContactById(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contactById = data.find((contact) => contact.id === contactId);
  console.log(contactById || null);
}

async function removeContact(contactId) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contact = data.filter((contact) => contact.id !== contactId);
  await getContactById(contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contact), "utf8");
}

async function addContact(name, email, phone) {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  const contactId = nanoid(7);
  if (
    data.find(
      (contact) =>
        contact.name === name ||
        contact.email === email ||
        contact.phone === phone
    )
  )
    return console.log("Такий контакт вже існує");
  data.push({ name, email, phone, id: contactId });
  await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
  await getContactById(contactId);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
