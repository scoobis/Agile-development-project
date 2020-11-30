import React from 'react'
import { DropzoneAreaBase } from 'material-ui-dropzone'

export default function UploadImages ({ images, setImages }) {
  const handleAdd = newImages => {
    newImages = newImages.filter(image => !images.find(i => i.data === image.data))
    setImages([...images, ...newImages])
  }

  const handleDelete = deleted => {
    setImages(images.filter(i => i !== deleted))
  }

  return (
    <DropzoneAreaBase
      fileObjects={images}
      onAdd={handleAdd}
      onDelete={handleDelete}
      acceptedFiles={['image/*']}
      filesLimit={3}
      maxFileSize={2000000}
      dropzoneText='Dra och släpp bilder här'
      getFileAddedMessage={() => 'Filen laddades upp!'}
      getFileRemovedMessage={() => 'Bild borttagen'}
      getFileLimitExceedMessage={() => 'Max antalet tillåtna bilder: 3 st'}
      getDropRejectMessage={() => 'Bilden är för stor. Max storlek: 2MB '}
      showAlerts={['error']}
    />
  )
}
