"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = 3000;
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.get('/upload', (req, res) => {
    res.render('upload');
});
app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        const imageUrl = `/uploads/${req.file.originalname}`;
        res.send(imageUrl);
    }
    else {
        res.send("file not uploaded");
    }
});
app.listen(port, () => {
    console.log('Server started on port 3000');
});
