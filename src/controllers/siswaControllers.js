const siswa = require("../models/siswa");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const index =(req,res)=>{
    siswa.selectsiswa((err, result)=>{
        if (err)
        {
    return res.status(500).json({eror:err.Message})
        }
        if (result.lenght===0)

        {
            return res.status(404).json({
                Message:"siswa kosong"
            })
        }
        res.status(200).json(result)
    })
}
const storesiswa = (req, res) => {
    const {Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, password } = req.body;
    siswa.insertsiswa(Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email,  password, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({ message: "Berhasil disimpan", siswaId: result.insertId});
    });
};
const showsiswa = (req, res)=> {
    const { id } = req.params;
    siswa.selectsiswaById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        if (result.lenght ===0) {
            return res.status(400).json({ message: " siswa ndak ada" });
        }
        res.status(200).json(result[0]);
    });
};
const updatesiswa = (req, res) => {
    const { id } = req.params;
    const { Id_tempatpkl, nama_siswa, kelas, nomer_telepon, email, password } = req.body;
    console.log(req.body);
    siswa.updatesiswa(id,Id_tempatpkl,nama_siswa,kelas,nomer_telepon,email,password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(200).json("data berhasil dirubah");
    });
};
const destroysiswa = (req, res) => {
    const { id } = req.params;
    siswa.deletesiswa(id, (err, result) => {
        if (err) {
            return res.status(500).json({ eror: err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};

const Login=(req,res)=>{
    const {email,password}=req.body;
    siswa.selectsiswaByEmail(email,(err,result)=>{
        if (err){
            return res.status(500).json({eror:err.message})
        }
        if (result.length===0){
            return res.status(400).json({message:"email tidak terdaftar "})
        }
        const siswa =result[0]
        const passwordisValid = bcrypt.compareSync(password, siswa.password)
        if (!passwordisValid){
            return res.status(401).json({message:"password salah"})
        }
        const token= jwt.sign({id:siswa.id},"rahasia",{
           expiresIn:86400 
        })
        res.status(200).json({auth:true,token})
    });
};

const Logout=(req,res)=>{
    res.status(200).json({auth:false,token:null})
}

module.exports ={
    index,
    Login,
    Logout,
    storesiswa,
    showsiswa,
    updatesiswa,
    destroysiswa
}