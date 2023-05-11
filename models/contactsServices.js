const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const httpError = require("../utils/HttpError");

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

const listContactsService = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw httpError(404, "Not! found");
  }
  return contact;
};

const addContactService = async (body) => {
  const contacts = await listContactsService();
  const newContact = { id: crypto.randomUUID(), ...body };
  console.log(body);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContactService = async (contactId) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw httpError(404, "Not! found");
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contactId;
};

const updateContactService = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    throw httpError(400, "missing fields");
  }
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw httpError(404, "Not! found");
  }
  contacts[index] = {
    ...contacts[index],
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
