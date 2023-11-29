const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profiles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

moule.exports = upload;
