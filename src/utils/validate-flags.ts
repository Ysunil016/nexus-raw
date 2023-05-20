/* eslint new-cap: [0] */
import {IsEnum, IsString, Matches, MinLength, validate} from 'class-validator'
import {FileExtension} from './constants'

/**
 * Upload Flag, class that implements Class-Field Validations
 *
 * @export
 * @class UploadFlags
 */
export class UploadFlags {
  @Matches('^[a-z0-9-]+$')
  @IsString()
  'name': string;

  @MinLength(1)
  @Matches('^(.+)([^/]+)$')
  @IsString()
  'path': string;

  'registry': URL;

  @MinLength(1)
  @Matches('^(.+)([^/]+)$')
  @IsString()
  'target-path': string;

  @Matches('^[a-z0-9-.]+$')
  @IsString()
  'unique-id': string;

  'nexus-cred': string;

  @IsEnum(FileExtension)
  'extension': FileExtension;

  addExtension(extension: FileExtension): void {
    this.extension = extension
  }

  /**
   * Validate Flag, with provided checks on fields
   *
   * @return {*}  {Promise<UploadFlags>}
   * @memberof UploadFlags
   */
  async validateFlags(): Promise<UploadFlags> {
    await validate(this)
    .then(errors => {
      if (errors.length > 0) {
        throw errors
      }
    })
    .catch(error => {
      throw error
    })
    return this
  }
}
