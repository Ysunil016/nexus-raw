/**
 * Valid File Extensions, to push to artifact
 *
 * @export
 * @enum {string}
 */
export enum FileExtension {
  TAR = 'tar',
  ZIP = 'zip',
  RAR = 'rar',
}

// Upload Constants
export const NEXUS_REGISTRY_UPLOAD_ENDPOINT = 'service/rest/v1/components'
export const NEXUS_HOSTED_REPOSITORY = 'raw-hosted'

// Download Constants
export const REPOSITORY_PATH = '/repository/' + NEXUS_HOSTED_REPOSITORY + '/'
