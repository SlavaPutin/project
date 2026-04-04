import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs  from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FileService {

    async createdFile(file): Promise<string>{
        try{
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(__dirname, '..', 'static')
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})//создаем папку, recursive - если какойто папки в пути не будет то nodejs создаст ее
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)//с помощью join склеиваем полный путь к файлу а buffer сохраняет данные
            return fileName
        } catch(e){
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
