function getFileExtension (url) {
  if (typeof url === 'string' && url.length) {
    const ext = /(jpe?g|png|bmp|gif|docx?|pdf|xls?|pptx?)\?/
    const matched = ext.exec(url)
    return matched ? matched[1] : null
  }
  return null
}

function saveBlob (blob, filename) {
  if (!blob || !filename) {
    return
  }
  const url = window.URL.createObjectURL(new Blob([blob]))
  const anchor = document.getElementById('downloadable_anchor')
  document.body.appendChild(anchor)
  anchor.style = 'display: none'
  anchor.href = url
  anchor.download = filename
  anchor.click()
  window.URL.revokeObjectURL(url)
}

export function onDownload (publicURL, filename) {
  if (typeof publicURL !== 'string' || !publicURL.length) {
    return
  }
  if (publicURL.includes('firebasestorage.googleapis.com/')) {
    const ext = getFileExtension(publicURL)
    fetch(publicURL)
      .then((response) => {
        return response.blob()
      }).then((blob) => {
        saveBlob(blob, `${filename}.${ext}`)
      }).catch((err) => {
        alert(err.message || err || 'File is unavailable to be downloaded')
      })
  } else {
    window.open(publicURL, '_blank')
  }
}

export function onShare (text) {
  const url = `whatsapp://send?text=${text}`
  window.open(url, '_blank')
}
