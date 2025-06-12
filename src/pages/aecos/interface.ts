import { AecoStatusEnum } from '../../enums/aecoEnums'

export interface IAecoForm {
  name: string
  status: AecoStatusEnum
  serialNumber: string
  currentCoords: {
    latitude: string
    longitude: string
  }
}
