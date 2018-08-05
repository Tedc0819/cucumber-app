const fs = require('fs')
const sleep = require('sleep')

/*
 * This class is used to manage resources when protractor is doing parallel run.
 *
 * We mark resource by creating and deleting file. We are not going to write and delete in the same as this may casue atomic I/O problem. Our approach can reduce the chance of having such issue
 *
 * Sometime you may force quit the test. there may be some .resource.tmp file. feel free to remove them
 */


class ResourceManager {
  constructor({ resources, label }) {
    this.label = label
    this.allResources = resources
    this.tmpFilePath = '.'
  }

  /*
   * get all the keys of resource that match the regex
   *
   * @return {Array} array an array of keys of resources
   */

  getTargetResources(tags) {
    const resources = this.allResources.filter((resource) => {
      let result = true

      tags.forEach((tag) => {
        result = resource.tags.includes(tag) && result
      })

      return result
    })

    return resources
  }

  /*
   * check the file system. all in use resource will have a file with its name
   *
   * @return {Array} array an array of keys of resources
   */

  getInUse() {
    const files = fs.readdirSync(this.tmpFilePath).filter((file) => {
      const regex = new RegExp(`.${this.label}.resource.tmp`)
      return file.match(regex)
    }).map(file => file.replace(`.${this.label}.resource.tmp`, ''))

    return files
  }

  /*
   * mark an resource in use by creating a file with its naming
   */

  markInUse(resource) {
    return fs.writeFileSync(`${this.tmpFilePath}/${resource.id}.${this.label}.resource.tmp`, 'true', 'utf8');
  }

  /*
   * unmark an resource by deleting its file
   */

  unmarkInUse(resource) {
    try {
      fs.unlinkSync(`${this.tmpFilePath}/${resource.id}.${this.label}.resource.tmp`);
    } catch (err) { }
  }

  /*
   * using XOR to see which resource is available
   *
   * @return {Array} array an array of keys of resources
   */

  getAvailable(resources, inUse) {
    return resources.filter(resource => !inUse.includes(resource.id))
  }

  /*
   * main method of the manage.
   *
   * @return {string} target the key of the resource can be used
   */

  getResource(tags, retry = 10) {
    const resources = this.getTargetResources(tags)

    let resource
    let retryCount = 0

    while (!resource && retryCount < retry) {
      const inUses = this.getInUse()

      const availableResources = this.getAvailable(resources, inUses)

      if (availableResources.length == 0) {
        sleep.sleep(5)

        retryCount += 1
      } else {
        resource = Object.assign({}, availableResources[0])
      }
    }

    if (!resource) {
      throw new Error(`NOT ENOUGH ACCOUNT FOR ${tags}`)
    }

    resource.retry = retryCount

    this.markInUse(resource)

    return resource
  }
}

module.exports = ResourceManager
