import Resizer from  'react-image-file-resizer';
import { data } from 'react-router';

export const resizeFile = (file) => {
    return new Promise((resolve,reject)=>{
        //code
        Resizer.imageFileResizer(file,720,720,'JPEG',100,0,
            (data)=>{

                resolve(data)},"base64",
                (error)=>{reject(error)},
        )
    })
}
