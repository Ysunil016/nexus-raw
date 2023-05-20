import * as fs from 'node:fs'
import * as FormData from 'form-data'
import {Command, Flags} from '@oclif/core'
import {UploadFlags} from '../../utils/validate-flags'
import {
  FileExtension,
  NEXUS_HOSTED_REPOSITORY,
  NEXUS_REGISTRY_UPLOAD_ENDPOINT,
} from '../../utils/constants'
import axios from 'axios'

/**
 * Artifact Flag type definitation class
 *
 * @class ArtifactFlags
 */
class ArtifactFlags {
  /**
   * Artifact Name
   *
   * @memberof ArtifactFlags
   */
  name = Flags.string({
    char: 'n',
    required: true,
    description: 'Artifact Name, that will be used as predix to uploaded artifact',
  });

  /**
   * Artifact Path from local
   *
   * @memberof ArtifactFlags
   */
  path = Flags.file({
    char: 'p',
    required: true,
    description: 'Path of artifact, which locates the artifact bundle',
  });

  /**
   * Artifact Registry [NEXUS]
   *
   * @memberof ArtifactFlags
   */
  registry = Flags.url({
    char: 'r',
    required: true,
    description: 'Nexus Registry Base URL',
  });

  /**
   * Registry Namespace for Nexus
   *
   * @memberof ArtifactFlags
   */
  'target-path' = Flags.file({
    char: 't',
    required: true,
    description: 'Target Namespace, Component Path where artifact needs to be uploaded',
  });

  /**
   * Unique Id, to distinguish the artifact
   *
   * @memberof ArtifactFlags
   */
  'unique-id' = Flags.string({
    char: 'u',
    required: true,
    description: 'Unique Id, to identify artifact uniqely e.g Commit SHA',
  });

  /**
   * Credential in User:Password, to upload to Nexus
   *
   * @memberof ArtifactFlags
   */
  'nexus-cred' = Flags.string({
    char: 'c',
    required: false,
    description: 'Nexus Creds, to upload artifact in `user:password` format',
  });

  /**
   * GetAll, flags and their definitation
   *
   * @memberof ArtifactFlags
   * @returns Record<string, any>
   */
  getAll = () => {
    return {
      name: this.name,
      path: this.path,
      registry: this.registry,
      'nexus-cred': this['nexus-cred'],
      'target-path': this['target-path'],
      'unique-id': this['unique-id'],
    }
  };
}

/**
 *  Upload Logic to artifact registry
 *
 * @class UploadLogic
 */
class UploadLogic {
  /**
   * Entry point, to executes upload logic
   *
   * @param {UploadFlags} uploadFlags
   * @return {*}  {Promise<void>}
   * @memberof UploadLogic
   */
  async apply(uploadFlags: UploadFlags) : Promise<void> {
    const uploadFlagProps = await this.tranformFlags(uploadFlags)
    const {path, extension} = uploadFlagProps
    await this.validateFile(path, extension)
    await this.uploadArtifact(uploadFlagProps)
  }

  /**
   * Validate flags received from cli, and add file extension to props.
   *
   * @param {UploadFlags} uploadFlags
   * @return {*}  {Promise<UploadFlags>}
   * @memberof UploadLogic
   */
  async tranformFlags(uploadFlags: UploadFlags): Promise<UploadFlags> {
    const fileExtension = uploadFlags.path.split('.').pop()
    uploadFlags.addExtension(fileExtension as FileExtension)
    return uploadFlags.validateFlags()
  }

  /**
   * Decision flow, that executes artifact upload based on registry
   *
   * @param {UploadFlags} props
   * @return {*}  {Promise<void>}
   * @memberof UploadLogic
   */
  async uploadArtifact(props: UploadFlags) : Promise<void> {
    await this.uploadArtifactToNexus(props)
  }

  /**
   * Core logic, to upload artifact to nexus
   *
   * @param {UploadFlags} props
   * @return {*}  {Promise<void>}
   * @memberof UploadLogic
   */
  async uploadArtifactToNexus(props: UploadFlags) : Promise<void> {
    const {
      name,
      path,
      registry,
      'target-path': targetPath,
      'unique-id': uniqueId,
      'nexus-cred': nexusCreds,
      extension,
    } = props
    // if (!nexusCreds) throw new Error('No Cred Provided for Nexus Registry')
    console.log('Uploading to Nexus Artifact with', {
      name,
      registry,
      path,
      uniqueId,
      targetPath,
    })

    const filename = name + '-' + uniqueId + '.' + extension
    const postUrl = registry.href + NEXUS_REGISTRY_UPLOAD_ENDPOINT +
    '?repository=' + NEXUS_HOSTED_REPOSITORY

    const formDataToPublish = new FormData()
    formDataToPublish.append('raw.asset1', fs.createReadStream(path))
    formDataToPublish.append('raw.directory', targetPath)
    formDataToPublish.append('raw.asset1.filename', filename)

    const config = {
      method: 'post',
      url: postUrl,
      maxBodyLength: Number.POSITIVE_INFINITY,
      headers: {
        Authorization: nexusCreds ? `Basic ${btoa(nexusCreds)}` : '',
        'Content-Type': 'multipart/form-data',
      },
      data: formDataToPublish,
    }

    await axios
    .request(config)
    .then(_ => {
      console.log(filename, ': Uploaded Successfully')
    })
    .catch(error => {
      console.log('Fail to Upload :', filename)
      console.log(error?.cause ? error?.cause : error?.response?.data)
    })
  }

  /**
   * Validating file, for file existance and file extension
   *
   * @param {string} filePath
   * @param {FileExtension} fileExtension
   * @return {*}  {Promise<void>}
   * @memberof UploadLogic
   */
  async validateFile(filePath: string, fileExtension: FileExtension) : Promise<void> {
    const validFileExtension =
      Object.values(FileExtension).includes(fileExtension)
    if (!validFileExtension) throw new Error('Invalid File Path Extension - ' + fileExtension)
    const validPath = fs.existsSync(filePath)
    if (!validPath) throw new Error('No such file exist - ' + filePath)
  }
}

/**
 * Uplod Command Class, to handles entry point for cli
 *
 * @export
 * @class Upload
 * @extends {Command}
 */
export default class Upload extends Command {
  static description = 'Upload Artifact Command';
  static customFlags = new ArtifactFlags();

  /**
   * Flags, received from cli, to upload Artifact
   *
   * @static
   * @memberof Upload
   */
  static flags = this.customFlags.getAll();

  /**
   * Entry Point, that executes the validation & artifact upload
   *
   * @return {*}  {Promise<void>}
   * @memberof Upload
   */
  async run(): Promise<void> {
    const {flags} = await this.parse(Upload)
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    try {
      await new UploadLogic().apply(uploadFlags)
    } catch (error) {
      console.log(error)
    }
  }
}
