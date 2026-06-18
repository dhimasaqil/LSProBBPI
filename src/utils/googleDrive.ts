export function getGoogleDriveDownloadUrl(url: string | null): string | null {
  if (!url) return null
  // Support full Google Drive sharing URLs like https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  const match = url.match(/\/d\/([^/]+)/)
  if (!match) return null
  return `https://drive.google.com/uc?export=download&id=${match[1]}`
}

export function getGoogleFormEmbedUrl(formId: string): string {
  return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`
}

export function getGoogleFormViewUrl(formId: string): string {
  return `https://docs.google.com/forms/d/e/${formId}/viewform`
}
