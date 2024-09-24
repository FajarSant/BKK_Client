"use client";
import React from "react";
import Link from "next/link";
import Topbar from "../Components/TopBar";

const CVTutorial: React.FC = () => {
  return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
        <Topbar/>
      <h1 className="text-3xl font-bold text-center mb-6">Langkah-Langkah Membuat CV</h1>

      <h2 className="text-2xl font-semibold mb-4">Situs yang Menyediakan Tutorial CV</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <Link href="https://dibimbing.id/blog/detail/contoh-cv-lamaran-kerja-format-word-tips-membuatnya" className="text-blue-500 underline">
            Dibimbing - Contoh CV dan tips membuatnya
          </Link>
        </li>
        <li>
          <Link href="https://id.jobstreet.com/id/career-advice/article/cara-membuat-cv-di-word" className="text-blue-500 underline">
            JobStreet - Cara Membuat CV di Word
          </Link>
        </li>
        <li>
          <Link href="https://resmume.com/id/blog/contoh-cv-lamaran-kerja-yang-efektif/" className="text-blue-500 underline">
            Resmume - Contoh CV Lamaran Kerja yang Efektif
          </Link>
        </li>
        <li>
          <Link href="https://blog.skillacademy.com/cara-membuat-cv-dan-templatenya" className="text-blue-500 underline">
            Skill Academy - Cara Membuat CV dan Template-nya
          </Link>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Template Pembuat CV Online</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <Link href="https://www.canva.com/" className="text-blue-500 underline">
            Canva
          </Link>: Menyediakan template CV yang menarik dan mudah diedit.
        </li>
        <li>
          <Link href="https://www.zety.com/" className="text-blue-500 underline">
            Zety
          </Link>: Fokus pada pembuatan CV yang profesional dan mudah digunakan.
        </li>
        <li>
          <Link href="https://www.resumebuilder.com/" className="text-blue-500 underline">
            Resume Builder
          </Link>: Menyediakan berbagai template dan fitur untuk membuat CV yang menarik.
        </li>
        <li>
          <Link href="https://novoresume.com/" className="text-blue-500 underline">
            Novoresume
          </Link>: Menawarkan desain yang modern dan intuitif.
        </li>
        <li>
          <Link href="https://resume.io/" className="text-blue-500 underline">
            Resume.io
          </Link>: Memberikan panduan dan contoh CV untuk berbagai jenis pekerjaan.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">1. Pemahaman Diri</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Tentukan Tujuan Karir: Apa yang ingin Anda capai? Posisi apa yang Anda incar?</li>
        <li>Identifikasi Keterampilan: Apa saja keterampilan yang Anda miliki, baik teknis maupun lunak?</li>
        <li>Tentukan Prestasi: Apa saja pencapaian yang membanggakan selama ini?</li>
        <li>Pilih Format: Sesuaikan format CV dengan jenis pekerjaan yang Anda lamar (chronological, functional, atau combination).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">2. Struktur CV</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Header: Nama lengkap, kontak (nomor telepon, email, LinkedIn), dan posisi yang dilamar.</li>
        <li>Ringkasan Profesional: Deskripsi singkat tentang diri Anda, pengalaman, dan tujuan karir.</li>
        <li>Pengalaman Kerja: Sebutkan perusahaan, posisi, tanggal kerja, dan tanggung jawab utama.</li>
        <li>Pendidikan: Sebutkan institusi, jurusan, gelar, dan tahun kelulusan.</li>
        <li>Keterampilan: Daftar keterampilan teknis dan lunak yang relevan.</li>
        <li>Proyek (jika ada): Sebutkan proyek yang pernah Anda kerjakan, terutama jika relevan dengan posisi yang dilamar.</li>
        <li>Sertifikat (jika ada): Sebutkan sertifikat yang Anda miliki.</li>
        <li>Referensi: Sebutkan nama, jabatan, dan kontak referensi (bisa diberikan saat diminta).</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">3. Tips Membuat CV yang Menarik</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Sesuaikan dengan Pekerjaan: Tampilkan keterampilan dan pengalaman yang paling relevan dengan posisi yang Anda lamar.</li>
        <li>Gunakan Kata Kunci: Gunakan kata kunci yang sering muncul dalam deskripsi pekerjaan.</li>
        <li>Tulis dengan Jelas dan Ringkas: Hindari kalimat yang bertele-tele. Gunakan bullet points untuk memudahkan pembaca.</li>
        <li>Perhatikan Tata Letak: Gunakan font yang mudah dibaca, margin yang cukup, dan perhatikan keselarasan.</li>
        <li>Proofread: Periksa kembali kesalahan ejaan dan tata bahasa.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">4. Gunakan Pembuat CV Online</h2>
      <p className="mb-4">Untuk mempermudah proses pembuatan CV, Anda bisa memanfaatkan berbagai pembuat CV online yang tersedia.</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">5. Tips Tambahan</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Sesuaikan dengan Budaya Perusahaan: Pelajari tentang perusahaan yang Anda lamar dan sesuaikan gaya CV Anda.</li>
        <li>Simpan dalam Format PDF: Format PDF membuat CV Anda lebih mudah dibaca dan menjaga formatnya.</li>
        <li>Perbarui Secara Berkala: Update CV Anda secara berkala, terutama setelah mendapatkan pengalaman baru atau keterampilan tambahan.</li>
      </ul>

      <p className="mb-4 text-gray-700">
        Ingat: CV adalah pintu gerbang Anda menuju dunia kerja. Buatlah CV yang menarik, profesional, dan mencerminkan diri Anda yang sebenarnya.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4 text-center">Video Tutorial</h2>
      <iframe
        className="w-full h-60 rounded-lg shadow-md mb-4"
        src="https://www.youtube.com/embed/JpPoxKdJoeo"
        title="Tutorial Membuat CV"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <p className="text-center">
        Untuk informasi lebih lanjut, Anda bisa mengunjungi{" "}
        <Link href="https://www.youtube.com/watch?v=JpPoxKdJoeo" className="text-blue-500 underline">
          link ini
        </Link>.
      </p>
    </div>
  );
};

export default CVTutorial;
