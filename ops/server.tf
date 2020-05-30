provider "archive" {}

data "archive_file" "zip" {
  type        = "zip"
  source_dir  = "../server-rework/build"
  output_path = "build.zip"
}

resource "aws_iam_role" "server_lambda" {
  name               = "mj-server-lambda-iam-role"
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

  role = aws_iam_role.server_lambda.arn

  filename         = data.archive_file.zip.output_path
  source_code_hash = data.archive_file.zip.output_base64sha256
}

resource "aws_api_gateway_rest_api" "server_lambda" {
  name = "mj-server-lambda-api-gateway"
}

resource "aws_api_gateway_resource" "server_lambda_api" {
  path_part   = "{proxy+}"
  parent_id   = aws_api_gateway_rest_api.server_lambda.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.server_lambda.id
}

resource "aws_api_gateway_method" "server_lambda_gw_method" {
  rest_api_id   = aws_api_gateway_rest_api.server_lambda.id
  resource_id   = aws_api_gateway_resource.server_lambda_api.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "server_lambda_gw" {
  rest_api_id             = aws_api_gateway_rest_api.server_lambda.id
  resource_id             = aws_api_gateway_resource.server_lambda_api.id
  http_method             = aws_api_gateway_method.server_lambda_gw_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.server_lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "server_lambda_gw" {
  depends_on = [
    aws_api_gateway_integration.server_lambda_gw
  ]

  rest_api_id = aws_api_gateway_rest_api.server_lambda.id
  stage_name  = "production"
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowMyDemoAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.server_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.server_lambda.execution_arn}/*/*/*"
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.server_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
