export class AllGatewaysFailedException extends Error {
  status = 502

  constructor(message: string) {
    super(message)
    this.name = 'AllGatewaysFailedException'
  }
}
