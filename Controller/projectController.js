const projects = require("../Model/projectSchema");

exports.addProject = async (req, res) => {
  console.log("inside add project function");
  const { title, languages, github, overview, website } = req.body;
  const projectImage = req.file.filename;
  const userId = req.payload;
  // console.log(projectImage, title, languages, github, overview, website, userId);

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project already exists");
    } else {
      const newProject = new projects({
        projectImage,
        title,
        languages,
        github,
        overview,
        website,
        userId,
      });
      await newProject.save();
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

//Get Home Projects
exports.getHomeProjects = async (req, res) => {
  try {
    // Randomly select 3 projects
    const homeProjects = await projects.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json(homeProjects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects", details: err });
  }
};

//Get All Projects
exports.getAllProjects = async (req, res) => {
  const searchKey = req.query.search;

  const query = {
    languages: { $regex: searchKey, $options: "i" },
  };

  try {
    const allProjects = await projects.find(query);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

//Get User Projects
exports.getUserProjects = async (req, res) => {
  const userId = req.payload;
  try {
    const userProjects = await projects.find({ userId });
    res.status(200).json(userProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};

//Edit User Project
exports.editProject = async (req, res) => {
  const { title, languages, github, overview, website, projectImage } =
    req.body;
  const uploadImage = req.file ? req.file.filename : projectImage;
  const userId = req.payload;
  const { pid } = req.params;
  try {
    const updateProject = await projects.findByIdAndUpdate(
      { _id: pid },
      {
        projectImage: uploadImage,
        title,
        languages,
        github,
        overview,
        website,
        userId,
      },
      { new: true }
    );
    await updateProject.save();
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

//Delete User Project
exports.deleteProject = async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteData = await projects.findByIdAndDelete({ _id: pid });
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(401).json(err);
  }
};
