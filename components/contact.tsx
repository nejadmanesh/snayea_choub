"use client"

import type React from "react"

import { useState } from "react"
import { Phone, MapPin, Mail } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to a backend
    alert("از پیام شما سپاس‌گزاریم! به زودی تماس خواهیم گرفت.")
    setFormData({ name: "", phone: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">تماس با ما</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">تلفن</h3>
                  <a href="tel:09375551950" className="text-xl font-bold text-foreground hover:text-accent transition-colors">
                    09375551950
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">ایمیل</h3>
                  <p className="text-muted-foreground">vitoewsocial@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">موقعیت</h3>
                  <p className="text-muted-foreground">تهران، کارگاه و نمایشگاه</p>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://www.instagram.com/sanaayea_choub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent font-bold text-lg hover:underline"
                >
                  @sanaayea_choub
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">نام</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent bg-background"
                placeholder="نام شما"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">ایمیل</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent bg-background"
                  placeholder="ایمیل شما"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">تلفن</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent bg-background"
                  placeholder="تلفن شما"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">پیام</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-accent bg-background resize-none"
                placeholder="پیام شما..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-bold text-lg"
            >
              ارسال پیام
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
