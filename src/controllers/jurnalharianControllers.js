const jurnalharian = require("../models/jurnalharian")

const index =(req,res)=>{
    jurnalharian.selectjurnalharian((err, result)=>{
        if (err)
        {
    return res.status(500).json({eror:err.Message})
        }
        if (result.lenght===0)

        {
            return res.status(404).json({
                Message:"jurnalharian kosong"
            })
        }
        res.status(200).json(result)
    })
}
const storejurnalharian = (req, res) => {
    const {id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan} = req.body;
    jurnalharian.insertjurnalharian(id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({ message: "Berhasil disimpan", jurnalharianlId: result.insertId});
    });
};
const showjurnalharian= (req, res)=> {
    const { id } = req.params;
    jurnalharian.selectjurnalharianById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        if (result.lenght ===0) {
            return res.status(400).json({ message: " jurnalharian ndak ada" });
        }
        res.status(200).json(result[0]);
    });
};
const updatejurnalharian= (req, res) => {
    const { id } = req.params;
    const {id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan } = req.body;
   jurnalharian.updatejurnalharian(id,id_siswa, tanggal_kegiatan, waktu_mulai, waktu_selesai, deskripsi_kegiatan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(200).json("data berhasil dirubah");
    });
};
const destroyjurnalharian = (req, res) => {
    const { id } = req.params;
    jurnalharian.deletejurnalharian(id, (err, result) => {
        if (err) {
            return res.status(500).json({ eror: err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};

module.exports ={
    index,
    storejurnalharian,
    showjurnalharian,
    updatejurnalharian,
    destroyjurnalharian
}