import masterData from "./masterData";

export interface PakaianAdat {
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

export const pakaianAdatData: PakaianAdat[] = masterData.pakaianAdat;
