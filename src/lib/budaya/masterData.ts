import provinsi from "@/data/master/provinsi.json";
import pakaianAdat from "@/data/master/pakaian_adat.json";
import laguNasional from "@/data/master/lagu_nasional.json";
import laguDaerah from "@/data/master/lagu_daerah.json";
import rumahAdat from "@/data/master/rumah_adat.json";
import tarian from "@/data/master/tarian.json";
import alatMusik from "@/data/master/alat_musik.json";
import senjataTradisional from "@/data/master/senjata_tradisional.json";
import makananKhas from "@/data/master/makanan_khas.json";
import flora from "@/data/master/flora.json";
import fauna from "@/data/master/fauna.json";
import pahlawan from "@/data/master/pahlawan.json";
import keajaibanAlam from "@/data/master/keajaiban_alam.json";

export interface MasterProvinsi {
  id: string;
  nama: string;
  ibuKota: string;
  pulau: string;
  luasKm2: number;
  penduduk: number;
  bahasaDaerah: string;
  rumahAdat: string;
  pakaianAdat: string;
  laguDaerah: string;
  tari: string;
  alatMusik: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterPakaianAdat {
  id: string;
  nama: string;
  provinsi: string;
  pulau: string;
  keterangan: string;
  makna: string;
  ciriKhas: string;
  bahan: string;
  aksesori: string;
  digunakanPada: string;
  faktaMenarik: string;
  emoji: string;
  gambar: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterLaguNasional {
  id: string;
  nama: string;
  pencipta: string;
  tahun: number;
  keterangan: string;
  makna: string;
  nilaiKarakter: string;
  verifikasi: boolean;
  sumber: string;
  youtubeId: string;
}

export interface MasterLaguDaerah {
  id: string;
  nama: string;
  provinsi: string;
  bahasaDaerah: string;
  keterangan: string;
  makna: string;
  fungsiLagu: string;
  verifikasi: boolean;
  sumber: string;
  youtubeId: string;
}

export interface MasterRumahAdat {
  id: string;
  nama: string;
  provinsi: string;
  arsitektur: string;
  fungsi: string;
  keunikan: string;
  bahan: string;
  gambar: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterTarian {
  id: string;
  nama: string;
  daerah: string;
  makna: string;
  kostum: string;
  musikPengiring: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterAlatMusik {
  id: string;
  nama: string;
  daerah: string;
  caraMemainkan: string;
  jenis: string;
  fungsi: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterSenjata {
  id: string;
  nama: string;
  daerah: string;
  fungsi: string;
  bahan: string;
  filosofi: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterMakanan {
  id: string;
  nama: string;
  daerah: string;
  bahan: string;
  caraMemasak: string;
  ciriKhas: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterFlora {
  id: string;
  nama: string;
  namaLatin: string;
  habitat: string;
  persebaran: string;
  status: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterFauna {
  id: string;
  nama: string;
  namaLatin: string;
  habitat: string;
  persebaran: string;
  statusKonservasi: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterPahlawan {
  id: string;
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  daerahAsal: string;
  perjuangan: string;
  penghargaan: string;
  verifikasi: boolean;
  sumber: string;
}

export interface MasterKeajaibanAlam {
  id: string;
  nama: string;
  lokasi: string;
  provinsi: string;
  jenis: string;
  keunikan: string;
  flora: string;
  fauna: string;
  verifikasi: boolean;
  sumber: string;
}

export const masterData = {
  provinsi: provinsi as MasterProvinsi[],
  pakaianAdat: pakaianAdat as MasterPakaianAdat[],
  laguNasional: laguNasional as MasterLaguNasional[],
  laguDaerah: laguDaerah as MasterLaguDaerah[],
  rumahAdat: rumahAdat as MasterRumahAdat[],
  tarian: tarian as MasterTarian[],
  alatMusik: alatMusik as MasterAlatMusik[],
  senjataTradisional: senjataTradisional as MasterSenjata[],
  makananKhas: makananKhas as MasterMakanan[],
  flora: flora as MasterFlora[],
  fauna: fauna as MasterFauna[],
  pahlawan: pahlawan as MasterPahlawan[],
  keajaibanAlam: keajaibanAlam as MasterKeajaibanAlam[],
};

export default masterData;
