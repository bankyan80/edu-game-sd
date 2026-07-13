import { Question } from "@/types";

export type QuestionBank = Record<string, Question[]>;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getQuestions(gameSlug: string): Question[] {
  const bank = questionBanks[gameSlug];
  if (!bank) return [];
  return shuffle(bank);
}

export const questionBanks: QuestionBank = {
  "tebak-huruf": [
    // MUDAH (5)
    { id: "th-m1", question: "Huruf yang hilang: A, B, C, D, ___, F", options: ["E", "G", "H", "I"], answer: "E", difficulty: "Mudah", category: "Urutan Abjad" },
    { id: "th-m2", question: "Huruf kelima dalam abjad adalah...", options: ["C", "D", "E", "F"], answer: "E", difficulty: "Mudah", category: "Pengetahuan Abjad" },
    { id: "th-m3", question: "Huruf yang hilang: M, N, O, ___, Q", options: ["P", "R", "L", "N"], answer: "P", difficulty: "Mudah", category: "Urutan Abjad" },
    { id: "th-m4", question: "Huruf pertama dari kata 'Sembilan' adalah...", options: ["S", "E", "N", "B"], answer: "S", difficulty: "Mudah", category: "Identifikasi Huruf" },
    { id: "th-m5", question: "Manakah huruf vokal berikut?", options: ["A", "B", "C", "D"], answer: "A", difficulty: "Mudah", category: "Huruf Vokal" },
    // SEDANG (5)
    { id: "th-s1", question: "Kata 'BUNGA' memiliki huruf vokal di posisi...", options: ["1, 3, 5", "2, 4", "1, 5", "1, 4"], answer: "1, 3, 5", difficulty: "Sedang", category: "Posisi Huruf Vokal" },
    { id: "th-s2", question: "Huruf yang hilang: J, K, L, M, N, ___, P", options: ["O", "Q", "R", "N"], answer: "O", difficulty: "Sedang", category: "Urutan Abjad" },
    { id: "th-s3", question: "Kata 'MAKAN' memiliki berapa huruf mati?", options: ["2", "3", "4", "1"], answer: "2", difficulty: "Sedang", category: "Huruf Vokal dan Mati" },
    { id: "th-s4", question: "Huruf yang hilang: ___, B, D, F, H", options: ["A", "C", "E", "G"], answer: "A", difficulty: "Sedang", category: "Polanya Huruf" },
    { id: "th-s5", question: "Jika dibalik, huruf 'M' tetap terlihat sama. Manakah huruf lain yang juga begitu?", options: ["A", "O", "H", "B"], answer: "O", difficulty: "Sedang", category: "Simetri Huruf" },
    // SULIT (5)
    { id: "th-u1", question: "Kata 'RADAR' adalah palindrom. Berapa jumlah huruf vokal di dalamnya?", options: ["2", "3", "4", "1"], answer: "3", difficulty: "Sulit", category: "Palindrom dan Vokal" },
    { id: "th-u2", question: "Huruf 'X' dan 'Y' terletak di akhir abjad. Berapa banyak huruf SETELAH huruf 'T' dalam abjad?", options: ["5", "6", "7", "4"], answer: "5", difficulty: "Sulit", category: "Pengetahuan Abjad" },
    { id: "th-u3", question: "Kata 'IKAN' dan 'KAIN' menggunakan huruf yang sama. Huruf apa yang ada di 'IKAN' tapi TIDAK di 'KAIN'?", options: ["Tidak ada, keduanya sama", "T", "H", "U"], answer: "Tidak ada, keduanya sama", difficulty: "Sulit", category: "Perbandingan Huruf" },
    { id: "th-u4", question: "Manakah huruf kapital yang memiliki simetri vertikal DAN horizontal?", options: ["H", "B", "P", "R"], answer: "H", difficulty: "Sulit", category: "Simetri Huruf" },
    { id: "th-u5", question: "Huruf 'Q' selalu diikuti oleh huruf...", options: ["U", "O", "A", "I"], answer: "U", difficulty: "Sulit", category: "Pola Huruf" },
    // MASTER (5)
    { id: "th-a1", question: "Dalam kata 'BERBUNYI', huruf mana yang muncul lebih dari sekali?", options: ["B dan R", "Hanya B", "Hanya R", "B dan U"], answer: "Hanya B", difficulty: "Master", category: "Analisis Huruf" },
    { id: "th-a2", question: "Huruf kapital mana yang TIDAK memiliki garis lurus sama sekali?", options: ["S", "O", "C", "S dan C"], answer: "S dan C", difficulty: "Master", category: "Analisis Bentuk Huruf" },
    { id: "th-a3", question: "Jika semua huruf dari kata 'JATUH' diurutkan secara alfabetis, susunan huruf pertama dan terakhir akan menjadi...", options: ["A dan U", "A dan T", "H dan U", "J dan U"], answer: "A dan U", difficulty: "Master", category: "Pengurutan Huruf" },
    { id: "th-a4", question: "Berapa pasang huruf kapital yang memiliki simetri sempurna (vertikal DAN horizontal) dalam alfabet Latin?", options: ["4", "5", "6", "3"], answer: "4", difficulty: "Master", category: "Simetri Alfabet" },
    { id: "th-a5", question: "Kata 'DEDEDE' mengandung huruf unik sebanyak... dan merupakan pola berulang sebanyak... kali.", options: ["1 huruf unik, 3 kali ulang", "2 huruf unik, 3 kali ulang", "3 huruf unik, 2 kali ulang", "1 huruf unik, 6 kali ulang"], answer: "1 huruf unik, 3 kali ulang", difficulty: "Master", category: "Analisis Pola Huruf" },
  ],

  "tebak-kata": [
    // MUDAH (5)
    { id: "tk-m1", question: "Susun huruf ini: K - U - C - I - N - G", options: ["KUCING", "CUKING", "KINGUC", "CUKING"], answer: "KUCING", difficulty: "Mudah", category: "Menyusun Kata Sederhana" },
    { id: "tk-m2", question: "Susun huruf ini: R - U - M - A - H", options: ["MAHU R", "RUMAH", "AMR HU", "HURMA"], answer: "RUMAH", difficulty: "Mudah", category: "Menyusun Kata Sederhana" },
    { id: "tk-m3", question: "Susun huruf ini: B - U - K - U", options: ["BUKU", "UKUB", "KUBU", "BKUU"], answer: "BUKU", difficulty: "Mudah", category: "Menyusun Kata Sederhana" },
    { id: "tk-m4", question: "Susun huruf ini: A - I - R", options: ["RIA", "AIR", "ARI", "IRA"], answer: "AIR", difficulty: "Mudah", category: "Menyusun Kata Sederhana" },
    { id: "tk-m5", question: "Susun huruf ini: S - A - P - I", options: ["PISA", "APIS", "SAPI", "IPAS"], answer: "SAPI", difficulty: "Mudah", category: "Menyusun Kata Sederhana" },
    // SEDANG (5)
    { id: "tk-s1", question: "Susun huruf ini: G - U - L - A - P - A - N", options: ["PANGULA", "GULAPAN", "LAGUPAN", "PANULAG"], answer: "GULAPAN", difficulty: "Sedang", category: "Menyusun Kata Sedang" },
    { id: "tk-s2", question: "Susun huruf ini: P - E - N - A - S - K - R - I - P", options: ["PENASKRIP", "SKRIPENAP", "RIPENS KAP", "SKRIP NAPA"], answer: "PENASKRIP", difficulty: "Sedang", category: "Menyusun Kata Sedang" },
    { id: "tk-s3", question: "Susun huruf ini: J - A - R - I - N - G - A - N", options: ["JARINGAN", "GARINJAN", "ANJIRANG", "RANGJINA"], answer: "JARINGAN", difficulty: "Sedang", category: "Menyusun Kata Sedang" },
    { id: "tk-s4", question: "Susun huruf ini: M - A - L - A - M", options: ["LAMAM", "MALAM", "ALMAM", "AMMAL"], answer: "MALAM", difficulty: "Sedang", category: "Menyusun Kata Sedang" },
    { id: "tk-s5", question: "Susun huruf ini: P - E - N - D - I - R - I", options: ["PENDIRI", "DIRENP I", "RIDENIP", "PINDIRE"], answer: "PENDIRI", difficulty: "Sedang", category: "Menyusun Kata Sedang" },
    // SULIT (5)
    { id: "tk-u1", question: "Susun huruf ini: S - E - K - O - L - A - H", options: ["SEKOLAH", "LOKASEH", "HOLES KA", "SEOLAKH"], answer: "SEKOLAH", difficulty: "Sulit", category: "Menyusun Kata Sulit" },
    { id: "tk-u2", question: "Susun huruf ini: M - E - N - G - A - J - A - R", options: ["MENGAJAR", "GANJEMAR", "RAMENGAJ", "JANGEMAR"], answer: "MENGAJAR", difficulty: "Sulit", category: "Menyusun Kata Sulit" },
    { id: "tk-u3", question: "Susun huruf ini: P - E - R - T - E - M - U - A - N", options: ["PERTEMUAN", "MENURTEPA", "TEMUANPER", "PANTEMUER"], answer: "PERTEMUAN", difficulty: "Sulit", category: "Menyusun Kata Sulit" },
    { id: "tk-u4", question: "Susun huruf ini: G - U - R - U - P - E - N - D - I - R - I", options: ["GURUPENDIRI", "PENDIRIGURU", "RIGURUPENDI", "GURU PENIRID"], answer: "GURUPENDIRI", difficulty: "Sulit", category: "Menyusun Kata Sulit" },
    { id: "tk-u5", question: "Susun huruf ini: K - E - B - E - R - A - N - T - A - G - I - A - N", options: ["KEBERANTAGIAN", "TAGIANKEBERAN", "RANTAKEBGIANE", "ANTIGABERKENA"], answer: "KEBERANTAGIAN", difficulty: "Sulit", category: "Menyusun Kata Sulit" },
    // MASTER (5)
    { id: "tk-a1", question: "Susun huruf ini: M - E - M - P - E - R - L - U - A - S", options: ["MEMPERLUAS", "LUASMEMPER", "PERMEMULAS", "LUASPEMMER"], answer: "MEMPERLUAS", difficulty: "Master", category: "Menyusun Kata Master" },
    { id: "tk-a2", question: "Susun huruf ini: M - E - N - G - P - E - R - S - E - M - B - U - N - Y - I - K - A - N", options: ["MENGPERS EMBUNYIKAN", "SEMBUNYIKANMENPER", "PERSMENGIKANUNY", "MENGPERS EMBUNYIKAN"], answer: "MENGPERS EMBUNYIKAN", difficulty: "Master", category: "Menyusun Kata Master" },
    { id: "tk-a3", question: "Susun huruf ini: K - E - B - E - R - S - A - M - A - A - N", options: ["KEBERSAMAAN", "SAMANKEBERAA", "BERKESAMAAN", "ANAMAREBKE"], answer: "KEBERSAMAAN", difficulty: "Master", category: "Menyusun Kata Master" },
    { id: "tk-a4", question: "Susun huruf ini: K - E - P - E - M - I - M - P - I - A - N", options: ["KEPEMIMPIAN", "MIMPIANKEPE", "PIMPIANKEPE", "KEPIMIMPIAN"], answer: "KEPEMIMPIAN", difficulty: "Master", category: "Menyusun Kata Master" },
    { id: "tk-a5", question: "Susun huruf ini: P - E - N - D - I - D - I - K - A - N", options: ["PENDIDIKAN", "DIDIKANPEND", "KANDIDIKEN", "PENDIDIKAN"], answer: "PENDIDIKAN", difficulty: "Master", category: "Menyusun Kata Master" },
  ],

  "puzzle-kata": [
    // MUDAH (5)
    { id: "pk-m1", question: "Susun huruf ini menjadi kata: B - E - R - U - N - C - U", answer: "BERUNCU", difficulty: "Mudah", category: "Menyusun Kata Sederhana", options: undefined },
    { id: "pk-m2", question: "Susun huruf ini menjadi kata: A - Y - A - M", answer: "AYAM", difficulty: "Mudah", category: "Menyusun Kata Sederhana", options: undefined },
    { id: "pk-m3", question: "Susun huruf ini menjadi kata: T - A - H - A - N", answer: "TAHAN", difficulty: "Mudah", category: "Menyusun Kata Sederhana", options: undefined },
    { id: "pk-m4", question: "Susun huruf ini menjadi kata: B - A - N - Y - U", answer: "BANYU", difficulty: "Mudah", category: "Menyusun Kata Sederhana", options: undefined },
    { id: "pk-m5", question: "Susun huruf ini menjadi kata: K - E - L - A - P - A", answer: "KELAPA", difficulty: "Mudah", category: "Menyusun Kata Sederhana", options: undefined },
    // SEDANG (5)
    { id: "pk-s1", question: "Susun huruf ini menjadi kata: P - E - N - G - A - J - A - R", answer: "PENGAJAR", difficulty: "Sedang", category: "Menyusun Kata Sedang", options: undefined },
    { id: "pk-s2", question: "Susun huruf ini menjadi kata: M - A - T - E - M - A - T - I - K", answer: "MATEMATIK", difficulty: "Sedang", category: "Menyusun Kata Sedang", options: undefined },
    { id: "pk-s3", question: "Susun huruf ini menjadi kata: S - A - H - A - B - A - T", answer: "SAHABAT", difficulty: "Sedang", category: "Menyusun Kata Sedang", options: undefined },
    { id: "pk-s4", question: "Susun huruf ini menjadi kata: G - U - R - U", answer: "GURU", difficulty: "Sedang", category: "Menyusun Kata Sedang", options: undefined },
    { id: "pk-s5", question: "Susun huruf ini menjadi kata: P - E - R - T - U - G - A - S - A - N", answer: "PERTUGASAN", difficulty: "Sedang", category: "Menyusun Kata Sedang", options: undefined },
    // SULIT (5)
    { id: "pk-u1", question: "Susun huruf ini menjadi kata: P - E - R - T - E - M - P - U - R - A - N", answer: "PERTEMPURAN", difficulty: "Sulit", category: "Menyusun Kata Sulit", options: undefined },
    { id: "pk-u2", question: "Susun huruf ini menjadi kata: K - E - P - E - M - I - M - P - I - A - N", answer: "KEPEMIMPIAN", difficulty: "Sulit", category: "Menyusun Kata Sulit", options: undefined },
    { id: "pk-u3", question: "Susun huruf ini menjadi kata: P - E - N - D - I - D - I - K - A - N", answer: "PENDIDIKAN", difficulty: "Sulit", category: "Menyusun Kata Sulit", options: undefined },
    { id: "pk-u4", question: "Susun huruf ini menjadi kata: M - A - H - A - S - I - S - W - A", answer: "MAHASISWA", difficulty: "Sulit", category: "Menyusun Kata Sulit", options: undefined },
    { id: "pk-u5", question: "Susun huruf ini menjadi kata: K - E - B - E - R - S - A - M - A - A - N", answer: "KEBERSAMAAN", difficulty: "Sulit", category: "Menyusun Kata Sulit", options: undefined },
    // MASTER (5)
    { id: "pk-a1", question: "Susun huruf ini menjadi kata: M - E - M - P - E - R - L - U - A - S", answer: "MEMPERLUAS", difficulty: "Master", category: "Menyusun Kata Master", options: undefined },
    { id: "pk-a2", question: "Susun huruf ini menjadi kata: M - E - N - G - P - E - R - C - A - Y - A - I", answer: "MENGPERCAYAI", difficulty: "Master", category: "Menyusun Kata Master", options: undefined },
    { id: "pk-a3", question: "Susun huruf ini menjadi kata: K - E - B - E - R - A - N - T - A - G - I - A - N", answer: "KEBERANTAGIAN", difficulty: "Master", category: "Menyusun Kata Master", options: undefined },
    { id: "pk-a4", question: "Susun huruf ini menjadi kata: P - E - N - D - I - D - I - K - A - N - A - N", answer: "PENDIDIKANAN", difficulty: "Master", category: "Menyusun Kata Master", options: undefined },
    { id: "pk-a5", question: "Susun huruf ini menjadi kata: M - E - N - G - P - E - R - S - E - M - B - U - N - Y - I - K - A - N", answer: "MENGPERS EMBUNYIKAN", difficulty: "Master", category: "Menyusun Kata Master", options: undefined },
  ],

  "puzzle-kalimat": [
    // MUDAH (5)
    { id: "pkl-m1", question: "Susun kata ini menjadi kalimat yang benar: Saya / pergi / ke / sekolah", answer: "Saya pergi ke sekolah", difficulty: "Mudah", category: "Menyusun Kalimat Sederhana", options: undefined },
    { id: "pkl-m2", question: "Susun kata ini menjadi kalimat yang benar: Ibu / memasak / nasi", answer: "Ibu memasak nasi", difficulty: "Mudah", category: "Menyusun Kalimat Sederhana", options: undefined },
    { id: "pkl-m3", question: "Susun kata ini menjadi kalimat yang benar: Kucing / mengejar / tikus", answer: "Kucing mengejar tikus", difficulty: "Mudah", category: "Menyusun Kalimat Sederhana", options: undefined },
    { id: "pkl-m4", question: "Susun kata ini menjadi kalimat yang benar: Adik / bermain / di / taman", answer: "Adik bermain di taman", difficulty: "Mudah", category: "Menyusun Kalimat Sederhana", options: undefined },
    { id: "pkl-m5", question: "Susun kata ini menjadi kalimat yang benar: Guru / mengajar / di / kelas", answer: "Guru mengajar di kelas", difficulty: "Mudah", category: "Menyusun Kalimat Sederhana", options: undefined },
    // SEDANG (5)
    { id: "pkl-s1", question: "Susun kata ini menjadi kalimat yang benar: Anak-anak / bermain / bola / di / lapangan", answer: "Anak-anak bermain bola di lapangan", difficulty: "Sedang", category: "Menyusun Kalimat Sedang", options: undefined },
    { id: "pkl-s2", question: "Susun kata ini menjadi kalimat yang benar: Ayah / membaca / koran / setiap / pagi", answer: "Ayah membaca koran setiap pagi", difficulty: "Sedang", category: "Menyusun Kalimat Sedang", options: undefined },
    { id: "pkl-s3", question: "Susun kata ini menjadi kalimat yang benar: Bunga / mekar / indah / di / taman", answer: "Bunga mekar indah di taman", difficulty: "Sedang", category: "Menyusun Kalimat Sedang", options: undefined },
    { id: "pkl-s4", question: "Susun kata ini menjadi kalimat yang benar: Kakak / pergi / ke / pasar / membeli / sayur", answer: "Kakak pergi ke pasar membeli sayur", difficulty: "Sedang", category: "Menyusun Kalimat Sedang", options: undefined },
    { id: "pkl-s5", question: "Susun kata ini menjadi kalimat yang benar: Hujan / turun / deras / kemarin / sore", answer: "Hujan turun deras kemarin sore", difficulty: "Sedang", category: "Menyusun Kalimat Sedang", options: undefined },
    // SULIT (5)
    { id: "pkl-u1", question: "Susun kata ini menjadi kalimat yang benar: Siswa-siswa / sedang / belajar / matematika / dengan / tekun / di / kelas", answer: "Siswa-siswa sedang belajar matematika dengan tekun di kelas", difficulty: "Sulit", category: "Menyusun Kalimat Sulit", options: undefined },
    { id: "pkl-u2", question: "Susun kata ini menjadi kalimat yang benar: Perpustakaan / sekolah / memiliki / banyak / buku / yang / menarik", answer: "Perpustakaan sekolah memiliki banyak buku yang menarik", difficulty: "Sulit", category: "Menyusun Kalimat Sulit", options: undefined },
    { id: "pkl-u3", question: "Susun kata ini menjadi kalimat yang benar: Ibu / memasak / masakan / yang / lezat / untuk / keluarga", answer: "Ibu memasak masakan yang lezat untuk keluarga", difficulty: "Sulit", category: "Menyusun Kalimat Sulit", options: undefined },
    { id: "pkl-u4", question: "Susun kata ini menjadi kalimat yang benar: Kami / akan / pergi / berlibur / ke / pantai / minggu / depan", answer: "Kami akan pergi berlibur ke pantai minggu depan", difficulty: "Sulit", category: "Menyusun Kalimat Sulit", options: undefined },
    { id: "pkl-u5", question: "Susun kata ini menjadi kalimat yang benar: Pohon-pohon / yang / tinggi / berdiri / kokoh / di / gunung", answer: "Pohon-pohon yang tinggi berdiri kokoh di gunung", difficulty: "Sulit", category: "Menyusun Kalimat Sulit", options: undefined },
    // MASTER (5)
    { id: "pkl-a1", question: "Susun kata ini menjadi kalimat yang benar: Para / petani / bekerja / keras / di / sawah / pada / musim / kemarau", answer: "Para petani bekerja keras di sawah pada musim kemarau", difficulty: "Master", category: "Menyusun Kalimat Master", options: undefined },
    { id: "pkl-a2", question: "Susun kata ini menjadi kalimat yang benar: Semua / siswa / harus / rajin / belajar / agar / mendapatkan / nilai / yang / baik", answer: "Semua siswa harus rajin belajar agar mendapatkan nilai yang baik", difficulty: "Master", category: "Menyusun Kalimat Master", options: undefined },
    { id: "pkl-a3", question: "Susun kata ini menjadi kalimat yang benar: Guru / memberikan / tugas / kepada / murid-muridnya / untuk / dikerjakan / di / rumah", answer: "Guru memberikan tugas kepada murid-muridnya untuk dikerjakan di rumah", difficulty: "Master", category: "Menyusun Kalimat Master", options: undefined },
    { id: "pkl-a4", question: "Susun kata ini menjadi kalimat yang benar: Keluarga / kami / pergi / berlibur / ke / pegunungan / pada / liburan / tahun / lalu", answer: "Keluarga kami pergi berlibur ke pegunungan pada liburan tahun lalu", difficulty: "Master", category: "Menyusun Kalimat Master", options: undefined },
    { id: "pkl-a5", question: "Susun kata ini menjadi kalimat yang benar: Presiden / memberikan / pidato / di / depan / rakyat / pada / hari / kemerdekaan", answer: "Presiden memberikan pidato di depan rakyat pada hari kemerdekaan", difficulty: "Master", category: "Menyusun Kalimat Master", options: undefined },
  ],

  "susun-cerita": [
    // MUDAH (5)
    { id: "sc-m1", question: "Susun potongan cerita ini menjadi urutan yang benar: 1. Ani bangun tidur  2. Ani sarapan  3. Ani pergi ke sekolah", answer: "Ani bangun tidur, Ani sarapan, Ani pergi ke sekolah", difficulty: "Mudah", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-m2", question: "Susun potongan cerita ini menjadi urutan yang benar: 1. Beni menanam bibit  2. Beni menyiram tanaman  3. Beni memetik bunga", answer: "Beni menanam bibit, Beni menyiram tanaman, Beni memetik bunga", difficulty: "Mudah", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-m3", question: "Susun potongan cerita ini menjadi urutan yang benar: 1. Ibu membeli telur  2. Ibu memecahkan telur  3. Ibu menggoreng telur", answer: "Ibu membeli telur, Ibu memecahkan telur, Ibu menggoreng telur", difficulty: "Mudah", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-m4", question: "Susun potongan cerita ini menjadi urutan yang benar: 1. Adik membuka buku  2. Adik membaca cerita  3. Adik menutup buku", answer: "Adik membuka buku, Adik membaca cerita, Adik menutup buku", difficulty: "Mudah", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-m5", question: "Susun potongan cerita ini menjadi urutan yang benar: 1. Ayah menyalakan kompor  2. Ayah memasak air  3. Ayah membuat teh", answer: "Ayah menyalakan kompor, Ayah memasak air, Ayah membuat teh", difficulty: "Mudah", category: "Urutan Kegiatan", options: undefined },
    // SEDANG (5)
    { id: "sc-s1", question: "Susun potongan cerita ini: 1. Siswa berkumpul di lapangan  2. Kepala sekolah membuka upacara  3. Bendera dikibarkan  4. Siswa menyanyikan lagu", answer: "Siswa berkumpul di lapangan, Kepala sekolah membuka upacara, Bendera dikibarkan, Siswa menyanyikan lagu", difficulty: "Sedang", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-s2", question: "Susun potongan cerita ini: 1. Rina membeli benang  2. Rina membuka pola  3. Rina menjahit baju  4. Rina memakai baju", answer: "Rina membeli benang, Rina membuka pola, Rina menjahit baju, Rina memakai baju", difficulty: "Sedang", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-s3", question: "Susun potongan cerita ini: 1. Pak Budi menanam padi  2. Pak Budi menyiram padi  3. Pak Budi memanen padi  4. Pak Budi menjual padi", answer: "Pak Budi menanam padi, Pak Budi menyiram padi, Pak Budi memanen padi, Pak Budi menjual padi", difficulty: "Sedang", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-s4", question: "Susun potongan cerita ini: 1. Lala mengerjakan PR  2. Lala merasa kesulitan  3. Lala bertanya pada Kakak  4. Lala mengerti", answer: "Lala mengerjakan PR, Lala merasa kesulitan, Lala bertanya pada Kakak, Lala mengerti", difficulty: "Sedang", category: "Urutan Kegiatan", options: undefined },
    { id: "sc-s5", question: "Susun potongan cerita ini: 1. Doni mengambil kertas  2. Doni menggunting kertas  3. Doni menempel kertas  4. Doni menghias hasil kerja", answer: "Doni mengambil kertas, Doni menggunting kertas, Doni menempel kertas, Doni menghias hasil kerja", difficulty: "Sedang", category: "Urutan Kegiatan", options: undefined },
    // SULIT (5)
    { id: "sc-u1", question: "Susun potongan cerita ini: 1. Hujan turun dengan lebat  2. Air sungai mulai naik  3. Warga panik berlarian  4. Tim penyelamat datang menolong  5. Semua selamat di pengungsian", answer: "Hujan turun dengan lebat, Air sungai mulai naik, Warga panik berlarian, Tim penyelamat datang menolong, Semua selamat di pengungsian", difficulty: "Sulit", category: "Alur Cerita", options: undefined },
    { id: "sc-u2", question: "Susun potongan cerita ini: 1. Siswa belajar tentang tanaman  2. Siswa menanam bibit di pot  3. Siswa merawat tanaman setiap hari  4. Tanaman tumbuh besar  5. Siswa mempresentasikan hasil", answer: "Siswa belajar tentang tanaman, Siswa menanam bibit di pot, Siswa merawat tanaman setiap hari, Tanaman tumbuh besar, Siswa mempresentasikan hasil", difficulty: "Sulit", category: "Alur Cerita", options: undefined },
    { id: "sc-u3", question: "Susun potongan cerita ini: 1. Kelinci dan Kura-kura bertaruh berlari  2. Kelinci berlari sangat cepat  3. Kelinci beristirahat di bawah pohon  4. Kura-kura terus berjalan pelan  5. Kura-kura sampai lebih dulu", answer: "Kelinci dan Kura-kura bertaruh berlari, Kelinci berlari sangat cepat, Kelinci beristirahat di bawah pohon, Kura-kura terus berjalan pelan, Kura-kura sampai lebih dulu", difficulty: "Sulit", category: "Fabel", options: undefined },
    { id: "sc-u4", question: "Susun potongan cerita ini: 1. Andi jatuh dari sepeda  2. Andi menangis kesakitan  3. Ibu membawa Andi ke dokter  4. Dokter memeriksa luka Andi  5. Andi diberi perban", answer: "Andi jatuh dari sepeda, Andi menangis kesakitan, Ibu membawa Andi ke dokter, Dokter memeriksa luka Andi, Andi diberi perban", difficulty: "Sulit", category: "Alur Cerita", options: undefined },
    { id: "sc-u5", question: "Susun potongan cerita ini: 1. Anak-anak berkumpul di aula  2. Pembawa acara membuka acara  3. Siswa menampilkan drama  4. Penonton bertepuk tangan  5. Acara ditutup dengan doa", answer: "Anak-anak berkumpul di aula, Pembawa acara membuka acara, Siswa menampilkan drama, Penonton bertepuk tangan, Acara ditutup dengan doa", difficulty: "Sulit", category: "Alur Cerita", options: undefined },
    // MASTER (5)
    { id: "sc-a1", question: "Susun potongan cerita ini: 1. Rani menemukan telur di hutan  2. Rani membawa telur ke rumah  3. Rani mengerami telur setiap hari  4. Telur menetas menjadi anak burung  5. Rani merawat anak burung dengan sabar  6. Anak burung tumbuh besar dan bisa terbang", answer: "Rani menemukan telur di hutan, Rani membawa telur ke rumah, Rani mengerami telur setiap hari, Telur menetas menjadi anak burung, Rani merawat anak burung dengan sabar, Anak burung tumbuh besar dan bisa terbang", difficulty: "Master", category: "Alur Cerita Panjang", options: undefined },
    { id: "sc-a2", question: "Susun potongan cerita ini: 1. Siswa kelas 4 mendapat tugas kelompok  2. Siswa membagi tugas masing-masing  3. Siswa mencari bahan di perpustakaan  4. Siswa mengerjakan di rumah masing-masing  5. Siswa berkumpul untuk menyatukan hasil  6. Kelompok mempresentasikan di depan kelas", answer: "Siswa kelas 4 mendapat tugas kelompok, Siswa membagi tugas masing-masing, Siswa mencari bahan di perpustakaan, Siswa mengerjakan di rumah masing-masing, Siswa berkumpul untuk menyatukan hasil, Kelompok mempresentasikan di depan kelas", difficulty: "Master", category: "Alur Cerita Panjang", options: undefined },
    { id: "sc-a3", question: "Susun potongan cerita ini: 1. Desa kekurangan air bersih  2. Kepala desa mengadakan rapat  3. Warga gotong royong menggali sumur  4. Sumur belum juga mengeluarkan air  5. Akhirnya air muncul dari dalam sumur  6. Warga bersyukur dan berterima kasih", answer: "Desa kekurangan air bersih, Kepala desa mengadakan rapat, Warga gotong royong menggali sumur, Sumur belum juga mengeluarkan air, Akhirnya air muncul dari dalam sumur, Warga bersyukur dan berterima kasih", difficulty: "Master", category: "Alur Cerita Panjang", options: undefined },
    { id: "sc-a4", question: "Susun potongan cerita ini: 1. Kancil haus dan mencari air  2. Kancil menemukan sumur tua  3. Kancil menjatuhkan batu ke sumur  4. Air naik ke permukaan  5. Kancil minum dengan puas  6. Kancil berterima kasih pada kecerdasannya", answer: "Kancil haus dan mencari air, Kancil menemukan sumur tua, Kancil menjatuhkan batu ke sumur, Air naik ke permukaan, Kancil minum dengan puas, Kancil berterima kasih pada kecerdasannya", difficulty: "Master", category: "Fabel", options: undefined },
    { id: "sc-a5", question: "Susun potongan cerita ini: 1. Siswa mengunjungi pabrik roti  2. Pekerja menjelaskan proses pembuatan roti  3. Siswa melihat adonan diuleni  4. Siswa melihat roti dimasukkan oven  5. Siswa mencicipi roti yang baru matang  6. Siswa pulang dengan membawa roti", answer: "Siswa mengunjungi pabrik roti, Pekerja menjelaskan proses pembuatan roti, Siswa melihat adonan diuleni, Siswa melihat roti dimasukkan oven, Siswa mencicipi roti yang baru matang, Siswa pulang dengan membawa roti", difficulty: "Master", category: "Alur Cerita Panjang", options: undefined },
  ],

  "cari-kata": [
    // MUDAH (5)
    { id: "ck-m1", question: "Cari kata tersembunyi dalam kalimat ini: 'Kucing manis sedang tidur di sofa' (5 huruf)", answer: "TIDUR", difficulty: "Mudah", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-m2", question: "Cari kata tersembunyi dalam kalimat ini: 'Bunga indah mekar di taman' (5 huruf)", answer: "BUNGA", difficulty: "Mudah", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-m3", question: "Cari kata tersembunyi dalam kalimat ini: 'Ayah membaca koran setiap pagi' (5 huruf)", answer: "KORAN", difficulty: "Mudah", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-m4", question: "Cari kata tersembunyi dalam kalimat ini: 'Adik bermain di rumah kakek' (4 huruf)", answer: "ADIK", difficulty: "Mudah", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-m5", question: "Cari kata tersembunyi dalam kalimat ini: 'Sapi merah berlari di padang' (4 huruf)", answer: "SAPI", difficulty: "Mudah", category: "Kata Tersembunyi", options: undefined },
    // SEDANG (5)
    { id: "ck-s1", question: "Cari kata tersembunyi dalam kalimat ini: 'Ibu memasak sayur untuk makan siang' (5 huruf)", answer: "SAYUR", difficulty: "Sedang", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-s2", question: "Cari kata tersembunyi dalam kalimat ini: 'Rina pergi ke pasar membeli buah-buahan' (5 huruf)", answer: "PASAR", difficulty: "Sedang", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-s3", question: "Cari kata tersembunyi dalam kalimat ini: 'Guru mengajar dengan penuh semangat' (5 huruf)", answer: "PENUH", difficulty: "Sedang", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-s4", question: "Cari kata tersembunyi dalam kalimat ini: 'Kami bermain di tepi sungai yang jernih' (6 huruf)", answer: "SUNGAI", difficulty: "Sedang", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-s5", question: "Cari kata tersembunyi dalam kalimat ini: 'Pohon kelapa tumbuh di tepi pantai' (6 huruf)", answer: "KELAPA", difficulty: "Sedang", category: "Kata Tersembunyi", options: undefined },
    // SULIT (5)
    { id: "ck-u1", question: "Cari kata tersembunyi dalam kalimat ini: 'Para siswa belajar dengan tekun di perpustakaan' (5 huruf)", answer: "TEKUN", difficulty: "Sulit", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-u2", question: "Cari kata tersembunyi dalam kalimat ini: 'Kami berpetualang di hutan belantara' (6 huruf)", answer: "ANTARA", difficulty: "Sulit", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-u3", question: "Cari kata tersembunyi dalam kalimat ini: 'Adik menulis surat untuk kakeknya' (5 huruf)", answer: "SURAT", difficulty: "Sulit", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-u4", question: "Cari kata tersembunyi dalam kalimat ini: 'Burung merpati terbang rendah di atas sawah' (6 huruf)", answer: "RENDAH", difficulty: "Sulit", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-u5", question: "Cari kata tersembunyi dalam kalimat ini: 'Paman membawa buah-buahan dari kebunnya' (5 huruf)", answer: "KEBUN", difficulty: "Sulit", category: "Kata Tersembunyi", options: undefined },
    // MASTER (5)
    { id: "ck-a1", question: "Cari kata tersembunyi dalam kalimat ini: 'Buku pengetahuan yang kita baca mengandung ilmu' (5 huruf)", answer: "ILMU", difficulty: "Master", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-a2", question: "Cari kata tersembunyi dalam kalimat ini: 'Perahu nelayan berlayar ke tengah lautan' (7 huruf)", answer: "NELAYAN", difficulty: "Master", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-a3", question: "Cari kata tersembunyi dalam kalimat ini: 'Semangat para atlet membara di arena pertandingan' (5 huruf)", answer: "ATLET", difficulty: "Master", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-a4", question: "Cari kata tersembunyi dalam kalimat ini: 'Tanaman sayur tumbuh subur di kebun warga' (6 huruf)", answer: "TUMBUH", difficulty: "Master", category: "Kata Tersembunyi", options: undefined },
    { id: "ck-a5", question: "Cari kata tersembunyi dalam kalimat ini: 'Pemandangan alam indah dari puncak gunung' (6 huruf)", answer: "GUNUNG", difficulty: "Master", category: "Kata Tersembunyi", options: undefined },
  ],

  // 1. MATEMATIKA CEPAT — Mental math, mixed ops, fractions, decimals, word problems
  // ============================================================
  "matematika-cepat": [
    // — Mudah (5) —
    { id: "mc-01", question: "12 + 8 = ?", options: ["18", "19", "20", "21"], answer: "20", difficulty: "Mudah", category: "Penjumlahan" },
    { id: "mc-02", question: "25 − 9 = ?", options: ["14", "15", "16", "17"], answer: "16", difficulty: "Mudah", category: "Pengurangan" },
    { id: "mc-03", question: "6 × 7 = ?", options: ["36", "42", "48", "49"], answer: "42", difficulty: "Mudah", category: "Perkalian" },
    { id: "mc-04", question: "56 ÷ 8 = ?", options: ["6", "7", "8", "9"], answer: "7", difficulty: "Mudah", category: "Pembagian" },
    { id: "mc-05", question: "15 + 23 − 8 = ?", options: ["28", "30", "32", "34"], answer: "30", difficulty: "Mudah", category: "Operasi Campuran" },

    // — Sedang (5) —
    { id: "mc-06", question: "¼ + ¾ = ?", options: ["½", "1", "1¼", "2"], answer: "1", difficulty: "Sedang", category: "Pecahan" },
    { id: "mc-07", question: "3,5 × 4 = ?", options: ["12", "13", "14", "15"], answer: "14", difficulty: "Sedang", category: "Desimal" },
    { id: "mc-08", question: "48 ÷ 6 + 9 = ?", options: ["15", "16", "17", "18"], answer: "17", difficulty: "Sedang", category: "Operasi Campuran" },
    { id: "mc-09", question: "¾ dari 24 = ?", options: ["12", "16", "18", "20"], answer: "18", difficulty: "Sedang", category: "Pecahan" },
    { id: "mc-10", question: "125 × 8 = ?", options: ["800", "900", "1000", "1100"], answer: "1000", difficulty: "Sedang", category: "Perkalian" },

    // — Sulit (5) —
    { id: "mc-11", question: "2,75 + 3,8 = ?", options: ["6,45", "6,55", "7,55", "5,55"], answer: "6,55", difficulty: "Sulit", category: "Desimal" },
    { id: "mc-12", question: "1¼ + 2½ = ?", options: ["3½", "3¾", "4", "4¼"], answer: "3¾", difficulty: "Sulit", category: "Pecahan" },
    { id: "mc-13", question: "144 ÷ 12 × 3 = ?", options: ["36", "24", "48", "42"], answer: "36", difficulty: "Sulit", category: "Operasi Campuran" },
    { id: "mc-14", question: "½ − ⅓ = ?", options: ["⅙", "⅓", "⅕", "⅛"], answer: "⅙", difficulty: "Sulit", category: "Pecahan" },
    { id: "mc-15", question: "Rp 15.000 − Rp 7.500 + Rp 3.250 = ?", options: ["Rp 9.250", "Rp 10.250", "Rp 10.750", "Rp 11.250"], answer: "Rp 10.750", difficulty: "Sulit", category: "Soal Cerita" },

    // — Master (5) —
    { id: "mc-16", question: "⅗ × 30 + ¾ × 24 = ?", options: ["34", "36", "38", "40"], answer: "36", difficulty: "Master", category: "Pecahan" },
    { id: "mc-17", question: "12,5% dari 800 = ?", options: ["80", "90", "100", "110"], answer: "100", difficulty: "Master", category: "Persen" },
    { id: "mc-18", question: "3,6 × 2,5 = ?", options: ["7,5", "8,5", "9", "9,5"], answer: "9", difficulty: "Master", category: "Desimal" },
    { id: "mc-19", question: "Sebuah buku Rp 22.500, diskon 20%. Harga setelah diskon = ?", options: ["Rp 17.000", "Rp 17.500", "Rp 18.000", "Rp 18.500"], answer: "Rp 18.000", difficulty: "Master", category: "Soal Cerita" },
    { id: "mc-20", question: "(1½ + 2⅓) × 6 = ?", options: ["21", "22", "23", "24"], answer: "23", difficulty: "Master", category: "Pecahan" },
  ],

  // ============================================================
  // 2. BALAPAN HITUNG — Number sequences, patterns, skip counting, factors, primes
  // ============================================================
  "balapan-hitung": [
    // — Mudah (5) —
    { id: "bh-01", question: "Lanjutkan: 2, 4, 6, 8, …", options: ["9", "10", "11", "12"], answer: "10", difficulty: "Mudah", category: "Pola Bilangan" },
    { id: "bh-02", question: "Lanjutkan: 5, 10, 15, 20, …", options: ["22", "23", "24", "25"], answer: "25", difficulty: "Mudah", category: "Skip Counting" },
    { id: "bh-03", question: "Berapa puluh yang hilang? 30, __, 50, 60, 70", options: ["35", "40", "45", "55"], answer: "40", difficulty: "Mudah", category: "Pola Bilangan" },
    { id: "bh-04", question: "Lanjutkan: 100, 90, 80, 70, …", options: ["65", "60", "55", "50"], answer: "60", difficulty: "Mudah", category: "Pola Bilangan" },
    { id: "bh-05", question: "Kelipatan 3 dari 1 sampai 20 ada berapa? (3, 6, 9, 12, 15, 18)", options: ["5", "6", "7", "8"], answer: "6", difficulty: "Mudah", category: "Kelipatan" },

    // — Sedang (5) —
    { id: "bh-06", question: "Lanjutkan: 1, 1, 2, 3, 5, …", options: ["6", "7", "8", "9"], answer: "8", difficulty: "Sedang", category: "Pola Bilangan" },
    { id: "bh-07", question: "Faktor dari 24 adalah …", options: ["1, 2, 3, 4, 6, 8, 12, 24", "1, 2, 3, 6, 12, 24", "1, 2, 4, 6, 12, 24", "1, 3, 4, 6, 8, 12"], answer: "1, 2, 3, 4, 6, 8, 12, 24", difficulty: "Sedang", category: "Faktor" },
    { id: "bh-08", question: "Lanjutkan: 3, 6, 12, 24, …", options: ["36", "42", "48", "54"], answer: "48", difficulty: "Sedang", category: "Pola Perkalian" },
    { id: "bh-09", question: "Bilangan prima ke-5 adalah …", options: ["9", "11", "13", "17"], answer: "11", difficulty: "Sedang", category: "Bilangan Prima" },
    { id: "bh-10", question: "FPB dari 12 dan 18 = ?", options: ["3", "4", "6", "9"], answer: "6", difficulty: "Sedang", category: "FPB" },

    // — Sulit (5) —
    { id: "bh-11", question: "Lanjutkan: 2, 6, 18, 54, …", options: ["108", "142", "162", "180"], answer: "162", difficulty: "Sulit", category: "Pola Perkalian" },
    { id: "bh-12", question: "KPK dari 8 dan 12 = ?", options: ["24", "36", "48", "96"], answer: "24", difficulty: "Sulit", category: "KPK" },
    { id: "bh-13", question: "Lanjutkan: 1, 4, 9, 16, 25, …", options: ["30", "35", "36", "49"], answer: "36", difficulty: "Sulit", category: "Pola Bilangan" },
    { id: "bh-14", question: "Berapa bilangan prima antara 20 dan 40?", options: ["3", "4", "5", "6"], answer: "4", difficulty: "Sulit", category: "Bilangan Prima" },
    { id: "bh-15", question: "Lanjutkan: 1, 1, 2, 6, 24, …", options: ["48", "72", "96", "120"], answer: "120", difficulty: "Sulit", category: "Pola Faktorial" },

    // — Master (5) —
    { id: "bh-16", question: "Lanjutkan: 1, 8, 27, 64, …", options: ["100", "115", "125", "144"], answer: "125", difficulty: "Master", category: "Pola Pangkat" },
    { id: "bh-17", question: "FPB dari 48 dan 60 = ?", options: ["6", "12", "24", "36"], answer: "12", difficulty: "Master", category: "FPB" },
    { id: "bh-18", question: "KPK dari 6, 8, dan 15 = ?", options: ["60", "120", "180", "240"], answer: "120", difficulty: "Master", category: "KPK" },
    { id: "bh-19", question: "Lanjutkan: 0, 1, 1, 2, 3, 5, 8, 13, …", options: ["18", "20", "21", "24"], answer: "21", difficulty: "Master", category: "Pola Fibonacci" },
    { id: "bh-20", question: "Jumlah semua bilangan prima kurang dari 20 = ?", options: ["56", "58", "60", "62"], answer: "58", difficulty: "Master", category: "Bilangan Prima" },
  ],

  // ============================================================
  // 3. TANGKAP ANGKA — Find the answer number (NO options)
  // ============================================================
  "tangkap-angka": [
    // — Mudah (5) —
    { id: "ta-01", question: "23 + 17 = ?", answer: "40", difficulty: "Mudah", category: "Penjumlahan" },
    { id: "ta-02", question: "50 − 34 = ?", answer: "16", difficulty: "Mudah", category: "Pengurangan" },
    { id: "ta-03", question: "9 × 8 = ?", answer: "72", difficulty: "Mudah", category: "Perkalian" },
    { id: "ta-04", question: "45 ÷ 5 = ?", answer: "9", difficulty: "Mudah", category: "Pembagian" },
    { id: "ta-05", question: "30 + 40 − 15 = ?", answer: "55", difficulty: "Mudah", category: "Operasi Campuran" },

    // — Sedang (5) —
    { id: "ta-06", question: "7 × 9 + 6 = ?", answer: "69", difficulty: "Sedang", category: "Operasi Campuran" },
    { id: "ta-07", question: "144 ÷ 12 = ?", answer: "12", difficulty: "Sedang", category: "Pembagian" },
    { id: "ta-08", question: "5² + 3² = ?", answer: "34", difficulty: "Sedang", category: "Pangkat" },
    { id: "ta-09", question: "⅓ dari 36 = ?", answer: "12", difficulty: "Sedang", category: "Pecahan" },
    { id: "ta-10", question: "8 × (5 + 3) = ?", answer: "64", difficulty: "Sedang", category: "Kurung" },

    // — Sulit (5) —
    { id: "ta-11", question: "2,5 × 6 = ?", answer: "15", difficulty: "Sulit", category: "Desimal" },
    { id: "ta-12", question: "17 × 3 − 25 = ?", answer: "26", difficulty: "Sulit", category: "Operasi Campuran" },
    { id: "ta-13", question: "¾ × 32 = ?", answer: "24", difficulty: "Sulit", category: "Pecahan" },
    { id: "ta-14", question: "6² − 4² = ?", answer: "20", difficulty: "Sulit", category: "Pangkat" },
    { id: "ta-15", question: "1000 ÷ 25 = ?", answer: "40", difficulty: "Sulit", category: "Pembagian" },

    // — Master (5) —
    { id: "ta-16", question: "15% dari 400 = ?", answer: "60", difficulty: "Master", category: "Persen" },
    { id: "ta-17", question: "3³ + 4² = ?", answer: "43", difficulty: "Master", category: "Pangkat" },
    { id: "ta-18", question: "2,8 × 3,5 = ?", answer: "9,8", difficulty: "Master", category: "Desimal" },
    { id: "ta-19", question: "½ × ⅔ × 24 = ?", answer: "8", difficulty: "Master", category: "Pecahan" },
    { id: "ta-20", question: "(20 + 16) ÷ (7 − 1) = ?", answer: "6", difficulty: "Master", category: "Operasi Berantai" },
  ],

  // ============================================================
  // 4. OPERASI HITUNG BERANTAI — Multi-step operations, order of operations
  // ============================================================
  "operasi-hitung-berantai": [
    // — Mudah (5) —
    { id: "ohb-01", question: "3 + 4 × 2 = ?", options: ["10", "11", "14", "15"], answer: "11", difficulty: "Mudah", category: "Urutan Operasi" },
    { id: "ohb-02", question: "(3 + 4) × 2 = ?", options: ["10", "11", "14", "15"], answer: "14", difficulty: "Mudah", category: "Kurung" },
    { id: "ohb-03", question: "20 − 3 × 4 = ?", options: ["8", "64", "68", "12"], answer: "8", difficulty: "Mudah", category: "Urutan Operasi" },
    { id: "ohb-04", question: "10 ÷ 2 + 3 = ?", options: ["5", "6", "7", "8"], answer: "8", difficulty: "Mudah", category: "Operasi Campuran" },
    { id: "ohb-05", question: "5 + 3 × 2 − 1 = ?", options: ["9", "10", "11", "12"], answer: "10", difficulty: "Mudah", category: "Urutan Operasi" },

    // — Sedang (5) —
    { id: "ohb-06", question: "4 × (5 + 3) − 6 = ?", options: ["24", "26", "30", "38"], answer: "26", difficulty: "Sedang", category: "Kurung" },
    { id: "ohb-07", question: "12 ÷ 3 + 5 × 2 = ?", options: ["10", "14", "18", "20"], answer: "14", difficulty: "Sedang", category: "Urutan Operasi" },
    { id: "ohb-08", question: "(8 − 3) × (6 + 4) = ?", options: ["20", "50", "58", "48"], answer: "50", difficulty: "Sedang", category: "Kurung" },
    { id: "ohb-09", question: "2 × 3 + 4 × 5 = ?", options: ["26", "30", "34", "40"], answer: "26", difficulty: "Sedang", category: "Urutan Operasi" },
    { id: "ohb-10", question: "100 − 5 × (12 − 4) = ?", options: ["40", "50", "60", "760"], answer: "60", difficulty: "Sedang", category: "Kurung" },

    // — Sulit (5) —
    { id: "ohb-11", question: "3 × (2 + 5) − 4² = ?", options: ["3", "5", "8", "13"], answer: "5", difficulty: "Sulit", category: "Pangkat & Kurung" },
    { id: "ohb-12", question: "48 ÷ (6 + 2) + 3 × 5 = ?", options: ["19", "21", "25", "39"], answer: "21", difficulty: "Sulit", category: "Urutan Operasi" },
    { id: "ohb-13", question: "(15 − 7) × 3 + 12 ÷ 4 = ?", options: ["25", "27", "30", "33"], answer: "27", difficulty: "Sulit", category: "Urutan Operasi" },
    { id: "ohb-14", question: "2⁵ − 3 × (8 − 5) = ?", options: ["20", "23", "25", "35"], answer: "23", difficulty: "Sulit", category: "Pangkat & Kurung" },
    { id: "ohb-15", question: "5 × (10 − 3²) + 7 = ?", options: ["12", "17", "22", "64"], answer: "12", difficulty: "Sulit", category: "Pangkat & Kurung" },

    // — Master (5) —
    { id: "ohb-16", question: "2 × (3 + 4)² − 50 = ?", options: ["48", "50", "98", "146"], answer: "48", difficulty: "Master", category: "Pangkat & Kurung" },
    { id: "ohb-17", question: "(6 + 2) × (9 − 3²) + 15 = ?", options: ["15", "19", "31", "49"], answer: "15", difficulty: "Master", category: "Pangkat & Kurung" },
    { id: "ohb-18", question: "100 ÷ (2 + 3)² + 4 × (7 − 3) = ?", options: ["20", "24", "36", "84"], answer: "20", difficulty: "Master", category: "Pangkat & Kurung" },
    { id: "ohb-19", question: "3⁴ − 2³ × (10 − 7) + 5 = ?", options: ["58", "52", "14", "62"], answer: "62", difficulty: "Master", category: "Pangkat & Kurung" },
    { id: "ohb-20", question: "[(18 − 12) × 3 + 9] ÷ 3 = ?", options: ["7", "8", "9", "10"], answer: "9", difficulty: "Master", category: "Kurung Ganda" },
  ],


  "tebak-gambar": [
    // Mudah (5)
    {
      id: "tga-001",
      question: "Hewan apa yang digambarkan? 🐘",
      options: ["Gajah", "Kuda", "Kerbau", "Singa"],
      answer: "Gajah",
      difficulty: "Mudah",
      category: "Hewan",
    },
    {
      id: "tga-002",
      question: "Buah apa ini? 🍌",
      options: ["Pisang", "Mangga", "Apel", "Jeruk"],
      answer: "Pisang",
      difficulty: "Mudah",
      category: "Buah",
    },
    {
      id: "tga-003",
      question: "Benda terbang apa ini? ✈️",
      options: ["Pesawat", "Helikopter", "Layang-layang", "Roket"],
      answer: "Pesawat",
      difficulty: "Mudah",
      category: "Alat Transportasi",
    },
    {
      id: "tga-004",
      question: "Alat musik apa ini? 🎸",
      options: ["Gitar", "Piano", "Drum", "Seruling"],
      answer: "Gitar",
      difficulty: "Mudah",
      category: "Alat Musik",
    },
    {
      id: "tga-005",
      question: "Bunga apa yang berwarna merah? 🌹",
      options: ["Mawar", "Melati", "Anggrek", "Tulip"],
      answer: "Mawar",
      difficulty: "Mudah",
      category: "Tumbuhan",
    },
    // Sedang (5)
    {
      id: "tga-006",
      question: "Reptil apa yang bisa berubah warna? 🦎",
      options: ["Bunglon", "Kadal", "Ular", "Buaya"],
      answer: "Bunglon",
      difficulty: "Sedang",
      category: "Hewan",
    },
    {
      id: "tga-007",
      question: "Alat transportasi laut apa ini? 🚢",
      options: ["Kapal", "Perahu", "Katamaran", "Kano"],
      answer: "Kapal",
      difficulty: "Sedang",
      category: "Alat Transportasi",
    },
    {
      id: "tga-008",
      question: "Sayuran apa yang berwarna oranye? 🥕",
      options: ["Wortel", "Bayam", "Kol", "Cabai"],
      answer: "Wortel",
      difficulty: "Sedang",
      category: "Sayuran",
    },
    {
      id: "tga-009",
      question: "Planet apa yang memiliki cincin? 🪐",
      options: ["Saturnus", "Mars", "Jupiter", "Venus"],
      answer: "Saturnus",
      difficulty: "Sedang",
      category: "Sains",
    },
    {
      id: "tga-010",
      question: "Hewan laut apa yang terbesar di dunia? 🐋",
      options: ["Paus Biru", "Hiu", "Paus Sperma", "Lumba-lumba"],
      answer: "Paus Biru",
      difficulty: "Sedang",
      category: "Hewan",
    },
    // Sulit (5)
    {
      id: "tga-011",
      question: "Alat optik apa yang memantulkan cahaya? 🪞",
      options: ["Cermin", "Lensa", "Prisma", "Mikroskop"],
      answer: "Cermin",
      difficulty: "Sulit",
      category: "Sains",
    },
    {
      id: "tga-012",
      question: "Proses apa yang dilakukan tumbuhan untuk membuat makanan? 🌱",
      options: ["Fotosintesis", "Respirasi", "Evaporasi", "Kondensasi"],
      answer: "Fotosintesis",
      difficulty: "Sulit",
      category: "Sains",
    },
    {
      id: "tga-013",
      question: "Ibukota negara Malaysia? 🇲🇾",
      options: ["Kuala Lumpur", "Jakarta", "Bangkok", "Manila"],
      answer: "Kuala Lumpur",
      difficulty: "Sulit",
      category: "Geografi",
    },
    {
      id: "tga-014",
      question: "Planet terdekat dari Matahari? ☀️",
      options: ["Merkurius", "Venus", "Bumi", "Mars"],
      answer: "Merkurius",
      difficulty: "Sulit",
      category: "Sains",
    },
    {
      id: "tga-015",
      question: "Alat ukur apa yang digunakan untuk mengukur suhu? 🌡️",
      options: ["Termometer", "Barometer", "Higrometer", "Anemometer"],
      answer: "Termometer",
      difficulty: "Sulit",
      category: "Sains",
    },
    // Master (5)
    {
      id: "tga-016",
      question: "Bagian sel apa yang mengandung DNA? 🔬",
      options: ["Nukleus", "Mitokondria", "Ribosom", "Vakuola"],
      answer: "Nukleus",
      difficulty: "Master",
      category: "Biologi",
    },
    {
      id: "tga-017",
      question: "Jenis energi apa yang dimiliki benda yang bergerak? ⚡",
      options: ["Energi Kinetik", "Energi Potensial", "Energi Termal", "Energi Kimia"],
      answer: "Energi Kinetik",
      difficulty: "Master",
      category: "Fisika",
    },
    {
      id: "tga-018",
      question: "Rumus kimia air adalah? 💧",
      options: ["H₂O", "CO₂", "NaCl", "O₂"],
      answer: "H₂O",
      difficulty: "Master",
      category: "Kimia",
    },
    {
      id: "tga-019",
      question: "Hewan apa yang bisa hidup di darat dan air? 🐸",
      options: ["Katak", "Ikan", "Ular", "Buaya"],
      answer: "Katak",
      difficulty: "Master",
      category: "Biologi",
    },
    {
      id: "tga-020",
      question: "Satuan apa yang digunakan untuk mengukur arus listrik? ⚡",
      options: ["Ampere", "Volt", "Watt", "Ohm"],
      answer: "Ampere",
      difficulty: "Master",
      category: "Fisika",
    },
  ],

  "mencocokkan-gambar": [
    // Mudah (5)
    {
      id: "mcg-001",
      question: "Cocokkan hewan dengan suaranya! 🐶",
      options: ["Anjing - Guk", "Kucing - Meong", "Sapi - Moo", "Ayam - Kukuruyuk"],
      answer: "Anjing - Guk",
      difficulty: "Mudah",
      category: "Hewan",
    },
    {
      id: "mcg-002",
      question: "Cocokkan buah dengan warnanya! 🍎",
      options: ["Apel - Merah", "Pisang - Biru", "Anggur - Oranye", "Semangka - Ungu"],
      answer: "Apel - Merah",
      difficulty: "Mudah",
      category: "Buah",
    },
    {
      id: "mcg-003",
      question: "Cocokkan alat transportasi dengan medianya! 🚗",
      options: ["Mobil - Jalan", "Kapal - Sungai", "Pesawat - Udara", "Kereta - Rel"],
      answer: "Mobil - Jalan",
      difficulty: "Mudah",
      category: "Transportasi",
    },
    {
      id: "mcg-004",
      question: "Cocokkan pekerjaan dengan alat kerjanya! 👨‍⚕️",
      options: ["Dokter - Stetoskop", "Guru - Komputer", "Petani - Keyboard", "Tukang - Pensil"],
      answer: "Dokter - Stetoskop",
      difficulty: "Mudah",
      category: "Pekerjaan",
    },
    {
      id: "mcg-005",
      question: "Cocokkan warna dengan benda! 🌈",
      options: ["Biru - Langit", "Hijau - Api", "Merah - Rumput", "Kuning - Awan"],
      answer: "Biru - Langit",
      difficulty: "Mudah",
      category: "Warna",
    },
    // Sedang (5)
    {
      id: "mcg-006",
      question: "Cocokkan sayuran dengan bagian yang dimakan! 🥦",
      options: ["Wortel - Akar", "Bayam - Bunga", "Tomat - Daun", "Kentang - Biji"],
      answer: "Wortel - Akar",
      difficulty: "Sedang",
      category: "Sayuran",
    },
    {
      id: "mcg-007",
      question: "Cocokkan planet dengan karakteristiknya! 🪐",
      options: ["Mars - Planet Merah", "Venus - Planet Biru", "Jupiter - Planet Kecil", "Merkurius - Planet Besar"],
      answer: "Mars - Planet Merah",
      difficulty: "Sedang",
      category: "Sains",
    },
    {
      id: "mcg-008",
      question: "Cocokkan alat musik dengan jenisnya! 🎵",
      options: ["Gitar - Petik", "Drum - Tiup", "Suling - Kekap", "Piano - Gesek"],
      answer: "Gitar - Petik",
      difficulty: "Sedang",
      category: "Alat Musik",
    },
    {
      id: "mcg-009",
      question: "Cocokkan negara dengan ibukotanya! 🌍",
      options: ["Jepang - Tokyo", "China - Seoul", "India - Bangkok", "Thailand - Beijing"],
      answer: "Jepang - Tokyo",
      difficulty: "Sedang",
      category: "Geografi",
    },
    {
      id: "mcg-010",
      question: "Cocokkan cuaca dengan aktivitas! ☀️",
      options: ["Hujan - Payung", "Panas - Payung", "Dingin - Kipas", "Berangin - AC"],
      answer: "Hujan - Payung",
      difficulty: "Sedang",
      category: "Cuaca",
    },
    // Sulit (5)
    {
      id: "mcg-011",
      question: "Cocokkan organ tubuhan dengan fungsinya! 🫀",
      options: ["Jantung - Memompa Darah", "Paru-paru - Mencerna Makanan", "Hati - Bernapas", "Ginjal - Melihat"],
      answer: "Jantung - Memompa Darah",
      difficulty: "Sulit",
      category: "Biologi",
    },
    {
      id: "mcg-012",
      question: "Cocokkan satuan dengan besaran! 📏",
      options: ["Kilometer - Panjang", "Liter - Waktu", "Kilogram - Suhu", "Detik - Massa"],
      answer: "Kilometer - Panjang",
      difficulty: "Sulit",
      category: "Matematika",
    },
    {
      id: "mcg-013",
      question: "Cocokkan energi dengan contohnya! ⚡",
      options: ["Listrik - Lampu", "Kimia - Cahaya Matahari", "Termal - Gerak Benda", "Kinetik - Baterai"],
      answer: "Listrik - Lampu",
      difficulty: "Sulit",
      category: "Fisika",
    },
    {
      id: "mcg-014",
      question: "Cocokkan hewan dengan habitatnya! 🌊",
      options: ["Ikan - Air", "Unta - Laut", "Paus - Gurun", "Kelinci - Sungai"],
      answer: "Ikan - Air",
      difficulty: "Sulit",
      category: "Ekologi",
    },
    {
      id: "mcg-015",
      question: "Cocokkan zaman dengan ciri khasnya! 🦕",
      options: ["Purba - Dinosaurus", "Modern - Batu", "Prasejarah - Mobil", "Kuno - Komputer"],
      answer: "Purba - Dinosaurus",
      difficulty: "Sulit",
      category: "Sejarah",
    },
    // Master (5)
    {
      id: "mcg-016",
      question: "Cocokkan rumus matematika dengan hasilnya! 🔢",
      options: ["5 × 6 = 30", "7 × 8 = 54", "9 × 9 = 81", "3 × 4 = 16"],
      answer: "5 × 6 = 30",
      difficulty: "Master",
      category: "Matematika",
    },
    {
      id: "mcg-017",
      question: "Cocokkan lapisan atmosfer dengan ciri khasnya! 🌍",
      options: ["Troposfer - Cuaca", "Stratosfer - Hujan", "Termosfer - Awan", "Mesosfer - Ozone"],
      answer: "Troposfer - Cuaca",
      difficulty: "Master",
      category: "Sains",
    },
    {
      id: "mcg-018",
      question: "Cocokkan kingdom makhluk hidup! 🌿",
      options: ["Animalia - Hewan", "Plantae - Bakteri", "Fungi - Tumbuhan", "Monera - Jamur"],
      answer: "Animalia - Hewan",
      difficulty: "Master",
      category: "Biologi",
    },
    {
      id: "mcg-019",
      question: "Cocokkan jenis energi dengan rumusnya! 📐",
      options: ["Kinetik = ½mv²", "Potensial = mc²", "Termal = V × I", "Listrik = m × g × h"],
      answer: "Kinetik = ½mv²",
      difficulty: "Master",
      category: "Fisika",
    },
    {
      id: "mcg-020",
      question: "Cocokkan siklus air dengan prosesnya! 💧",
      options: ["Evaporasi - Penguapan", "Kondensasi - Mencair", "Presipitasi - Menguap", "Infiltrasi - Mengkristal"],
      answer: "Evaporasi - Penguapan",
      difficulty: "Master",
      category: "Sains",
    },
  ],

  "memory-card": [
    // Mudah (5)
    {
      id: "mem-001",
      question: "Pasangan: Ayam bertelur",
      answer: "Ayam - Telur",
      difficulty: "Mudah",
      category: "Hewan",
    },
    {
      id: "mem-002",
      question: "Pasangan: Pohon berbuah",
      answer: "Pohon - Buah",
      difficulty: "Mudah",
      category: "Tumbuhan",
    },
    {
      id: "mem-003",
      question: "Pasangan: Laut penuh ikan",
      answer: "Laut - Ikan",
      difficulty: "Mudah",
      category: "Hewan",
    },
    {
      id: "mem-004",
      question: "Pasangan: Langit penuh bintang",
      answer: "Langit - Bintang",
      difficulty: "Mudah",
      category: "Alam",
    },
    {
      id: "mem-005",
      question: "Pasangan: Sarung tangan di tangan",
      answer: "Sarung Tangan - Tangan",
      difficulty: "Mudah",
      category: "Pakaian",
    },
    // Sedang (5)
    {
      id: "mem-006",
      question: "Pasangan: Lebah madu",
      answer: "Lebah - Madu",
      difficulty: "Sedang",
      category: "Hewan",
    },
    {
      id: "mem-007",
      question: "Pasangan: Sapi susu",
      answer: "Sapi - Susu",
      difficulty: "Sedang",
      category: "Hewan",
    },
    {
      id: "mem-008",
      question: "Pasangan: Gurita laut",
      answer: "Gurita - Laut",
      difficulty: "Sedang",
      category: "Hewan",
    },
    {
      id: "mem-009",
      question: "Pasangan: Elang udara",
      answer: "Elang - Udara",
      difficulty: "Sedang",
      category: "Hewan",
    },
    {
      id: "mem-010",
      question: "Pasangan: Semut tanah",
      answer: "Semut - Tanah",
      difficulty: "Sedang",
      category: "Hewan",
    },
    // Sulit (5)
    {
      id: "mem-011",
      question: "Pasangan: Fotosintesis oksigen",
      answer: "Fotosintesis - Oksigen",
      difficulty: "Sulit",
      category: "Sains",
    },
    {
      id: "mem-012",
      question: "Pasangan: Magnet besi",
      answer: "Magnet - Besi",
      difficulty: "Sulit",
      category: "Fisika",
    },
    {
      id: "mem-013",
      question: "Pasangan: Baterai listrik",
      answer: "Baterai - Listrik",
      difficulty: "Sulit",
      category: "Fisika",
    },
    {
      id: "mem-014",
      question: "Pasangan: Lilin cahaya",
      answer: "Lilin - Cahaya",
      difficulty: "Sulit",
      category: "Fisika",
    },
    {
      id: "mem-015",
      question: "Pasangan: Kompor panas",
      answer: "Kompor - Panas",
      difficulty: "Sulit",
      category: "Fisika",
    },
    // Master (5)
    {
      id: "mem-016",
      question: "Pasangan: Sel bakteri",
      answer: "Sel - Bakteri",
      difficulty: "Master",
      category: "Biologi",
    },
    {
      id: "mem-017",
      question: "Pasangan: Newton gravitasi",
      answer: "Newton - Gravitasi",
      difficulty: "Master",
      category: "Fisika",
    },
    {
      id: "mem-018",
      question: "Pasangan: Evaporasi uap",
      answer: "Evaporasi - Uap",
      difficulty: "Master",
      category: "Sains",
    },
    {
      id: "mem-019",
      question: "Pasangan: DNA genetika",
      answer: "DNA - Genetika",
      difficulty: "Master",
      category: "Biologi",
    },
    {
      id: "mem-020",
      question: "Pasangan: Mitokondria energi",
      answer: "Mitokondria - Energi",
      difficulty: "Master",
      category: "Biologi",
    },
  ],

  "maze-edukasi": [
    // Mudah (5)
    {
      id: "mze-001",
      question: "Untuk ke perpustakaan dari sekolah, kamu harus berbelok ke mana? 📚",
      options: ["Kiri", "Kanan", "Lurus", "Putar balik"],
      answer: "Kiri",
      difficulty: "Mudah",
      category: "Navigasi",
    },
    {
      id: "mze-002",
      question: "Di persimpangan, rumah sakit ada di sebelah mana? 🏥",
      options: ["Kanan", "Kiri", "Depan", "Belakang"],
      answer: "Kanan",
      difficulty: "Mudah",
      category: "Navigasi",
    },
    {
      id: "mze-003",
      question: "Dari posisi awal, ke mana arah panah menunjuk? ➡️",
      options: ["Timur", "Barat", "Utara", "Selatan"],
      answer: "Timur",
      difficulty: "Mudah",
      category: "Arah",
    },
    {
      id: "mze-004",
      question: "Untuk ke taman, langkah pertama yang harus diambil adalah? 🌳",
      options: ["Maju", "Mundur", "Kiri", "Kanan"],
      answer: "Maju",
      difficulty: "Mudah",
      category: "Navigasi",
    },
    {
      id: "mze-005",
      question: "Di jalan raya, toko ada di sisi mana jalan? 🏪",
      options: ["Kiri", "Kanan", "Tengah", "Atas"],
      answer: "Kiri",
      difficulty: "Mudah",
      category: "Navigasi",
    },
    // Sedang (5)
    {
      id: "mze-006",
      question: "Dari gerbang sekolah, ke arah mana untuk ke kantin? 🍽️",
      options: ["Lurus 3 langkah, lalu kanan", "Kiri langsung", "Putar balik", "Kanan langsung"],
      answer: "Lurus 3 langkah, lalu kanan",
      difficulty: "Sedang",
      category: "Navigasi",
    },
    {
      id: "mze-007",
      question: "Peta menunjukkan gunung di utara. Kamu berada di selatan. Ke mana harus berjalan? ⛰️",
      options: ["Utara", "Selatan", "Timur", "Barat"],
      answer: "Utara",
      difficulty: "Sedang",
      category: "Peta",
    },
    {
      id: "mze-008",
      question: "Dari rumah ke masjid, kamu harus melewati berapa persimpangan? 🕌",
      options: ["2 persimpangan", "1 persimpangan", "3 persimpangan", "0 persimpangan"],
      answer: "2 persimpangan",
      difficulty: "Sedang",
      category: "Navigasi",
    },
    {
      id: "mze-009",
      question: "Jika kamu berbelok kanan di persimpangan pertama, lalu kiri di persimpangan kedua, kamu akan ke? 🔄",
      options: ["Taman bermain", "Rumah sakit", "Sekolah", "Stasiun"],
      answer: "Taman bermain",
      difficulty: "Sedang",
      category: "Navigasi",
    },
    {
      id: "mze-010",
      question: "Di peta kompas, barat berada di sisi mana? 🧭",
      options: ["Kiri", "Kanan", "Atas", "Bawah"],
      answer: "Kiri",
      difficulty: "Sedang",
      category: "Peta",
    },
    // Sulit (5)
    {
      id: "mze-011",
      question: "Dari titik A ke B, rute terpendek melewati? 🗺️",
      options: ["Jalan utama lurus", "Jalan tikus kanan", "Jalan memutar kiri", "Jalan tanah"],
      answer: "Jalan utama lurus",
      difficulty: "Sulit",
      category: "Navigasi",
    },
    {
      id: "mze-012",
      question: "Kamu tersesat. Matahari terbit dari timur. Bayanganmu menghadap ke mana? ☀️",
      options: ["Barat", "Timur", "Utara", "Selatan"],
      answer: "Barat",
      difficulty: "Sulit",
      category: "Sains",
    },
    {
      id: "mze-013",
      question: "Di peta, 1 cm = 100 meter. Jarak di peta 5 cm. Jarak sebenarnya? 📐",
      options: ["500 meter", "50 meter", "5000 meter", "5 meter"],
      answer: "500 meter",
      difficulty: "Sulit",
      category: "Matematika",
    },
    {
      id: "mze-014",
      question: "Jika kamu bergerak 3 langkah ke utara, 2 langkah ke timur, lalu 3 langkah ke selatan, posisi akhirmu? 📍",
      options: ["2 langkah timur dari awal", "3 langkah utara dari awal", "Di titik awal", "2 langkah barat dari awal"],
      answer: "2 langkah timur dari awal",
      difficulty: "Sulit",
      category: "Logika",
    },
    {
      id: "mze-015",
      question: "Jalur A lebih panjang tapi datar. Jalur B lebih pendek tapi menanjak. Mana yang lebih cepat? 🏃",
      options: ["Jalur A", "Jalur B", "Sama cepat", "Tergantung cuaca"],
      answer: "Jalur B",
      difficulty: "Sulit",
      category: "Logika",
    },
    // Master (5)
    {
      id: "mze-016",
      question: "Dari koordinat (2,3) ke (5,7), berapa langkah minimum jika hanya boleh ke kanan dan atas? 📊",
      options: ["7 langkah", "5 langkah", "10 langkah", "3 langkah"],
      answer: "7 langkah",
      difficulty: "Master",
      category: "Matematika",
    },
    {
      id: "mze-017",
      question: "Jika setiap belokan membutuhkan waktu 2 menit dan ada 6 belokan, berapa total waktu perjalanan? ⏱️",
      options: ["12 menit", "8 menit", "10 menit", "14 menit"],
      answer: "12 menit",
      difficulty: "Master",
      category: "Matematika",
    },
    {
      id: "mze-018",
      question: "Di labirin, jalur yang benar adalah yang melewati? 🔍",
      options: ["3 simpangan", "2 simpangan", "4 simpangan", "1 simpangan"],
      answer: "3 simpangan",
      difficulty: "Master",
      category: "Logika",
    },
    {
      id: "mze-019",
      question: "Kecepatan rata-rata jika menempuh 600 meter dalam 12 menit? 🚶",
      options: ["50 m/menit", "60 m/menit", "40 m/menit", "70 m/menit"],
      answer: "50 m/menit",
      difficulty: "Master",
      category: "Matematika",
    },
    {
      id: "mze-020",
      question: "Dari 4 rute, mana yang melewati paling banyak landmark? 🏛️",
      options: ["Rute utara", "Rute selatan", "Rute timur", "Rute barat"],
      answer: "Rute utara",
      difficulty: "Master",
      category: "Logika",
    },
  ],

  "simon-memory-edukasi": [
    // Mudah (5)
    {
      id: "sme-001",
      question: "Ulangi warna: Merah",
      answer: "Merah",
      difficulty: "Mudah",
      category: "Warna",
    },
    {
      id: "sme-002",
      question: "Ulangi warna: Biru",
      answer: "Biru",
      difficulty: "Mudah",
      category: "Warna",
    },
    {
      id: "sme-003",
      question: "Ulangi warna: Hijau",
      answer: "Hijau",
      difficulty: "Mudah",
      category: "Warna",
    },
    {
      id: "sme-004",
      question: "Ulangi warna: Kuning",
      answer: "Kuning",
      difficulty: "Mudah",
      category: "Warna",
    },
    {
      id: "sme-005",
      question: "Ulangi warna: Ungu",
      answer: "Ungu",
      difficulty: "Mudah",
      category: "Warna",
    },
    // Sedang (5)
    {
      id: "sme-006",
      question: "Ulangi urutan: Merah Biru",
      answer: "Merah Biru",
      difficulty: "Sedang",
      category: "Warna",
    },
    {
      id: "sme-007",
      question: "Ulangi urutan: Hijau Kuning",
      answer: "Hijau Kuning",
      difficulty: "Sedang",
      category: "Warna",
    },
    {
      id: "sme-008",
      question: "Ulangi urutan: Biru Ungu",
      answer: "Biru Ungu",
      difficulty: "Sedang",
      category: "Warna",
    },
    {
      id: "sme-009",
      question: "Ulangi urutan: Oranye Merah",
      answer: "Oranye Merah",
      difficulty: "Sedang",
      category: "Warna",
    },
    {
      id: "sme-010",
      question: "Ulangi urutan: Kuning Hijau",
      answer: "Kuning Hijau",
      difficulty: "Sedang",
      category: "Warna",
    },
    // Sulit (5)
    {
      id: "sme-011",
      question: "Ulangi urutan: Merah Biru Hijau",
      answer: "Merah Biru Hijau",
      difficulty: "Sulit",
      category: "Warna",
    },
    {
      id: "sme-012",
      question: "Ulangi urutan: Ungu Oranye Kuning",
      answer: "Ungu Oranye Kuning",
      difficulty: "Sulit",
      category: "Warna",
    },
    {
      id: "sme-013",
      question: "Ulangi urutan: Hijau Merah Biru",
      answer: "Hijau Merah Biru",
      difficulty: "Sulit",
      category: "Warna",
    },
    {
      id: "sme-014",
      question: "Ulangi urutan: Biru Kuning Ungu",
      answer: "Biru Kuning Ungu",
      difficulty: "Sulit",
      category: "Warna",
    },
    {
      id: "sme-015",
      question: "Ulangi urutan: Oranye Hijau Merah",
      answer: "Oranye Hijau Merah",
      difficulty: "Sulit",
      category: "Warna",
    },
    // Master (5)
    {
      id: "sme-016",
      question: "Ulangi urutan: Merah Biru Hijau Kuning",
      answer: "Merah Biru Hijau Kuning",
      difficulty: "Master",
      category: "Warna",
    },
    {
      id: "sme-017",
      question: "Ulangi urutan: Ungu Oranye Merah Biru",
      answer: "Ungu Oranye Merah Biru",
      difficulty: "Master",
      category: "Warna",
    },
    {
      id: "sme-018",
      question: "Ulangi urutan: Hijau Kuning Ungu Oranye",
      answer: "Hijau Kuning Ungu Oranye",
      difficulty: "Master",
      category: "Warna",
    },
    {
      id: "sme-019",
      question: "Ulangi urutan: Biru Merah Ungu Hijau",
      answer: "Biru Merah Ungu Hijau",
      difficulty: "Master",
      category: "Warna",
    },
    {
      id: "sme-020",
      question: "Ulangi urutan: Kuning Oranye Biru Merah",
      answer: "Kuning Oranye Biru Merah",
      difficulty: "Master",
      category: "Warna",
    },
  ],

  "roda-pintar": [
    // Mudah (5)
    {
      id: "rpi-001",
      question: "Roda ini menunjukkan: 🍎🍊🍌. Ini termasuk kategori?",
      options: ["Buah-buahan", "Sayuran", "Bunga", "Hewan"],
      answer: "Buah-buahan",
      difficulty: "Mudah",
      category: "Buah",
    },
    {
      id: "rpi-002",
      question: "Roda ini menunjukkan: 🐶🐱🐰. Ini termasuk kategori?",
      options: ["Hewan", "Tumbuhan", "Benda Mati", "Makanan"],
      answer: "Hewan",
      difficulty: "Mudah",
      category: "Hewan",
    },
    {
      id: "rpi-003",
      question: "Roda ini menunjukkan: 🔴🔵🟡. Ini termasuk kategori?",
      options: ["Warna", "Bentuk", "Ukuran", "Rasa"],
      answer: "Warna",
      difficulty: "Mudah",
      category: "Warna",
    },
    {
      id: "rpi-004",
      question: "Roda ini menunjukkan: ⚽🏀🏐. Ini termasuk kategori?",
      options: ["Olahraga", "Mainan", "Alat Tulis", "Makanan"],
      answer: "Olahraga",
      difficulty: "Mudah",
      category: "Olahraga",
    },
    {
      id: "rpi-005",
      question: "Roda ini menunjukkan: 📚✏️📏. Ini termasuk kategori?",
      options: ["Alat Tulis", "Mainan", "Makanan", "Pakaian"],
      answer: "Alat Tulis",
      difficulty: "Mudah",
      category: "Alat Tulis",
    },
    // Sedang (5)
    {
      id: "rpi-006",
      question: "Roda ini menunjukkan: 🥦🥕🍅. Ini termasuk kategori?",
      options: ["Sayuran", "Buah", "Rempah", "Biji-bijian"],
      answer: "Sayuran",
      difficulty: "Sedang",
      category: "Sayuran",
    },
    {
      id: "rpi-007",
      question: "Roda ini menunjukkan: 🏫📚👨‍🏫. Ini termasuk kategori?",
      options: ["Sekolah", "Rumah Sakit", "Pasar", "Taman"],
      answer: "Sekolah",
      difficulty: "Sedang",
      category: "Tempat",
    },
    {
      id: "rpi-008",
      question: "Roda ini menunjukkan: 🚗🚌🏍️. Ini termasuk kategori?",
      options: ["Transportasi", "Mainan", "Alat Kerja", "Hewan"],
      answer: "Transportasi",
      difficulty: "Sedang",
      category: "Transportasi",
    },
    {
      id: "rpi-009",
      question: "Roda ini menunjukkan: 🎸🎹🎺. Ini termasuk kategori?",
      options: ["Alat Musik", "Olahraga", "Alat Tulis", "Dapur"],
      answer: "Alat Musik",
      difficulty: "Sedang",
      category: "Alat Musik",
    },
    {
      id: "rpi-010",
      question: "Roda ini menunjukkan: 🍚🍜🥘. Ini termasuk kategori?",
      options: ["Makanan", "Minuman", "Buah", "Sayuran"],
      answer: "Makanan",
      difficulty: "Sedang",
      category: "Makanan",
    },
    // Sulit (5)
    {
      id: "rpi-011",
      question: "Roda ini menunjukkan: 🌡️💉💊. Ini termasuk kategori?",
      options: ["Alat Kesehatan", "Alat Dapur", "Alat Musik", "Alat Tulis"],
      answer: "Alat Kesehatan",
      difficulty: "Sulit",
      category: "Kesehatan",
    },
    {
      id: "rpi-012",
      question: "Roda ini menunjukkan: 🌊🏔️🏜️. Ini termasuk kategori?",
      options: ["Ekosistem Alam", "Alat Transportasi", "Pekerjaan", "Makanan"],
      answer: "Ekosistem Alam",
      difficulty: "Sulit",
      category: "Geografi",
    },
    {
      id: "rpi-013",
      question: "Roda ini menunjukkan: ⚡💡🔌. Ini termasuk kategori?",
      options: ["Energi Listrik", "Energi Panas", "Energi Cahaya", "Energi Kimia"],
      answer: "Energi Listrik",
      difficulty: "Sulit",
      category: "Sains",
    },
    {
      id: "rpi-014",
      question: "Roda ini menunjukkan: 🫀🫁🧠. Ini termasuk kategori?",
      options: ["Organ Tubuh Manusia", "Hewan", "Tumbuhan", "Mineral"],
      answer: "Organ Tubuh Manusia",
      difficulty: "Sulit",
      category: "Biologi",
    },
    {
      id: "rpi-015",
      question: "Roda ini menunjukkan: 🔬🧪🧫. Ini termasuk kategori?",
      options: ["Peralatan Laboratorium", "Alat Dapur", "Alat Berkebun", "Alat Musik"],
      answer: "Peralatan Laboratorium",
      difficulty: "Sulit",
      category: "Sains",
    },
    // Master (5)
    {
      id: "rpi-016",
      question: "Roda ini menunjukkan: ⚛️🔬🧬. Ini termasuk kategori?",
      options: ["Sains Dasar", "Seni", "Olahraga", "Kuliner"],
      answer: "Sains Dasar",
      difficulty: "Master",
      category: "Sains",
    },
    {
      id: "rpi-017",
      question: "Roda ini menunjukkan: 🧲⚡💡. Ini termasuk kategori?",
      options: ["Fisika Listrik dan Magnet", "Biologi", "Kimia Organik", "Geologi"],
      answer: "Fisika Listrik dan Magnet",
      difficulty: "Master",
      category: "Fisika",
    },
    {
      id: "rpi-018",
      question: "Roda ini menunjukkan: 🧬🦠🔬. Ini termasuk kategori?",
      options: ["Mikrobiologi", "Astronomi", "Arkeologi", "Meteorologi"],
      answer: "Mikrobiologi",
      difficulty: "Master",
      category: "Biologi",
    },
    {
      id: "rpi-019",
      question: "Roda ini menunjukkan: 🌍🌎🌏. Ini termasuk kategori?",
      options: ["Planet di Tata Surya", "Benua di Bumi", "Lautan", "Gurun"],
      answer: "Planet di Tata Surya",
      difficulty: "Master",
      category: "Astronomi",
    },
    {
      id: "rpi-020",
      question: "Roda ini menunjukkan: ⚗️🧪🧫. Ini termasuk kategori?",
      options: ["Kimia dan Eksperimen", "Fisika", "Biologi", "Geografi"],
      answer: "Kimia dan Eksperimen",
      difficulty: "Master",
      category: "Kimia",
    },
  ],

  // 1. TEBAK PROFESI (Guess the Profession)
  // ============================================
  "tebak-profesi": [
    // MUDAH
    { id: "tp-m-01", question: "Siapa yang mengajar di sekolah dan membantu murid-murid belajar?", options: ["Guru", "Dokter", "Polisi", "Petani"], answer: "Guru", difficulty: "Mudah", category: "Tebak Profesi" },
    { id: "tp-m-02", question: "Profesi apa yang memeriksa kesehatan orang di rumah sakit?", options: ["Tukang", "Dokter", "Koki", "Sopir"], answer: "Dokter", difficulty: "Mudah", category: "Tebak Profesi" },
    { id: "tp-m-03", question: "Siapa yang menjaga keamanan dan menangkap penjahat?", options: ["Guru", "Polisi", "Petani", "Nelayan"], answer: "Polisi", difficulty: "Mudah", category: "Tebak Profesi" },
    { id: "tp-m-04", question: "Profesi apa yang memadamkan api saat terjadi kebakaran?", options: ["Dokter", "Polisi", "Pemadam Kebakaran", "Tukang"], answer: "Pemadam Kebakaran", difficulty: "Mudah", category: "Tebak Profesi" },
    { id: "tp-m-05", question: "Siapa yang menerbangkan pesawat terbang?", options: ["Sopir", "Nelayan", "Pilot", "Koki"], answer: "Pilot", difficulty: "Mudah", category: "Tebak Profesi" },

    // SEDANG
    { id: "tp-s-01", question: "Profesi apa yang bekerja di dapur restoran dan membuat makanan enak untuk banyak orang?", options: ["Guru", "Koki", "Dokter", "Polisi"], answer: "Koki", difficulty: "Sedang", category: "Tebak Profesi" },
    { id: "tp-s-02", question: "Orang ini bekerja di laut, menggunakan jaring dan pancing untuk menangkap ikan. Siapakah dia?", options: ["Petani", "Nelayan", "Pilot", "Tukang"], answer: "Nelayan", difficulty: "Sedang", category: "Tebak Profesi" },
    { id: "tp-s-03", question: "Profesi apa yang mengendarai taksi atau bus untuk mengantar penumpang ke tujuan mereka?", options: ["Pilot", "Dokter", "Sopir", "Guru"], answer: "Sopir", difficulty: "Sedang", category: "Tebak Profesi" },
    { id: "tp-s-04", question: "Di rumah sakit, profesi apa yang membantu dokter memberikan obat dan merawat pasien di tempat tidur?", options: ["Guru", "Perawat", "Polisi", "Koki"], answer: "Perawat", difficulty: "Sedang", category: "Tebak Profesi" },
    { id: "tp-s-05", question: "Orang ini bekerja di sawah, menanam padi dan merawat tanaman setiap hari. Profesi apakah ini?", options: ["Nelayan", "Tukang", "Petani", "Dokter"], answer: "Petani", difficulty: "Sedang", category: "Tebak Profesi" },

    // SULIT
    { id: "tp-l-01", question: "Profesi ini menggunakan palu, bor, dan semen untuk membangun rumah dan gedung. Siapakah orangnya?", options: ["Tukang", "Dokter", "Guru", "Pilot"], answer: "Tukang", difficulty: "Sulit", category: "Tebak Profesi" },
    { id: "tp-l-02", question: "Orang ini selalu membawa buku catatan, menulis berita, dan mewawancara orang penting untuk disiarkan di televisi. Profesi apa ini?", options: ["Guru", "Wartawan", "Dokter", "Polisi"], answer: "Wartawan", difficulty: "Sulit", category: "Tebak Profesi" },
    { id: "tp-l-03", question: "Profesi ini bekerja di pengadilan, memakai jubah hitam, dan memutuskan siapa yang bersalah atau tidak bersalah. Siapakah dia?", options: ["Hakim", "Guru", "Polisi", "Dokter"], answer: "Hakim", difficulty: "Sulit", category: "Tebak Profesi" },
    { id: "tp-l-04", question: "Orang ini merancang bangunan sebelum dibuat oleh tukang, menggunakan penggaris khusus dan gambar teknis. Profesi apa ini?", options: ["Arsitek", "Dokter", "Guru", "Nelayan"], answer: "Arsitek", difficulty: "Sulit", category: "Tebak Profesi" },
    { id: "tp-l-05", question: "Profesi ini bekerja di laboratorium, menggunakan mikroskop, dan melakukan percobaan untuk menemukan hal baru. Siapakah dia?", options: ["Dokter", "Ilmuwan", "Guru", "Polisi"], answer: "Ilmuwan", difficulty: "Sulit", category: "Tebak Profesi" },

    // MASTER
    { id: "tp-x-01", question: "Orang ini belajar hukum selama bertahun-tahun, lalu membela orang yang dituduh melakukan kejahatan di pengadilan. Dia berbicara untuk melindungi hak kliennya. Profesi apa ini?", options: ["Hakim", "Pengacara", "Polisi", "Wartawan"], answer: "Pengacara", difficulty: "Master", category: "Tebak Profesi" },
    { id: "tp-x-02", question: "Profesi ini merancang pesawat terbang dan mobil menggunakan komputer canggih, menghitung daya tahan bahan, dan memastikan kendaraan aman saat dikendarai. Profesi apa ini?", options: ["Pilot", "Insinyur", "Sopir", "Tukang"], answer: "Insinyur", difficulty: "Master", category: "Tebak Profesi" },
    { id: "tp-x-03", question: "Profesi ini bekerja di apotek, menghitung dosis obat yang tepat untuk pasien, dan memberikan saran tentang cara minum obat dengan benar. Dia harus sangat teliti karena kesalahan bisa berbahaya. Siapakah dia?", options: ["Dokter", "Apoteker", "Perawat", "Guru"], answer: "Apoteker", difficulty: "Master", category: "Tebak Profesi" },
    { id: "tp-x-04", question: "Orang ini menulis cerita untuk buku anak-anak, menciptakan tokoh-tokoh yang menarik, dan menggunakan imajinasinya untuk membuat cerita yang mengajarkan nilai-nilai baik. Profesi apa ini?", options: ["Guru", "Penulis", "Wartawan", "Dokter"], answer: "Penulis", difficulty: "Master", category: "Tebak Profesi" },
    { id: "tp-x-05", question: "Orang ini mengatur keuangan negara, membuat rencana anggaran, dan memastikan uang rakyat digunakan dengan benar untuk kepentingan bersama. Profesi apa ini?", options: ["Guru", "Menteri", "Dokter", "Tukang"], answer: "Menteri", difficulty: "Master", category: "Tebak Profesi" },
  ],

  // ============================================
  // 2. TEBAK HEWAN (Guess the Animal)
  // ============================================
  "tebak-hewan": [
    // MUDAH
    { id: "th-m-01", question: "Hewan apa yang sering dijadikan peliharaan di rumah, suka mengeong, dan suka bermain dengan bola benang?", options: ["Anjing", "Kucing", "Kelinci", "Ikan"], answer: "Kucing", difficulty: "Mudah", category: "Tebak Hewan" },
    { id: "th-m-02", question: "Hewan apa yang memiliki belalai panjang, tubuh besar, dan hidup di hutan hujan tropis?", options: ["Kuda", "Gajah", "Kambing", "Sapi"], answer: "Gajah", difficulty: "Mudah", category: "Tebak Hewan" },
    { id: "th-m-03", question: "Hewan ini sering dijadikan simbol keberanian, suka mengaum, dan hidup di padang rumput Afrika. Hewan apakah ini?", options: ["Kucing", "Harimau", "Singa", "Anjing"], answer: "Singa", difficulty: "Mudah", category: "Tebak Hewan" },
    { id: "th-m-04", question: "Hewan apa yang bisa terbang di langit, memiliki sayap, dan sering kita lihat di pagi hari?", options: ["Ikan", "Burung", "Kucing", "Kuda"], answer: "Burung", difficulty: "Mudah", category: "Tebak Hewan" },
    { id: "th-m-05", question: "Hewan ini hidup di air, memiliki sirip dan ekor, dan bisa berenang dengan cepat. Hewan apakah ini?", options: ["Burung", "Kucing", "Ikan", "Kuda"], answer: "Ikan", difficulty: "Mudah", category: "Tebak Hewan" },

    // SEDANG
    { id: "th-s-01", question: "Hewan ini hidup di air tawar, memiliki tempurung di punggung, dan bisa berjalan sangat lambat. Hewan apakah ini?", options: ["Ikan", "Kura-kura", "Katak", "Buaya"], answer: "Kura-kura", difficulty: "Sedang", category: "Tebak Hewan" },
    { id: "th-s-02", question: "Hewan ini hidup di sungai dan rawa, memiliki tubuh bersisik, mulut lebar, dan suka berbaring di tepi air. Hewan apakah ini?", options: ["Ikan", "Kura-kura", "Buaya", "Katak"], answer: "Buaya", difficulty: "Sedang", category: "Tebak Hewan" },
    { id: "th-s-03", question: "Hewan ini hidup di hutan, suka memakan pisang dan buah-buahan, sering bergelantungan di pohon, dan pandai menirukan suara. Hewan apakah ini?", options: ["Kucing", "Babi", "Monyet", "Kelinci"], answer: "Monyet", difficulty: "Sedang", category: "Tebak Hewan" },
    { id: "th-s-04", question: "Hewan ini hidup di padang rumput, bisa berlari sangat cepat, memiliki totol-totol di tubuhnya, dan merupakan hewan tercepat di darat. Hewan apakah ini?", options: ["Kuda", "Singa", "Cheetah", "Harimau"], answer: "Cheetah", difficulty: "Sedang", category: "Tebak Hewan" },
    { id: "th-s-05", question: "Hewan ini hidup di kutub utara, berwarna putih, suka berenang di air laut yang dingin, dan memakan ikan. Hewan apakah ini?", options: ["Beruang", "Beruang Kutub", "Serigala", "Rusa"], answer: "Beruang Kutub", difficulty: "Sedang", category: "Tebak Hewan" },

    // SULIT
    { id: "th-l-01", question: "Hewan ini bisa mengubah warna tubuhnya menyesuaikan dengan lingkungan, memiliki lidah yang sangat panjang untuk menangkap serangga, dan mata bisa bergerak ke segala arah. Hewan apakah ini?", options: ["Ular", "Bunglon", "Katak", "Tokek"], answer: "Bunglon", difficulty: "Sulit", category: "Tebak Hewan" },
    { id: "th-l-02", question: "Hewan ini hidup di laut, memiliki delapan kaki, bisa menyemburkan tinta hitam saat merasa terancam, dan tubuhnya bisa berubah ukuran. Hewan apakah ini?", options: ["Ikan", "Gurita", "Kepiting", "Udang"], answer: "Gurita", difficulty: "Sulit", category: "Tebak Hewan" },
    { id: "th-l-03", question: "Hewan ini aktif di malam hari, memiliki sayap tipis dan bisa terbang, menggunakan suara ultrasonik untuk mencari mangsa, dan sering dianggap menakutkan. Hewan apakah ini?", options: ["Burung", "Kupu-kupu", "Kelelawar", "Capung"], answer: "Kelelawar", difficulty: "Sulit", category: "Tebak Hewan" },
    { id: "th-l-04", question: "Hewan ini memiliki racun di kulitnya, hidup di hutan hujan tropis, suka bersembunyi di balik daun, dan suaranya sangat keras saat musim hujan tiba. Hewan apakah ini?", options: ["Katak", "Kodok", "Ular", "Bunglon"], answer: "Kodok", difficulty: "Sulit", category: "Tebak Hewan" },
    { id: "th-l-05", question: "Hewan ini hidup di gurun pasir, bisa tahan lama tanpa minum air, memiliki punuk di punggungnya untuk menyimpan lemak, dan kakinya lebar agar tidak tenggelam di pasir. Hewan apakah ini?", options: ["Kuda", "Unta", "Kambing", "Sapi"], answer: "Unta", difficulty: "Sulit", category: "Tebak Hewan" },

    // MASTER
    { id: "th-x-01", question: "Hewan ini termasuk kelas reptilia, memiliki tubuh tertutup sisik, bisa mengganti kulit, dan beberapa jenisnya memiliki bisa berbahaya. Hewan ini tidak memiliki kaki dan bergerak dengan meliuk-liuk. Hewan apakah ini?", options: ["Kadal", "Ular", "Buaya", "Kura-kura"], answer: "Ular", difficulty: "Master", category: "Tebak Hewan" },
    { id: "th-x-02", question: "Hewan ini adalah mamalia laut terbesar di dunia, bisa mencapai panjang 30 meter, memakan udang kecil bernama krill, dan memiliki jantung sebesar mobil. Hewan ini berpindah dari kutub selatan ke utara untuk berkembang biak. Hewan apakah ini?", options: ["Hiu", "Paus Biru", "Lumba-lumba", "Paus Sperma"], answer: "Paus Biru", difficulty: "Master", category: "Tebak Hewan" },
    { id: "th-x-03", question: "Hewan ini termasuk serangga, memiliki tubuh tiga bagian, enam kaki, dan dua antena. Hewan ini hidup dalam koloni besar dengan sistem kerja sama terorganisir, memiliki ratu, pekerja, dan prajurit. Hewan apakah ini?", options: ["Lebah", "Semut", "Kupu-kupu", "Kumbang"], answer: "Semut", difficulty: "Master", category: "Tebak Hewan" },
    { id: "th-x-04", question: "Hewan ini adalah satu-satunya mamalia yang bisa terbang sungguhan, memiliki sayap tipis dari membran kulit, aktif di malam hari, dan menggunakan sonar untuk menemukan jalan. Hewan ini sering hidup di gua-gua gelap. Hewan apakah ini?", options: ["Burung Hantu", "Kelelawar", "Kupu-kupu", "Capung"], answer: "Kelelawar", difficulty: "Master", category: "Tebak Hewan" },
    { id: "th-x-05", question: "Hewan ini hidup di perairan Indonesia, termasuk hewan langka yang dilindungi undang-undang, memiliki tempurung keras seperti perisai, dan bisa hidup hingga usia lebih dari 100 tahun. Hewan apakah ini?", options: ["Penyu", "Buaya", "Kura-kura", "Hiu"], answer: "Penyu", difficulty: "Master", category: "Tebak Hewan" },
  ],

  // ============================================
  // 3. TEBAK PAHLAWAN (Guess the Hero)
  // ============================================
  "tebak-pahlawan": [
    // MUDAH
    { id: "tpa-m-01", question: "Pahlawan ini dijuluki 'Bapak Proklamator' dan menjadi Presiden pertama Indonesia. Siapakah beliau?", options: ["Mohammad Hatta", "Soekarno", "Soeharto", "Jenderal Sudirman"], answer: "Soekarno", difficulty: "Mudah", category: "Tebak Pahlawan" },
    { id: "tpa-m-02", question: "Pahlawan wanita ini dikenal karena perjuangannya untuk hak pendidikan perempuan Indonesia. Hari kelahirannya diperingati sebagai Hari Kartini. Siapakah beliau?", options: ["R.A. Kartini", "Martha Christina", "Cut Nyak Dien", "Fatmawati"], answer: "R.A. Kartini", difficulty: "Mudah", category: "Tebak Pahlawan" },
    { id: "tpa-m-03", question: "Pahlawan ini adalah Jenderal pertama Indonesia dan memimpin perang gerilya saat Agresi Militer Belanda. Siapakah beliau?", options: ["Soekarno", "Jenderal Sudirman", "Bung Tomo", "Ahmad Yani"], answer: "Jenderal Sudirman", difficulty: "Mudah", category: "Tebak Pahlawan" },
    { id: "tpa-m-04", question: "Pahlawan ini dikenal dengan semangatnya saat berorasi dengan teriakan 'Allahu Akbar' saat pertempuran 10 November di Surabaya. Siapakah beliau?", options: ["Bung Tomo", "Soekarno", "Jenderal Sudirman", "Mohammad Hatta"], answer: "Bung Tomo", difficulty: "Mudah", category: "Tebak Pahlawan" },
    { id: "tpa-m-05", question: "Pahlawan ini bersama Soekarno membacakan teks Proklamasi Kemerdekaan Indonesia pada 17 Agustus 1945. Siapakah beliau?", options: ["Jenderal Sudirman", "Mohammad Hatta", "Bung Tomo", "Ahmad Yani"], answer: "Mohammad Hatta", difficulty: "Mudah", category: "Tebak Pahlawan" },

    // SEDANG
    { id: "tpa-s-01", question: "Pahlawan ini adalah pejuang wanita dari Aceh yang terkenal karena keberaniannya melawan penjajah Belanda. Siapakah beliau?", options: ["R.A. Kartini", "Cut Nyak Dien", "Martha Christina", "Fatmawati"], answer: "Cut Nyak Dien", difficulty: "Sedang", category: "Tebak Pahlawan" },
    { id: "tpa-s-02", question: "Pahlawan ini adalah pahlawan dari Maluku yang memimpin perlawanan terhadap penjajah Belanda tahun 1817. Siapakah beliau?", options: ["Sam Ratulangi", "Pattimura", "Sisingamangaraja", "Teuku Umar"], answer: "Pattimura", difficulty: "Sedang", category: "Tebak Pahlawan" },
    { id: "tpa-s-03", question: "Pahlawan ini adalah pemimpin perjuangan rakyat Batak melawan penjajah Belanda di Sumatera Utara. Siapakah beliau?", options: ["Pattimura", "Sisingamangaraja XII", "Diponegoro", "Tuanku Imam Bonjol"], answer: "Sisingamangaraja XII", difficulty: "Sedang", category: "Tebak Pahlawan" },
    { id: "tpa-s-04", question: "Pahlawan ini adalah pahlawan dari Sulawesi yang memimpin perlawanan terhadap penjajah Belanda. Siapakah beliau?", options: ["Sam Ratulangi", "Pattimura", "Sisingamangaraja", "Cut Nyak Dien"], answer: "Sam Ratulangi", difficulty: "Sedang", category: "Tebak Pahlawan" },
    { id: "tpa-s-05", question: "Pahlawan wanita dari Maluku ini dikenal karena keberaniannya melawan penjajah Belanda. Beliau gugur saat usia 17 tahun. Siapakah beliau?", options: ["R.A. Kartini", "Martha Christina Tiahahu", "Cut Nyak Dien", "Fatmawati"], answer: "Martha Christina Tiahahu", difficulty: "Sedang", category: "Tebak Pahlawan" },

    // SULIT
    { id: "tpa-l-01", question: "Pahlawan ini adalah ulama yang memimpin perjuangan rakyat Minangkabau melawan penjajah Belanda di Sumatera Barat. Siapakah beliau?", options: ["Diponegoro", "Tuanku Imam Bonjol", "Sisingamangaraja", "Pattimura"], answer: "Tuanku Imam Bonjol", difficulty: "Sulit", category: "Tebak Pahlawan" },
    { id: "tpa-l-02", question: "Pahlawan ini adalah pangeran dari Yogyakarta yang memimpin Perang Diponegoro (1825-1830) melawan penjajah Belanda. Siapakah beliau?", options: ["Tuanku Imam Bonjol", "Diponegoro", "Sisingamangaraja", "Pattimura"], answer: "Diponegoro", difficulty: "Sulit", category: "Tebak Pahlawan" },
    { id: "tpa-l-03", question: "Pahlawan ini adalah pahlawan dari Aceh yang memimpin perlawanan terhadap penjajah Belanda dan sering disebut 'Singa Meugara'. Siapakah beliau?", options: ["Cut Nyak Dien", "Teuku Umar", "Mohammad Hatta", "Soekarno"], answer: "Teuku Umar", difficulty: "Sulit", category: "Tebak Pahlawan" },
    { id: "tpa-l-04", question: "Pahlawan ini adalah pahlawan wanita dari Aceh yang dikenal karena keberaniannya melawan penjajah Belanda. Beliau adalah istri dari Teuku Umar. Siapakah beliau?", options: ["R.A. Kartini", "Cut Nyak Dhien", "Martha Christina", "Fatmawati"], answer: "Cut Nyak Dhien", difficulty: "Sulit", category: "Tebak Pahlawan" },
    { id: "tpa-l-05", question: "Pahlawan ini memimpin perjuangan rakyat Gorontalo melawan penjajah Belanda. Beliau dikenal sebagai 'Pahlawan Nasional Gorontalo'. Siapakah beliau?", options: ["Sam Ratulangi", "Nani Wartabone", "Pattimura", "Sisingamangaraja"], answer: "Nani Wartabone", difficulty: "Sulit", category: "Tebak Pahlawan" },

    // MASTER
    { id: "tpa-x-01", question: "Pahlawan ini adalah pahlawan dari Papua yang memperjuangkan hak-hak rakyat Papua untuk bergabung dengan Indonesia. Siapakah beliau?", options: ["Frans Kaisiepo", "Sam Ratulangi", "Pattimura", "Sisingamangaraja"], answer: "Frans Kaisiepo", difficulty: "Master", category: "Tebak Pahlawan" },
    { id: "tpa-x-02", question: "Pahlawan ini memimpin perlawanan terhadap penjajah Belanda di Kalimantan. Beliau dikenal sebagai 'Pangeran dari Kalimantan'. Siapakah beliau?", options: ["Pangeran Antasari", "Diponegoro", "Tuanku Imam Bonjol", "Sisingamangaraja"], answer: "Pangeran Antasari", difficulty: "Master", category: "Tebak Pahlawan" },
    { id: "tpa-x-03", question: "Pahlawan ini memimpin perlawanan terhadap penjajah Belanda di Bali. Beliau gugur saat pertempuran di Marga tahun 1946. Siapakah beliau?", options: ["I Gusti Ngurah Rai", "Sam Ratulangi", "Pattimura", "Sisingamangaraja"], answer: "I Gusti Ngurah Rai", difficulty: "Master", category: "Tebak Pahlawan" },
    { id: "tpa-x-04", question: "Pahlawan ini adalah panglima perang Kerajaan Gowa yang memimpin perlawanan terhadap penjajah Belanda di Sulawesi Selatan. Siapakah beliau?", options: ["Sam Ratulangi", "Pattimura", "Sisingamangaraja", "Hasanuddin"], answer: "Hasanuddin", difficulty: "Master", category: "Tebak Pahlawan" },
    { id: "tpa-x-05", question: "Pahlawan ini memimpin perlawanan rakyat Nusa Tenggara Timur terhadap penjajah Belanda. Beliau dikenal sebagai 'Pahlawan Nasional NTT'. Siapakah beliau?", options: ["Frans Kaisiepo", "Musa", "Sam Ratulangi", "Pattimura"], answer: "Musa", difficulty: "Master", category: "Tebak Pahlawan" },
  ],

  // ============================================
  // 4. TEBAK PROVINSI (Guess the Province)
  // ============================================
  "tebak-provinsi": [
    // MUDAH
    { id: "tpv-m-01", question: "Provinsi ini adalah ibu kota negara Indonesia, terkenal dengan Monas dan Istana Negara. Provinsi manakah ini?", options: ["Jawa Barat", "DKI Jakarta", "Jawa Tengah", "Banten"], answer: "DKI Jakarta", difficulty: "Mudah", category: "Tebak Provinsi" },
    { id: "tpv-m-02", question: "Provinsi ini terkenal dengan candi Borobudur dan Prambanan, serta menjadi pusat kebudayaan Jawa. Provinsi manakah ini?", options: ["Jawa Barat", "Jawa Timur", "Jawa Tengah", "DI Yogyakarta"], answer: "Jawa Tengah", difficulty: "Mudah", category: "Tebak Provinsi" },
    { id: "tpv-m-03", question: "Provinsi ini terkenal dengan Gunung Bromo, Kawah Ijen, dan kota Surabaya sebagai ibu kotanya. Provinsi manakah ini?", options: ["Jawa Tengah", "Jawa Barat", "Jawa Timur", "Bali"], answer: "Jawa Timur", difficulty: "Mudah", category: "Tebak Provinsi" },
    { id: "tpv-m-04", question: "Provinsi ini terkenal dengan pantai Kuta, sawah terasering Tegallalang, dan pura-pura indah. Provinsi manakah ini?", options: ["Nusa Tenggara Timur", "Bali", "Nusa Tenggara Barat", "Jawa Timur"], answer: "Bali", difficulty: "Mudah", category: "Tebak Provinsi" },
    { id: "tpv-m-05", question: "Provinsi ini terkenal dengan Danau Toba yang merupakan danau vulkanik terbesar di dunia. Provinsi manakah ini?", options: ["Sumatera Utara", "Sumatera Barat", "Riau", "Aceh"], answer: "Sumatera Utara", difficulty: "Mudah", category: "Tebak Provinsi" },

    // SEDANG
    { id: "tpv-s-01", question: "Provinsi ini terkenal dengan Rumah Gadang, rendang, dan tari Piring. Provinsi manakah ini?", options: ["Sumatera Utara", "Sumatera Barat", "Riau", "Jambi"], answer: "Sumatera Barat", difficulty: "Sedang", category: "Tebak Provinsi" },
    { id: "tpv-s-02", question: "Provinsi ini terkenal dengan makanan pempek, Jembatan Ampera, dan sungai terpanjang di Sumatera. Provinsi manakah ini?", options: ["Sumatera Selatan", "Lampung", "Bengkulu", "Jambi"], answer: "Sumatera Selatan", difficulty: "Sedang", category: "Tebak Provinsi" },
    { id: "tpv-s-03", question: "Provinsi ini terkenal dengan Masjid Raya Baiturrahman, kopi Gayo, dan wilayah paling barat Indonesia. Provinsi manakah ini?", options: ["Sumatera Utara", "Sumatera Barat", "Aceh", "Riau"], answer: "Aceh", difficulty: "Sedang", category: "Tebak Provinsi" },
    { id: "tpv-s-04", question: "Provinsi ini terkenal dengan rumah adat Tongkonan, kain songket, dan Danau Tempe. Provinsi manakah ini?", options: ["Sumatera Utara", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo"], answer: "Sulawesi Selatan", difficulty: "Sedang", category: "Tebak Provinsi" },
    { id: "tpv-s-05", question: "Provinsi ini terkenal dengan Raja Ampat, pemandangan bawah laut yang indah, dan kaya akan keanekaragaman hayati laut. Provinsi manakah ini?", options: ["Papua Barat", "Papua", "Maluku Utara", "Maluku"], answer: "Papua Barat", difficulty: "Sedang", category: "Tebak Provinsi" },

    // SULIT
    { id: "tpv-l-01", question: "Provinsi ini terkenal dengan Komodo, kuda liar, dan Pink Beach. Provinsi manakah ini?", options: ["NTT", "NTB", "Bali", "Papua Barat"], answer: "NTT", difficulty: "Sulit", category: "Tebak Provinsi" },
    { id: "tpv-l-02", question: "Provinsi ini terkenal dengan Tana Toraja, upacara pemakaman tradisional, dan rumah adat Tongkonan. Provinsi manakah ini?", options: ["Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Utara", "Gorontalo"], answer: "Sulawesi Selatan", difficulty: "Sulit", category: "Tebak Provinsi" },
    { id: "tpv-l-03", question: "Provinsi ini terkenal dengan Danau Sentarum, orangutan, dan Sungai Kapuas yang merupakan sungai terpanjang di Indonesia. Provinsi manakah ini?", options: ["Kalimantan Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan"], answer: "Kalimantan Barat", difficulty: "Sulit", category: "Tebak Provinsi" },
    { id: "tpv-l-04", question: "Provinsi ini terkenal dengan Danau Kelimutu yang memiliki tiga warna berbeda pada danau vulkaniknya. Provinsi manakah ini?", options: ["NTT", "NTB", "Bali", "Maluku"], answer: "NTT", difficulty: "Sulit", category: "Tebak Provinsi" },
    { id: "tpv-l-05", question: "Provinsi ini terkenal dengan Taman Nasional Ujung Kulon, habitat badak Jawa, dan merupakan ujung barat pulau Jawa. Provinsi manakah ini?", options: ["Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah"], answer: "Banten", difficulty: "Sulit", category: "Tebak Provinsi" },

    // MASTER
    { id: "tpv-x-01", question: "Provinsi ini terkenal dengan Taman Nasional Lore Lindu, budaya Kaili, dan terdampak gempa bumi besar tahun 2018. Provinsi manakah ini?", options: ["Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Utara", "Gorontalo"], answer: "Sulawesi Tengah", difficulty: "Master", category: "Tebak Provinsi" },
    { id: "tpv-x-02", question: "Provinsi ini terkenal dengan Taman Nasional Wasur, suku Asmat, dan merupakan provinsi terluas di Indonesia. Provinsi manakah ini?", options: ["Papua Barat", "Papua", "Maluku Utara", "Maluku"], answer: "Papua", difficulty: "Master", category: "Tebak Provinsi" },
    { id: "tpv-x-03", question: "Provinsi ini terkenal dengan Taman Nasional Bunaken, budaya Minahasa, dan wisata bahari yang indah. Provinsi manakah ini?", options: ["Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Utara", "Gorontalo"], answer: "Sulawesi Utara", difficulty: "Master", category: "Tebak Provinsi" },
    { id: "tpv-x-04", question: "Provinsi ini terkenal dengan Taman Nasional Leuser, orangutan, dan memiliki hutan hujan tropis terluas di Sumatera. Provinsi manakah ini?", options: ["Sumatera Utara", "Aceh", "Sumatera Barat", "Riau"], answer: "Aceh", difficulty: "Master", category: "Tebak Provinsi" },
    { id: "tpv-x-05", question: "Provinsi ini terkenal dengan Taman Nasional Tanjung Puting, orangutan liar, dan hutan gambut yang luas. Provinsi manakah ini?", options: ["Kalimantan Timur", "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan"], answer: "Kalimantan Tengah", difficulty: "Master", category: "Tebak Provinsi" },
  ],

  // ============================================
  // 5. PUZZLE PETA INDONESIA (Indonesia Map Puzzle)
  // ============================================
  "puzzle-peta-indonesia": [
    // MUDAH
    { id: "ppi-m-01", question: "Pulau manakah yang merupakan pulau terbesar di Indonesia dan berbatasan langsung dengan negara Papua Nugini?", options: ["Jawa", "Sumatera", "Kalimantan", "Papua"], answer: "Papua", difficulty: "Mudah", category: "Puzzle Peta Indonesia" },
    { id: "ppi-m-02", question: "Pulau manakah yang merupakan pulau terpadat di Indonesia dan menjadi lokasi ibu kota negara?", options: ["Sumatera", "Jawa", "Kalimantan", "Sulawesi"], answer: "Jawa", difficulty: "Mudah", category: "Puzzle Peta Indonesia" },
    { id: "ppi-m-03", question: "Pulau manakah yang terletak di sebelah barat Indonesia dan merupakan pulau terluas ke-6 di dunia?", options: ["Jawa", "Kalimantan", "Sumatera", "Sulawesi"], answer: "Sumatera", difficulty: "Mudah", category: "Puzzle Peta Indonesia" },
    { id: "ppi-m-04", question: "Pulau manakah yang terkenal dengan banyak pura, sawah terasering, dan merupakan destinasi wisata terkenal?", options: ["Jawa", "Sumatera", "Bali", "Kalimantan"], answer: "Bali", difficulty: "Mudah", category: "Puzzle Peta Indonesia" },
    { id: "ppi-m-05", question: "Pulau manakah yang terletak di sebelah timur Kalimantan dan memiliki bentuk seperti huruf K?", options: ["Jawa", "Sumatera", "Kalimantan", "Sulawesi"], answer: "Sulawesi", difficulty: "Mudah", category: "Puzzle Peta Indonesia" },

    // SEDANG
    { id: "ppi-s-01", question: "Pulau manakah yang terletak di sebelah utara Jawa dan merupakan pulau terluas kedua di Indonesia?", options: ["Sumatera", "Kalimantan", "Sulawesi", "Papua"], answer: "Kalimantan", difficulty: "Sedang", category: "Puzzle Peta Indonesia" },
    { id: "ppi-s-02", question: "Pulau manakah yang merupakan bagian Indonesia yang berbatasan langsung dengan Papua Nugini di sebelah timur?", options: ["Sumatera", "Jawa", "Papua", "Sulawesi"], answer: "Papua", difficulty: "Sedang", category: "Puzzle Peta Indonesia" },
    { id: "ppi-s-03", question: "Pulau manakah yang terletak di sebelah barat daya Jawa dan terkenal dengan wisata baharinya?", options: ["Bali", "Lombok", "Flores", "Timor"], answer: "Bali", difficulty: "Sedang", category: "Puzzle Peta Indonesia" },
    { id: "ppi-s-04", question: "Pulau manakah yang terletak di sebelah timur Bali dan terkenal dengan Gunung Rinjani?", options: ["Flores", "Lombok", "Sumbawa", "Timor"], answer: "Lombok", difficulty: "Sedang", category: "Puzzle Peta Indonesia" },
    { id: "ppi-s-05", question: "Pulau manakah yang terletak di sebelah timur Lombok dan merupakan habitat alami Komodo?", options: ["Sumbawa", "Flores", "Timor", "Sumba"], answer: "Flores", difficulty: "Sedang", category: "Puzzle Peta Indonesia" },

    // SULIT
    { id: "ppi-l-01", question: "Pulau manakah yang terletak di ujung utara Sumatera dan merupakan lokasi kota Sabang?", options: ["Weh", "Nias", "Simeulue", "Mentawai"], answer: "Weh", difficulty: "Sulit", category: "Puzzle Peta Indonesia" },
    { id: "ppi-l-02", question: "Gugusan pulau manakah yang terletak di barat Sumatera dan merupakan rumah bagi suku Mentawai?", options: ["Nias", "Kepulauan Mentawai", "Enggano", "Krakatau"], answer: "Kepulauan Mentawai", difficulty: "Sulit", category: "Puzzle Peta Indonesia" },
    { id: "ppi-l-03", question: "Gunung api bawah laut manakah yang terletak di Selat Sunda dan pernah meletus dahsyat tahun 1883?", options: ["Krakatau", "Bali", "Lombok", "Flores"], answer: "Krakatau", difficulty: "Sulit", category: "Puzzle Peta Indonesia" },
    { id: "ppi-l-04", question: "Pulau manakah yang terletak di Teluk Manado, Sulawesi Utara, dan terkenal dengan taman laut terumbu karangnya?", options: ["Sangihe", "Bunaken", "Talaud", "Lembeh"], answer: "Bunaken", difficulty: "Sulit", category: "Puzzle Peta Indonesia" },
    { id: "ppi-l-05", question: "Pulau manakah yang terletak di sebelah tenggara Flores dan terkenal dengan kuda liar serta pemandangan savana?", options: ["Timor", "Sumba", "Adonara", "Lembata"], answer: "Sumba", difficulty: "Sulit", category: "Puzzle Peta Indonesia" },

    // MASTER
    { id: "ppi-x-01", question: "Pulau manakah yang terletak di antara Sumatera dan Jawa, meletus dahsyat tahun 1883, dan merupakan salah satu letusan vulkanik terbesar dalam sejarah?", options: ["Krakatau", "Anak Krakatau", "Merapi", "Rinjani"], answer: "Krakatau", difficulty: "Master", category: "Puzzle Peta Indonesia" },
    { id: "ppi-x-02", question: "Pulau manakah yang terletak di sebelah selatan Flores, merupakan habitat alami Komodo, dan memiliki Taman Nasional yang terkenal?", options: ["Flores", "Rinca", "Padar", "Komodo"], answer: "Komodo", difficulty: "Master", category: "Puzzle Peta Indonesia" },
    { id: "ppi-x-03", question: "Pulau manakah yang merupakan bagian dari Kepulauan Raja Ampat di Papua Barat dan memiliki Taman Nasional Waigeo?", options: ["Waigeo", "Salawati", "Batanta", "Misool"], answer: "Waigeo", difficulty: "Master", category: "Puzzle Peta Indonesia" },
    { id: "ppi-x-04", question: "Pulau manakah yang terletak di selatan Jawa, merupakan gunung api aktif, dan merupakan versi baru dari Krakatau yang meletus tahun 2018?", options: ["Anak Krakatau", "Merapi", "Rinjani", "Krakatau"], answer: "Anak Krakatau", difficulty: "Master", category: "Puzzle Peta Indonesia" },
    { id: "ppi-x-05", question: "Pulau manakah yang terletak di utara Maluku, merupakan pulau terbesar di Maluku Utara, dan memiliki Taman Nasional Aketajawe-Lolobata?", options: ["Halmahera", "Morotai", "Bacan", "Obi"], answer: "Halmahera", difficulty: "Master", category: "Puzzle Peta Indonesia" },
  ],


  // 1. QUIZ IPA (Science Quiz) - 20 Questions
  // ============================================================
  "quiz-ipa": [
    // MUDAH (5) - Basic facts
    { id: "qi-m-01", question: "Planet mana yang merupakan planet terbesar di tata surya?", options: ["Mars", "Jupiter", "Saturnus", "Neptunus"], answer: "Jupiter", difficulty: "Mudah", category: "Tata Surya" },
    { id: "qi-m-02", question: "Bagian tubuh manusia yang berfungsi memompa darah adalah...", options: ["Paru-paru", "Hati", "Jantung", "Ginjal"], answer: "Jantung", difficulty: "Mudah", category: "Tubuh Manusia" },
    { id: "qi-m-03", question: "Hewan yang termasuk golongan reptil adalah...", options: ["Kodok", "Ular", "Ikan", "Burung"], answer: "Ular", difficulty: "Mudah", category: "Hewan" },
    { id: "qi-m-04", question: "Apa nama proses perubahan wujud air menjadi uap air karena panas?", options: ["Mengkristal", "Menguap", "Mengembun", "Mencair"], answer: "Menguap", difficulty: "Mudah", category: "Materi" },
    { id: "qi-m-05", question: "Bagian tumbuhan yang berfungsi menyerap air dari tanah adalah...", options: ["Daun", "Bunga", "Akar", "Batang"], answer: "Akar", difficulty: "Mudah", category: "Tumbuhan" },

    // SEDANG (5) - Processes
    { id: "qi-s-01", question: "Proses tumbuhan menghasilkan makanan dengan bantuan sinar matahari disebut...", options: ["Respirasi", "Fotosintesis", "Destilasi", "Kondensasi"], answer: "Fotosintesis", difficulty: "Sedang", category: "Tumbuhan" },
    { id: "qi-s-02", question: "Siklus air di alam dimulai dari penguapan, lalu terjadi...", options: ["Presipitasi", "Infiltrasi", "Kondensasi", "Evaporasi"], answer: "Kondensasi", difficulty: "Sedang", category: "Cuaca" },
    { id: "qi-s-03", question: "Perubahan wujud benda dari gas menjadi cair disebut...", options: ["Menyublim", "Mengembun", "Mencair", "Menguap"], answer: "Mengembun", difficulty: "Sedang", category: "Materi" },
    { id: "qi-s-04", question: "Hewan yang makanannya berupa tumbuhan disebut hewan...", options: ["Karnivora", "Herbivora", "Omnivora", "Detritivora"], answer: "Herbivora", difficulty: "Sedang", category: "Hewan" },
    { id: "qi-s-05", question: "Jaring-jaring tubuh manusia yang berfungsi menghubungkan organ-organ disebut...", options: ["Jaringan epitel", "Jaringan otot", "Jaringan saraf", "Jaringan ikat"], answer: "Jaringan ikat", difficulty: "Sedang", category: "Tubuh Manusia" },

    // SULIT (5) - Analysis
    { id: "qi-l-01", question: "Mengapa benda yang dilempar ke atas selalu jatuh ke tanah?", options: ["Karena angin", "Karena gaya gravitasi bumi", "Karena tekanan udara", "Karena magnetisme"], answer: "Karena gaya gravitasi bumi", difficulty: "Sulit", category: "Fisika Dasar" },
    { id: "qi-l-02", question: "Dalam rantai makanan, organisme yang berfungsi sebagai pengurai adalah...", options: ["Tumbuhan", "Herbivora", "Karnivora", "Bakteri dan jamur"], answer: "Bakteri dan jamur", difficulty: "Sulit", category: "Ekosistem" },
    { id: "qi-l-03", question: "Sebuah benda diletakkan di atas permukaan air dan mengapung. Apa yang menyebabkan benda tersebut mengapung?", options: ["Berat benda lebih ringan dari air", "Gaya apung lebih besar dari berat benda", "Benda tidak memiliki massa", "Tekanan udara pada benda"], answer: "Gaya apung lebih besar dari berat benda", difficulty: "Sulit", category: "Fisika Dasar" },
    { id: "qi-l-04", question: "Pohon di hutan berperan penting bagi keseimbangan ekosistem karena...", options: ["Menjadi tempat tinggal hewan saja", "Menghasilkan oksigen dan menyerap karbon dioksida", "Membuat tanah menjadi subur saja", "Menjadi penghalang angin kencang"], answer: "Menghasilkan oksigen dan menyerap karbon dioksida", difficulty: "Sulit", category: "Ekosistem" },
    { id: "qi-l-05", question: "Seorang anak bereksperimen: lilin dinyalakan lalu ditutup gelas kaca. Lilin perlahan padam. Apa kesimpulan yang paling tepat?", options: ["Gelas kaca memadamkan api", "Api membutuhkan oksigen untuk tetap menyala", "Gelas kaca mengubah suhu lilin", "Api membutuhkan cahaya untuk menyala"], answer: "Api membutuhkan oksigen untuk tetap menyala", difficulty: "Sulit", category: "Metode Ilmiah" },

    // MASTER (5) - Complex reasoning
    { id: "qi-x-01", question: "Jika semua lebah di suatu daerah punah, apa dampak paling besar bagi ekosistem?", options: ["Hanya lebah yang rugi", "Banyak tumbuhan tidak bisa berbuah karena tidak terjadi penyerbukan", "Hewan predator akan punah", "Tidak ada dampak yang signifikan"], answer: "Banyak tumbuhan tidak bisa berbuah karena tidak terjadi penyerbukan", difficulty: "Master", category: "Ekosistem" },
    { id: "qi-x-02", question: "Sebuah roller coaster mengubah energi potensial di puncak menjadi energi kinetik saat meluncur turun. Prinsip apa yang terjadi?", options: ["Hukum kekekalan massa", "Prinsip transformasi energi", "Hukum Newton ketiga", "Gaya sentripetal"], answer: "Prinsip transformasi energi", difficulty: "Master", category: "Fisika Dasar" },
    { id: "qi-x-03", question: "Seorang siswa melakukan percobaan: tiga tanaman diberi perlakuan berbeda (diberi air, tidak diberi air, diberi air berlebih). Tanaman yang diberi air berlebih layu. Apa hipotesis yang paling sesuai?", options: ["Air menyebabkan tanaman mati", "Terlalu banyak air mengakibatkan tanaman kekurangan oksigen di akar", "Tanaman tidak suka air", "Air berlebih membuat daun gugur"], answer: "Terlalu banyak air mengakibatkan tanaman kekurangan oksigen di akar", difficulty: "Master", category: "Metode Ilmiah" },
    { id: "qi-x-04", question: "Di suatu danau terjadi ledakan ganggang (alga bloom) karena air terlalu banyak mengandung nutrisi. Istilah fenomena ini adalah...", options: ["Deforestasi", "Eutrofikasi", "Erupsi", "Invasi spesies"], answer: "Eutrofikasi", difficulty: "Master", category: "Ekosistem" },
    { id: "qi-x-05", question: "Sebuah pesawat terbang bisa naik karena sayap pesawat dirancang dengan bentuk khusus. Prinsip fisika yang menjelaskan hal ini adalah...", options: ["Hukum Archimedes", "Prinsip Bernoulli tentang tekanan fluida", "Hukum Coulomb", "Hukum Ohm"], answer: "Prinsip Bernoulli tentang tekanan fluida", difficulty: "Master", category: "Fisika Dasar" },
  ],

  // ============================================================
  // 2. QUIZ IPS (Social Studies Quiz) - 20 Questions
  // ============================================================
  "quiz-ips": [
    // MUDAH (5) - Basic facts
    { id: "qs-m-01", question: "Ibukota negara Indonesia adalah...", options: ["Bandung", "Surabaya", "Jakarta", "Yogyakarta"], answer: "Jakarta", difficulty: "Mudah", category: "Geografi" },
    { id: "qs-m-02", question: "Lambang negara Indonesia adalah...", options: ["Garuda Pancasila", "Bhinneka Tunggal Ika", "Merah Putih", "Indonesia Raya"], answer: "Garuda Pancasila", difficulty: "Mudah", category: "Kenegaraan" },
    { id: "qs-m-03", question: "Mata uang resmi Indonesia adalah...", options: ["Dolar", "Ringgit", "Rupiah", "Baht"], answer: "Rupiah", difficulty: "Mudah", category: "Ekonomi Dasar" },
    { id: "qs-m-04", question: "Pulau terbesar di Indonesia adalah...", options: ["Sumatera", "Jawa", "Kalimantan", "Sulawesi"], answer: "Kalimantan", difficulty: "Mudah", category: "Geografi" },
    { id: "qs-m-05", question: "Lambang sila kelima Pancasila adalah...", options: ["Bintang", "Pohon Beringin", "Kepala Banteng", "Padi dan Kapas"], answer: "Padi dan Kapas", difficulty: "Mudah", category: "Kenegaraan" },

    // SEDANG (5) - Geography and cultural diversity
    { id: "qs-s-01", question: "Sungai terpanjang di Indonesia adalah...", options: ["Sungai Kapuas", "Sungai Musi", "Sungai Barito", "Sungai Mahakam"], answer: "Sungai Kapuas", difficulty: "Sedang", category: "Geografi" },
    { id: "qs-s-02", question: "Provinsi yang terkenal sebagai penghasil kopi terbanyak di Indonesia adalah...", options: ["Bali", "Jawa Barat", "Aceh dan Sumatera Utara", "Papua"], answer: "Aceh dan Sumatera Utara", difficulty: "Sedang", category: "Geografi Ekonomi" },
    { id: "qs-s-03", question: "Upacara adat Toraja yang berkaitan dengan penghormatan kepada orang meninggal disebut...", options: ["Nyepi", "Rambu Solo", "Tabuik", "Bakar Batu"], answer: "Rambu Solo", difficulty: "Sedang", category: "Budaya" },
    { id: "qs-s-04", question: "Wilayah Indonesia yang terletak di jalur Cincin Api Pasifik menjadikannya rawan terhadap...", options: ["Banjir bandang", "Gempa bumi dan letusan gunung berapi", "Tsunami saja", "Kekeringan"], answer: "Gempa bumi dan letusan gunung berapi", difficulty: "Sedang", category: "Geografi" },
    { id: "qs-s-05", question: "Fungsi DPR selain membuat undang-undang adalah...", options: ["Menjalankan pemerintahan", "Mengawasi jalannya pemerintahan", "Memilih presiden", "Menegakkan hukum"], answer: "Mengawasi jalannya pemerintahan", difficulty: "Sedang", category: "Kewarganegaraan" },

    // SULIT (5) - Historical events, economic concepts, civic responsibilities
    { id: "qs-l-01", question: "Perjanjian Linggarjati tahun 1946 menetapkan batas wilayah kedaulatan Belanda dan Indonesia. Wilayah yang dikuasai Indonesia saat itu meliputi...", options: ["Seluruh wilayah Indonesia", "Jawa, Madura, dan Sumatera", "Hanya Jawa dan Madura", "Hanya Sumatera"], answer: "Jawa, Madura, dan Sumatera", difficulty: "Sulit", category: "Sejarah" },
    { id: "qs-l-02", question: "Julukan 'Rice Bowl of Asia' berkaitan erat dengan...", options: ["Kondisi iklim tropis yang mendukung pertanian", "Jumlah penduduk yang besar", "Kebijakan pemerintah", "Teknologi pertanian yang canggih"], answer: "Kondisi iklim tropis yang mendukung pertanian", difficulty: "Sulit", category: "Geografi Ekonomi" },
    { id: "qs-l-03", question: "Kewajiban warga negara Indonesia terhadap negara meliputi hal-hal berikut, kecuali...", options: ["Membayar pajak", "Mempertahankan kedaulatan negara", "Memilih presiden", "Menggunakan hak pilih"], answer: "Menggunakan hak pilih", difficulty: "Sulit", category: "Kewarganegaraan" },
    { id: "qs-l-04", question: "Keragaman suku bangsa di Indonesia dapat menjadi kekuatan jika...", options: ["Setiap suku mengasingkan diri", "Suku-suku saling bersaing untuk menguasai wilayah", "Setiap suku saling menghormati dan bekerja sama", "Hanya satu suku yang diakui"], answer: "Setiap suku saling menghormati dan bekerja sama", difficulty: "Sulit", category: "Budaya" },
    { id: "qs-l-05", question: "Sebab utama pemberontakan DI/TII terjadi adalah...", options: ["Tuntutan kemerdekaan dari Belanda", "Pengaruh ideologi yang berbeda dengan pemerintahan RI", "Ketidakpuasan terhadap sistem ekonomi", "Perbedaan pendapat tentang ibu kota"], answer: "Pengaruh ideologi yang berbeda dengan pemerintahan RI", difficulty: "Sulit", category: "Sejarah" },

    // MASTER (5) - Complex analysis
    { id: "qs-x-01", question: "Kondisi geografis Indonesia sebagai negara kepulauan memiliki dampak terhadap kebudayaan lokal, yaitu...", options: ["Setiap pulau memiliki budaya yang persis sama", "Keragaman budaya karena isolasi geografis antar pulau", "Tidak ada perbedaan budaya antar pulau", "Semua pulau menggunakan bahasa yang sama"], answer: "Keragaman budaya karena isolasi geografis antar pulau", difficulty: "Master", category: "Geografi Budaya" },
    { id: "qs-x-02", question: "Peristiwa Proklamasi 17 Agustus 1945 memiliki dampak jangka panjang bagi bangsa Indonesia, yaitu...", options: ["Indonesia langsung menjadi negara maju", "Munculnya semangat perjuangan dan kebangsaan yang menjadi dasar pembangunan", "Belanda langsung mengakui kemerdekaan Indonesia", "Tidak ada dampak signifikan bagi kehidupan masyarakat"], answer: "Munculnya semangat perjuangan dan kebangsaan yang menjadi dasar pembangunan", difficulty: "Master", category: "Sejarah" },
    { id: "qs-x-03", question: "Perbedaan tingkat kesejahteraan antara wilayah barat dan timur Indonesia disebabkan oleh faktor-faktor berikut, kecuali...", options: ["Akses transportasi dan infrastruktur", "Jarak dari pusat pemerintahan", "Kesuburan tanah", "Warna kulit penduduk"], answer: "Warna kulit penduduk", difficulty: "Master", category: "Ekonomi" },
    { id: "qs-x-04", question: "Bhinneka Tunggal Ika bukan hanya semboyan, tetapi tercermin dalam kehidupan nyata melalui...", options: ["Penggunaan bahasa Indonesia sebagai bahasa persatuan", "Pemaksaan satu budaya di seluruh Indonesia", "Penyatuan semua suku bangsa menjadi satu", "Penghapusan bahasa daerah"], answer: "Penggunaan bahasa Indonesia sebagai bahasa persatuan", difficulty: "Master", category: "Kenegaraan" },
    { id: "qs-x-05", question: "Kebijakan transmigrasi yang dilakukan pemerintah Indonesia bertujuan untuk...", options: ["Memindahkan penduduk dari kota ke desa", "Menyeimbangkan kepadatan penduduk antar pulau", "Mengurangi jumlah penduduk Indonesia", "Membuka lahan perkebunan di luar negeri"], answer: "Menyeimbangkan kepadatan penduduk antar pulau", difficulty: "Master", category: "Geografi Ekonomi" },
  ],

  // ============================================================
  // 3. QUIZ BAHASA INDONESIA (Indonesian Language Quiz) - 20 Questions
  // ============================================================
  "quiz-bahasa-indonesia": [
    // MUDAH (5) - Word types, synonyms/antonyms
    { id: "qb-m-01", question: "Kata 'Indah' termasuk jenis kata...", options: ["Kata benda", "Kata kerja", "Kata sifat", "Kata keterangan"], answer: "Kata sifat", difficulty: "Mudah", category: "Jenis Kata" },
    { id: "qb-m-02", question: "Lawan kata dari kata 'Panas' adalah...", options: ["Lembut", "Dingin", "Hangat", "Lembap"], answer: "Dingin", difficulty: "Mudah", category: "Kosakata" },
    { id: "qb-m-03", question: "Kata 'Menulis' mengandung imbuhan awalan...", options: ["ber-", "me-", "ter-", "di-"], answer: "me-", difficulty: "Mudah", category: "Imbuhan" },
    { id: "qb-m-04", question: "Kata 'Meja' termasuk jenis kata...", options: ["Kata kerja", "Kata benda", "Kata sifat", "Kata depan"], answer: "Kata benda", difficulty: "Mudah", category: "Jenis Kata" },
    { id: "qb-m-05", question: "Sinonim dari kata 'Besar' adalah...", options: ["Kecil", "Raksasa", "Lebar", "Tinggi"], answer: "Raksasa", difficulty: "Mudah", category: "Kosakata" },

    // SEDANG (5) - Sentence structure, prefixes/suffixes, text identification
    { id: "qb-s-01", question: "Kalimat yang memiliki struktur SPOK yang benar adalah...", options: ["Buku saya baca di perpustakaan", "Di perpustakaan saya baca buku", "Saya baca buku di perpustakaan", "Membaca buku saya di perpustakaan"], answer: "Saya baca buku di perpustakaan", difficulty: "Sedang", category: "Struktur Kalimat" },
    { id: "qb-s-02", question: "Imbuhan 'di-' pada kata 'ditulis' menunjukkan...", options: ["Kata kerja aktif", "Kata kerja pasif", "Kata sifat", "Kata benda"], answer: "Kata kerja pasif", difficulty: "Sedang", category: "Imbuhan" },
    { id: "qb-s-03", question: "Teks yang berisi informasi tentang langkah-langkah membuat sesuatu termasuk jenis teks...", options: ["Teks narasi", "Teks eksposisi", "Teks prosedur", "Teks deskripsi"], answer: "Teks prosedur", difficulty: "Sedang", category: "Jenis Teks" },
    { id: "qb-s-04", question: "Kata 'Dia' pada kalimat 'Dia pergi ke pasar' termasuk kata...", options: ["Kata ganti orang ketiga", "Kata ganti orang kedua", "Kata ganti orang pertama", "Kata tunjuk"], answer: "Kata ganti orang ketiga", difficulty: "Sedang", category: "Jenis Kata" },
    { id: "qb-s-05", question: "Tanda baca koma (,) digunakan untuk...", options: ["Mengakhiri kalimat berita", "Memisahkan bagian dalam kalimat", "Menunjukkan pertanyaan", "Menggantikan kata yang tidak jelas"], answer: "Memisahkan bagian dalam kalimat", difficulty: "Sedang", category: "Tanda Baca" },

    // SULIT (5) - Reading comprehension, figurative language, text analysis
    { id: "qb-l-01", question: "Bacaan berikut: 'Hujan turun dengan deras sejak sore hari. Banjir mulai merendam jalan di depan rumah. Anak-anak bermain air dengan gembira meskipun orang tua mereka khawatir.' Pesan utama dari bacaan tersebut adalah...", options: ["Banjir selalu membahayakan", "Hujan deras menyebabkan banjir", "Anak-anak senang bermain air saat banjir", "Orang tua selalu melarang anak bermain air"], answer: "Hujan deras menyebabkan banjir", difficulty: "Sulit", category: "Pemahaman Bacaan" },
    { id: "qb-l-02", question: "Ungkapan 'Mulutmu adalah harimaumu' bermaksud...", options: ["Mulut kita harus kuat seperti harimau", "Kata-kata yang diucapkan bisa membahayakan diri sendiri", "Harimau memiliki mulut yang kuat", "Kita harus berbicara dengan keras"], answer: "Kata-kata yang diucapkan bisa membahayakan diri sendiri", difficulty: "Sulit", category: "Bahasa Kiasan" },
    { id: "qb-l-03", question: "Teks berita koran termasuk jenis teks...", options: ["Narasi", "Eksposisi", "Persuasi", "Deskripsi"], answer: "Eksposisi", difficulty: "Sulit", category: "Jenis Teks" },
    { id: "qb-l-04", question: "Kalimat 'Rina sudah mengerjakan PR sebelum makan malam' mengandung kosakata 'sudah' yang menunjukkan...", options: ["Waktu yang akan datang", "Peristiwa yang sudah terjadi", "Perintah", "Kemungkinan"], answer: "Peristiwa yang sudah terjadi", difficulty: "Sulit", category: "Tata Bahasa" },
    { id: "qb-l-05", question: "Kalimat 'Gunung itu menjulang tinggi di depan rumahku' menggunakan majas...", options: ["Majas personifikasi", "Majas hiperbola", "Majas simile", "Majas metafora"], answer: "Majas hiperbola", difficulty: "Sulit", category: "Bahasa Kiasan" },

    // MASTER (5) - Complex analysis
    { id: "qb-x-01", question: "Seorang penulis artikel koran menulis tentang pentingnya menjaga kebersihan lingkungan. Tujuan penulis menulis artikel tersebut adalah...", options: ["Memberitakan bahwa lingkungan kotor", "Membujuk pembaca agar menjaga kebersihan", "Menceritakan pengalaman membersihkan lingkungan", "Mendeskripsikan kondisi lingkungan"], answer: "Membujuk pembaca agar menjaga kebersihan", difficulty: "Master", category: "Struktur Teks" },
    { id: "qb-x-02", question: "Perhatikan paragraf berikut: 'Banyak sekolah di Indonesia kini menerapkan pembelajaran daring. Hal ini memaksa siswa dan guru beradaptasi dengan teknologi. Meskipun ada kendala, pembelajaran tetap harus berlangsung.' Struktur paragraf tersebut terdiri dari...", options: ["Tesis, argumen, penegasan ulang", "Tesis, argumen, kesimpulan", "Ide pokok, penjelasan, contoh", "Intro, isi, penutup"], answer: "Tesis, argumen, kesimpulan", difficulty: "Master", category: "Struktur Teks" },
    { id: "qb-x-03", question: "Perbedaan gaya bahasa antara surat dinas dan surat pribadi terletak pada...", options: ["Surat dinas lebih panjang dari surat pribadi", "Surat dinas menggunakan bahasa baku dan formal, surat pribadi lebih bebas dan personal", "Surat dinas selalu menggunakan tanda tangan digital", "Surat pribadi harus menggunakan bahasa daerah"], answer: "Surat dinas menggunakan bahasa baku dan formal, surat pribadi lebih bebas dan personal", difficulty: "Master", category: "Jenis Teks" },
    { id: "qb-x-04", question: "Dalam sebuah cerpen, penulis menggunakan sudut pandang orang ketiga. Keuntungan penggunaan sudut pandang ini adalah...", options: ["Pembaca merasa menjadi tokoh utama", "Penulis bisa menceritakan pikiran dan perasaan semua tokoh", "Cerita terasa lebih realistis", "Cerita menjadi lebih pendek dan singkat"], answer: "Penulis bisa menceritakan pikiran dan perasaan semua tokoh", difficulty: "Master", category: "Struktur Teks" },
    { id: "qb-x-05", question: "Bahasa Indonesia memiliki kosakata serapan dari berbagai bahasa asing. Fenomena ini mencerminkan...", options: ["Kelemahan bahasa Indonesia dalam beradaptasi", "Kekayaan dan fleksibilitas bahasa Indonesia dalam menerima pengaruh budaya lain", "Kemiskinan kosakata bahasa Indonesia", "Ketidakmampuan penutur bahasa Indonesia membuat kata baru"], answer: "Kekayaan dan fleksibilitas bahasa Indonesia dalam menerima pengaruh budaya lain", difficulty: "Master", category: "Kosakata" },
  ],

  // ============================================================
  // 4. QUIZ BAHASA INGGRIS (English Quiz) - 20 Questions
  // ============================================================
  "quiz-bahasa-inggris": [
    // MUDAH (5) - Basic vocabulary
    { id: "qe-m-01", question: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], answer: "Blue", difficulty: "Mudah", category: "Colors" },
    { id: "qe-m-02", question: "How do you say 'kucing' in English?", options: ["Dog", "Bird", "Cat", "Fish"], answer: "Cat", difficulty: "Mudah", category: "Vocabulary" },
    { id: "qe-m-03", question: "Which one is a greeting?", options: ["Goodbye", "Thank you", "Hello", "Sorry"], answer: "Hello", difficulty: "Mudah", category: "Greetings" },
    { id: "qe-m-04", question: "What is 'dua puluh' in English?", options: ["Ten", "Twelve", "Twenty", "Thirty"], answer: "Twenty", difficulty: "Mudah", category: "Numbers" },
    { id: "qe-m-05", question: "The animal that says 'moo' is a...", options: ["Cat", "Dog", "Cow", "Chicken"], answer: "Cow", difficulty: "Mudah", category: "Animals" },

    // SEDANG (5) - Simple sentences, plural forms, basic tenses
    { id: "qe-s-01", question: "Choose the correct sentence:", options: ["She go to school every day", "She goes to school every day", "She going to school every day", "She goed to school every day"], answer: "She goes to school every day", difficulty: "Sedang", category: "Basic Grammar" },
    { id: "qe-s-02", question: "What is the plural form of 'child'?", options: ["Childs", "Childes", "Children", "Childies"], answer: "Children", difficulty: "Sedang", category: "Plural Forms" },
    { id: "qe-s-03", question: "Which word means 'besar' in English?", options: ["Small", "Big", "Fast", "Tall"], answer: "Big", difficulty: "Sedang", category: "Vocabulary" },
    { id: "qe-s-04", question: "Complete the sentence: 'I ___ a student.'", options: ["is", "am", "are", "be"], answer: "am", difficulty: "Sedang", category: "Basic Grammar" },
    { id: "qe-s-05", question: "Which one is an animal?", options: ["Table", "Chair", "Dog", "Book"], answer: "Dog", difficulty: "Sedang", category: "Vocabulary" },

    // SULIT (5) - Reading comprehension, verb tenses, prepositions
    { id: "qe-l-01", question: "Read the text: 'My name is Rina. I wake up at 6 a.m. every day. I eat breakfast with my family. Then I go to school by bicycle.' How does Rina go to school?", options: ["By bus", "By car", "By bicycle", "On foot"], answer: "By bicycle", difficulty: "Sulit", category: "Reading Comprehension" },
    { id: "qe-l-02", question: "Which sentence uses the simple past tense correctly?", options: ["I play football yesterday", "I played football yesterday", "I playing football yesterday", "I plays football yesterday"], answer: "I played football yesterday", difficulty: "Sulit", category: "Verb Tenses" },
    { id: "qe-l-03", question: "The cat is ___ the table.", options: ["in", "on", "at", "to"], answer: "on", difficulty: "Sulit", category: "Prepositions" },
    { id: "qe-l-04", question: "What does 'She is reading a book' mean?", options: ["Dia sedang menulis buku", "Dia sedang membaca buku", "Dia sedang membeli buku", "Dia sedang menjual buku"], answer: "Dia sedang membaca buku", difficulty: "Sulit", category: "Translation" },
    { id: "qe-l-05", question: "Which sentence is correct?", options: ["He don't like apples", "He doesn't likes apples", "He doesn't like apples", "He not like apples"], answer: "He doesn't like apples", difficulty: "Sulit", category: "Basic Grammar" },

    // MASTER (5) - Complex sentences, idioms, contextual vocabulary
    { id: "qe-x-01", question: "Read the passage: 'Tom and his friends went to the beach last weekend. They swam in the ocean, built sandcastles, and ate ice cream. Tom had the best day ever.' What is the main idea of the passage?", options: ["Tom likes ice cream", "Tom went to the beach and had a great time", "The ocean is very big", "Sandcastles are hard to build"], answer: "Tom went to the beach and had a great time", difficulty: "Master", category: "Reading Comprehension" },
    { id: "qe-x-02", question: "The idiom 'it's raining cats and dogs' means...", options: ["Animals are falling from the sky", "It is raining very heavily", "Cats and dogs are playing outside", "The weather is sunny"], answer: "It is raining very heavily", difficulty: "Master", category: "Idioms" },
    { id: "qe-x-03", question: "Which sentence uses the future tense correctly?", options: ["I will went to school tomorrow", "I will going to school tomorrow", "I will go to school tomorrow", "I will goes to school tomorrow"], answer: "I will go to school tomorrow", difficulty: "Master", category: "Verb Tenses" },
    { id: "qe-x-04", question: "Complete: 'If I were a bird, I ___ fly around the world.'", options: ["will", "can", "would", "shall"], answer: "would", difficulty: "Master", category: "Complex Sentences" },
    { id: "qe-x-05", question: "Which word is an antonym of 'happy'?", options: ["Joyful", "Glad", "Sad", "Cheerful"], answer: "Sad", difficulty: "Master", category: "Contextual Vocabulary" },
  ],

};
