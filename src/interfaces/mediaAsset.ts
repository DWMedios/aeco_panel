export interface MediaAssetUpload {
  fileName: string
  mimeType: string
  assetType: string
  fileExtension: string
}

export interface MediaAssetResponse {
  url: string
  headers: Record<string, string>
  key: string
}

export interface MediaAsset {
  fileKey: string
  originalName: string
  mimeType: string
  fileSize: number
  assetType: string
}
