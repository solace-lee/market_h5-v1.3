import api from "../http/api.js"
import { config } from "../../config-api"

const localName = function getAreaName(provinceId, cityId, districtId) {
  let localID = ''
  if (!provinceId) {
    return null
  } else if (!cityId) {
    localID = provinceId + "," + 0 + "," + 0
  } else if (!districtId) {
    localID = provinceId + "," + cityId + "," + 0
  } else {
    localID = provinceId + "," + cityId + "," + districtId
  }
  let area = {}
  return new Promise((resolve, reject) => {
    api.get(config.local + '/api/getAddressDetail?ids=' + localID)
      .then(res => {
        // area = res.data.data
        area.provinceName = res.data.data.Province.provinceName
        if (!cityId) {
          area.cityName = ''
        } else {
          area.cityName = res.data.data.city.cityName
        }
        if (!districtId) {
          area.districtName = ''
        } else {
          area.districtName = res.data.data.district.districtName
        }
        resolve(area)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const localID = function getAreaID(provinceName, cityName, districtName, villageName) {
  let locals = provinceName + ',' + cityName + ',' + districtName
  let area = {}
  return new Promise((resolve, reject) => {
    api.get(config.local + '/api/getAddress?names=' + locals)
      .then(res => {
        area = res.data.data
        resolve(area)
      })
      .catch(err => {
        reject(err)
      })
  })
}


export {
  localName, localID
}