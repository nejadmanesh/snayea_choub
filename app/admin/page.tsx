'use client'

import { useState, useEffect } from 'react'
import { authenticate, getProjects, saveProject, deleteProject, type Project } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trash2, Edit, Plus, Upload } from 'lucide-react'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('list')

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
      loadProjects()
    }
  }, [])

  const loadProjects = async () => {
    const data = await getProjects()
    setProjects(data)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await authenticate(password)
    if (result.success) {
      setIsAuthenticated(true)
      localStorage.setItem('isAdminAuthenticated', 'true')
      loadProjects()
    } else {
      alert('رمز عبور اشتباه است')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAdminAuthenticated')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget)
    if (editingProject) {
      formData.append('id', editingProject.id)
      formData.append('currentImage', editingProject.image)
    }

    try {
      await saveProject(formData)
      await loadProjects()
      setEditingProject(null)
      setActiveTab('list')
      alert('ذخیره شد')
    } catch (error) {
      console.error(error)
      alert('خطا در ذخیره سازی')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('آیا مطمئن هستید؟')) {
      await deleteProject(id)
      loadProjects()
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setActiveTab('edit')
  }

  const handleAddNew = () => {
    setEditingProject(null)
    setActiveTab('edit')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">ورود به پنل مدیریت</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور را وارد کنید"
                />
              </div>
              <Button type="submit" className="w-full">ورود</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">پنل مدیریت نمونه کارها</h1>
          <Button variant="outline" onClick={handleLogout}>خروج</Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="list" onClick={() => setActiveTab('list')}>لیست پروژه‌ها</TabsTrigger>
            <TabsTrigger value="edit" onClick={handleAddNew}>
              {editingProject ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 bg-white shadow-sm relative group">
                      <div className="aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">بدون تصویر</div>
                        )}
                      </div>
                      <h3 className="font-bold mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{project.category}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                      
                      <div className="absolute top-2 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" onClick={() => handleEdit(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" onClick={() => handleDelete(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div 
                    onClick={handleAddNew}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors min-h-[300px]"
                  >
                    <Plus className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-gray-500">افزودن پروژه جدید</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>{editingProject ? 'ویرایش پروژه' : 'افزودن پروژه جدید'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      defaultValue={editingProject?.title} 
                      required 
                      placeholder="مثال: کابینت مدرن سفید"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">دسته‌بندی</Label>
                    <Input 
                      id="category" 
                      name="category" 
                      defaultValue={editingProject?.category} 
                      required 
                      placeholder="مثال: آشپزخانه" 
                      list="categories"
                    />
                    <datalist id="categories">
                      <option value="آشپزخانه" />
                      <option value="اتاق خواب" />
                      <option value="پنل و آسانسور" />
                      <option value="دکوراتیو" />
                    </datalist>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">توضیحات</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      defaultValue={editingProject?.description} 
                      rows={4}
                      placeholder="توضیحات پروژه را اینجا بنویسید..."
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>تصویر (آپلود یا لینک)</Label>
                    
                    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50">
                      <div className="space-y-2">
                        <Label htmlFor="image" className="text-xs text-gray-500">گزینه ۱: آپلود فایل</Label>
                        <Input 
                          id="image" 
                          name="image" 
                          type="file" 
                          accept="image/*" 
                        />
                      </div>

                      <div className="text-center text-xs text-gray-400 font-bold">- یا -</div>

                      <div className="space-y-2">
                        <Label htmlFor="imageUrl" className="text-xs text-gray-500">گزینه ۲: لینک مستقیم (مثل گوگل درایو یا اینستاگرام)</Label>
                        <Input 
                          id="imageUrl" 
                          name="imageUrl" 
                          type="url" 
                          placeholder="https://..."
                          defaultValue={editingProject?.image?.startsWith('http') ? editingProject.image : ''}
                        />
                      </div>
                    </div>

                    {editingProject?.image && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-2">تصویر فعلی:</p>
                        <div className="w-full max-w-[200px] aspect-video rounded-md overflow-hidden border">
                          <img src={editingProject.image} alt="Current" className="w-full h-full object-cover" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setActiveTab('list')} className="flex-1">
                      انصراف
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
