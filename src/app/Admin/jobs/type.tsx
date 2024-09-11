// Adjust the path as needed for your project
export interface Job {
  id: string;
  berkas: string;
  namaPT: string;
  deskripsi: string;
  persyaratan: string[];
  openrekrutmen: string[];
  gambar: string;
  alamat: string;
  email: string;
  nomorTelepon: string; 
  deadline?: Date | null; // Ensure this matches the DatePicker usage
  tanggalDibuat: string; // Ensure this line is included
}
