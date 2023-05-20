import {expect, test} from '@oclif/test'

describe('Flags Validation', () => {
  test
  .stdout()
  .command(['upload', '-p=./ys.zip', '-u=ys', '-t=/com/ys/artifact'])
  .catch(error => {
    expect(error.message).contains('Missing required flag name')
  })
  .it('Missing Name Flag')

  test
  .stdout()
  .command(['upload', '-n=ys', '-u=ys', '-t=/com/ys/artifact'])
  .catch(error => {
    expect(error.message).contains('Missing required flag path')
  })
  .it('Missing Path Flag')

  test
  .stdout()
  .command(['upload', '-n=ys', '-p=./ys.zip', '-t=/com/ys/artifact'])
  .catch(error => {
    expect(error.message).contains('Missing required flag unique-id')
  })
  .it('Missing UniqueId Flag')

  test
  .stdout()
  .command(['upload', '-n=ys', '-p=./ys.zip', '-u=ys'])
  .catch(error => {
    expect(error.message).contains('Missing required flag target')
  })
  .it('Missing Target Flag')
})
