const Bugs = require("../models/Bug");

async function showAll(req, res) {
  try {
    const allBugs = await Bugs.readAll();
    res.status(200).send(allBugs);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function create(req, res) {
  //console.log(req.body)
  try {
    const newBug = await Bugs.create(req.body);
    console.log(newBug);
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function update(req, res) {
  // console.log(req.params.id);
  // console.log(req.body);
  try {
    console.log('Updating');
    const updateBug = await Bugs.updateByID(req.params.id, req.body);
    console.log('Bug sent successfully' + updateBug);
    res.status(204).send(`Bug with ID ${req.params.id} updated.`);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function destroy(req, res) {
  try {
    await Bugs.deleteByID(req.params.id);
    res.status(200).send(`Bug with ID ${req.params.id} deleted`);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}
module.exports = {
  showAll,
  create,
  update,
  destroy,
};
