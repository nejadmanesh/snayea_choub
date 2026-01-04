'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'projects.json')
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export type Project = {
  id: string
  title: string
  description: string
  image: string
  category: string
}

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE_PATH)
  } catch {
    await fs.writeFile(DATA_FILE_PATH, '[]', 'utf-8')
  }
}

export async function getProjects(): Promise<Project[]> {
  await ensureDataFile()
  const data = await fs.readFile(DATA_FILE_PATH, 'utf-8')
  return JSON.parse(data)
}

export async function saveProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const imageFile = formData.get('image') as File
  const imageUrlInput = formData.get('imageUrl') as string
  const id = formData.get('id') as string | null

  if (!title || !category) {
    throw new Error('Title and Category are required')
  }

  let imageUrl = formData.get('currentImage') as string || ''

  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`
    
    try {
      await fs.access(UPLOAD_DIR)
    } catch {
      await fs.mkdir(UPLOAD_DIR, { recursive: true })
    }

    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)
    imageUrl = `/uploads/${filename}`
  } else if (imageUrlInput) {
    imageUrl = imageUrlInput
  }

  const projects = await getProjects()
  
  if (id) {
    // Update existing
    const index = projects.findIndex(p => p.id === id)
    if (index !== -1) {
      projects[index] = { ...projects[index], title, description, category, image: imageUrl }
    }
  } else {
    // Create new
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      image: imageUrl,
      category
    }
    projects.push(newProject)
  }

  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projects, null, 2), 'utf-8')
  revalidatePath('/')
  return { success: true }
}

export async function deleteProject(id: string) {
  const projects = await getProjects()
  const filteredProjects = projects.filter(p => p.id !== id)
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(filteredProjects, null, 2), 'utf-8')
  revalidatePath('/')
  return { success: true }
}

export async function authenticate(password: string) {
  // Simple hardcoded password for now
  if (password === 'admin123') {
    return { success: true }
  }
  return { success: false }
}
