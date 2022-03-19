import express from 'express';
import ImResF from './ResImF';
import { Request } from 'express';
import { Response } from 'express';

const app = express();
const fs =require("fs");
const port='3000';
//To Access the images with their origial size
app.use('/OrSImage',express.static('OrSImage'));
app.get('/',(req:Request,res:Response)=>{
  //Print url on console
  console.log(req.url);
  res.send(`Server is started working on port ${port}`)
    
});
// To Resize images and save it in folder Thumbnail
app.get(`/Thumbnail/imagename/:imagename/width/:width/height/:height`,(req:Request,res:Response)=>{
  // print url of resized image 
  console.log(req.url);
  // check if images exists on OrSImage folder or not 
  fs.access(`OrSImage/${req.params.imagename}`, (Imnotexist) => {
    if (!Imnotexist) {
      // print that Image  exists on console
      console.log('Image exists');
      // Check if resized image is existed before 
      fs.access(`Thumbnail/${req.params.width}-${req.params.height}-${req.params.imagename}`, (Notexist) => {
        //If image not resized  Then apply resizing function " ImResF "
        if (Notexist) {
          console.log('Image is being resized');
          ImResF(`OrSImage/${req.params.imagename}`,Number(req.params.width),Number(req.params.height),`Thumbnail/${req.params.width}-${req.params.height}-${req.params.imagename}`); 
          res.send('Image is being resized please reload this url to access the resized image');
          return;
        }{
          // Show the image after being resizing
        console.log('Image was resized with that value before ');
        fs.readFile(`Thumbnail/${req.params.width}-${req.params.height}-${req.params.imagename}`, function(err, Im) {
          if (err) {
            res.status(404);
          };
            // Display the image at the browser
            res.end(Im); 
        
        }); 
            }
      });
      return;
    }{
      // Print Image doesnot exist on console
    console.log('Image does not exist');
    // Display Image not be existed at browser
    res.send('Image doesnot exist on original image folder');
    }
  });
  
});


// Server is starting on port 3000
app.listen(port,()=>{console.log((`Server is listening on port number ${port}: http://localhost:${port}`))});
export default app;