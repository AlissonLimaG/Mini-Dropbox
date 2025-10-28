const express = require('express');
const multer = require('multer');
const Minio = require('minio');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Config MinIO
const minioClient = new Minio.Client({
  endPoint: '127.0.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin123',
});

const BUCKET = 'files';

// Verifica/Cria bucket ao iniciar
(async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET);
    if (!exists) await minioClient.makeBucket(BUCKET, 'us-east-1');
    console.log(`Bucket "${BUCKET}" pronto.`);
  } catch (err) {
    console.error('Erro ao preparar bucket:', err);
  }
})();

// Upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    const filename = req.file.originalname;

    await minioClient.putObject(
      BUCKET,
      filename,
      req.file.buffer,
      req.file.size,
      { 'Content-Type': req.file.mimetype }
    );

    return res.json({ message: 'Upload concluído', name: filename });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Falha no upload' });
  }
});

// Listagem
app.get('/files', async (req, res) => {
  try {
    const objects = [];
    const stream = minioClient.listObjects(BUCKET, '', true);
    stream.on('data', obj => objects.push({ name: obj.name, size: obj.size, lastModified: obj.lastModified }));
    stream.on('end', () => res.json(objects));
    stream.on('error', err => {
      console.error(err);
      res.status(500).json({ error: 'Falha na listagem' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Falha na listagem' });
  }
});

// Download via URL pré-assinada
app.get('/download/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const url = await minioClient.presignedGetObject(BUCKET, name, 60 * 10); // 10 minutos
    return res.json({ url });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: 'Arquivo não encontrado' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));