import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AppConfig from '../../app/Models/AppConfig'

export default class AppConfigTableSeederSeeder extends BaseSeeder {
  public async run() {
    await AppConfig.firstOrCreate(
      { key: 'app:folders:avatar' },
      {
        title: 'Pasta Avatars',
        description: 'Definição da pasta para armazenamento de avatars',
        type: 'modules:Folder[name|id]',
        key: 'app:folders:avatar',
        value: '2',
      }
    )

    await AppConfig.firstOrCreate(
      { key: 'app:fileSystem:rootDir' },
      {
        title: 'Root Dir',
        description: 'Diretório de armazenamento (FileSystem)',
        type: 'text',
        key: 'app:fileSystem:rootDir',
        value: 'tmp',
      }
    )
  }
}
