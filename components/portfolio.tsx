import { getProjects } from "@/app/actions"

export default async function Portfolio() {
  const projects = await getProjects()

  const groupedProjects = projects.reduce(
    (acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = []
      }
      acc[project.category].push(project)
      return acc
    },
    {} as Record<string, typeof projects>,
  )

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">نمونه کارها</h2>
          <p className="text-xl text-muted-foreground">نمایشی از پروژه‌های اخیر ما</p>
        </div>

        {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
          <div key={category} className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center pb-4 border-b-2 border-primary">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProjects.map((project, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                    <img
                      src={project.image || "/placeholder.svg?height=256&width=400&query=wooden+cabinet+design"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
