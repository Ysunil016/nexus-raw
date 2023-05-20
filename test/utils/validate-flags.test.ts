import {expect} from 'chai'
import {FileExtension} from '../../src/utils/constants'
import {UploadFlags} from '../../src/utils/validate-flags'
import {ValidationError} from 'class-validator'

describe('Utils', () => {
  let flags : Record<string, any>

  beforeEach(() => {
    flags = {
      name: 'ys',
      path: './some-path',
      registry: 'https://nexus.sy.com',
      'unique-id': 'ys',
      'nexus-cred': 'username:password',
      'target-path': '/com/ys/artifact',
    }
  })

  it('Valid Configuration', async () => {
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    uploadFlags.addExtension(FileExtension.ZIP)
    expect(async () => uploadFlags.validateFlags()).not.throw(Error)
  })

  it('Invalid Artifact Name', async () => {
    flags = {...flags, name: 'invalid@name'}
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    uploadFlags.addExtension(FileExtension.ZIP)
    try {
      await uploadFlags.validateFlags()
      expect(true).false
    } catch (error) {
      const err = (error as ValidationError[])
      const contraintMessage = JSON.parse(JSON.stringify(err[0].constraints))
      expect(contraintMessage.matches).to.equals('name must match ^[a-z0-9-]+$ regular expression')
    }
  })

  it('Invalid Path Name', async () => {
    flags = {...flags, path: ''}
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    uploadFlags.addExtension(FileExtension.ZIP)
    try {
      await uploadFlags.validateFlags()
      expect(true).false
    } catch (error) {
      const err = (error as ValidationError[])
      const contraintMessage = JSON.parse(JSON.stringify(err[0].constraints))
      expect(contraintMessage.minLength).to.equals('path must be longer than or equal to 1 characters')
    }
  })

  it('Invalid Target Path', async () => {
    flags = {...flags, 'target-path': ''}
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    uploadFlags.addExtension(FileExtension.ZIP)
    try {
      await uploadFlags.validateFlags()
      expect(true).false
    } catch (error) {
      const err = (error as ValidationError[])
      const contraintMessage = JSON.parse(JSON.stringify(err[0].constraints))
      expect(contraintMessage.minLength).to.equals('target-path must be longer than or equal to 1 characters')
    }
  })

  it('Invalid Unique Id', async () => {
    flags = {...flags, 'unique-id': '#2@'}
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    uploadFlags.addExtension(FileExtension.ZIP)
    try {
      await uploadFlags.validateFlags()
      expect(true).false
    } catch (error) {
      const err = (error as ValidationError[])
      const contraintMessage = JSON.parse(JSON.stringify(err[0].constraints))
      expect(contraintMessage.matches).to.equals('unique-id must match ^[a-z0-9-.]+$ regular expression')
    }
  })

  it('Invalid File Extension', async () => {
    flags = {...flags, extension: 'png'}
    const uploadFlags = Object.assign(new UploadFlags(), flags)
    try {
      await uploadFlags.validateFlags()
      expect(true).false
    } catch (error) {
      const err = (error as ValidationError[])
      const contraintMessage = JSON.parse(JSON.stringify(err[0].constraints))
      expect(contraintMessage.isEnum).to.equals('extension must be one of the following values: tar, zip, rar')
    }
  })
})
