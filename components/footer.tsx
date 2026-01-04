import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">حمید رضا شفیع‌آبادی</h3>
            <p className="opacity-80">متخصص در طراحی و ساخت کابینت و MDF با کیفیت بالا</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">منو</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="#portfolio" className="hover:opacity-100 transition-opacity">
                  نمونه کارها
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:opacity-100 transition-opacity">
                  خدمات
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:opacity-100 transition-opacity">
                  تماس
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">شبکه‌های اجتماعی</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <a
                  href="https://www.instagram.com/sanaayea_choub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity"
                >
                  اینستاگرام
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center opacity-80 text-sm">
          <p>تمامی حقوق محفوظ است © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
