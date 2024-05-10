import boto3
from io import BytesIO

from dataplane import s3_upload
from botocore.client import Config

AccountID = "716806fb9ea5f2938036b1e3f8f7767b"

# 2. Bucket name
Bucket = "demo"

# 3. Client access key
ClientAccessKey = "54803e5820cef1c8b9129f309eb076d0"

# 4. Client secret
ClientSecret = "835c59f383160dd7302639630cca80c57ae1e8a311554e471af268a93df6ec79"
ConnectionUrl = f"https://{AccountID}.r2.cloudflarestorage.com"
s3 = boto3.client(
    service_name ='s3',
    endpoint_url=ConnectionUrl,
    aws_access_key_id=ClientAccessKey,
    aws_secret_access_key=ClientSecret,
    region_name='us-east-1'

)

UploadObject = """
{
    "version": 2,
    "builds": [
        {
            "src": "app.py",
            "use": "@vercel/python"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "/app.py"
        }
    ]
}
"""
UploadObjectBytes = UploadObject.encode('utf-8')
UploadObjectFile = BytesIO(UploadObjectBytes)

#object_information = s3.head_object(Bucket="demo", Key="demo1.txt")
rs = s3.upload_fileobj(UploadObjectFile, Bucket="demo", Key="vercell.json")

print(rs)