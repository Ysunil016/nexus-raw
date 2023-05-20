import {Command, Flags} from '@oclif/core'
import * as fs from 'node:fs'
import axios from 'axios'
import {
  NEXUS_HOSTED_REPOSITORY,
} from '../../utils/constants'

export default class Download extends Command {
  static description = 'Download Nexus Artifact Command';

  static flags = {
    registry: Flags.url({
      char: 'r',
      required: true,
    }),
    'artifact-path': Flags.file({
      char: 'p',
      required: true,
    }),
    'nexus-cred': Flags.string({
      char: 'c',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const {flags} = await this.parse(Download)
    const nexusComponentUrl = flags.registry + '/repository/' + NEXUS_HOSTED_REPOSITORY + '/'
    const artifactName = flags['artifact-path'].split('/').pop()?.toString() || 'default.zip'
    await this.downloadArtifactFromNexus(nexusComponentUrl, artifactName, flags['nexus-cred'])
  }

  /**
   * Downloads the artifact from Nexus
   *
   * @param {*} flags
   * @memberof Download
   * @returns void
   */
  public async downloadArtifactFromNexus(nexusComponentUrl: string, artifactName : string, nexusCred? : string): Promise<void> {
    await axios.get(nexusComponentUrl, {
      headers: {
        Authorization: nexusCred ? `Basic ${btoa(nexusCred)}` : '',
      },
    }).then(res => {
      const writeStream = fs.createWriteStream(artifactName)
      res.data.pipe(writeStream)
      writeStream.on('finish', () => {
        writeStream.close()
        this.log('Download completed for artifact: ' + artifactName)
      })
    }).catch(error => {
      throw error
    })
  }
}
