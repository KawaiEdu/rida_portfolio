import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { checkAdmin } from '../utils/auth'

export default defineEventHandler(async (event) => {
  checkAdmin(event)

  const files = await readMultipartFormData(event)
  if (!files || files.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tidak ada file yang diunggah'
    })
  }

  const file = files[0]
  
  if (!file.filename || !file.type || !file.type.startsWith('image/')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'File harus berupa gambar'
    })
  }

  // Ensure upload directory exists
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }

  const extension = file.filename.split('.').pop() || 'jpg'
  const newFilename = `upload-${Date.now()}.${extension}`
  const filePath = join(uploadDir, newFilename)

  writeFileSync(filePath, file.data)

  return {
    success: true,
    url: `/uploads/${newFilename}`
  }
})
