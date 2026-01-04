export default function Services() {
  const services = [
    {
      title: "طراحی سفارشی",
      description: "طراحی‌های منحصر به فرد براساس نیاز و سلیقه شما",
    },
    {
      title: "ساخت و نصب",
      description: "ساخت در کارگاه و نصب حرفه‌ای در محل شما",
    },
    {
      title: "استشاره رایگان",
      description: "مشاوره رایگان برای انتخاب بهترین طراحی و مواد",
    },
    {
      title: "گارانتی و سرویس",
      description: "ضمانت کیفیت و سرویس پس از فروش",
    },
    {
      title: "موادی باکیفیت",
      description: "استفاده از بهترین مواد و هاردور‌های معتبر",
    },
    {
      title: "تحویل سریع",
      description: "زمان‌بندی منطقی و تحویل به‌موقع پروژه",
    },
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">خدمات</h2>
          <p className="text-xl text-muted-foreground">ما در تمام مراحل پروژه شما کنار شما هستیم</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 border border-border rounded-lg hover:border-accent transition-colors">
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-lg">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
