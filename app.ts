import express, { Request, Response } from 'express';
import ejs from 'ejs';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.HOST || 'http://localhost:3000';
const port = process.env.PORT || 3000;

declare module 'multer' {
    interface File {
        originalname: string;
    }
}

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.get('/upload', (req: Request, res: Response) => {
    res.render('upload');
});
app.post('/upload',upload.single('image'), (req: Request, res: Response) => {
    if(req.file) {
        const imageUrl = `/uploads/${req.file.originalname}`;
        res.render('success', { imageUrl: imageUrl, host: host })
    } else {
        res.send("file not uploaded");
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${host}`);
});
