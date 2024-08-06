const fileName = "pexels-chloekalaartist-1043473.jpg";
// AWS S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

async function getFile(bucketName, fileName) {
  const getObjectParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  try {
    const command = new GetObjectCommand(getObjectParams);
    const response = await s3Client.send(command);

    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log("File URL:", url);

    // 파일 내용을 처리하는 코드
    const stream = response.Body;
    let data = "";
    stream.on("data", (chunk) => {
      data += chunk;
    });
    stream.on("end", () => {
      console.log("File content:", data);
    });
  } catch (error) {
    console.error("Error getting file:", error);
  }
}

exports.getImage = async (req, res) => {
  let data = getFile(process.env.AWS_S3_BUCKET_NAME, fileName);
  res.json(data);
};
