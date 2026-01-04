export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-balance">طراحی و ساخت کابینت و MDF</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
          کیفیت بالا و صنعت‌گری بی‌نظیر در هر پروژه
        </p>
        <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          با بیش از سال‌های تجربه، ما متخصص در طراحی و ساخت کابینت‌های مدرن و کاربردی هستیم. هر پروژه با دقت و نگاه هنری
          انجام می‌شود.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            درخواست قیمت
          </a>
          <a
            href="https://instagram.com/sanaayea_choub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
          >
            نمایش بیشتر در اینستاگرام
          </a>
        </div>
      </div>
    </section>
  )
}
