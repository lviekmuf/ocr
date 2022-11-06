import * as fs from 'fs';
import axios from 'axios';

class ImageService {
    async download(url: string) {
        const { data } = await axios.get(url, { responseType: 'stream' })
        return data
    }
    async saveFile(url: string, fileName:string) {
        const data = await this.download(url)
        console.log(data)
        return new Promise((resolve, reject) => {
            data.pipe(fs.createWriteStream(fileName))
                .on('error', reject)
                .once('close', () => resolve(fileName));
        });
    }
}


export { ImageService }
