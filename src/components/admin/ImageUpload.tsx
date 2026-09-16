'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

export default function ImageUpload({
  url,
  onUpload,
}: {
  url: string | null
  onUpload: (url: string | null) => void
}) {
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        throw new Error('Please upload a JPG, PNG, or WebP image.')
      }

      // Validate file size (e.g. 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size should be less than 5MB.')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath)
      
      onUpload(data.publicUrl)
    } catch (error: any) {
      alert(error.message)
    } finally {
      setUploading(false)
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const handleRemove = () => {
    // We could delete from storage here, but if the blog isn't saved, we might lose it.
    // Better to just unlink. A cleanup job could handle unused images.
    onUpload(null)
  }

  return (
    <div className="w-full">
      {url ? (
        <div className="relative rounded-[2px] overflow-hidden border border-gray-300 bg-gray-50 aspect-video flex items-center justify-center max-w-xl">
          <img 
            src={url} 
            alt="Uploaded featured image" 
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-sm"
            title="Remove image"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="max-w-xl">
          <label 
            className={`
              flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-[2px] 
              cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors
              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">WebP, PNG, JPG (MAX. 5MB)</p>
              {uploading && <p className="text-sm font-medium text-forest-800 mt-2">Uploading...</p>}
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/jpeg, image/png, image/webp" 
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  )
}
