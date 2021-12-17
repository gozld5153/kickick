#!/bin/bash
cd /home/ubuntu/kickick/server

export RDS_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_USERNAME --query Parameters[0].Value | sed 's/"//g')
export RDS_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export RDS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_PORT --query Parameters[0].Value | sed 's/"//g')
export RDS_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_HOST --query Parameters[0].Value | sed 's/"//g')
export RDS_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names RDS_NAME --query Parameters[0].Value | sed 's/"//g')

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')

export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')

export NAVER_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export NAVER_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export NAVER_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export NAVER_STATE=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_STATE --query Parameters[0].Value | sed 's/"//g')

export MULTER_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names MULTER_KEY_ID --query Parameters[0].Value | sed 's/"//g')
export MULTER_ACCESS_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names MULTER_ACCESS_KEY --query Parameters[0].Value | sed 's/"//g')
export MULTER_REGION=$(aws ssm get-parameters --region ap-northeast-2 --names MULTER_REGION --query Parameters[0].Value | sed 's/"//g')

export NODEMAILER_EMAIL=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_EMAIL --query Parameters[0].Value | sed 's/"//g')
export NODEMAILER_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names NODEMAILER_PASSWORD --query Parameters[0].Value | sed 's/"//g')

export BUCKET_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names BUCKET_NAME --query Parameters[0].Value | sed 's/"//g')

export NODE_ENV="production"

authbind --deep pm2 start index.js

