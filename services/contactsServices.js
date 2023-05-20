const { HttpError } = require("../utils");
const Contact = require("../models/contact");

const listContactsService = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactByIdService = async (contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  return contact;
};

const removeContactService = async (contactId) => {
  const deletedContacts = await Contact.findByIdAndRemove(contactId);
  if (!deletedContacts) {
    throw new HttpError(404, "Not found");
  }
  return contactId;
};

const addContactService = async (body) => {
  const newContact = Contact.create(body);
  return newContact;
};

const updateContactService = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    throw new HttpError(400, "missing fields");
  }
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  return contact;
};

const updateStatusContactService = async (contactId, body) => {
  if (Object.keys(body).length === 0) {
    throw new HttpError(400, "missing field favorite");
  }
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  return contact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
};
