export function getGoogleDriveDownloadUrl(url: string | null): string | null {
  if (!url) return null
  // Support full Google Drive sharing URLs like https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match = url.match(/\/d\/([^/]+)/)
  if (!match) return null
  return `https://drive.google.com/uc?export=download&id=${match[1]}`
}
