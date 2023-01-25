import express, { Request, Response } from 'express';
const port = 3000;
import ejs from 'ejs';
import multer from 'multer';

declare module 'multer' {
    interface File {
        originalname: string;
    }
}

const app = express();
app.set('view engine', 'ejs');

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
        res.send(imageUrl);
    } else {
        res.send("file not uploaded");
    }
});

app.listen(port, () => {
    console.log('Server started on port 3000');
});
