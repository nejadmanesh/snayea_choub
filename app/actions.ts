'use server'

import { Octokit } from '@octokit/rest'
import { revalidatePath } from 'next/cache'

const GITHUB_OWNER = process.env.GITHUB_OWNER || 'nejadmanesh'
const GITHUB_REPO = process.env.GITHUB_REPO || 'snayea_choub'
const GITHUB_BRANCH = 'main'

// Initialize Octokit with the token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export type Project = {
  id: string
  title: string
  description: string
  image: string
  category: string
}

async function getFileSha(path: string) {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path,
      ref: GITHUB_BRANCH,
    })
    
    if (Array.isArray(data)) return null
    return (data as any).sha
  } catch (e) {
    return null
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    // Try to fetch from GitHub API first for fresh data (Admin panel needs this)
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: 'data/projects.json',
      ref: GITHUB_BRANCH,
    })

    if (Array.isArray(data) || !('content' in data)) {
      return []
    }

    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.error('Error fetching projects from GitHub:', error)
    // Fallback to empty array or try local fs if needed, but for Vercel + GitHub CMS we rely on API
    return []
  }
}

export async function saveProject(formData: FormData) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set')
  }

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

  // Handle Image Upload
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const base64Content = buffer.toString('base64')
    const filename = `${Date.now()}-${imageFile.name.replace(/\s/g, '-')}`
    const path = `public/uploads/${filename}`

    // Upload image to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: path,
      message: `Upload image ${filename}`,
      content: base64Content,
      branch: GITHUB_BRANCH,
    })

    // Use jsDelivr for instant global CDN access (bypasses Vercel build delay)
    imageUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}/${path}`
  } else if (imageUrlInput) {
    imageUrl = imageUrlInput
  }

  // Handle JSON Update
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

  // Save JSON to GitHub
  const jsonContent = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64')
  const jsonSha = await getFileSha('data/projects.json')

  await octokit.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: 'data/projects.json',
    message: `Update projects data ${new Date().toISOString()}`,
    content: jsonContent,
    sha: jsonSha || undefined,
    branch: GITHUB_BRANCH,
  })

  revalidatePath('/')
  return { success: true }
}

export async function deleteProject(id: string) {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set')
  }

  const projects = await getProjects()
  const filteredProjects = projects.filter(p => p.id !== id)

  const jsonContent = Buffer.from(JSON.stringify(filteredProjects, null, 2)).toString('base64')
  const jsonSha = await getFileSha('data/projects.json')

  await octokit.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: 'data/projects.json',
    message: `Delete project ${id}`,
    content: jsonContent,
    sha: jsonSha || undefined,
    branch: GITHUB_BRANCH,
  })

  revalidatePath('/')
  return { success: true }
}

export async function authenticate(password: string) {
  if (password === 'admin123') {
    return { success: true }
  }
  return { success: false }
}
