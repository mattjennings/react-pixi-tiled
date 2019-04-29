import * as PIXI from 'pixi.js'

export default function useResources(resources: string[]) {
  const cachedResources = PIXI.loader.resources

  for (const resource of resources) {
    if (!cachedResources[resource]) {
      const loadResource = new Promise(res => PIXI.loader.add(resource).load(res))

      throw loadResource
    } else {
      return cachedResources[resource]
    }
  }

  return null
}
