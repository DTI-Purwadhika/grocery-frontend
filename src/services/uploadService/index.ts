import AWS from "aws-sdk";

export const uploadFile = async (file: File) => {
  const S3_BUCKET = process.env.NEXT_PUBLIC_STORAGE;
  const REGION = process.env.NEXT_PUBLIC_REGION;

  AWS.config.update({
    accessKeyId: process.env.NEXT_PUBLIC_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET,
  });

  const s3 = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET as string,
    Key: file.name,
    Body: file,
  };

  try {
    const upload = await s3.putObject(params).promise();

    // console.log(upload);
    alert("File uploaded successfully." + upload);
  } catch (error) {
    // console.error(error);
    alert("Error uploading file: " + error);
  }
};
