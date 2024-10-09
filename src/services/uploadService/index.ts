import AWS from "aws-sdk";

export const UploadFile = async (file: File) => {
  const S3_BUCKET = process.env.NEXT_PUBLIC_STORAGE;
  const REGION = process.env.NEXT_PUBLIC_REGION;
  const KEY = process.env.NEXT_PUBLIC_KEY;
  const SECRET = process.env.NEXT_PUBLIC_SERVICE;

  AWS.config.update({
    accessKeyId: KEY,
    secretAccessKey: SECRET,
  });

  const s3 = new AWS.S3({
    region: REGION,
  });

  const params = {
    Bucket: S3_BUCKET as string,
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  const upload = await s3.upload(params).promise();

  return upload;
};
