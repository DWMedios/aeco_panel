export interface MediaAsset {
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
