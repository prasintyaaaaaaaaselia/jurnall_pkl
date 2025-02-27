const tempatpkl = require("../models/tempatpkl")

const index =(req,res)=>{
    tempatpkl.selecttempatpkl((err, result)=>{
        if (err)
        {
    return res.status(500).json({eror:err.Message})
        }
        if (result.lenght===0)

        {
            return res.status(404).json({
                Message:"tempatpkl kosong"
            })
        }
        res.status(200).json(result)
    })
}
const storetempatpkl = (req, res) => {
    const {nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan } = req.body;
    tempatpkl.inserttempatpkl(nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({ message: "Berhasil disimpan", tempatpklId: result.insertId});
    });
};
const showtempatpkl= (req, res)=> {
    const { id } = req.params;
    tempatpkl.selecttempatpklById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        if (result.lenght ===0) {
            return res.status(400).json({ message: " tempatpkl ndak ada" });
        }
        res.status(200).json(result[0]);
    });
};
const updatetempatpkl = (req, res) => {
    const { id } = req.params;
    const {nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan } = req.body;
    tempatpkl.updatetempatpkl(id,nama_perusahaan, alamat_perusahaan, bidang_usaha, email_perusahaan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(200).json("data berhasil dirubah");
    });
};
const destroytempatpkl = (req, res) => {
    const { id } = req.params;
    tempatpkl.deletetempatpkl(id, (err, result) => {
        if (err) {
            return res.status(500).json({ eror: err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};

module.exports ={
    index,
    storetempatpkl,
    showtempatpkl,
    updatetempatpkl,
    destroytempatpkl
}