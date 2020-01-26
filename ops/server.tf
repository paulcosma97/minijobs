provider "archive" {}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = "../server-rework/build"
  output_path = "build.zip"
}

resource "aws_iam_role" "server_lambda_role" {
  name               = "iam_for_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}


resource "aws_lambda_function" "server_lambda" {
  function_name = "api"
  environment {
    variables = {
      SERVERLESS = "TRUE"
    }
  }
  handler                        = "./src/serverless.handler"
  memory_size                    = 128
  reserved_concurrent_executions = 3
  runtime                        = "nodejs12.x"

  role                           = aws_iam_role.server_lambda_role.arn

  filename                       = data.archive_file.zip.output_path
  source_code_hash               = data.archive_file.zip.output_base64sha256
}
