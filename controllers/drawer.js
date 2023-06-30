const drawerService = require("../services/drawer");

const getDrawers = async (req, res) => {
  try {
    const drawers = await drawerService.getDrawersByUserId(req.userId);
    res.status(200).json({ drawers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const createDrawer = async (req, res) => {
  try {
    const { name } = req.body;
    const drawer = await drawerService.getDrawerByQuery({
      userId: req.userId,
      name: name,
    });
    if (drawer) {
      return res.status(400).json({ message: "already used name" });
    }

    await drawerService.createDrawer({
      name: name,
      userId: req.userId,
    });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const deleteDrawer = async (req, res) => {
  try {
    const drawerId = req.params.id;
    await drawerService.removeDrawerFromProducts(drawerId);
    await drawerService.deleteDrawer(drawerId);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getDrawers,
  createDrawer,
  deleteDrawer,
};
