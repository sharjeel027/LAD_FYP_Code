const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require("./../models/file");
const ReciveFile = require("../models/recivedfile");
const Marks = require("./../models/marks");
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

const uploadR = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./reciveAssign");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 11000000, // max file size 11MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const file = new File({
        programId: req.body.id,
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
        dueDate: req.body.due,
      });
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.post(
  "/upload/Assign",
  uploadR.single("file"),
  async (req, res) => {
    try {
      const { path, mimetype } = req.file;
      const file = new ReciveFile({
        programId: req.body.id,
        email: req.body.email,
        studentId: req.body.sid,
        assignId: req.body.asid,
        file_path: path,
        file_mimetype: mimetype,
      });
      await file.save();
      res.send("file uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading file. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.post("/getAllFiles", async (req, res) => {
  try {
    const files = await File.find({ programId: req.body.id });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.post("/addMarks", async (req, res) => {
  await Marks.find({
    assignId: req.body.aid,
    stdId: req.body.stdId,
  }).deleteMany((e) => {
    console.log(e);
  });

  const marks = new Marks({
    assignId: req.body.aid,
    stdId: req.body.stdId,
    marksobtain: req.body.mob,

    prcentage: req.body.per,
  });

  await marks.save();
  res.send("ok");
});

Router.post("/getMarks", async (req, res) => {
  await Marks.find({
    stdId: req.body.stdId,
  }).then((result) => {
    res.send(result);
  });
});

Router.post("/getFile", async (req, res) => {
  await File.find({
    _id: req.body.id,
  }).then((result) => {
    res.send(result);
  });
});

Router.post("/getAllFiles/Recive", async (req, res) => {
  try {
    const files = await ReciveFile.find({ programId: req.body.id });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
});

Router.get("/detail/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    res.send(file);
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

Router.get("/download/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

Router.get("/download/recive/:id", async (req, res) => {
  try {
    const file = await ReciveFile.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
});

module.exports = Router;
